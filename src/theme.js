(async function BetterBloom() {
  let styleSheet = document.createElement("style");
  if (!Spicetify.Player.data || !Spicetify.Platform) {
    setTimeout(BetterBloom, 100);
    return;
  }

  if (!Spicetify.CosmosAsync) {
    setTimeout(noControls, 10);
    return;
  }

  function setWindowHeight(increase) {
    Spicetify.Platform.PlayerAPI._prefs
      .get({ key: "app.browser.zoom-level" })
      .then(async (value) => {
        const zoom = Number(value.entries["app.browser.zoom-level"].number);
        const scaleFactor = 0.912;
        const paddingScaleFactor = 1.1;

        // Adjust scale based on user input (increase or decrease)
        let scale = zoom !== 0 ? zoom / 50 : 0;
        if (increase) {
          scale *= -0.9;
        } else {
          scale *= 1.1;
        }

        let scalepadding = zoom !== 0 ? zoom / 50 : 0;
        if (increase) {
          scalepadding *= -0.9;
        } else {
          scalepadding *= 1.1;
        }

        const height = 48 * scaleFactor ** scale;
        const padding_end = 9 * paddingScaleFactor ** scalepadding;
        const padding_start = 3 * paddingScaleFactor ** scalepadding;

        await Spicetify.CosmosAsync.post("sp://messages/v1/container/control", {
          type: "update_titlebar",
          height: height,
        });

        const isWindows = Spicetify.Platform.PlatformData.os_name === "windows";
        if (!document.querySelector(".Root__globalNav")) {
          if (isWindows) {
            styleSheet.innerText = `
          .main-topBar-container {
            padding-inline-end: ${padding_end}rem !important;
            padding-inline-start: ${padding_start}rem !important;
          }
          
          .spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
            padding-inline: ${padding_start}rem ${padding_end}rem !important
          }`;
          } else {
            styleSheet.innerText = `
          .main-topBar-container {
            padding-inline-start: 5rem !important;
          }
          .Root__globalNav {
            padding-inline-start: 5rem !important;
          }
          `;
          }
        }

        // update title bar to 48px
        if (!document.querySelector(".Root__globalNav")) {
          styleSheet.innerText += `  
          .Root__main-view .main-topBar-container {
            top: calc(var(--panel-gap) / 2);
            height: calc(24px + var(--panel-gap) * 2);
            ${
              isWindows &&
              `padding-inline: ${padding_start + 1}rem ${
                padding_end + 1
              }rem !important`
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
          await Spicetify.CosmosAsync.post(
            "sp://messages/v1/container/control",
            {
              type: "update_titlebar",
              height: height,
            }
          );
        }
        console.log("Zoom level adjusted.");

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

  const tracklistPlayLabel = Locale.get("tracklist.a11y.play");
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

  const playButtonStyle = document.createElement("style");
  playButtonStyle.innerHTML = `
      .main-playButton-button[aria-label*="${playLabel}"],
      .main-playButton-PlayButton>button[aria-label*="${playLabel}"],
      .main-playPauseButton-button[aria-label="${playLabel}"],
      .main-playPauseButton-button[aria-label="${Locale.get(
        "playback-control.play"
      )}"],
      .main-trackList-rowPlayPauseButton[aria-label*="${playLabel}"],
      .main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelOne}"][aria-label*="${tracklistPlayLabelTwo}"],
      .main-playButton-PlayButton>button[aria-label*="${playlistPlayLabel}"] {
        background-color: var(--spice-text) !important;
        -webkit-mask-image: url('https://sanooj.is-a.dev/better-bloom/assets/icons/play.svg') !important;
        mask-image: url('https://sanooj.is-a.dev/better-bloom/assets/icons/play.svg') !important;
      }
      .main-playButton-button[aria-label*="${pauseLabel}"],
      .main-playButton-PlayButton>button[aria-label*="${pauseLabel}"],
      .main-playPauseButton-button[aria-label*="${pauseLabel}"],
      .main-playPauseButton-button[aria-label="${Locale.get(
        "playback-control.pause"
      )}"],
      .main-trackList-rowPlayPauseButton[aria-label*="${pauseLabel}"],
      .main-trackList-rowImagePlayButton[aria-label*="${pauseLabel}"],
      .main-playButton-PlayButton>button[aria-label*="${playlistPauseLabel}"] {
        background-color: var(--spice-text) !important;
        -webkit-mask-image: url('https://sanooj.is-a.dev/better-bloom/assets/icons/pause.svg') !important;
        mask-image: url('https://sanooj.is-a.dev/better-bloom/assets/icons/pause.svg') !important;
      }
`;
  document.head.appendChild(playButtonStyle);

  console.log("Better Bloom is running");

  function applyStyles() {
    // Apply predefined style properties directly
    document.documentElement.style.setProperty("--blur", "1.5rem");
    document.documentElement.style.setProperty("--satu", "90%");
    if (Spicetify.Config.color_scheme === "light") {
      document.documentElement.style.setProperty("--bright", "100%");
      document.documentElement.style.setProperty("--cont", "100%");
    } else {
      document.documentElement.style.setProperty("--cont", "80%");
      document.documentElement.style.setProperty("--bright", "50%");
    }
  }

  applyStyles();

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

  function enhanceInterface() {
    Spicetify.Platform.PlayerAPI._prefs
      .get({ key: "app.browser.zoom-level" })
      .then((value) => {
        const zoom = Number(value.entries["app.browser.zoom-level"].number);
        const scale = zoom !== 0 ? zoom / 50 : 0;
        const scaleFactor = 0.912;
        const width = 135 * scaleFactor ** scale;
        const height = 40 * scaleFactor ** scale;

        document.documentElement.style.setProperty(
          "--control-width",
          `${Math.abs(width)}px`
        );
        document.documentElement.style.setProperty(
          "--control-height",
          `${Math.abs(height)}px`
        );
      });
  }

  window.addEventListener("resize", enhanceInterface);
  enhanceInterface();
})();

(function volumePercentage() {
  const volumeBar = document.querySelector(
    ".main-nowPlayingBar-volumeBar .progress-bar"
  );
  const volumeSlider = document.querySelector(
    ".main-nowPlayingBar-volumeBar .progress-bar__slider"
  );

  if (
    !(
      volumeBar &&
      volumeSlider &&
      Spicetify.Platform.PlaybackAPI &&
      Spicetify.Tippy &&
      Spicetify.TippyProps
    )
  ) {
    setTimeout(volumePercentage, 10);
    return;
  }

  // Definitions
  const tippyContainer = Spicetify.Tippy(volumeBar, {
    ...Spicetify.TippyProps,
    hideOnClick: false,
    interactive: true,
    allowHTML: true,
    onMount(instance) {
      Spicetify.TippyProps.onMount(instance);
      updatePercentage();
    },
  });

  function adjustWidth(input) {
    const tmp = document.createElement("div");
    tmp.style.cssText = getComputedStyle(input).cssText;
    tmp.innerHTML = input.value;

    input.parentNode.appendChild(tmp);
    const width = tmp.clientWidth;
    tmp.parentNode.removeChild(tmp);

    input.style.width = `${width}px`;
  }

  const updatePercentage = () => {
    const currVolume = Math.round(Spicetify.Platform.PlaybackAPI._volume * 100);
    tippyContainer.setContent(
      currVolume === -100
        ? ``
        : `
            <div class="text">
                <input id="volumeInput" type="number" value="${currVolume}">
                <style>
					.volume-bar__slider-container:focus-within {
						position: revert !important;
					}
                    div.text {
                        display: flex;
                        align-items: center;
                    }
                    div.text:after {
                        position: relative;
                        content: '%';
                    }
                    div.text input {
                        min-width:6px;
                        max-width:23px;
                        padding: 0;
                        font-size: 1em;
                        text-align: center;
                        border: 0;
                        background: none;
						color: var(--spice-text);
                    }
                    div.text input::-webkit-outer-spin-button,
                    div.text input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                </style>
            </div>`
    );
    const volumeInput = document.querySelector("#volumeInput");
    if (volumeInput) adjustWidth(volumeInput);
  };

  // Event Listeners
  Spicetify.Platform.PlaybackAPI._events.addListener(
    "volume",
    updatePercentage
  );

  volumeSlider.addEventListener(
    "mousedown",
    (event) => {
      tippyContainer.setProps({ trigger: "mousedown" });

      const onMouseUp = (event) => {
        tippyContainer.setProps({ trigger: "mouseenter focus" });
        if (event.srcElement !== volumeSlider) tippyContainer.hide();
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mouseup", onMouseUp);
    },
    { capture: true }
  );

  document.addEventListener("change", async (e) => {
    if (e.target && e.target.id === "volumeInput") {
      const oldVolume = Math.round(
        Spicetify.Platform.PlaybackAPI._volume * 100
      );
      const newVolume = Math.max(0, Math.min(parseInt(e.target.value), 100));
      const nanCheck = isNaN(newVolume) ? 0 : newVolume;

      if (newVolume === oldVolume) {
        e.target.value = oldVolume;
        adjustWidth(e.target);
      } else {
        await Spicetify.Platform.PlaybackAPI.setVolume(nanCheck / 100);
      }
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target && e.target.id === "volumeInput") {
      adjustWidth(e.target);
    }
  });
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
      Spicetify.Platform.PlayerAPI[isQueued ? "removeFromQueue" : "addToQueue"](
        [{ uri }]
      );
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

