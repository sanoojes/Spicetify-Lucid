import type { Plugin } from "esbuild";
import { reloadWSClients } from "../wsServer.ts";
import Logger from "@lib/logger.ts";

export function notifyClientPlugin(): Plugin {
  return {
    name: "notify-client-plugin",
    setup(build) {
      build.onEnd(() => {
        try {
          const { outfile } = build.initialOptions;

          if (!outfile) {
            Logger.warn("[NotifyClientPlugin] No 'outfile' detected.");
            return;
          }

          const isCSS = outfile.endsWith(".css");
          const event = isCSS ? "reload_css" : "reload";

          reloadWSClients(event);

          Logger.info(`[NotifyClientPlugin] Notified clients: ${event}`);
        } catch (e) {
          Logger.error(
            "[NotifyClientPlugin] Error notifying clients:",
            e instanceof Error ? e.stack || e.message : String(e)
          );
        }
      });
    },
  };
}
