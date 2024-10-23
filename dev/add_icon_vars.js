const fs = require("node:fs");
const path = require("node:path");

const iconFolder = "./assets/icons";
const targetCssFile = "./styles/components/icons.scss";

const svgFiles = fs.readdirSync(iconFolder).filter((file) => path.extname(file) === ".svg");

let cssVariables = "";

for (const file of svgFiles) {
	const svgContent = fs.readFileSync(path.join(iconFolder, file), "utf8");
	const base64Svg = Buffer.from(svgContent).toString("base64");
	const variableName = `--${path.basename(file, ".svg")}-icon`;
	cssVariables += `${variableName}: url("data:image/svg+xml;base64,${base64Svg}");\n`;
}

try {
	let existingCss = fs.readFileSync(targetCssFile, "utf8");

	// Remove existing icon variables
	// biome-ignore lint/complexity/useRegexLiterals: explanation
	const existingVariableRegex = new RegExp(
		`\\s*--[a-z0-9-]+-icon\\s*:\\s*url\\("data:image\\/svg\\+xml\\;base64,[a-zA-Z0-9+/=]*"\\);`,
		"gi",
	);
	existingCss = existingCss.replace(existingVariableRegex, "");

	// Add the new variables
	existingCss += `\n/* Auto-generated CSS variables for icons */\n:root {\n${cssVariables}\n}`;

	fs.writeFileSync(targetCssFile, existingCss);
	console.log("CSS variables for icons updated in user.css successfully!");
} catch (error) {
	console.error("Error updating CSS variables:", error);
}
