import { logError } from "./logUtils";

export async function getMarkdownHTML(markdown: string, user: string, repo: string) {
	try {
		const postBody = {
			text: markdown,
			context: `${user}/${repo}`,
			mode: "gfm",
		};

		const response = await fetch("https://api.github.com/markdown", {
			method: "POST",
			body: JSON.stringify(postBody),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const html = await response.text();
		return html;
	} catch (err) {
		logError("Error parsing markdown:", err);
		return null;
	}
}
