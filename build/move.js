import { exec, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export function applySpicetifyTheme(
	srcFolder = "src",
	themeName = "Lucid",
	spicetifyPath = process.env.SPICETIFY_PATH || "C:/Users/Sachu/AppData/Roaming/spicetify/",
) {
	const destinationFolder = path.join(spicetifyPath, "Themes", themeName);

	// Create the destination folder if it doesn't exist
	if (!fs.existsSync(destinationFolder)) {
		fs.mkdirSync(destinationFolder, { recursive: true });
		console.log("Destination folder created!");
	}

	console.log("Copying theme files...");
	try {
		// Copy all files from the srcFolder to the destination folder
		const files = fs.readdirSync(srcFolder);
		for (const file of files) {
			const srcFile = path.join(srcFolder, file);
			const destFile = path.join(destinationFolder, file);
			fs.copyFileSync(srcFile, destFile);
		}
		console.log("Theme files copied successfully!");
	} catch (err) {
		console.error(`Error copying files: ${err.message}`);
	}

	console.log("Applying Spicetify theme...");
	const applyCommands = [
		`spicetify config current_theme ${themeName} inject_theme_js 1 extensions theme.js- color_scheme dark`,
		"spicetify apply",
	];

	Promise.all(applyCommands.map((command) => execSync(command)))
		.then(() => {
			console.log("Spicetify theme applied successfully!");
		})
		.catch((error) => {
			console.error(`An error occurred: ${error}`);
			process.exit(1);
		});

	console.log(`Theme path: ${destinationFolder}`);
	process.exit(0);
}

applySpicetifyTheme();
