import type { Plugin } from "esbuild";
import Logger from "@lib/logger.ts";

export const loggerPlugin = (name = "logger"): Plugin => ({
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
