import Logger from '@builder/logger.ts';
import type { Plugin } from 'esbuild';

export const loggerPlugin = (name = 'logger'): Plugin => ({
  name,
  setup(build) {
    build.onStart(() => Logger.info(`[${name}] build started.`));
    build.onEnd((res) => {
      if (res.errors.length > 0) {
        Logger.error(`[${name}] build failed.`);

        return;
      }
      Logger.info(`[${name}] build finished.`);
    });
  },
});
