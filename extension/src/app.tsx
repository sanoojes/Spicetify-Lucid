import { DEFAULT_SETTINGS } from "./constants";
import { SettingItem, SettingSection } from "./types/settings";

enum BackgroundOption {
  ANIMATED = "animated",
  STATIC = "static",
  SOLID = "solid",
}

enum grainsOption {
  STARY = "stary",
  NORMAL = "normal",
  NONE = "none",
}

let isCustomControls = false;

// Wait for dom elements fn
async function waitForElement(
  selector: string,
  maxAttempts = 50,
  interval = 100
) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const element = document.querySelector(selector);
    if (element) {
      return element as HTMLElement;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }
  throw new Error(
    `Element ${selector} not found after ${maxAttempts} attempts.`
  );
}

// Artist art image
let currentArtImage = "";
const artStyleElement = document.createElement("style");
document.head.appendChild(artStyleElement);

function setArtImage() {
  currentArtImage =
    Spicetify.Player.data.item.metadata.image_xlarge_url ||
    Spicetify.Player.data.item.metadata.image_large_url ||
    Spicetify.Player.data.item.metadata.image_url;

  currentArtImage = currentArtImage.replace(
    "spotify:image:",
    "https://i.scdn.co/image/"
  );

  try {
    artStyleElement.innerText = "";
    artStyleElement.innerText = `:root { --image-url: url(${currentArtImage}); }`;
  } catch (error) {
    console.error("Error updating album art:", error);
  }
}

const scrollStyleElement = document.createElement("style");
document.head.appendChild(scrollStyleElement);

let lastScrollTop = 0;

function updateScrollElement(scroll_container: Element) {
  const scrollTop = scroll_container.scrollTop;
  const screenHeight = window.innerHeight;

  const clampedScrollTop = Math.min(scrollTop, screenHeight);
  scrollStyleElement.innerText = `:root {--scroll-top: ${clampedScrollTop}px;}`;
  lastScrollTop = scrollTop;
}

const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

async function setIsArtistOrPlaylist() {
  try {
    const section = (await waitForElement("section")) as HTMLElement;
    let display = "relative";

    if (
      section.dataset.testid?.includes("album") ||
      section.dataset.testid?.includes("playlist") ||
      section.dataset.testid?.includes("artist")
    ) {
      display = "absolute";
    }

    if (section && section.dataset?.testUri) {
      const dataTestUri = section.dataset.testUri.toLowerCase();
      const isArtist = dataTestUri.includes("artist");
      const isAlbum = dataTestUri.includes("album-page");
      display =
        isArtist ||
        document.querySelectorAll(
          ".playlist-playlist-playlist, .main-entityHeader-container, .main-entityHeader-nonWrapped"
        ).length !== 0 ||
        isAlbum
          ? "absolute"
          : "relative";
    }
    styleSheet.innerText = `:root { --header-position: ${display}; }`;
  } catch (error) {
    console.error("[Lucid] Error waiting for section element:", error);
  }
}

document.head.appendChild(styleSheet);

