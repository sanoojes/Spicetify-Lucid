import Logger from '@builder/logger.ts';
import type { Plugin } from 'esbuild';

export function wrapWithLoader(): Plugin {
  return {
    name: 'wrap-with-lucid-loader',
    setup(build) {
      build.onEnd(async (res) => {
        try {
          if (res.errors.length > 0) return;
          const path = 'src/theme.js';
          const themeCode = await Deno.readTextFile(path);
          const wrappedCode = `(function(){if(window.__lucidLoaded)return;window.__lucidLoaded=1;(function lucidMain(){if(!Spicetify.React||!Spicetify.ReactDOM||!Spicetify.Platform||!Spicetify.Player){setTimeout(lucidMain,100);return;}${themeCode}})();})();`;
          await Deno.writeTextFile(path, wrappedCode);
        } catch (e) {
          Logger.error('Error:', e);
        }
      });
    },
  };
}
