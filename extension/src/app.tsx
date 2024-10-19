import Main from "@/components/Main";
import { logError } from "@/utils/logUtils";
import React from "react";

async function main() {
	try {
		// Wait for necessary Spicetify objects to be available
		while (!Spicetify?.showNotification || !Spicetify?.Player || !Spicetify?.React || !Spicetify?.Platform) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		let rootElement = document.getElementById("lucid-main");
		if (!rootElement) {
			rootElement = document.createElement("div");
			rootElement.id = "lucid-main";
			const mainElement = document.getElementById("main");
			mainElement?.prepend(rootElement);
		}

		if (rootElement && !rootElement.hasChildNodes()) {
			Spicetify.ReactDOM.createRoot(rootElement).render(<Main />);
		}

		console.log("%c Lucid ignited! 🚀", "font-weight: bold; font-size: 1.25rem; color: #2196F3; padding: 0.5rem 0;");
	} catch (error) {
		Spicetify.showNotification(`[Lucid] Error Occurred: ${error instanceof Error ? error.message : error}`, true);
		logError(error);
	}
}

export default main;
