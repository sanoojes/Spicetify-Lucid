import type { Plugin } from "esbuild";
import Logger from "@lib/logger.ts";

export function wrapWithLoader(): Plugin {
  return {
    name: "wrap-with-lucid-loader",
    setup(build) {
      build.onEnd(async (res) => {
        try {
          if (res.errors.length > 0) return;
          const path = "src/theme.js";
          const themeCode = await Deno.readTextFile(path);
          const wrappedCode = `function lucidMain(){if(!Spicetify.React || !Spicetify.ReactDOM || !Spicetify.Platform || !Spicetify.Player){setTimeout(()=>lucidMain(),100); return;}${themeCode}}lucidMain();`;
          await Deno.writeTextFile(path, wrappedCode);
          // console.debug("JS Wrapping Complete.");
        } catch (e) {
          Logger.error("Error:", e);
        }
      });
    },
  };
}
