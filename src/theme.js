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

        // update title bar to 48px
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

        if (
          isWindows &&
          Spicetify.Config.color_scheme !== "light" &&
          !document.querySelector(".Fullscreen")
        ) {
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/next.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/next.svg");
}
.player-controls button[aria-label="${skipForwardLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/prev.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/prev.svg");
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

    let bgImage = Spicetify.Player.data.item.metadata.image_url;
    if (bgImage.includes("spotify:image:")) {
      bgImage = bgImage.replace("spotify:image:", "https://i.scdn.co/image/");
    }

    // Updates the background based on current song
    document.documentElement.style.setProperty(
      "--image_url",
      `url("${bgImage}")`
    );
  }

  Spicetify.Player.addEventListener("songchange", onSongChange);
  onSongChange(); // Initial call to setup song change handling

  (function addSettings() {
    const mainContainer = document.createElement("div");
    mainContainer.style.width = "100%";
    mainContainer.classList.add("bloom-popup-main-container");

    let slidersCreated = false;
    let retryCount = 0;
    const maxRetries = 3;

    let settings = [];

    function getSliderValue(key) {
      const value = localStorage.getItem(`bloom-${key}`);
      return value !== null ? parseFloat(value) : null;
    }

    function setSliderValue(key, value) {
      localStorage.setItem(`bloom-${key}`, value);
    }

    function createSlider(
      container,
      label,
      key,
      min = 0,
      max = 100,
      unit = "",
      defaultValue = 0
    ) {
      const sliderContainer = document.createElement("div");
      sliderContainer.classList.add("bloom-slider-container");

      let value = getSliderValue(key);
      if (value === null || isNaN(value)) {
        value = defaultValue;
        setSliderValue(key, defaultValue);
      }

      const sliderHTML = `
      <div class="bloom-slider-div">
        <p class="bloom-slider-label">${label}</p>
        <div class="bloom-input-slider-container">
          <input
            type="range"
            min="${min}"
            max="${max}"
            value="${value}"
            class="bloom-slider"
          />
          <p class="bloom-slidervalue">${value}${unit}</p>
        </div>
      </div>
    `;

      sliderContainer.innerHTML = sliderHTML;
      container.append(sliderContainer);

      const slider = sliderContainer.querySelector(".bloom-slider");
      slider.addEventListener("change", (e) => {
        const newValue = parseFloat(e.target.value);
        setSliderValue(key, newValue);
        updateSliderValueDisplay(sliderContainer, newValue, key);
      });
      updateSliderValueDisplay(sliderContainer, value, key);
    }

    function updateSliderValueDisplay(sliderContainer, newValue, key) {
      const valueDisplay = sliderContainer.querySelector(".bloom-slidervalue");
      key = key.toLowerCase();
      const currentUnit = valueDisplay.textContent.trim().replace(/[0-9]/g, "");

      valueDisplay.textContent = `${newValue}${currentUnit}`;
      document.documentElement.style.setProperty(
        `--${key}`,
        `${newValue}${currentUnit}`
      );
    }

    function resetSettings() {
      settings.forEach((setting) => {
        setSliderValue(setting.key, setting.default);
        const sliderContainer = mainContainer.querySelector(
          `.bloom-slider-container .bloom-slider-div:nth-child(${
            settings.indexOf(setting) + 1
          })`
        );
        if (sliderContainer) {
          const slider = sliderContainer.querySelector(".bloom-slider");
          const valueDisplay =
            sliderContainer.querySelector(".bloom-slidervalue");
          slider.value = setting.default;
          valueDisplay.textContent = `${setting.default}${setting.unit}`;
          updateSliderValueDisplay(
            sliderContainer,
            setting.default,
            setting.key
          );
        }
      });
      console.log("Setting reseted.");
      location.reload();
    }

    async function loadSlidersFromJSON(container) {
      const loadingMessage = document.createElement("p");
      loadingMessage.textContent = "Loading settings...";
      container.appendChild(loadingMessage);

      try {
        const response = await fetch(
          "https://sanooj.is-a.dev/better-bloom/settings.json"
        );
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

          const sectionTitle = document.createElement("p");
          sectionTitle.classList.add("bloom-settings-subtitle");
          sectionTitle.textContent = sectionName;
          sectionContainer.appendChild(sectionTitle);

          section.forEach((setting) => {
            createSlider(
              sectionContainer,
              setting.label,
              setting.key,
              setting.min,
              setting.max,
              setting.unit,
              setting.default
            );
          });

          container.appendChild(sectionContainer);
        }

        const resetButton = document.createElement("button");
        resetButton.classList.add("bloom-reset-btn");
        resetButton.textContent = "Reset to Defaults";
        resetButton.addEventListener("click", resetSettings);
        container.appendChild(resetButton);
        container.removeChild(loadingMessage);
      } catch (err) {
        console.error("Error fetching JSON data:", err);
        retryCount++;
        if (retryCount <= maxRetries) {
          const delay = 2 ** retryCount * 1000;
          console.log(`Retrying in ${delay}ms`);
          setTimeout(() => loadSlidersFromJSON(container), delay);
        } else {
          container.removeChild(loadingMessage);
          const errorMessage = document.createElement("p");
          errorMessage.textContent =
            "Failed to load settings. Please try again later.";
          container.append(errorMessage);
        }
      }
    }

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

    // Register the menu item
    settingsMenuItem.register();
  })();

  (function quickQueue() {
    if (
      !(
        Spicetify.React &&
        Spicetify.ReactDOM &&
        Spicetify.SVGIcons &&
        Spicetify.showNotification &&
        Spicetify.Platform.PlayerAPI &&
        Spicetify.Tippy &&
        Spicetify.TippyProps &&
        Spicetify.Locale._dictionary
      )
    ) {
      setTimeout(quickQueue, 10);
      return;
    }

    const QueueButton = Spicetify.React.memo(function QueueButton({
      uri,
      classList,
    }) {
      const [isQueued, setIsQueued] = Spicetify.React.useState(
        Spicetify.Platform.PlayerAPI._queue._queueState.queued.some(
          (item) => item.uri === uri
        )
      );
      const buttonRef = Spicetify.React.useRef(null);

      // Effects
      Spicetify.React.useEffect(() => {
        if (buttonRef.current) {
          const tippyInstance = Spicetify.Tippy(buttonRef.current, {
            ...Spicetify.TippyProps,
            hideOnClick: true,
            content: isQueued
              ? Spicetify.Locale._dictionary["contextmenu.remove-from-queue"] ||
                "Remove from queue"
              : Spicetify.Locale._dictionary["contextmenu.add-to-queue"] ||
                "Add to queue",
          });

          return () => {
            tippyInstance.destroy();
          };
        }
      }, [isQueued]);

      // Event listeners
      Spicetify.Platform.PlayerAPI._queue._events.addListener(
        "queue_update",
        (event) => {
          setIsQueued(event.data.queued.some((item) => item.uri === uri));
        }
      );

      // Functions
      const handleClick = function () {
        Spicetify.showNotification(
          isQueued
            ? "Removed from queue"
            : Spicetify.Locale._dictionary["queue.added-to-queue"] ||
                "Added to queue"
        );
        Spicetify.Platform.PlayerAPI[
          isQueued ? "removeFromQueue" : "addToQueue"
        ]([{ uri }]);
      };

      // Render
      return Spicetify.React.createElement(
        "button",
        {
          ref: buttonRef,
          className: classList,
          "aria-checked": isQueued,
          onClick: handleClick,
          style: {
            marginRight: "12px",
            opacity: isQueued ? "1" : undefined,
          },
        },
        Spicetify.React.createElement(
          "span",
          { className: "Wrapper-sm-only Wrapper-small-only" },
          Spicetify.React.createElement("svg", {
            role: "img",
            height: "16",
            width: "16",
            viewBox: "0 0 16 16",
            className: isQueued
              ? "Svg-img-icon-small-textBrightAccent"
              : "Svg-img-icon-small",
            style: {
              fill: isQueued ? undefined : "var(--text-subdued)",
            },
            dangerouslySetInnerHTML: {
              __html: isQueued
                ? `<path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z"></path>`
                : `<path d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z"></path>`,
            },
          })
        )
      );
    });

    function findVal(object, key, max = 10) {
      if (object[key] !== undefined || !max) {
        return object[key];
      }

      for (const k in object) {
        if (object[k] && typeof object[k] === "object") {
          const value = findVal(object[k], key, --max);
          if (value !== undefined) {
            return value;
          }
        }
      }

      return undefined;
    }

    const observer = new MutationObserver(function (mutationList) {
      mutationList.forEach((mutation) => {
        const node = mutation.addedNodes[0];
        if (node?.attributes?.role?.value === "row") {
          const lastRowSection = node.firstChild.lastChild;
          const entryPoint = lastRowSection.querySelector(
            ":scope > button:not(:last-child):has([data-encore-id])"
          );
          if (entryPoint) {
            const reactProps = Object.keys(node).find((k) =>
              k.startsWith("__reactProps$")
            );
            const uri = findVal(node[reactProps], "uri");

            const queueButtonWrapper = document.createElement("div");
            queueButtonWrapper.className = "queueControl-wrapper";
            queueButtonWrapper.style.display = "contents";
            queueButtonWrapper.style.marginRight = 0;

            const queueButtonElement = lastRowSection.insertBefore(
              queueButtonWrapper,
              entryPoint
            );
            Spicetify.ReactDOM.render(
              Spicetify.React.createElement(QueueButton, {
                uri,
                classList: entryPoint.classList,
              }),
              queueButtonElement
            );
          }
        }
      });
    });

    observer.observe(document, {
      subtree: true,
      childList: true,
    });
  })();

  (function npvAmbience() {
    if (!(Spicetify.Player.data && document.head)) {
      setTimeout(npvAmbience, 10);
      return;
    }

    // Append Styling To Head
    const style = document.createElement("style");
    style.textContent = ` 
	aside[aria-label="Now playing view"] {
		--background-base: var(--spice-main) !important;
	}

	.main-nowPlayingView-gradient,
	.IkRGajTjItEFQkRMeH6v.f2UE9n5nZcbgZrGYTU3r {
		background: none !important;
	}

	.main-nowPlayingView-nowPlayingGrid .main-nowPlayingView-coverArtContainer:first-child ~ .main-nowPlayingView-coverArtContainer {
		width: 100%;
		filter: blur(3.5rem) saturate(2) brightness(50%) contrast(80%);
		position: absolute;
		left: 0;
		top: 0;
		padding-top: 48px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.5s;
	  }

	  .main-nowPlayingView-nowPlayingGrid .main-nowPlayingView-coverArtContainer:first-child ~ .main-nowPlayingView-coverArtContainer img {
		transition: opacity 0.5s ease 0s;
	  }

	  .main-nowPlayingView-nowPlayingGrid .main-nowPlayingView-coverArtContainer:first-child ~ .main-nowPlayingView-coverArtContainer .cover-art {
		background-color: unset;
		background-size: cover;
		transition: all 0.5s ease 0s;
	  }
	`;
    document.head.appendChild(style);

    // DOM Manipulation
    let coverArtClone;
    function waitForWidgetMounted() {
      const npvGrid = document.querySelector(
        ".main-nowPlayingView-nowPlayingGrid"
      );
      const coverArt = document.querySelector(
        ".main-nowPlayingView-coverArtContainer"
      );
      if (!(npvGrid && coverArt)) {
        setTimeout(waitForWidgetMounted, 300);
        return;
      }

      coverArtClone = coverArt.cloneNode(true);
      npvGrid.appendChild(coverArtClone);

      const imgContainer = coverArtClone.querySelector(".cover-art");
      imgContainer.style.backgroundImage = `url(${Spicetify.Player?.data?.item?.metadata?.image_xlarge_url})`;

      setTimeout(() => {
        coverArtClone.style.opacity = 1;
      }, 0);
    }

    (function attachObserver() {
      const rightSidebar = document.querySelector(".Root__right-sidebar");
      if (!rightSidebar) {
        setTimeout(attachObserver, 300);
        return;
      }
      waitForWidgetMounted();
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          console.log(mutation);
          if (mutation.addedNodes.length > 0) {
            const addedNodes = Array.from(mutation.addedNodes);
            const isNPV = addedNodes.some(
              (node) => node.ariaLabel && node.ariaLabel === "Now playing view"
            );
            if (isNPV) {
              waitForWidgetMounted();
            }
          }
        });
      });
      observer.observe(rightSidebar, { childList: true });
    })();

    // Event Listeners
    Spicetify.Player.addEventListener("songchange", function (e) {
      if (coverArtClone) {
        const imgContainer = coverArtClone.querySelector(".cover-art");
        const img = coverArtClone.querySelector("img");

        img.style.opacity = 0;
        setTimeout(() => {
          img.src = e.data.item.metadata.image_xlarge_url;
          img.style.opacity = 1;
          imgContainer.style.backgroundImage = `url(${e.data.item.metadata.image_xlarge_url})`;
        }, 500);
      }
    });
  })();
})();
