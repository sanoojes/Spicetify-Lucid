import { build, type BuildOptions, context } from "npm:esbuild";
import { externalGlobalPlugin } from "./plugin/externalGlobalPlugin.ts";
import { wrapWithLoader } from "./plugin/wrapWithLoader.ts";
import { startWSServer } from "./wsServer.ts";
import { notifyClientPlugin } from "./plugin/notifyClientPlugin.ts";
import { copyFilesPlugin } from "./plugin/copyFilesPlugin.ts";
import { loggerPlugin } from "./plugin/loggerPlugin.ts";
import { join } from "@std/path";
import { parseArgs } from "@std/cli";
import Logger from "@lib/logger.ts";

const THEME_NAME = "Lucid";

const APPDATA_PATH = Deno.env.get("APPDATA");
if (!APPDATA_PATH) {
  Logger.info("Appdata path not found exiting...");
  Deno.exit();
}

const THEME_PATH = join(APPDATA_PATH, "spicetify/Themes/Lucid");
const EXTENSION_PATH = join(APPDATA_PATH, "spicetify/Extensions");
const XPUI_PATH = join(APPDATA_PATH, "Spotify/Apps/xpui");
const XPUI_EXTENSION_PATH = join(XPUI_PATH, "extensions");
const DIST_PATH = join("src");

const EXTENSION_ENTRY_POINTS = [join(Deno.cwd(), "extension/app.tsx")];
const CSS_ENTRY_POINTS = [join(Deno.cwd(), "styles/app.css")];
const LIVERELOAD_JS_PATH = join(Deno.cwd(), "builder/client/liveReload.js");

const main = async () => {
  const { watch } = parseArgs(Deno.args, {
    default: { w: false },
    alias: { w: "watch" },
  });

  if (watch) startWSServer();

  const jsOutFilePath = join(DIST_PATH, "theme.js");
  const jsBuildOptions: BuildOptions = {
    bundle: true,
    entryPoints: EXTENSION_ENTRY_POINTS,
    outfile: jsOutFilePath,
    external: ["react", "react-dom"],
    jsx: "transform",
    plugins: [
      loggerPlugin("JS"),
      wrapWithLoader(),
      externalGlobalPlugin({
        react: "Spicetify.React",
        "react-dom": "Spicetify.ReactDOMServer",
        "react-dom/client": "Spicetify.ReactDOM",
      }),
      copyFilesPlugin([
        {
          from: jsOutFilePath,
          to: join(THEME_PATH, "theme.js"),
        },
        {
          from: jsOutFilePath,
          to: join(XPUI_EXTENSION_PATH, "theme.js"),
        },
      ]),
      ...(watch ? [notifyClientPlugin()] : []),
    ],
  } satisfies BuildOptions;

  const cssOutFilePath = join(DIST_PATH, "user.css");

  const cssBuildOptions: BuildOptions = {
    bundle: true,
    entryPoints: CSS_ENTRY_POINTS,
    outfile: cssOutFilePath,
    platform: "browser",
    tsconfig: "tsconfig.json",
    plugins: [
      loggerPlugin("CSS"),
      copyFilesPlugin([
        {
          from: cssOutFilePath,
          to: join(THEME_PATH, "user.css"),
        },
        {
          from: cssOutFilePath,
          to: join(XPUI_PATH, "user.css"),
        },
      ]),
      ...(watch ? [notifyClientPlugin()] : []),
    ],
  } satisfies BuildOptions;

  // Build theme

  const jsCtx = watch ? await context(jsBuildOptions) : null;
  const cssCtx = watch ? await context(cssBuildOptions) : null;
  if (watch) {
    await jsCtx?.watch();
    await cssCtx?.watch();

    Logger.info("Watching for changes...");
  } else {
    await build(jsBuildOptions);

    await build(cssBuildOptions);
  }

  if (!watch) return;

  // Apply Theme
  const run = async (args: string[]) => {
    const { code, stderr } = await new Deno.Command("spicetify", {
      args,
    }).output();
    const log = (msg: string) => Logger.info(`[Spicetify] ${msg}`);
    const err = new TextDecoder().decode(stderr).trim();

    code === 0
      ? log(`✅ ${args[0]} succeeded.`)
      : log(`❌ ${args[0]} failed (code ${code})${err ? `:\n${err}` : ""}`);
  };

  await run([
    "config",
    "current_theme",
    "Lucid",
    "color_scheme",
    "dark",
    ...(watch ? ["extensions", "liveReload.js"] : []),
  ]);

  if (watch) {
    // copy liveReload.js
    const liveReloadPath = join(EXTENSION_PATH, "liveReload.js");
    await Deno.copyFile(LIVERELOAD_JS_PATH, liveReloadPath);
    Logger.debug(`Copied: ${LIVERELOAD_JS_PATH} → ${liveReloadPath}`);
  }

  await run(["apply"]);
};

main().catch((e) => {
  Logger.error("Error Building:", e);
});
