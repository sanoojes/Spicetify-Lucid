import { logInfo } from "@/utils/logUtils";

function applyBackgroundStyles(backgroundStyleElement: HTMLElement, zIndex: number) {
	backgroundStyleElement.innerHTML = `
    #lucid-main .background-container .background-wrapper div { z-index: ${zIndex} !important; }
  `;
}

function setDefaultBackgroundZIndex(backgroundStyleElement: HTMLElement) {
	backgroundStyleElement.innerHTML = `
    #lucid-main .background-container .background-wrapper div { z-index: -1 !important; }
  `;
}

function manageBackgroundZIndexForElement(
	element: HTMLElement,
	containerSelector: string,
	backgroundStyleElement: HTMLElement,
	zIndex: number,
) {
	let isContainerPresent = false;
	let previousContainer: HTMLElement | null = null;

	const observer = new MutationObserver(() => {
		const container = element.querySelector(containerSelector) as HTMLElement | null;

		// Check if container has changed
		if (container !== previousContainer) {
			if (container && !isContainerPresent) {
				logInfo(`Applying background z-index: ${zIndex}`);
				isContainerPresent = true;
				applyBackgroundStyles(backgroundStyleElement, zIndex);
			} else if (isContainerPresent) {
				logInfo(`Removing background z-index: ${zIndex}`);
				isContainerPresent = false;

				// Only check for lyrics cinema element when removing the fullscreen container
				const lyricsCinemaElement = document.querySelector(
					"#lyrics-cinema .lyrics-lyrics-background, #lyrics-cinema .lyrics-lyrics-container",
				) as HTMLElement | null;
				if (lyricsCinemaElement) {
					applyBackgroundStyles(backgroundStyleElement, 5);
				} else {
					setDefaultBackgroundZIndex(backgroundStyleElement);
				}
			}
			previousContainer = container;
		}
	});

	const config = { childList: true };

	observer.observe(element, config);
	setDefaultBackgroundZIndex(backgroundStyleElement);
}

export const manageBackgroundZIndex = () => {
	let backgroundStyleElement = document.getElementById("lucid-background-style");

	if (!backgroundStyleElement) {
		backgroundStyleElement = document.createElement("style");
		backgroundStyleElement.id = "lucid-background-style";
		document.head.appendChild(backgroundStyleElement);
	}

	// Manage background z-index for the lyrics cinema element.
	const lyricsCinemaElement = document.querySelector("#lyrics-cinema") as HTMLElement;
	if (lyricsCinemaElement) {
		manageBackgroundZIndexForElement(
			lyricsCinemaElement,
			"#lyrics-cinema .lyrics-lyrics-background, #lyrics-cinema .lyrics-lyrics-container",
			backgroundStyleElement,
			5,
		);
	}

	// Manage background z-index for the full screen element.
	const fullScreenElement = document.querySelector("#main .Root > div:last-child") as HTMLElement;
	if (fullScreenElement) {
		manageBackgroundZIndexForElement(
			fullScreenElement,
			'.Root div[data-testid="fullscreen-mode-container"], .Root .npv-main-container',
			backgroundStyleElement,
			15,
		);
	}
};
