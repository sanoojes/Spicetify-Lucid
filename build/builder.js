import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import esbuild from "esbuild";
import { externalGlobalPlugin } from "./external.js";

export const builder = async (outDirectory = "./src", inDirectory = "./extension") => {
	const compiledExtension = path.join(outDirectory, "theme.js");
	const appPath = path.resolve(inDirectory, "App.tsx");
	const tempFolder = path.join(os.tmpdir(), "lucid-temp");
	const indexPath = path.join(tempFolder, "index.jsx");

	try {
		// Ensure temp folder exists
		await fs.mkdir(tempFolder, { recursive: true });

		// Write entry point
		await fs.writeFile(
			indexPath,
			`import App from '${appPath.replace(/\\/g, "/")}'; (async () => { await App(); })();`,
		);

		// Perform the build
		await esbuild.build({
			entryPoints: [indexPath],
			outfile: compiledExtension,
			platform: "browser",
			external: ["react", "react-dom"],
			bundle: true,
			minify: true,
			globalName: "lucid",
			plugins: [
				externalGlobalPlugin({
					react: "Spicetify.React",
					"react-dom": "Spicetify.ReactDOM",
				}),
			],
		});

		console.log("Build succeeded.");

		// Modify the bundled output to include the dynamic check for React and ReactDOM
		const bundleContent = await fs.readFile(compiledExtension, "utf-8");
		const wrappedContent =
			`(async function() {while (!Spicetify.React || !Spicetify.ReactDOM) {await new Promise(resolve => setTimeout(resolve, 10));}${bundleContent}})();`.trim();

		// Write the final content back to the file
		await fs.writeFile(compiledExtension, wrappedContent);
		console.log("Final output written to theme.js.");
	} catch (error) {
		console.error("Build failed:", error);
	}
};

builder();
