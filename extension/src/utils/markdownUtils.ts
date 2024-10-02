export async function getMarkdownHTML(
	markdown: string,
	user: string,
	repo: string,
) {
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
		console.error("Error parsing markdown:", err);
		return null;
	}
}