function addButtonStyles() {
  const { Locale } = Spicetify;
  function cleanLabel(label: string): string {
    const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, "").trim();
    return cleanedLabel;
  }
  if (!Locale) return;
  let playlistPlayLabel = Locale.get("playlist.a11y.play") as string;
  playlistPlayLabel = cleanLabel(playlistPlayLabel);
  let playlistPauseLabel = Locale.get("playlist.a11y.pause") as string;
  playlistPauseLabel = cleanLabel(playlistPauseLabel);

  const playLabel = Locale.get("${playLabel}");
  const pauseLabel = Locale.get("${pauseLabel}");

  const browseLabel = Locale.get("browse");

  const addToLikedLabel = Locale.get(
    "web-player.aligned-curation.tooltips.add-to-liked-songs"
  );
  const addToPlaylistLabel = Locale.get(
    "web-player.aligned-curation.tooltips.add-to-playlist"
  );

  const skipForwardLabel = Locale.get("playback-control.skip-forward");
  const skipBackLabel = Locale.get("playback-control.skip-back");

  const whatsNewLabel = Locale.get("web-player.whats-new-feed.button-label");

  const friendsActivityLabel = Locale.get("buddy-feed.friend-activity");
  const tracklistPlayLabel = Locale.get("tracklist.a11y.play") as string;

  const homeBtnLabelOne = Locale.get("view.web-player-home");

  let tracklistPlayLabelOne;
  let tracklistPlayLabelTwo;
  if (["zh-CN", "zh-TW", "am", "fi"].includes(Locale.getLocale())) {
    [tracklistPlayLabelOne, tracklistPlayLabelTwo] =
      tracklistPlayLabel.split("{1}");
  } else {
    [tracklistPlayLabelOne, tracklistPlayLabelTwo] =
      tracklistPlayLabel.split("{0}");
  }
  tracklistPlayLabelOne = cleanLabel(tracklistPlayLabelOne);
  tracklistPlayLabelTwo = cleanLabel(tracklistPlayLabelTwo);

  const ButtonStyles = document.createElement("style");
  ButtonStyles.innerText = `
.main-playButton-button[aria-label*="${playLabel}"],
.main-playButton-PlayButton > button[aria-label*="${playLabel}"],
.main-playPauseButton-button[aria-label="${playLabel}"],
.main-playPauseButton-button[aria-label="${Locale.get(
    "playback-control.play"
  )}"],
.main-trackList-rowPlayPauseButton[aria-label*="${playLabel}"],
.main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelOne}"][aria-label*="${tracklistPlayLabelTwo}"],
.main-playButton-PlayButton > button[aria-label*="${playlistPlayLabel}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg") !important;
}
.main-playButton-button[aria-label*="${pauseLabel}"],
.main-playButton-PlayButton > button[aria-label*="${pauseLabel}"],
.main-playPauseButton-button[aria-label*="${pauseLabel}"],
.main-playPauseButton-button[aria-label="${Locale.get(
    "playback-control.pause"
  )}"],
.main-trackList-rowPlayPauseButton[aria-label*="${pauseLabel}"],
.main-trackList-rowImagePlayButton[aria-label*="${pauseLabel}"],
.main-playButton-PlayButton > button[aria-label*="${playlistPauseLabel}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg") !important;
}

.Root__globalNav
  button:is([aria-label="${Locale.get("search.a11y.clear-input")}"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${browseLabel}"] path {
  display: none !important;
}

button[aria-label="${browseLabel}"] svg {
  display: none;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass_outline.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass_outline.svg");
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}
.main-repeatButton-button[aria-label="${Locale.get(
    "playback-control.enable-repeat"
  )}"] ,
  .main-repeatButton-button[aria-label="${Locale.get(
    "playback-control.disable-repeat"
  )}"],
  .main-repeatButton-button[aria-label="${Locale.get(
    "playback-control.enable-repeat-one"
  )}"], {
  scale: 0.75 !important;
  background-color: var(--spice-subtext) !important;
  color: var(--spice-subtext);
  svg {
    display: none;
  }
}

.main-playPauseButton-button,
button[aria-label="${addToLikedLabel}"],
button[aria-label="${addToPlaylistLabel}"],
.player-controls button[aria-label="${skipBackLabel}"],
.player-controls button[aria-label="${skipForwardLabel}"], {
  display: block;
  mask-size: 100%;
  mask-position: 50% 50%;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  min-height: 1rem;
  min-width: 1rem;
  aspect-ratio: 1/1;
  border-radius: 0 !important;
  border: none !important;
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}

button[aria-label="${addToPlaylistLabel}"],
button[aria-label="${addToLikedLabel}"] {
  background-color: var(--spice-subtext);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg") !important;
  mask-size: 100%;
  mask-position: 50% 50%;
  min-width: 1.2rem;
  min-height: 1.2rem;
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}
button[aria-label="${addToPlaylistLabel}"] {
  background-color: var(--spice-accent);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg") !important;
}

.player-controls button[aria-label="${skipBackLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg");
}
.player-controls button[aria-label="${skipForwardLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg");
}

button[aria-label="${friendsActivityLabel}"] > path,
button[aria-label="${whatsNewLabel}"] > path {
  display: none;
}

.main-actionButtons > div > button[aria-label="${whatsNewLabel}"] svg,
.main-actionButtons > button[aria-label="${whatsNewLabel}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/alert.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/alert.svg");
}
.main-actionButtons > div > button[aria-label="${friendsActivityLabel}"] svg,
.main-actionButtons > button[aria-label="${friendsActivityLabel}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg");
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"] svg,
button[aria-label="${homeBtnLabelOne}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg");
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg,
.main-globalNav-navLinkActive[aria-label="${homeBtnLabelOne}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg");
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg{
  path {
    display: none !important;
  }
  background-color: var(--spice-accent) !important;
}
#context-menu ul[aria-label*="${Locale.get(
    "web-player.aligned-curation.add-to-playlist-menu"
  )}"] {
  p {
    max-width: 10rem;
  }
}

`;
  document.head.appendChild(ButtonStyles);
}

