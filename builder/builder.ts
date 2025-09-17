import Logger from '@builder/logger.ts';
import { copyFilesPlugin } from '@builder/plugin/copyFilesPlugin.ts';
import { externalGlobalPlugin } from '@builder/plugin/externalGlobalPlugin.ts';
import { loggerPlugin } from '@builder/plugin/loggerPlugin.ts';
import { notifyClientPlugin } from '@builder/plugin/notifyClientPlugin.ts';
import { wrapWithLoader } from '@builder/plugin/wrapWithLoader.ts';
import { startWSServer } from '@builder/wsServer.ts';
import { parseArgs } from '@std/cli';
import { join } from '@std/path';
import { type BuildOptions, build, context } from 'esbuild';
import svgrPlugin from 'esbuild-plugin-svgr';

const THEME_NAME = 'Lucid';

const isWindows = Deno.build.os === 'windows';

const HOME_PATH = isWindows
  ? Deno.env.get('APPDATA')
  : join(Deno.env.get('HOME') ?? '/home/jack', '.config');

if (!HOME_PATH) {
  Logger.error('Home Path not found.');
  Deno.exit(1);
}

const SPICETIFY_PATH = join(HOME_PATH, 'spicetify');
const SPOTIFY_PATH = isWindows ? join(HOME_PATH, 'Spotify') : '/opt/spotify';

const THEME_PATH = join(SPICETIFY_PATH, 'Themes', THEME_NAME);
const EXTENSION_PATH = join(SPICETIFY_PATH, 'Extensions');
const XPUI_PATH = join(SPOTIFY_PATH, 'Apps', 'xpui');
const XPUI_EXTENSION_PATH = join(XPUI_PATH, 'extensions');
const DIST_PATH = 'src';

const EXTENSION_ENTRY_POINTS = [join(Deno.cwd(), 'extension', 'app.tsx')];
const CSS_ENTRY_POINTS = [join(Deno.cwd(), 'styles', 'app.css')];
const LIVERELOAD_JS_PATH = join(Deno.cwd(), 'builder', 'client', 'liveReload.js');

const main = async () => {
  const { watch, minify, reload } = parseArgs(Deno.args, {
    default: { watch: false, minify: false, reload: false },
    alias: { w: 'watch', m: 'minify', r: 'reload' },
  });

  if (watch) startWSServer();

  const jsOutFilePath = join(DIST_PATH, 'theme.js');
  const jsCopyTargets = [
    { from: jsOutFilePath, to: join(THEME_PATH, 'theme.js') },
    ...(watch ? [{ from: jsOutFilePath, to: join(XPUI_EXTENSION_PATH, 'theme.js') }] : []),
  ];

  const jsBuildOptions: BuildOptions = {
    bundle: true,
    entryPoints: EXTENSION_ENTRY_POINTS,
    outfile: jsOutFilePath,
    treeShaking: true,
    minify,
    legalComments: 'external',
    external: ['react', 'react-dom'],
    jsx: 'transform',
    plugins: [
      svgrPlugin(),
      loggerPlugin('JS'),
      wrapWithLoader(),
      externalGlobalPlugin({
        react: 'Spicetify.React',
        'react/jsx-runtime': 'Spicetify.ReactJSX',
        'react-dom': 'Spicetify.ReactDOM',
        'react-dom/client': 'Spicetify.ReactDOM',
        'react-dom/server': 'Spicetify.ReactDOMServer',
      }),
      copyFilesPlugin(jsCopyTargets),
      ...(watch ? [notifyClientPlugin()] : []),
    ],
  };

  const cssOutFilePath = join(DIST_PATH, 'user.css');
  const cssCopyTargets = [
    { from: cssOutFilePath, to: join(THEME_PATH, 'user.css') },
    ...(watch ? [{ from: cssOutFilePath, to: join(XPUI_PATH, 'user.css') }] : []),
  ];

  const cssBuildOptions: BuildOptions = {
    bundle: true,
    entryPoints: CSS_ENTRY_POINTS,
    outfile: cssOutFilePath,
    platform: 'browser',
    minify,
    plugins: [
      loggerPlugin('CSS'),
      copyFilesPlugin(cssCopyTargets),
      ...(watch ? [notifyClientPlugin()] : []),
    ],
  };

  const jsCtx = watch ? await context(jsBuildOptions) : null;
  const cssCtx = watch ? await context(cssBuildOptions) : null;

  if (watch) {
    await jsCtx?.watch();
    await cssCtx?.watch();
    Logger.info('Watching for changes...');
  } else {
    await build(jsBuildOptions);
    await build(cssBuildOptions);
  }

  const runSpicetifyCommand = async (args: string[]) => {
    const command = new Deno.Command('spicetify', { args });
    const { code, stderr } = await command.output();
    const err = new TextDecoder().decode(stderr).trim();
    const log = (msg: string) => Logger.info(`[Spicetify] ${msg}`);

    code === 0
      ? log(`✅ ${args[0]} succeeded.`)
      : log(`❌ ${args[0]} failed (code ${code})${err ? `:\n${err}` : ''}`);
  };

  if (watch || reload) {
    await runSpicetifyCommand([
      'config',
      'current_theme',
      THEME_NAME,
      'color_scheme',
      'dark',
      ...(watch ? ['extensions', 'liveReload.js'] : []),
    ]);

    if (watch) {
      const liveReloadPath = join(EXTENSION_PATH, 'liveReload.js');
      await Deno.copyFile(LIVERELOAD_JS_PATH, liveReloadPath);
      Logger.debug(`Copied: ${LIVERELOAD_JS_PATH} → ${liveReloadPath}`);
    }

    await runSpicetifyCommand(['apply']);
  }
};

main().catch((e) => {
  Logger.error('Error Building:', e);
});
