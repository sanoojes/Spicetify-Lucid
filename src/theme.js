const SETTING_URL = "https://sanooj.is-a.dev/better-bloom/settings.json";
let settings = [];

(function BetterBloom() {
  let styleSheet = document.createElement("style");
  if (!Spicetify.Player.data || !Spicetify.Platform) {
    setTimeout(BetterBloom, 100);
    return;
  }

  if (!Spicetify.CosmosAsync) {
    setTimeout(noControls, 10);
    return;
  }

  function getRandomDegree() {
    const randomDegree = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty(
      "--random-degree",
      `${randomDegree}deg`
    );
  }
  getRandomDegree();

  let currentSongArtImage = Spicetify.Player.data.item.metadata.image_url;

  function getFromLocalStorage(key) {
    const value = localStorage.getItem(`${key}`);
    return value !== null ? value : "default";
  }

  function setToLocalStorage(key, value) {
    localStorage.setItem(`${key}`, value);
  }

  let currentBgOption = getFromLocalStorage("Bloom-Background-Option");

  function setBackground() {
    const rootBg = document.querySelector(".Root__top-container");

    function removeAllBgContainers() {
      // Funtion to Remove all background containers
      const existingAnimatedBg = rootBg.querySelector(
        ".Bloom-Animated-Bg-Container"
      );
      const existingBaseBg = rootBg.querySelector(
        ".Bloom-NonAnimated-Bg-Container"
      );
      if (existingAnimatedBg) {
        existingAnimatedBg.remove();
      }
      if (existingBaseBg) {
        existingBaseBg.remove();
      }
    }
    removeAllBgContainers();

    if (currentBgOption === "animated") {
      const newElement = document.createElement("div");
      newElement.classList.add("Bloom-Animated-Bg-Container");

      const divClasses = ["Front", "Back", "BackLeft", "BackRight"];

      for (const className of divClasses) {
        const div = document.createElement("div");
        div.classList.add(className);

        newElement.appendChild(div);
      }
      rootBg.prepend(newElement);
    }

    if (currentBgOption === "default") {
      const newElement = document.createElement("div");
      newElement.classList.add("Bloom-NonAnimated-Bg-Container");
      rootBg.prepend(newElement);
    }

    if (currentBgOption === "solid") {
      removeAllBgContainers();
    }
  }

  function changeCurrentBgTo(option) {
    currentBgOption = option;
    setToLocalStorage("Bloom-Background-Option", currentBgOption);
    setBackground();
  }

  function setWindowHeight() {
    Spicetify.Platform.PlayerAPI._prefs
      .get({ key: "app.browser.zoom-level" })
      .then(async (value) => {
        const zoomLevel = value.entries["app.browser.zoom-level"].number;
        const zoomNum = Number(zoomLevel);

        const multiplier = zoomNum !== 0 ? zoomNum / 50 : 0;

        const isGlobalNav = document.querySelector(".Root__globalNav");
        const isWindows = Spicetify.Platform.PlatformData.os_name === "windows";

        const constant = 0.912872807;

        const base_width = 135;
        const final_width = base_width * constant ** multiplier;

        const base_height = 48;
        const final_height = base_height * Math.pow(1.1, multiplier);

        const padding_start = 4 * constant ** multiplier;
        const padding_end = 9 * constant ** multiplier;

        await Spicetify.CosmosAsync.post("sp://messages/v1/container/control", {
          type: "update_titlebar",
          height: final_height,
        });

        if (!isGlobalNav && isWindows) {
          styleSheet.innerText = `
          .main-topBar-container {
            padding-inline-end: ${padding_end}rem !important;
            padding-inline-start: ${padding_start}rem !important;
          }
          
          .spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
            padding-inline: ${padding_start}rem ${padding_end}rem !important
          }`;
        }

        if (!isGlobalNav) {
          styleSheet.innerText += `  
          .Root__main-view .main-topBar-container {
            top: calc(var(--panel-gap) / 2);
            height: calc(24px + var(--panel-gap) * 2);
            ${
              isWindows &&
              `padding-inline: ${padding_start}rem ${padding_end}rem !important`
            }

          }
          .main-topBar-container {
            position: fixed !important;
            backdrop-filter: none !important;
            left: 0;
            width: 100%;
            z-index: 5 !important;
            padding-inline-start: 5rem !important;
            opacity: 1 !important;
            justify-content: space-between !important;
          }
          `;
        } else {
          styleSheet.innerText += `
          .Root__globalNav {
            ${
              isWindows
                ? `padding-inline: ${padding_start}rem ${padding_end}rem !important`
                : `padding-inline-start: 5rem !important;`
            }
          }
          .main-topBar-container {
            ${!isWindows && `padding-inline-start: 5rem !important;`}
          }
        `;
        }

        if (isWindows && Spicetify.Config.color_scheme !== "light") {
          document.documentElement.style.setProperty(
            "--control-width",
            `${final_width}px`
          );
          document.documentElement.style.setProperty(
            "--control-height",
            `${base_height}px`
          );
        }

        document.head.appendChild(styleSheet);
      });
  }

  window.addEventListener("resize", setWindowHeight);
  setWindowHeight(1);

  function cleanLabel(label) {
    const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, "").trim();
    return cleanedLabel;
  }

  const { Locale } = Spicetify;
  if (!Locale) return;
  let playlistPlayLabel = Locale.get("playlist.a11y.play");
  playlistPlayLabel = cleanLabel(playlistPlayLabel);
  let playlistPauseLabel = Locale.get("playlist.a11y.pause");
  playlistPauseLabel = cleanLabel(playlistPauseLabel);

  const playLabel = Locale.get("play");
  const pauseLabel = Locale.get("pause");

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
  const tracklistPlayLabel = Locale.get("tracklist.a11y.play");

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
  ButtonStyles.innerHTML = `
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/play.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/play.svg") !important;
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/pause.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/pause.svg") !important;
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/compass_outline.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/compass_outline.svg");
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

button[aria-label="${addToLikedLabel}"] {
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart-outline.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart-outline.svg") !important;
}
button[aria-label="${addToPlaylistLabel}"] {
  background-color: var(--spice-accent);
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart.svg") !important;
}

.player-controls button[aria-label="${skipBackLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/prev.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/prev.svg");
}
.player-controls button[aria-label="${skipForwardLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/next.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/next.svg");
}

button[aria-label="${friendsActivityLabel}"] > path,
button[aria-label="${whatsNewLabel}"] > path {
  display: none;
}

.main-actionButtons > div > button[aria-label="${whatsNewLabel}"] svg,
.main-actionButtons > button[aria-label="${whatsNewLabel}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/alert.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/alert.svg");
}
.main-actionButtons > div > button[aria-label="${friendsActivityLabel}"] svg,
.main-actionButtons > button[aria-label="${friendsActivityLabel}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/people-team.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/people-team.svg");
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"] svg,
button[aria-label="${homeBtnLabelOne}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-outline.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-outline.svg");
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg,
.main-globalNav-navLinkActive[aria-label="${homeBtnLabelOne}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-filled.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-filled.svg");
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg{
  path {
    display: none !important;
  }
  background-color: var(--spice-accent) !important;
}
    `;
  document.head.appendChild(ButtonStyles);

  const container = document.querySelector(
    ".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]"
  );

  if (container) {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            "--container-scroll",
            `${container.scrollTop}px`
          );
          ticking = false;
        });

        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
  }

  console.log("Better Bloom is running");

  async function fetchFadeTime() {
    const response = await Spicetify.Platform.PlayerAPI._prefs.get({
      key: "audio.crossfade_v2",
    });
    let fadeTime = "0.4s";

    if (response.entries["audio.crossfade_v2"].bool) {
      const crossfadeTime = await Spicetify.Platform.PlayerAPI._prefs.get({
        key: "audio.crossfade.time_v2",
      });
      fadeTime = `${
        crossfadeTime.entries["audio.crossfade.time_v2"].number / 1000
      }s`;
    }

    document.documentElement.style.setProperty("--fade-time", fadeTime);
    console.log(`Fade Time: ${fadeTime}`);
  }

  function onSongChange() {
    fetchFadeTime();

    currentSongArtImage = Spicetify.Player.data.item.metadata.image_url;
    if (currentSongArtImage.includes("spotify:image:")) {
      currentSongArtImage = currentSongArtImage.replace(
        "spotify:image:",
        "https://i.scdn.co/image/"
      );
    }

    document.documentElement.style.setProperty(
      "--image_url",
      `url("${currentSongArtImage}")`
    );
  }

  Spicetify.Player.addEventListener("songchange", onSongChange);
  onSongChange();

  function addSettings() {
    const mainContainer = document.createElement("div");
    mainContainer.style.width = "100%";
    mainContainer.classList.add("bloom-popup-main-container");

    let slidersCreated = false;
    let settings = [];

    function getSliderValue(key) {
      const value = localStorage.getItem(`bloom-${key}`);
      return value !== null ? parseFloat(value) : null;
    }

    function setSliderValue(key, value) {
      localStorage.setItem(`bloom-${key}`, value);
    }

    function updateSliderValueDisplay(sliderContainer, newValue, setting) {
      const valueDisplay = sliderContainer.querySelector(".bloom-slidervalue");
      valueDisplay.textContent = `${newValue}${setting.unit}`;
      document.documentElement.style.setProperty(
        `--${setting.key.toLowerCase()}`,
        `${newValue}${setting.unit}`
      );
      setSliderValue(setting.key, newValue);
    }

    function createSlider(container, setting) {
      const sliderContainer = document.createElement("div");
      sliderContainer.classList.add("bloom-slider-container");

      let value = getSliderValue(setting.key);
      if (value === null || isNaN(value)) {
        value = setting.default;
        setSliderValue(setting.key, value);
      }

      const sliderHTML = `
      <div class="bloom-slider-div">
        <label for="bloom-${setting.key}" class="bloom-slider-label">
          ${setting.label}
          <span class="bloom-tooltip">${setting.tooltip || ""}</span> 
        </label>
        <div class="bloom-input-slider-container">
          <input 
            type="range" 
            id="bloom-${setting.key}"
            min="${setting.min}" 
            max="${setting.max}" 
            step="${setting.step || 1}" 
            value="${value}" 
            class="bloom-slider" 
          />
          <span class="bloom-slidervalue">${value}${setting.unit}</span>
        </div>
      </div>
    `;

      sliderContainer.innerHTML = sliderHTML;
      container.append(sliderContainer);

      const slider = sliderContainer.querySelector(".bloom-slider");
      slider.addEventListener("input", (e) => {
        const newValue = parseFloat(e.target.value);
        updateSliderValueDisplay(sliderContainer, newValue, setting);
      });

      updateSliderValueDisplay(sliderContainer, value, setting);
    }

    function applySettings() {
      settings.forEach((setting) => {
        const storedValue = getSliderValue(setting.key);
        if (storedValue !== null) {
          document.documentElement.style.setProperty(
            `--${setting.key.toLowerCase()}`,
            `${storedValue}${setting.unit}`
          );
        }
      });
    }

    function resetSettings() {
      settings.forEach((setting) => {
        setSliderValue(setting.key, setting.default);
        const slider = mainContainer.querySelector(`#bloom-${setting.key}`);
        if (slider) {
          slider.value = setting.default;
          const sliderContainer = slider.closest(".bloom-slider-container");
          updateSliderValueDisplay(sliderContainer, setting.default, setting);
        }
      });
      console.log("Settings reset.");
    }

    async function loadSlidersFromJSON(container) {
      const loadingMessage = document.createElement("div");
      loadingMessage.textContent = "Loading settings...";
      loadingMessage.classList.add("loading-message");
      container.appendChild(loadingMessage);

      try {
        const response = await fetch(SETTING_URL);

        const data = await response.json();
        settings = data;

        const sections = {};
        data.forEach((setting) => {
          const section = setting.section || "General";
          if (!sections[section]) {
            sections[section] = [];
          }
          sections[section].push(setting);
        });

        for (const sectionName in sections) {
          const section = sections[sectionName];
          const sectionContainer = document.createElement("div");
          sectionContainer.classList.add("bloom-settings-section");

          const sectionTitle = document.createElement("h2");
          sectionTitle.classList.add("bloom-settings-subtitle");
          sectionTitle.textContent = sectionName;
          sectionContainer.appendChild(sectionTitle);

          section.forEach((setting) => {
            createSlider(sectionContainer, setting);
          });

          container.appendChild(sectionContainer);
        }

        const bloomSettingsSection = document.createElement("div");
        bloomSettingsSection.classList.add("bloom-settings-section");

        const bloomSettingsSubtitle = document.createElement("h2");
        bloomSettingsSubtitle.classList.add("bloom-settings-subtitle");
        bloomSettingsSubtitle.textContent = "Background Options";

        const bloomDropDownContainer = document.createElement("div");
        bloomDropDownContainer.classList.add("bloom-dropdown-container");

        const bloomDropdownTitle = document.createElement("h2");
        bloomDropdownTitle.classList.add("bloom-slider-label");
        bloomDropdownTitle.textContent = "Background";
        bloomDropDownContainer.appendChild(bloomDropdownTitle);
        const BgDropdown = document.createElement("select");
        BgDropdown.classList.add("bloom-dropdown");

        const options = [
          { text: "Default Background", dataBg: "default" },
          { text: "Animated Background", dataBg: "animated" },
          { text: "Solid Background", dataBg: "solid" },
        ];

        options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option.text;
          optionElement.setAttribute("value", option.dataBg);
          BgDropdown.appendChild(optionElement);
        });

        BgDropdown.addEventListener("change", function () {
          const selectedOption = this.options[this.selectedIndex];
          const selectedValue = selectedOption.value;
          changeCurrentBgTo(selectedValue);
        });

        bloomSettingsSection.appendChild(bloomSettingsSubtitle);
        bloomSettingsSection.appendChild(bloomDropDownContainer);
        bloomDropDownContainer.appendChild(BgDropdown);

        container.appendChild(bloomSettingsSection);

        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset to Defaults";
        resetButton.classList.add("bloom-reset-btn");
        resetButton.addEventListener("click", resetSettings);
        container.appendChild(resetButton);

        container.removeChild(loadingMessage);
      } catch (err) {
        console.error("Error fetching JSON data:", err);
      }
    }

    applySettings();

    if (!slidersCreated) {
      loadSlidersFromJSON(mainContainer);
      slidersCreated = true;
    }

    const settingsMenuItem = new Spicetify.Menu.Item(
      "Better Bloom Settings",
      false,
      () => {
        Spicetify.PopupModal.display({
          title: "Better Bloom Settings",
          content: mainContainer,
        });
      },
      `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>`
    );
    settingsMenuItem.register();
  }

  addSettings();

  setBackground();
})();