async function fetchFadeTime() {
  // needs to implement logic
  let fadeTime = "1s";
  document.documentElement.style.setProperty("--fade-time", fadeTime);
}

/* Transparent Controls */
const transparentControlElement = document.createElement("div");
function addTransparentControls(height: number, width: number) {
  transparentControlElement.classList.add("lucid-transperent-window-controls");
  transparentControlElement.style.setProperty(
    "--control-height",
    `${height}px`
  );
  transparentControlElement.style.setProperty("--control-width", `${width}px`);
}
async function setMainWindowControlHeight(height: number) {
  await Spicetify.CosmosAsync.post("sp://messages/v1/container/control", {
    type: "update_titlebar",
    height: height,
  });
}

function calculateBrowserZoom(): number {
  const viewportWidth: number = window.innerWidth;
  const windowWidth: number = window.outerWidth;
  const zoomLevel: number = (windowWidth / viewportWidth) * 100;
  return zoomLevel;
}

/* Topbar styles */
const topBarStyleSheet = document.createElement("style");
document.head.appendChild(topBarStyleSheet);
async function setTopBarStyles() {
  if (!isCustomControls) {
    const isGlobalNav =
      document.querySelector(".global-nav") ||
      document.querySelector(".Root__globalNav");

    const baseHeight = 64;
    const baseWidth = 135;

    const zoomNum = calculateBrowserZoom();
    const multiplier = zoomNum > 0 ? zoomNum / 50 : 0;
    if (!isGlobalNav) {
      const constant = 0.912872807;
      console.log(`Current zoom level: ${zoomNum}%`);

      const finalControlHeight =
        Math.round(zoomNum ** constant * 100) / 100 - 2;

      const paddingStart = 4 * 1 ** multiplier;
      const paddingEnd = 9 + 1 ** multiplier;

      await setMainWindowControlHeight(finalControlHeight);

      topBarStyleSheet.innerText = `
            .main-topBar-container {
                padding-inline-end: ${paddingEnd}rem !important;
                padding-inline-start: ${paddingStart}rem !important;
            }

            .spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
                padding-inline: ${paddingStart}rem ${paddingEnd}rem !important;
            }
        `;
    }
    if (
      Spicetify.Platform.PlatformData.os_name === "windows" &&
      Spicetify.Config.color_scheme !== "light"
    ) {
      const transparentControlHeight = baseHeight;
      const transparentControlWidth = baseWidth; // need to implement scaling

      addTransparentControls(transparentControlHeight, transparentControlWidth);
    }
  }
}

