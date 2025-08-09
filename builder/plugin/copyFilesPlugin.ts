import { dirname, resolve } from 'jsr:@std/path';
import Logger from '@builder/logger.ts';
import type { Plugin } from 'esbuild';

export type copy = {
  from: string;
  to: string;
};

let hasRunOnce = false;

export function copyFilesPlugin(copy: copy[], copiedOnce = false): Plugin {
  return {
    name: 'copy-files-plugin',
    setup(build) {
      build.onEnd(async (res) => {
        if (res.errors.length > 0 || (copiedOnce && hasRunOnce)) return;
        hasRunOnce = true;

        for (const { from, to } of copy) {
          const fromPath = resolve(from);
          const toPath = resolve(to);
          const targetDir = dirname(toPath);

          try {
            await Deno.mkdir(targetDir, { recursive: true });
            await Deno.copyFile(fromPath, toPath);
            Logger.debug(`Copied: ${fromPath} → ${toPath}`);
          } catch (error) {
            Logger.error(`Failed to copy ${fromPath} to ${toPath}:`, error);
          }
        }
      });
    },
  };
}