// Background
async function changeBackgroundTo(backgroundOption?: BackgroundOption) {
  const rootContainer = await waitForElement(".Root__top-container").catch(
    (e) => console.error(e)
  );

  function removeAllExistingBgContainers() {
    // Funtion to Remove all existing background containers
    const existingAnimatedBg = rootContainer?.querySelector(
      ".lucid-animated-background-container"
    );
    const existingStaticBg = rootContainer?.querySelector(
      ".lucid-static-background-container"
    );
    if (existingAnimatedBg) {
      existingAnimatedBg.remove();
    }
    if (existingStaticBg) {
      existingStaticBg.remove();
    }
  }
  removeAllExistingBgContainers();

  try {
    if (!backgroundOption) backgroundOption = BackgroundOption.STATIC;

    if (backgroundOption === BackgroundOption.ANIMATED) {
      function getRandomDegree() {
        const randomDegree = Math.floor(Math.random() * 360);
        document.documentElement.style.setProperty(
          "--random-degree",
          `${randomDegree}deg`
        );
      }
      getRandomDegree();

      const newElement = document.createElement("div");
      newElement.classList.add("lucid-animated-background-container");

      const divClasses = ["front", "back", "backleft", "backright"];

      for (const className of divClasses) {
        const div = document.createElement("div");
        div.classList.add(className);

        newElement.appendChild(div);
      }
      rootContainer?.prepend(newElement);
    }
    if (backgroundOption === BackgroundOption.STATIC) {
      const newElement = document.createElement("div");
      newElement.classList.add("lucid-static-background-container");

      rootContainer?.prepend(newElement);
    }

    if (backgroundOption === BackgroundOption.SOLID) {
      removeAllExistingBgContainers();
    }
  } catch (error) {
    console.error(error);
  }
}

// Grains
const styleSheetforGrain = document.createElement("style");
function changeGrainsTo(option?: grainsOption) {
  try {
    if (!option) option = grainsOption.STARY;

    if (option === grainsOption.STARY) {
      styleSheetforGrain.innerText = `
      :root {
        --background-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3Cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.184' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale='13' specularConstant='0.3' specularExponent='20' lighting-color='%23ffffff' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='133'%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3CfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'%3E%3C/feColorMatrix%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%2300000000'%3E%3C/rect%3E%3Crect width='700' height='700' fill='%23ffffff' filter='url(%23nnnoise-filter)'%3E%3C/rect%3E%3C/svg%3E") !important;
        }
        `;
    }
    if (option === grainsOption.NORMAL) {
      styleSheetforGrain.innerText = `
        :root {
          --background-noise: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=) !important;
}
`;
    }

    if (option === grainsOption.NONE) {
      styleSheetforGrain.innerText = `
  :root {
    --background-noise: none !important;
    }
    `;
    }
  } catch (error) {
    console.error(error);
  }
}
document.head.appendChild(styleSheetforGrain);

// Settings Section
const settingsContainer = document.createElement("div");
settingsContainer.className = "lucid-settings-container";

function setPropertyToBody(key: string, value: string) {
  document.body.style.setProperty(`--${key}`, value);
}

function addSettings() {
  const settings = loadSettings();

  settings.forEach((section) => {
    const settingsSection = document.createElement("div");
    settingsSection.className = "lucid-settings-card";

    const sectionHeading = document.createElement("h2");
    sectionHeading.classList.add(
      "settings-section-heading",
      "encore-text-title-small",
      "encore-internal-color-text-base"
    );
    sectionHeading.textContent = section.section;
    settingsSection.appendChild(sectionHeading);

    section.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "lucid-settings-input-card";

      const label = document.createElement("label");
      label.classList.add(
        "settings-section-label",
        "encore-text-title-small",
        "encore-internal-color-text-subdued"
      );
      label.innerText = item.label;
      label.htmlFor = `${item.key}-input`;

      const tooltip = document.createElement("p");
      tooltip.classList.add(
        "encore-text-body-small",
        "encore-internal-color-text-subdued"
      );
      tooltip.innerText = item.tooltip || "";

      const slider = document.createElement("input");
      slider.className = "Lucid-slider";
      slider.type = "range";
      slider.id = `${item.key}-input`;
      slider.min = String(item.min);
      slider.max = String(item.max);
      slider.value = String(
        item.value !== undefined ? item.value : item.default
      ); // Use saved or default

      const sliderValue = document.createElement("span");
      sliderValue.id = `${item.key}-value`;
      sliderValue.textContent = `${slider.value}${item.unit}`;
      sliderValue.className = "Lucid-slider-value";
      setPropertyToBody(item.key, `${slider.value}${item.unit}`);

      slider.addEventListener("input", () => {
        const newValue = parseInt(slider.value, 10);
        sliderValue.textContent = `${newValue}${item.unit}`;
        setPropertyToBody(item.key, `${newValue}${item.unit}`);
        saveSetting(item.key, newValue);
      });

      div.appendChild(label);
      div.appendChild(tooltip);
      const slider_div = document.createElement("div");
      slider_div.className = "Lucid-slider-container";
      slider_div.appendChild(slider);
      slider_div.appendChild(sliderValue);

      div.appendChild(slider_div);
      settingsSection.appendChild(div);
    });
    settingsContainer.appendChild(settingsSection);
  });

  // Function to create a reusable dropdown
  const createDropdown = async (
    options: { text: string; value: string }[],
    localStorageKey: string,
    label: string,
    onChange: (newValue: string) => void
  ): Promise<HTMLDivElement> => {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("lucid-dropdown-container");

    const dropdownLabel = document.createElement("h2");
    dropdownLabel.classList.add("lucid-slider-label");
    dropdownLabel.textContent = label;
    dropdownContainer.appendChild(dropdownLabel);

    const selectElement = document.createElement("select");
    selectElement.classList.add("lucid-dropdown", "main-dropDown-dropDown");

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.textContent = option.text;
      optionElement.value = option.value;
      selectElement.appendChild(optionElement);
    });

    const storedValue =
      localStorage.getItem(localStorageKey) || options[0].value;
    selectElement.value = storedValue;
    onChange(storedValue); // Apply initial value

    selectElement.addEventListener("change", () => {
      const selectedValue = selectElement.value;
      localStorage.setItem(localStorageKey, selectedValue);
      onChange(selectedValue);
    });

    dropdownContainer.appendChild(selectElement);
    return dropdownContainer;
  };

  // Background Settings Section
  const backgroundSettingsSection = document.createElement("div");
  backgroundSettingsSection.classList.add("lucid-settings-section");

  const backgroundOptions = [
    { text: "Default Background", value: BackgroundOption.STATIC },
    { text: "Animated Background", value: BackgroundOption.ANIMATED },
    { text: "Solid Background", value: BackgroundOption.SOLID },
  ];

  const grainsOptions = [
    { text: "Stary Grains (default)", value: grainsOption.STARY },
    { text: "Normal Grains", value: grainsOption.NORMAL },
    { text: "No Grains", value: grainsOption.NONE },
  ];

  (async () => {
    const backgroundDropdown = await createDropdown(
      backgroundOptions,
      "selectedBackground",
      "Background",
      (newValue: string) => {
        changeBackgroundTo(newValue as BackgroundOption);
      }
    );
    backgroundSettingsSection.appendChild(backgroundDropdown);

    const grainsDropdown = await createDropdown(
      grainsOptions,
      "lucid-selectedGrains",
      "Background Grains",
      (newValue: string) => {
        changeGrainsTo(newValue as grainsOption);
      }
    );
    backgroundSettingsSection.appendChild(grainsDropdown);
  })();

  settingsContainer.appendChild(backgroundSettingsSection);

  const resetButton = document.createElement("button");
  resetButton.className = "lucid-reset-btn";
  resetButton.textContent = "Reset to Defaults";
  resetButton.addEventListener("click", () => {
    if (
      confirm(
        "Are you sure you want to reset all settings to their default values?"
      )
    ) {
      resetSettings();
    }
  });
  settingsContainer.appendChild(resetButton);
}

function resetSettings() {
  localStorage.removeItem("settings");
  localStorage.removeItem("selectedBackground");
  changeBackgroundTo();
  localStorage.removeItem("lucid-selectedGrains");
  changeGrainsTo();

  const sliders = document.querySelectorAll<HTMLInputElement>(".Lucid-slider");

  sliders.forEach((slider) => {
    const key = slider.id.replace("-input", "");
    const item = findSettingItemByKey(key);
    if (item) {
      slider.value = String(item.default);
      const sliderValueSpan = document.getElementById(`${key}-value`);
      if (sliderValueSpan) {
        let value = `${item.default}${item.unit}`;
        sliderValueSpan.textContent = value;
        setPropertyToBody(item.key, value);
      }
    }
  });
}

function findSettingItemByKey(key: string): SettingItem | undefined {
  for (const section of DEFAULT_SETTINGS) {
    const item = section.items.find((item) => item.key === key);
    if (item) {
      return item;
    }
  }
  return undefined;
}

function loadSettings(): SettingSection[] {
  const storedSettings = localStorage.getItem("settings");
  console.log(storedSettings);

  if (storedSettings) {
    try {
      const parsedSettings: SettingSection[] = JSON.parse(storedSettings);
      return DEFAULT_SETTINGS.map((defaultSection) => {
        const storedSection = parsedSettings.find(
          (s) => s.section === defaultSection.section
        );
        return {
          ...defaultSection,
          items: defaultSection.items.map((defaultItem: SettingItem) => {
            const storedItem = storedSection
              ? storedSection.items.find((i) => i.key === defaultItem.key)
              : undefined;
            return {
              ...defaultItem,
              value: storedItem ? storedItem.value : defaultItem.default,
            };
          }),
        };
      });
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

function saveSetting(key: string, value: number) {
  const settings = loadSettings();
  const sectionIndex = settings.findIndex((section) =>
    section.items.some((item) => item.key === key)
  );
  if (sectionIndex !== -1) {
    const itemIndex = settings[sectionIndex].items.findIndex(
      (item) => item.key === key
    );
    if (itemIndex !== -1) {
      settings[sectionIndex].items[itemIndex].value = value;
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }
}

addSettings();
setSettingsToMenu(settingsContainer);

function setSettingsToMenu(container: Element) {
  const settingsMenuItem = new Spicetify.Menu.Item(
    "Lucid Settings",
    false,
    () => {
      Spicetify.PopupModal.display({
        title: "Lucid Settings",
        content: container,
      });
    },
    `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>`
  );
  settingsMenuItem.register();
}

/* Main Fn */
async function main() {
  while (
    !Spicetify?.CosmosAsync ||
    !Spicetify?.React ||
    !Spicetify?.Platform ||
    !Spicetify?.Locale ||
    !Spicetify?.Player.data
  ) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const isWindows = Spicetify?.Platform.PlatformData.os_name === "windows";
  if (isWindows && Spicetify.Config.color_scheme !== "light") {
    document
      .querySelector(".Root__main-view")
      ?.prepend(transparentControlElement);
  }

  addButtonStyles();

  // Initial setup
  setArtImage();
  setTopBarStyles();
  setIsArtistOrPlaylist();

  // Event Listeners
  Spicetify.Player.addEventListener("songchange", () => {
    fetchFadeTime();
    setArtImage();
  });
  window.addEventListener("resize", setTopBarStyles);

  // Scroll
  const scroll_container = await waitForElement(
    ".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]"
  );

  scroll_container?.addEventListener("scroll", () => {
    if (scroll_container.scrollTop === 0) setIsArtistOrPlaylist();

    const hasUnderViewImage = document.querySelector(".under-main-view div");
    if (hasUnderViewImage && scroll_container.scrollTop !== window.innerHeight)
      updateScrollElement(scroll_container);
  });

  console.log("Lucid theme loaded.");

  const checkForCustomControls = async () => {
    if (await waitForElement("#customControls")) {
      isCustomControls = true;
      document.querySelector(".lucid-transperent-window-controls")?.remove();
    }
  };

  setTimeout(() => {
    checkForCustomControls(); // check for the extensiton after it loads
  }, 100);
}

export default main;
