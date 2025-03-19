(async () => { while (!Spicetify.React || !Spicetify.ReactDOM) { await new Promise((resolve) => setTimeout(resolve, 10));}"use strict";
var Lucid = (() => {
  // extension/utils/dom/createElement.ts
  function createElement(tag, options) {
    const element = document.createElement(tag);
    if (!options) return element;
    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        if (value) element.setAttribute(key, value);
        else element.removeAttribute(key);
      }
    }
    if (options.style) Object.assign(element.style, options.style);
    const { style, attributes, ...rest } = options;
    Object.assign(element, rest);
    return element;
  }

  // extension/constant.ts
  var GITHUB_PATH = "https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/main";
  var JSDELIVER_PATH = "https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@main";
  var APPLICATION_VERSION = "2.1.2";
  var GUIDE_STORAGE_KEY = "lucid-guided-tour";
  var WORKER_SCIRPT_URLS = [
    `${GITHUB_PATH}/src/workers/getColor.js`,
    `${JSDELIVER_PATH}/src/workers/getColor.js`
  ];
  var WORKER_SCRIPT_CACHE_KEY = "LUCID_COLOR_SCRIPT_CACHE";
  var DEFAULT_COLOR = "#1bc858";
  var GUIDE_SCRIPT_CACHE_KEY = "LUCID_GUIDE_SCRIPT_CACHE";
  var GUIDE_SCRIPT_URLS = [
    `${GITHUB_PATH}/src/guidedTour.js`,
    `${JSDELIVER_PATH}/src/guidedTour.js`
  ];
  var APP_SETTINGS_KEY = "lucid-theme-settings";
  var LUCID_VERSION_STORAGE_KEY = "lucid-current-version";
  var CHANGELOG_DATA_URLS = [
    `${GITHUB_PATH}/changelog.json`,
    `${JSDELIVER_PATH}/changelog.json`
  ];
  var CHANGELOG_DATA_STORAGE_KEY = "lucid-changelog-data";
  var ICON_CSS_URLS = [
    `${GITHUB_PATH}/src/icons.css`,
    `${JSDELIVER_PATH}/src/icons.css`,
    `${GITHUB_PATH}/styles/icons.css`,
    `${JSDELIVER_PATH}/styles/icons.css`
  ];
  var SCROLL_SELECTOR = ".Root__main-view [data-overlayscrollbars-viewport], .Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport], .main-view-container__scroll-node div:nth-child(2)";
  var UNDER_MAIN_VIEW_SELECTOR = ".under-main-view";
  var MAIN_ENTITY_HEADER_GRADIENT_SELECTOR = ".main-entityHeader-gradient, .XUwMufC5NCgIyRMyGXLD";
  var DEFAULT_APP_SETTINGS = {
    showChangelog: true,
    position: "nav",
    background: {
      mode: "static",
      options: {
        static: {
          isCustomImage: false,
          filter: {
            blur: 32,
            brightness: 60,
            saturate: 150
          }
        },
        solid: {
          color: { hex: "#1a211c", alpha: 100 }
        },
        animated: {
          filter: {
            blur: 32,
            brightness: 60,
            saturate: 150
          }
        }
      }
    },
    color: {
      customColor: { hex: "#00ffa1", alpha: 100 },
      isTonal: true,
      isCustom: false,
      isDynamic: false,
      extractorOptions: {
        pixels: 36e4,
        distance: 0.1,
        hueDistance: 0.2,
        lightnessDistance: 0.2,
        saturationDistance: 0.2
      }
    },
    pages: {
      panelGap: 8,
      hideHomeHeader: false,
      style: "card",
      imageStyle: "default",
      umv: {
        type: "normal",
        isScaling: true,
        isScroll: false,
        options: {
          expanded: {
            filter: { blur: 0 }
          },
          custom: {
            url: "https://picsum.photos/1920/1080?random",
            filter: { blur: 8 }
          },
          normal: {
            filter: { blur: 8 }
          },
          npv: {
            filter: { blur: 8 }
          }
        }
      }
    },
    border: {
      thickness: 1,
      color: { hex: "#454545", alpha: 50 },
      style: "solid"
    },
    control: {
      height: 40
    },
    font: {
      fontFamily: "Poppins",
      fontUrl: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      isGoogleFonts: true
    },
    grains: {
      type: "starry"
    },
    rightSidebar: {
      isCustomBg: false,
      mode: "normal",
      position: "bottom right",
      blur: 16,
      size: 240,
      color: { hex: "#1a211c", alpha: 50 }
    },
    playbar: {
      type: "normal",
      hideIcons: true,
      options: {
        normal: {
          height: 80,
          paddingX: 8,
          bgColor: { hex: "", alpha: 50 },
          bgOpacity: 100,
          imageRadius: 8,
          borderRadius: 8,
          backdropFilter: { blur: 32, saturate: 150, brightness: 60 }
        },
        compact: {
          height: 64,
          paddingX: 8,
          bgColor: {
            hex: "",
            alpha: 50
          },
          bgOpacity: 100,
          imageRadius: 8,
          borderRadius: 8,
          backdropFilter: { blur: 32, saturate: 150, brightness: 60 }
        }
      },
      isFloating: true
    },
    customImage: {
      type: "url",
      options: { url: { data: "https://picsum.photos/1920/1080?random" }, local: null }
    }
  };

  // extension/utils/lazyLoadUtils.ts
  var lazyLoadStyleById = (id) => {
    let element = document.querySelector(`#style-${id}`);
    if (!element) {
      element = createElement("style", { id: `style-${id}` });
      document.head.appendChild(element);
    }
    return element;
  };

  // extension/utils/showNotification.ts
  var showNotification = (message, isError = false, timeout) => {
    while (!Spicetify.showNotification) setTimeout(showNotification, 500);
    console.debug(`Notification: ${message} (Error: ${isError}, Timeout: ${timeout})`);
    Spicetify.showNotification(message, isError, timeout);
  };

  // extension/utils/patchIcons.ts
  function mountIconVariables() {
    for (const url of ICON_CSS_URLS) {
      const existingLink = document.querySelector(`link[href="${url}"]`);
      if (!existingLink) {
        const linkElement = createElement("link", { rel: "stylesheet", href: url });
        document.head.appendChild(linkElement);
      }
    }
  }
  var patchIcons = () => {
    try {
      mountIconVariables();
      const g = (value, clean = false) => clean ? LocaleAPI.get(value).replace(/[{0}{1}«»”“]/g, "").trim() : LocaleAPI.get(value);
      const LocaleAPI = Spicetify.Locale;
      if (!LocaleAPI) return;
      const locales = {
        home: g("view.web-player-home"),
        browse: g("browse"),
        pause: g("pause"),
        play: g("play"),
        close: g("close"),
        openMiniPlayer: g("miniplayer.open"),
        createPlaylist: g("contextmenu.create-playlist"),
        createButton: g("web-player.your-library-x.create.button-label"),
        fullscreen: g("npv.full-screen"),
        closeBtn: g("close_button_action"),
        duration: g("sort.duration"),
        search: g("navbar.search"),
        queue: g("playback-control.queue"),
        searchPlaylist: g("playlist.search_in_playlist"),
        download: g("download.download"),
        copyTrackLink: g("context-menu.copy-track-link"),
        moreContext: g("more.label.context", true),
        downloadContext: g("contextmenu.download"),
        friendActivity: g("buddy-feed.friend-activity"),
        whatsNew: g("web-player.whats-new-feed.button-label"),
        skipForward: g("playback-control.skip-forward"),
        skipBack: g("playback-control.skip-back"),
        disableShuffle: g("playback-control.disable-shuffle"),
        enableShuffle: g("playback-control.enable-shuffle"),
        disableShuffleGeneric: g("web-player.smart-shuffle.button-disable-shuffle-generic"),
        disableShuffleSpecific: g("web-player.smart-shuffle.button-disable-shuffle-specific", true),
        enableShuffleGeneric: g("web-player.smart-shuffle.button-enable-shuffle-generic"),
        enableShuffleSpecific: g("web-player.smart-shuffle.button-enable-shuffle-specific", true),
        enableSmartShuffleSpecific: g(
          "web-player.smart-shuffle.button-enable-smart-shuffle-specific",
          true
        ),
        enableSmartShuffleGeneric: g("web-player.smart-shuffle.button-enable-smart-shuffle-generic"),
        enableRepeat: g("playback-control.enable-repeat"),
        enableRepeatOne: g("playback-control.enable-repeat-one"),
        disableRepeat: g("playback-control.disable-repeat")
      };
      lazyLoadStyleById("lucid-icon-patch").innerHTML = `
 .main-yourLibraryX-navLink[aria-label="${locales.home}"] path,
 button[aria-label="${locales.home}"] path {
 	d: var(--home-icon-24);
 }
 .main-yourLibraryX-navLink[aria-label="${locales.home}"].active path,
 .main-globalNav-navLinkActive[aria-label="${locales.home}"] path {
 	d: var(--home-filled-icon-24);
 }
 .main-topBar-buddyFeed[aria-label*="${locales.whatsNew}"] svg,
 .main-topBar-buddyFeed[aria-label*="${locales.friendActivity}"] svg {
 	transform: scale(1.1);
 }
 
 .main-topBar-buddyFeed[aria-label*="${locales.friendActivity}"] svg path {
 	d: var(--people-icon);
 }
 .main-topBar-buddyFeed[aria-label*="${locales.friendActivity}"] .Svg-img-icon-small-textBase path {
 	d: var(--people-filled-icon);
 }
 .main-topBar-buddyFeed[aria-label*="${locales.whatsNew}"] svg path {
 	d: var(--bell-icon);
 }
 .main-topBar-buddyFeed .Svg-img-icon-small[aria-label*="${locales.whatsNew}"] .Svg-img-icon-small-textBase path {
 	d: var(--bell-filled-icon);
 }
 .player-controls__left button[aria-label*="${locales.disableShuffle}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.disableShuffleGeneric}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableShuffle}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableShuffleSpecific}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableShuffleGeneric}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleGeneric}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleSpecific}"] path:nth-of-type(n+2),
 .Root__globalNav button[aria-label="${locales.browse}"] path:nth-of-type(n + 2) {
 	display: none;
 }
 .Root__globalNav .main-globalNav-navLink.custom-navlink[aria-label*="Marketplace"] path {
 	d: var(--appstore-icon-24);
 	transform: scale(3) !important;
 }
 .Root__globalNav .main-globalNav-navLinkActive.custom-navlink[aria-label*="Marketplace"] path {
 	d: var(--appstore-filled-icon-24);
 }
 .Root__globalNav .IconContainer-leading:first-child svg path,
 .Root__globalNav .IconContainer-leading:has(button[aria-label*="${locales.search}"]) div > svg path {
 	d: var(--search-icon-24);
 }
 .Root__globalNav button[aria-label="${locales.browse}"] path {
 	d: var(--compass-icon-24);
 }
 .Root__globalNav button[aria-label="${locales.browse}"].j4xi27AJ3oy5qZ8CGhhQ path {
 	d: var(--compass-filled-icon-24);
 }
 .player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"] path,
 .player-controls__buttons .player-controls__left button[aria-label*="${locales.skipBack}"] path {
   fill: var(--clr-on-surface);
   d: var(--prev-icon)}
 
 .player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"] path,
 .player-controls__buttons .player-controls__right button[aria-label="${locales.skipForward}"] path {
   fill: var(--clr-on-surface);
   d: var(--next-icon)}
 
 .player-controls__left button[aria-label*="${locales.disableShuffle}"],
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"],
 .player-controls__left button[aria-label*="${locales.disableShuffleGeneric}"],
 .player-controls__left button[aria-label*="${locales.enableShuffle}"],
 .player-controls__left button[aria-label*="${locales.enableShuffleSpecific}"],
 .player-controls__left button[aria-label*="${locales.enableShuffleGeneric}"],
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleGeneric}"],
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleSpecific}"],
 .player-controls__right button[aria-label="${locales.enableRepeat}"],
 .player-controls__right button[aria-label="${locales.enableRepeatOne}"],
 .player-controls__right button[aria-label="${locales.disableRepeat}"] {
 	--encore-graphic-size-decorative-smaller: 22px;
 	--encore-control-size-smaller: 22px}
 
 .player-controls__right button[aria-label="${locales.enableRepeat}"] path {
 	d: var(--disable-repeat-icon)}
 .player-controls__right button[aria-label="${locales.enableRepeatOne}"] path {
   d: var(--repeat-icon)}
 
 .player-controls__right button[aria-label="${locales.disableRepeat}"] path {
   d: var(--repeat-one-icon)}
 
 .player-controls__left button[aria-label*="${locales.enableShuffle}"] path,
 .player-controls__left button[aria-label*="${locales.enableShuffleSpecific}"] path,
 .player-controls__left button[aria-label*="${locales.enableShuffleGeneric}"] path {
 	d: var(--disable-shuffle-icon)}
 
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .player-controls__left button[aria-label*="${locales.disableShuffle}"] path,
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleGeneric}"] path,
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleSpecific}"] path {
 	d: var(--shuffle-icon)}
 
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .player-controls__left button[aria-label*="${locales.disableShuffleGeneric}"] path {
 	d: var(--smart-shuffle-icon)}
 
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableShuffle}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableShuffleSpecific}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableShuffleGeneric}"] path {
   d: var(--disable-shuffle-icon-24, var(--disable-shuffle-icon))}
 
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffle}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableSmartShuffleGeneric}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableSmartShuffleSpecific}"] path {
   d: var(--shuffle-icon-24, var(--shuffle-icon))}
 
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffleGeneric}"] path {
   d: var(--smart-shuffle-icon-24, var(--smart-shuffle-icon))}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.play}"] svg[viewBox="0 0 24 24"] path {
   d: var(--play-icon-24, var(--play-icon))}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.pause}"] svg[viewBox="0 0 24 24"] path {
   d: var(--pause-icon-24, var(--pause-icon))}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.play}"] svg[viewBox="0 0 16 16"] path {
   d: var(--play-icon)}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.pause}"] svg[viewBox="0 0 16 16"] path {
   d: var(--pause-icon)}
 
 .player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"],
 .player-controls__buttons .player-controls__right button[aria-label="${locales.skipForward}"],
 .player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"],
 .player-controls__buttons .player-controls__left button[aria-label*="${locales.skipBack}"] {
 	--encore-graphic-size-decorative-smaller: 22px;
 	--encore-control-size-smaller: 22px;
 	color: var(--subtext-color)}
 
 .player-controls__buttons button[aria-label="${locales.play}"] path {
   fill: var(--clr-on-surface);
   d: var(--play-icon)}
 
 
 .player-controls__buttons button[aria-label="${locales.pause}"] path {
   fill: var(--clr-on-surface);
   d: var(--pause-icon)}
 
 .player-controls__buttons > button,
 .player-controls__buttons button[data-testid=control-button-playpause] { --encore-graphic-size-decorative-smaller: 1.5rem; --encore-control-size-smaller: 1.5rem; }
 .player-controls__buttons button[data-testid=control-button-playpause],
 .player-controls__buttons button[data-testid=control-button-playpause]:hover,
 .player-controls__buttons button[data-testid=control-button-playpause] span:hover,
 .player-controls__buttons button[data-testid=control-button-playpause] span { background: none !important; }
 
 .x-downloadButton-DownloadButton button[aria-label="${locales.download}"] path,
 .x-downloadButton-DownloadButton button[aria-label="${locales.downloadContext}"] path {
   d: var(--download-icon-24)}
   
 svg path[d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"],
 .Root__right-sidebar button[aria-label*="${locales.moreContext}"] path{
   d: var(--more-horizontal-icon)}
 
 .main-actionBar-ActionBar button[aria-label*="${locales.moreContext}"] path {
   d: var(--more-horizontal-icon-24)}
 
 x-filterBox-expandButton[aria-label*="${locales.search}"] path,
 x-filterBox-expandButton[aria-label*="${locales.searchPlaylist}"] path,
 .x-filterBox-searchIcon path {
   d: var(--search-icon)}
 
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 16 16"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 16 16"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 16 16"] path{
   d: var(--share-icon)}
 
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 24 24"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 24 24"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 24 24"] path{
   d: var(--share-icon-24)}
 
 svg path[d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"],
 button[aria-controls="sort-and-view-picker"] path,
 .x-sortBox-sortDropdown path {
   d: var(--text-bullet-list-icon)}
 
 svg path[d="M15.5 13.5H.5V12h15v1.5zm0-4.75H.5v-1.5h15v1.5zm0-4.75H.5V2.5h15V4z"]{
   d: var(--list-icon)}
 
 div[data-testid="PanelHeader_CloseButton"] button path,
 .Root__right-sidebar button[aria-label="${locales.closeBtn}"] path,
 .Root__right-sidebar button[aria-label="${locales.close}"] path{
   d: var(--dismiss-icon)}
 
 .main-trackList-trackListRowGrid button[aria-label="${locales.duration}"] path{
   d: var(--clock-icon)}
 
 button[aria-label="${locales.createPlaylist}"] path,
 button[aria-label="${locales.createButton}"] path,
 svg path[d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"]{
   d: var(--add-icon)}
 
 svg path[d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"],
 button[data-testid="fullscreen-mode-button"] path,
 button[aria-label="${locales.fullscreen}"] path{
   d: var(--arrow-maximize-icon);
 }
 
 svg path[d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"],
 button[data-testid="control-button-queue"] path,
 button[aria-label="${locales.queue}"] path{
   /* d: var(--queue-icon); */ /* TODO: add new queue icon */
 }
 
 
 button[aria-label="${locales.openMiniPlayer}"] path,
 button[data-testid="pip-toggle-button"] path{
   d: var(--pip-icon);
 }
 `;
    } catch (error) {
      console.error("Error patching icons.", error);
      showNotification("Error patching icons.", true, 5e3);
    }
  };

  // node_modules/.deno/deepmerge-ts@7.1.5/node_modules/deepmerge-ts/dist/index.mjs
  var actions = {
    defaultMerge: Symbol("deepmerge-ts: default merge"),
    skip: Symbol("deepmerge-ts: skip")
  };
  var actionsInto = {
    defaultMerge: actions.defaultMerge
  };
  function defaultMetaDataUpdater(previousMeta, metaMeta) {
    return metaMeta;
  }
  function defaultFilterValues(values, meta) {
    return values.filter((value) => value !== void 0);
  }
  var ObjectType;
  (function(ObjectType2) {
    ObjectType2[ObjectType2["NOT"] = 0] = "NOT";
    ObjectType2[ObjectType2["RECORD"] = 1] = "RECORD";
    ObjectType2[ObjectType2["ARRAY"] = 2] = "ARRAY";
    ObjectType2[ObjectType2["SET"] = 3] = "SET";
    ObjectType2[ObjectType2["MAP"] = 4] = "MAP";
    ObjectType2[ObjectType2["OTHER"] = 5] = "OTHER";
  })(ObjectType || (ObjectType = {}));
  function getObjectType(object) {
    if (typeof object !== "object" || object === null) {
      return 0;
    }
    if (Array.isArray(object)) {
      return 2;
    }
    if (isRecord(object)) {
      return 1;
    }
    if (object instanceof Set) {
      return 3;
    }
    if (object instanceof Map) {
      return 4;
    }
    return 5;
  }
  function getKeys(objects) {
    const keys = /* @__PURE__ */ new Set();
    for (const object of objects) {
      for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
        keys.add(key);
      }
    }
    return keys;
  }
  function objectHasProperty(object, property) {
    return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
  }
  function getIterableOfIterables(iterables) {
    let mut_iterablesIndex = 0;
    let mut_iterator = iterables[0]?.[Symbol.iterator]();
    return {
      [Symbol.iterator]() {
        return {
          next() {
            do {
              if (mut_iterator === void 0) {
                return { done: true, value: void 0 };
              }
              const result = mut_iterator.next();
              if (result.done === true) {
                mut_iterablesIndex += 1;
                mut_iterator = iterables[mut_iterablesIndex]?.[Symbol.iterator]();
                continue;
              }
              return {
                done: false,
                value: result.value
              };
            } while (true);
          }
        };
      }
    };
  }
  var validRecordToStringValues = ["[object Object]", "[object Module]"];
  function isRecord(value) {
    if (!validRecordToStringValues.includes(Object.prototype.toString.call(value))) {
      return false;
    }
    const { constructor } = value;
    if (constructor === void 0) {
      return true;
    }
    const prototype = constructor.prototype;
    if (prototype === null || typeof prototype !== "object" || !validRecordToStringValues.includes(Object.prototype.toString.call(prototype))) {
      return false;
    }
    if (!prototype.hasOwnProperty("isPrototypeOf")) {
      return false;
    }
    return true;
  }
  function mergeRecords$1(values, utils, meta) {
    const result = {};
    for (const key of getKeys(values)) {
      const propValues = [];
      for (const value of values) {
        if (objectHasProperty(value, key)) {
          propValues.push(value[key]);
        }
      }
      if (propValues.length === 0) {
        continue;
      }
      const updatedMeta = utils.metaDataUpdater(meta, {
        key,
        parents: values
      });
      const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
      if (propertyResult === actions.skip) {
        continue;
      }
      if (key === "__proto__") {
        Object.defineProperty(result, key, {
          value: propertyResult,
          configurable: true,
          enumerable: true,
          writable: true
        });
      } else {
        result[key] = propertyResult;
      }
    }
    return result;
  }
  function mergeArrays$1(values) {
    return values.flat();
  }
  function mergeSets$1(values) {
    return new Set(getIterableOfIterables(values));
  }
  function mergeMaps$1(values) {
    return new Map(getIterableOfIterables(values));
  }
  function mergeOthers$1(values) {
    return values.at(-1);
  }
  var mergeFunctions = {
    mergeRecords: mergeRecords$1,
    mergeArrays: mergeArrays$1,
    mergeSets: mergeSets$1,
    mergeMaps: mergeMaps$1,
    mergeOthers: mergeOthers$1
  };
  function deepmerge(...objects) {
    return deepmergeCustom({})(...objects);
  }
  function deepmergeCustom(options, rootMetaData) {
    const utils = getUtils(options, customizedDeepmerge);
    function customizedDeepmerge(...objects) {
      return mergeUnknowns(objects, utils, rootMetaData);
    }
    return customizedDeepmerge;
  }
  function getUtils(options, customizedDeepmerge) {
    return {
      defaultMergeFunctions: mergeFunctions,
      mergeFunctions: {
        ...mergeFunctions,
        ...Object.fromEntries(Object.entries(options).filter(([key, option]) => Object.hasOwn(mergeFunctions, key)).map(([key, option]) => option === false ? [key, mergeFunctions.mergeOthers] : [key, option]))
      },
      metaDataUpdater: options.metaDataUpdater ?? defaultMetaDataUpdater,
      deepmerge: customizedDeepmerge,
      useImplicitDefaultMerging: options.enableImplicitDefaultMerging ?? false,
      filterValues: options.filterValues === false ? void 0 : options.filterValues ?? defaultFilterValues,
      actions
    };
  }
  function mergeUnknowns(values, utils, meta) {
    const filteredValues = utils.filterValues?.(values, meta) ?? values;
    if (filteredValues.length === 0) {
      return void 0;
    }
    if (filteredValues.length === 1) {
      return mergeOthers(filteredValues, utils, meta);
    }
    const type = getObjectType(filteredValues[0]);
    if (type !== 0 && type !== 5) {
      for (let mut_index = 1; mut_index < filteredValues.length; mut_index++) {
        if (getObjectType(filteredValues[mut_index]) === type) {
          continue;
        }
        return mergeOthers(filteredValues, utils, meta);
      }
    }
    switch (type) {
      case 1: {
        return mergeRecords(filteredValues, utils, meta);
      }
      case 2: {
        return mergeArrays(filteredValues, utils, meta);
      }
      case 3: {
        return mergeSets(filteredValues, utils, meta);
      }
      case 4: {
        return mergeMaps(filteredValues, utils, meta);
      }
      default: {
        return mergeOthers(filteredValues, utils, meta);
      }
    }
  }
  function mergeRecords(values, utils, meta) {
    const result = utils.mergeFunctions.mergeRecords(values, utils, meta);
    if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords) {
      return utils.defaultMergeFunctions.mergeRecords(values, utils, meta);
    }
    return result;
  }
  function mergeArrays(values, utils, meta) {
    const result = utils.mergeFunctions.mergeArrays(values, utils, meta);
    if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays) {
      return utils.defaultMergeFunctions.mergeArrays(values);
    }
    return result;
  }
  function mergeSets(values, utils, meta) {
    const result = utils.mergeFunctions.mergeSets(values, utils, meta);
    if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets) {
      return utils.defaultMergeFunctions.mergeSets(values);
    }
    return result;
  }
  function mergeMaps(values, utils, meta) {
    const result = utils.mergeFunctions.mergeMaps(values, utils, meta);
    if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps) {
      return utils.defaultMergeFunctions.mergeMaps(values);
    }
    return result;
  }
  function mergeOthers(values, utils, meta) {
    const result = utils.mergeFunctions.mergeOthers(values, utils, meta);
    if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers) {
      return utils.defaultMergeFunctions.mergeOthers(values);
    }
    return result;
  }

  // extension/utils/state/store.ts
  function getValueByPath(obj, path) {
    if (!path) return obj;
    const pathSegments = path.split(/[.\[\]'"]/).filter(Boolean);
    let current = obj;
    for (const segment of pathSegments) {
      if (current && typeof current === "object" && segment in current) {
        current = current[segment];
      } else {
        return void 0;
      }
    }
    return current;
  }
  var Store = class {
    state;
    subscribers = [];
    options;
    constructor(initialState, options = {}) {
      this.options = {
        persist: false,
        localStorageKey: "storeState",
        ...options
      };
      if (this.options.persist && this.options.localStorageKey) {
        const storedState = localStorage.getItem(this.options.localStorageKey);
        if (!storedState) {
          this.state = initialState;
          return;
        }
        try {
          const parsedState = JSON.parse(storedState);
          this.state = deepmerge(initialState, parsedState);
        } catch (error) {
          console.error("Error parsing stored state from localStorage:", error);
          this.state = initialState;
        }
      } else {
        this.state = initialState;
      }
    }
    getState() {
      return this.state;
    }
    setState(reducer, payload) {
      const oldState = { ...this.state };
      const newState = reducer(this.state, payload);
      this.updateStateAndNotify(newState, oldState);
    }
    updateStateAndNotify(newState, oldState) {
      if (newState !== this.state) {
        this.state = newState;
        this.notifySubscribers(oldState);
        if (this.options.persist) {
          this.persist();
        }
      }
    }
    subscribe(subscriber, path) {
      const keyWiseSubscriber = { subscriber, path };
      this.subscribers.push(keyWiseSubscriber);
      return () => {
        this.subscribers = this.subscribers.filter((sub) => sub !== keyWiseSubscriber);
      };
    }
    notifySubscribers(oldState) {
      for (const sub of this.subscribers) {
        const { subscriber, path } = sub;
        const oldValue = getValueByPath(oldState, path);
        const newValue = getValueByPath(this.state, path);
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          const start = performance.now();
          try {
            subscriber(this.state);
          } catch (error) {
            console.error(`Subscriber at path "${path}" threw an error:`, error);
          }
          const duration = performance.now() - start;
          if (duration > 10) {
            console.warn(
              `Slow subscriber at path "${path}" took ${duration.toFixed(2)}ms. Subscriber: ${subscriber}`
            );
          }
        }
      }
    }
    persist() {
      try {
        if (this.options.localStorageKey) {
          localStorage.setItem(this.options.localStorageKey, JSON.stringify(this.state));
        } else {
          throw new Error("localStorage key not found!");
        }
      } catch (error) {
        console.error("Error saving state to localStorage:", error);
      }
    }
  };
  var store_default = Store;

  // extension/utils/settingsValidator.ts
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isValidCSSFilter(filter) {
    return isObject(filter) && (filter.blur === void 0 || typeof filter.blur === "number") && (filter.brightness === void 0 || typeof filter.brightness === "number") && (filter.contrast === void 0 || typeof filter.contrast === "number") && (filter.grayscale === void 0 || typeof filter.grayscale === "string") && (filter.hueRotate === void 0 || typeof filter.hueRotate === "string") && (filter.invert === void 0 || typeof filter.invert === "string") && (filter.opacity === void 0 || typeof filter.opacity === "number") && (filter.saturate === void 0 || typeof filter.saturate === "number") && (filter.sepia === void 0 || typeof filter.sepia === "string");
  }
  function isValidColor(color) {
    return isObject(color) && typeof color.hex === "string" && typeof color.alpha === "number";
  }
  function isValidUrlImageSetting(obj) {
    return isObject(obj) && typeof obj.url === "string";
  }
  function isValidLocalImageSetting(obj) {
    return isObject(obj) && Array.isArray(obj.selectedIds) && obj.selectedIds.every((id) => typeof id === "number") && isObject(obj.slideshow) && typeof obj.slideshow.isSlideshow === "boolean" && typeof obj.slideshow.timeDelay === "number";
  }
  function isValidCustomImageSetting(obj) {
    if (!isObject(obj)) return false;
    if (typeof obj.isCustom !== "boolean") return false;
    if (obj.type !== "url" && obj.type !== "local") return false;
    if (!isObject(obj.options)) return false;
    if (obj.type === "url") {
      return isValidUrlImageSetting(obj.options.url);
    }
    if (obj.type === "local") {
      return isValidLocalImageSetting(obj.options.local);
    }
    return false;
  }
  function isValidStaticBackgroundOptions(obj) {
    return isObject(obj) && isValidCustomImageSetting(obj.customImage) && (obj.filter === void 0 || isValidCSSFilter(obj.filter));
  }
  function isValidSolidBackgroundOptions(obj) {
    return isObject(obj) && isValidColor(obj.color);
  }
  function isValidAnimatedBackgroundOptions(obj) {
    return isObject(obj) && isValidCSSFilter(obj.filter);
  }
  function isValidBackgroundOptions(obj) {
    return isObject(obj) && isValidStaticBackgroundOptions(obj.static) && isValidSolidBackgroundOptions(obj.solid) && isValidAnimatedBackgroundOptions(obj.animated);
  }
  function isValidBackground(obj) {
    return isObject(obj) && typeof obj.mode === "string" && (obj.mode === "static" || obj.mode === "solid" || obj.mode === "animated") && isValidBackgroundOptions(obj.options);
  }
  function isValidBorderSettings(obj) {
    return isObject(obj) && typeof obj.thickness === "number" && isValidColor(obj.color) && typeof obj.style === "string";
  }
  function isValidRightSidebarSettings(obj) {
    return isObject(obj) && (obj.mode === "compact" || obj.mode === "normal") && (obj.position === "bottom left" || obj.position === "bottom right" || obj.position === "top left" || obj.position === "top right") && typeof obj.blur === "number" && typeof obj.size === "number" && typeof obj.isCustomBg === "boolean" && isValidColor(obj.color);
  }
  function isValidPageOptions(options) {
    if (!isObject(options)) return false;
    const types = ["normal", "expanded", "npv"];
    return types.every((type) => {
      const opt = options[type];
      return isObject(opt) && typeof opt.isScaling === "boolean" && typeof opt.isScroll === "boolean" && (opt.filter === null || isValidCSSFilter(opt.filter));
    });
  }
  function isValidUMVSettings(obj) {
    return isObject(obj) && (obj.type === "npv" || obj.type === "normal") && isValidPageOptions(obj.options);
  }
  function isValidPageSettings(obj) {
    return isObject(obj) && typeof obj.panelGap === "number" && typeof obj.hideHomeHeader === "boolean" && typeof obj.style === "string" && isValidUMVSettings(obj.umv);
  }
  function isValidColorSettings(obj) {
    return isObject(obj) && typeof obj.isDynamic === "boolean" && typeof obj.isCustom === "boolean" && typeof obj.isTonal === "boolean" && isValidColor(obj.customColor);
  }
  function isValidPlaybarOption(obj) {
    return isObject(obj) && isValidCSSFilter(obj.backdropFilter) && typeof obj.height === "number" && typeof obj.paddingX === "number" && isValidColor(obj.bgColor) && typeof obj.bgOpacity === "number" && typeof obj.borderRadius === "number";
  }
  function isValidPlaybarOptions(options) {
    if (!isObject(options)) return false;
    const types = ["compact", "normal"];
    return types.every((type) => isValidPlaybarOption(options[type]));
  }
  function isValidPlaybarSettings(obj) {
    return isObject(obj) && (obj.type === "compact" || obj.type === "normal") && isValidPlaybarOptions(obj.options) && typeof obj.isFloating === "boolean" && typeof obj.hideIcons === "boolean";
  }
  function isValidGrainSettings(obj) {
    return isObject(obj) && (obj.type === "default" || obj.type === "starry" || obj.type === "none");
  }
  function isValidAppSettings(obj) {
    return isObject(obj) && (obj.position === "context-menu" || obj.position === "nav") && isValidBackground(obj.background) && isValidBorderSettings(obj.border) && isValidPageSettings(obj.pages) && isValidColorSettings(obj.color) && isObject(obj.control) && typeof obj.control.height === "number" && isObject(obj.font) && typeof obj.font.fontFamily === "string" && (typeof obj.font.fontUrl === "string" || obj.font.fontUrl === null) && typeof obj.font.isGoogleFonts === "boolean" && isValidGrainSettings(obj.grains) && isValidPlaybarSettings(obj.playbar) && isValidRightSidebarSettings(obj.rightSidebar);
  }

  // extension/store/setting.ts
  var AppSettingsStore = class extends store_default {
    constructor(initialState = DEFAULT_APP_SETTINGS, options = {
      persist: true,
      localStorageKey: APP_SETTINGS_KEY
    }) {
      super(initialState, options);
    }
    setChangelog(showChangelog) {
      this.setState((state) => ({ ...state, showChangelog }));
    }
    setPages(pages) {
      this.setState((state) => ({ ...state, pages: { ...state.pages, ...pages } }));
    }
    setUMV(umv) {
      this.setState((state) => ({
        ...state,
        pages: {
          ...state.pages,
          umv: {
            ...state.pages.umv,
            ...umv
          }
        }
      }));
    }
    setUMVOption(key, options) {
      this.setState((state) => ({
        ...state,
        pages: {
          ...state.pages,
          umv: {
            ...state.pages.umv,
            options: {
              ...state.pages.umv.options,
              [key]: {
                ...state.pages.umv.options[key],
                ...options
              }
            }
          }
        }
      }));
    }
    setUMVFilter(key, filter) {
      this.setState((state) => ({
        ...state,
        pages: {
          ...state.pages,
          umv: {
            ...state.pages.umv,
            options: {
              ...state.pages.umv.options,
              [key]: {
                ...state.pages.umv.options[key],
                filter: {
                  ...state.pages.umv.options[key].filter,
                  ...filter
                }
              }
            }
          }
        }
      }));
    }
    setCustomImageType(type) {
      this.setState((state) => ({
        ...state,
        customImage: {
          ...state.customImage,
          type
        }
      }));
    }
    setCustomImageOptions(option, options) {
      this.setState((state) => ({
        ...state,
        customImage: {
          ...state.customImage,
          options: {
            ...state.customImage.options,
            [option]: {
              ...state.customImage.options[option],
              ...options
            }
          }
        }
      }));
    }
    setPosition(position) {
      this.setState((state) => ({ ...state, position }));
    }
    setBackgroundMode(mode) {
      this.setState((state) => ({
        ...state,
        background: { ...state.background, mode }
      }));
    }
    setStaticBackgroundOptions(options) {
      this.setState((state) => ({
        ...state,
        background: {
          ...state.background,
          options: {
            ...state.background.options,
            static: { ...state.background.options.static, ...options }
          }
        }
      }));
    }
    setStaticBackgroundFilter(filter) {
      this.setState((state) => ({
        ...state,
        background: {
          ...state.background,
          options: {
            ...state.background.options,
            static: {
              ...state.background.options.static,
              filter: {
                ...state.background.options.static.filter,
                ...filter
              }
            }
          }
        }
      }));
    }
    setAnimatedBackgroundFilter(filter) {
      this.setState((state) => ({
        ...state,
        background: {
          ...state.background,
          options: {
            ...state.background.options,
            animated: {
              ...state.background.options.animated,
              filter: {
                ...state.background.options.animated.filter,
                ...filter
              }
            }
          }
        }
      }));
    }
    setStaticBgFilter(filter) {
      this.setState((state) => ({
        ...state,
        background: {
          ...state.background,
          options: {
            ...state.background.options,
            static: {
              ...state.background.options.static,
              filter: {
                ...state.background.options.static.filter,
                ...filter
              }
            }
          }
        }
      }));
    }
    setSolidBackgroundColor(color) {
      this.setState((state) => ({
        ...state,
        background: {
          ...state.background,
          options: {
            ...state.background.options,
            solid: {
              ...state.background.options.solid,
              color: { ...state.background.options.solid.color, ...color }
            }
          }
        }
      }));
    }
    setAnimatedBackgroundOptions(options) {
      this.setState((state) => ({
        ...state,
        background: {
          ...state.background,
          options: { ...state.background.options, animated: options }
        }
      }));
    }
    setBorder(border) {
      this.setState((state) => ({
        ...state,
        border: { ...state.border, ...border }
      }));
    }
    setBorderColor(color) {
      this.setState((state) => ({
        ...state,
        border: {
          ...state.border,
          color: {
            ...state.border.color,
            ...color
          }
        }
      }));
    }
    setControlHeight(height) {
      this.setState((state) => ({
        ...state,
        control: { ...state.control, height }
      }));
    }
    setFont(font) {
      this.setState((state) => ({ ...state, font: { ...state.font, ...font } }));
    }
    setGrains(grains) {
      this.setState((state) => ({
        ...state,
        grains: { ...state.grains, ...grains }
      }));
    }
    setRightSidebar(rightSidebar) {
      this.setState((state) => ({
        ...state,
        rightSidebar: { ...state.rightSidebar, ...rightSidebar }
      }));
    }
    setColor(color) {
      this.setState((state) => ({
        ...state,
        color: {
          ...state.color,
          ...color
        }
      }));
    }
    setColorExtractorOptions(extractorOptions) {
      this.setState((state) => ({
        ...state,
        color: {
          ...state.color,
          extractorOptions: {
            ...state.color.extractorOptions,
            ...extractorOptions
          }
        }
      }));
    }
    setPageStyle(style) {
      this.setState((state) => ({
        ...state,
        pages: {
          ...state.pages,
          style
        }
      }));
    }
    setPageImageStyle(imageStyle) {
      this.setState((state) => ({
        ...state,
        pages: {
          ...state.pages,
          imageStyle
        }
      }));
    }
    setPlaybar(playbar) {
      this.setState((state) => ({
        ...state,
        playbar: {
          ...state.playbar,
          ...playbar
        }
      }));
    }
    setPlaybarOptions(type, value) {
      this.setState((state) => ({
        ...state,
        playbar: {
          ...state.playbar,
          options: {
            ...state.playbar.options,
            [type]: {
              ...state.playbar.options[type],
              ...value
            }
          }
        }
      }));
    }
    setPlaybarFilter(type, value) {
      this.setState((state) => ({
        ...state,
        playbar: {
          ...state.playbar,
          options: {
            ...state.playbar.options,
            [type]: {
              ...state.playbar.options[type],
              backdropFilter: {
                ...state.playbar.options[type].backdropFilter,
                ...value
              }
            }
          }
        }
      }));
    }
    setRightSidebarColor(color) {
      this.setState((state) => ({
        ...state,
        rightSidebar: {
          ...state.rightSidebar,
          color: { ...state.rightSidebar.color, ...color }
        }
      }));
    }
    setGrainsType(type) {
      this.setState((state) => ({
        ...state,
        grains: {
          ...state.grains,
          type
        }
      }));
    }
    setDynamicColor(isDynamic) {
      this.setState((state) => ({
        ...state,
        color: {
          ...state.color,
          isDynamic
        }
      }));
    }
    setIsCustomColor(isCustom) {
      this.setState((state) => ({
        ...state,
        color: {
          ...state.color,
          isCustom
        }
      }));
    }
    setCustomColor(color) {
      this.setState((state) => ({
        ...state,
        color: {
          ...state.color,
          customColor: { ...state.color.customColor, ...color }
        }
      }));
    }
    setTonalColor(isTonal) {
      this.setState((state) => ({
        ...state,
        color: {
          ...state.color,
          isTonal
        }
      }));
    }
    resetState() {
      try {
        this.setState(() => DEFAULT_APP_SETTINGS);
        localStorage.removeItem(GUIDE_STORAGE_KEY);
        localStorage.removeItem(GUIDE_SCRIPT_CACHE_KEY);
        localStorage.removeItem(WORKER_SCRIPT_CACHE_KEY);
        localStorage.removeItem(CHANGELOG_DATA_STORAGE_KEY);
        localStorage.removeItem(LUCID_VERSION_STORAGE_KEY);
        window.location.reload();
      } catch (e) {
        showNotification("Error reseting settings.", true, 5e3);
        console.error("Error reseting settings.", e);
      }
    }
    exportSettings() {
      const state = appSettingsStore.getState();
      return JSON.stringify(state, null, 0);
    }
    importSettings(json) {
      try {
        const parsed = JSON.parse(json);
        if (!isValidAppSettings(parsed)) {
          console.error("Invalid settings format.");
          showNotification("Import failed: Invalid settings format.", true, 5e3);
        } else {
          appSettingsStore.setState((state) => deepmerge(state, parsed));
          showNotification("Settings imported successfully!", false, 5e3);
        }
      } catch (error) {
        console.error("Error importing settings:", error);
        showNotification("Import failed: Unable to parse settings JSON.", true, 5e3);
      }
    }
  };
  var appSettingsStore = new AppSettingsStore();
  var setting_default = appSettingsStore;

  // extension/utils/fonts/parseFontUrl.ts
  function parseFontFamilyFromGFonts(url) {
    try {
      const urlObject = new URL(url);
      const fontFamilyParam = urlObject.searchParams.get("family");
      if (fontFamilyParam) {
        const fontFamilyName = fontFamilyParam.split(":")[0].split(";")[0];
        return fontFamilyName.replace(/\+/g, " ");
      }
      return null;
    } catch (error) {
      console.error("Error parsing Google Fonts URL:", error);
      return null;
    }
  }

  // extension/components/font.ts
  function mountAndWatchFont() {
    mountFont();
    setting_default.subscribe((state) => {
      mountFont(state.font);
    });
  }
  function mountFont(font = setting_default.getState().font) {
    const fontStyleSheet = lazyLoadStyleById("lucid-font");
    let preloadLink = document.head.querySelector("#lucid-custom-font");
    if (font.isGoogleFonts && font.fontUrl) {
      if (!preloadLink) {
        preloadLink = createElement("link", {
          id: "lucid-custom-font",
          rel: "preload",
          href: font.fontUrl,
          as: "style",
          crossOrigin: "anonymous"
        });
        document.head.appendChild(preloadLink);
      } else if (preloadLink.href !== font.fontUrl) {
        preloadLink.href = font.fontUrl;
      }
      let stylesheetLink = document.head.querySelector(
        "#lucid-custom-font-style"
      );
      if (!stylesheetLink) {
        stylesheetLink = createElement("link", {
          id: "lucid-custom-font-style",
          rel: "stylesheet",
          href: font.fontUrl,
          crossOrigin: "anonymous"
        });
        document.head.appendChild(stylesheetLink);
      } else if (stylesheetLink.href !== font.fontUrl) {
        stylesheetLink.href = font.fontUrl;
      }
    } else {
      if (preloadLink) {
        preloadLink.remove();
      }
      const stylesheetLink = document.head.querySelector(
        "#lucid-custom-font-style"
      );
      if (stylesheetLink) {
        stylesheetLink.remove();
      }
    }
    const fontFamilyValue = font.isGoogleFonts && font.fontUrl ? parseFontFamilyFromGFonts(font.fontUrl) : font.fontFamily;
    fontStyleSheet.innerText = `:root,* { --custom-font: "${fontFamilyValue}"; font-family: var(--custom-font) !important; }`;
  }

  // extension/hooks/pageStyles.ts
  var lastStyle = null;
  var lastImageStyle = null;
  function mountPageStyles(pageSettings = setting_default.getState().pages) {
    const newStyle = `playlist-${pageSettings.style}`;
    if (lastStyle !== newStyle) {
      if (lastStyle) {
        document.body.classList.replace(lastStyle, newStyle);
      } else document.body.classList.add(newStyle);
      lastStyle = newStyle;
    }
    const newImageStyle = `playlist-image-${pageSettings.imageStyle}`;
    if (lastImageStyle !== newImageStyle) {
      if (lastImageStyle) {
        document.body.classList.replace(lastImageStyle, newImageStyle);
      } else document.body.classList.add(newImageStyle);
      lastImageStyle = newImageStyle;
    }
    if (!pageSettings.hideHomeHeader) document.body.classList.add("hide-home-header");
    else document.body.classList.remove("hide-home-header");
    document.body.style.setProperty("--custom-panel-gap", `${pageSettings.panelGap}px`);
  }
  setting_default.subscribe((state) => {
    mountPageStyles(state.pages);
  }, "pages");

  // extension/utils/artworkUtils.ts
  var getNPVElementImage = () => {
    const npv = document.querySelector(
      ".Root__right-sidebar .main-nowPlayingView-nowPlayingWidget .main-image-image"
    );
    return npv?.src || "";
  };
  var getNowPlayingArtworkURL = async () => {
    while (!Spicetify.Player?.data) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    const item = Spicetify.Player.data?.item;
    if (!item || !item.metadata) {
      console.error("No item or metadata found in Spicetify Player data.");
      return "";
    }
    const artworkUrls = [
      item.metadata.image_xlarge_url,
      item.metadata.image_large_url,
      item.metadata.image_url,
      item.metadata.image_small_url
    ];
    const imageUrl = artworkUrls.find((url) => url) || getNPVElementImage();
    return imageUrl || getNPVElementImage();
  };
  var makeRequest = async (query, variables, retries = 3) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await Spicetify.GraphQL.Request(
          { ...query, operation: "query", value: null },
          variables
        );
        return response;
      } catch (error) {
        if (error instanceof Error && error.message.includes("DUPLICATE_REQUEST_ERROR") && attempt < retries) {
          console.warn(`Retrying ${query.name}... (${attempt + 1}/${retries})`);
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          continue;
        }
        console.error(`Error in ${query.name}:`, error);
        throw error;
      }
    }
    return null;
  };
  var getAlbumMetaData = (uri) => makeRequest(
    {
      name: "getAlbum",
      sha256Hash: "469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d"
    },
    { uri, locale: null, offset: 0, limit: 50 }
  );
  var getArtistMetaData = (uri) => makeRequest(
    {
      name: "queryArtistOverview",
      sha256Hash: "35648a112beb1794e39ab931365f6ae4a8d45e65396d641eeda94e4003d41497"
    },
    { uri, includePrerelease: true, locale: null }
  );
  var getSpotifyURL = (pathname) => {
    const id = pathname.match(/\/(playlist|artist|album|user|show|collection)\/([^/]+)/);
    if (!id) {
      console.warn("No valid type or ID found in pathname:", pathname);
      return null;
    }
    const [, type, extractedId] = id;
    return `spotify:${type}:${extractedId}`;
  };
  var getArtworkBySpotifyURL = async (url) => {
    if (url === "/collection/tracks") {
      return "https://misc.scdn.co/liked-songs/liked-songs-300.jpg";
    }
    const uri = getSpotifyURL(url);
    if (!uri) return null;
    const [, type, id] = uri.split(":");
    try {
      switch (type) {
        case "playlist":
        case "show": {
          const meta = await Spicetify.Platform.PlaylistAPI.getMetadata(uri);
          return meta.images[0]?.url || null;
        }
        case "artist": {
          const meta = await getArtistMetaData(uri);
          const visuals = meta?.data?.artistUnion?.visuals;
          return visuals?.headerImage?.sources[0]?.url || visuals?.avatarImage?.sources[0]?.url || null;
        }
        case "album": {
          const meta = await getAlbumMetaData(uri);
          const sources = meta?.data?.albumUnion?.coverArt?.sources;
          return sources?.[2]?.url || sources?.[0]?.url || null;
        }
        case "user": {
          const response = await Spicetify.Platform.RequestBuilder.build().withHost("https://spclient.wg.spotify.com/user-profile-view/v3").withPath(`/profile/${id}`).send();
          return response?.body?.image_url || null;
        }
        default:
          return null;
      }
    } catch (error) {
      console.error(`Error fetching ${type} artwork:`, error);
      return null;
    }
  };

  // extension/store/npv.ts
  var npvState = new store_default({
    url: null
  });
  async function updateNPVUrl() {
    try {
      const newUrl = await getNowPlayingArtworkURL();
      npvState.setState(() => ({ url: newUrl }));
    } catch (error) {
      console.error("Error updating NPV state:", error);
      npvState.setState(() => ({ url: null }));
    }
  }
  updateNPVUrl();
  Spicetify.Player.addEventListener("songchange", updateNPVUrl);

  // extension/utils/worker/getWorker.ts
  function createWorker(scriptText) {
    try {
      const blob = new Blob([scriptText], { type: "application/javascript" });
      const workerUrl = URL.createObjectURL(blob);
      const worker2 = new Worker(workerUrl, { credentials: "omit" });
      worker2.onerror = (event) => {
        console.error("Worker encountered an error:", event.message || event);
      };
      worker2.onmessage = (event) => {
        console.debug("Worker initialized:", event.data);
      };
      return worker2;
    } catch (error) {
      console.error("Error loading worker:", error);
      return null;
    }
  }

  // extension/utils/fetchAndCache.ts
  async function fetchAndCache(urls, localKey, time = 864e5) {
    const cachedData = JSON.parse(localStorage.getItem(localKey) || "null");
    if (cachedData?.script && (!navigator.onLine || Date.now() - cachedData.timestamp < time)) {
      return cachedData.script;
    }
    let scriptText = null;
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          scriptText = await response.text();
          break;
        }
      } catch {
      }
    }
    if (!scriptText) {
      if (cachedData?.script) return cachedData.script;
      throw new Error("Failed to fetch guide script from all sources.");
    }
    localStorage.setItem(localKey, JSON.stringify({ script: scriptText, timestamp: Date.now() }));
    return scriptText;
  }

  // extension/hooks/color.ts
  var worker = null;
  var unsubscribe = null;
  var styleSheet = lazyLoadStyleById("clr-lucid");
  function sendColorData(options) {
    if (!worker) return;
    worker.postMessage({
      type: "color",
      options
    });
  }
  function sendImageData(options) {
    if (!worker) return;
    worker.postMessage({
      type: "image",
      options
    });
  }
  function convertSpotifyImageUrl(url) {
    return url.replace("spotify:image:", "https://i.scdn.co/image/");
  }
  async function mountColor(settings = setting_default.getState().color) {
    await initWorker();
    unsubscribe?.();
    if (settings.isDynamic) {
      const currentUrl = npvState.getState().url;
      if (currentUrl) {
        sendImageData({
          url: convertSpotifyImageUrl(currentUrl),
          isTonal: settings.isTonal,
          isDark: true,
          extractorOptions: settings?.extractorOptions ?? {}
        });
      }
      unsubscribe = npvState.subscribe((state) => {
        if (state.url) {
          sendImageData({
            url: convertSpotifyImageUrl(state.url),
            isTonal: settings.isTonal,
            isDark: true,
            extractorOptions: settings?.extractorOptions ?? {}
          });
        }
      });
      return;
    }
    if (settings.isCustom) {
      sendColorData({
        hex: settings.customColor.hex,
        isTonal: settings.isTonal,
        isDark: true
      });
      return;
    }
    sendColorData({
      hex: DEFAULT_COLOR,
      isTonal: settings.isTonal,
      isDark: true
    });
  }
  async function initWorker() {
    const workerScript = await fetchAndCache(WORKER_SCIRPT_URLS, WORKER_SCRIPT_CACHE_KEY);
    worker = createWorker(workerScript);
    if (!worker) {
      document.body.dataset.colorFromWorker = "false";
      console.error("Failed to initialize worker from both endpoints.");
      showNotification(
        "Failed to initialize the color worker. If this issue persists, please report it. (Dynamic and custom colors may not function properly.)",
        true,
        5e3
      );
      return;
    }
    document.body.dataset.colorFromWorker = "true";
    worker.onmessage = (event) => {
      const { message, data } = event.data || {};
      if (data) {
        console.debug(message, "\nEvent Data:", event.data);
        styleSheet.textContent = `:root,body{${data.style}}`;
      } else {
        console.error(message ?? "Color not applied");
      }
    };
    worker.onerror = (event) => {
      console.error("Worker encountered an error:", event.message || event);
    };
  }

  // extension/hooks/pageType.ts
  var getPathCategory = (pathname) => {
    if (Spicetify.URI.isPlaylistV1OrV2(pathname)) return "playlist";
    if (Spicetify.URI.isArtist(pathname)) return "artist";
    if (Spicetify.URI.isAlbum(pathname)) return "album";
    if (Spicetify.URI.isGenre(pathname)) return "genre";
    if (Spicetify.URI.isShow(pathname)) return "show";
    if (Spicetify.URI.isSearch(pathname)) return "search";
    if (Spicetify.URI.isProfile(pathname)) return "profile";
    if (Spicetify.URI.isConcert(pathname) || Spicetify.URI.isArtistConcerts(pathname)) {
      return "concert";
    }
    return "other";
  };
  function setPage(pathname) {
    document.body.dataset.path = pathname;
    document.body.dataset.pageType = getPathCategory(pathname);
  }
  function mountPageType() {
    setPage(Spicetify?.Platform?.History?.location?.pathname || "/");
    Spicetify?.Platform?.History?.listen((state) => {
      if (!state || !state.pathname) return;
      setPage(state.pathname);
    });
  }

  // extension/utils/platformUtils.ts
  var isWindows = () => {
    if (Spicetify.Platform && Spicetify.Platform.operatingSystem === "Windows") {
      return true;
    }
    if (Spicetify.Platform?.PlatformData?.os_name) {
      return Spicetify.Platform.PlatformData.os_name.toLowerCase().includes("win");
    }
    return false;
  };

  // extension/hooks/controls.ts
  function getZoom() {
    const zoom = Math.round(window.outerHeight / window.innerHeight * 100) / 100;
    const inverseZoom = Math.round(window.innerHeight / window.outerHeight * 100) / 100;
    return { zoom, inverseZoom };
  }
  var isV46Above = Spicetify?.Platform?.version >= "1.2.46";
  function mountTransparentWindowControls(height) {
    const { zoom, inverseZoom } = getZoom();
    const normalHeight = height === 0 ? 1 : height || (isV46Above ? 32 : 64);
    const transparentStyles = lazyLoadStyleById("transparent-controls");
    if (normalHeight === 0) {
      transparentStyles.textContent = `
:root {--zoom: ${zoom};--inverse-zoom: ${inverseZoom};}
body::after {content: ""; height: 0; width: 0; position: fixed; top: 0; right: 0;}`;
      return;
    }
    const controlWidth = Math.round(135 * inverseZoom);
    const scaledHeight = height / zoom;
    const minHeight = 32 / zoom;
    const topOffset = isV46Above ? (scaledHeight - Math.min(minHeight, scaledHeight)) / 2 : 0;
    const controlHeight = normalHeight / zoom - topOffset * 2;
    transparentStyles.textContent = `
:root {--zoom: ${zoom};--inverse-zoom: ${inverseZoom};}
body:after {content: ""; height: var(--control-height, ${controlHeight}px); width: var(--control-width, ${controlWidth}px); position: fixed; top: ${topOffset}px; right: 0; -webkit-backdrop-filter: brightness(2.1); backdrop-filter: brightness(2.1);}
body.hide-transparent-controls:after{display: none; content: none;}`;
  }
  async function updateTitlebarHeight(height) {
    await Spicetify?.Platform?.ControlMessageAPI?._updateUiClient?.updateTitlebarHeight({ height });
    await Spicetify?.Platform?.UpdateAPI?._updateUiClient?.updateTitlebarHeight({ height });
    await Spicetify.CosmosAsync.post("sp://messages/v1/container/control", {
      type: "update_titlebar",
      height: `${height}px`
    });
  }
  function mountControls(height = setting_default.getState().control.height) {
    updateTitlebarHeight(height).then(() => mountTransparentWindowControls(height)).catch((err) => console.error("Failed to update titlebar:", err));
  }
  function intervalCall() {
    const intervalId = setInterval(() => mountControls(), 300);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1e4);
  }
  var controls_default = () => {
    if (isWindows()) {
      mountControls();
      intervalCall();
      window.addEventListener("resize", intervalCall);
      document.addEventListener("fullscreenchange", () => {
        document.body.classList.toggle(
          "hide-transparent-controls",
          document.fullscreenElement !== null
        );
      });
      setting_default.subscribe((state) => mountControls(state.control.height), "control");
    }
  };

  // extension/utils/colors/convert.ts
  var alphaToHex = (alpha) => {
    if (alpha < 0 || alpha > 100) {
      throw new Error("Alpha value must be between 0 and 100");
    }
    const alphaDecimal = alpha / 100;
    const alpha255 = Math.round(alphaDecimal * 255);
    let alphaHex = alpha255.toString(16).toUpperCase();
    if (alphaHex.length === 1) {
      alphaHex = `0${alphaHex}`;
    }
    return alphaHex;
  };

  // extension/utils/dom/waitForElement.ts
  function waitForElement(els, func, timeout = 100) {
    const queries = els.map((el) => document.querySelector(el));
    if (queries.every((a) => a)) {
      func(queries);
    } else if (timeout > 0) {
      setTimeout(waitForElement, 300, els, func, --timeout);
    }
  }

  // extension/hooks/playbar.ts
  function mountPlaybarStyles(settings = setting_default.getState().playbar) {
    const curr = settings.options[settings.type];
    const styles = lazyLoadStyleById("lucid-playbar");
    styles.textContent = `
    :root,
    .Root__now-playing-bar{
        --npb-height: ${curr.height ?? 80}px;
        --npb-blur: ${curr.backdropFilter.blur ?? 32}px;
        --npb-padding-x: ${curr.paddingX ?? 8}px;
        --npb-saturate: ${curr.backdropFilter.saturate ?? 150}%;
        --npb-brightness: ${curr.backdropFilter.brightness ?? 80}%;
        --npb-border-radius: ${curr.borderRadius ?? 8}px;
        --npb-image-radius: ${curr.imageRadius ?? 16}px;
        --npb-bg-opacity: ${curr.bgOpacity ?? 50}%;
        --npb-bg-color: ${curr.bgColor.hex ? curr.bgColor.hex + alphaToHex(curr.bgColor.alpha) : `rgba(var(--clr-surface-1-rgb), ${curr.bgColor.alpha}%)`} ;
    }`;
    if (settings.isFloating) {
      document.body.setAttribute("npb-is-floating", "floating");
    } else {
      document.body.removeAttribute("npb-is-floating");
    }
    document.body.setAttribute("npb-type", settings.type);
  }
  var nowPlayingBar = document.querySelector(".Root__now-playing-bar");
  waitForElement([".Root__now-playing-bar"], ([element]) => {
    nowPlayingBar = element;
    handleResize();
  });
  var hideIcon = setting_default.getState().playbar.hideIcons;
  function handleResize() {
    if (!nowPlayingBar) {
      return;
    }
    const width = nowPlayingBar.offsetWidth;
    nowPlayingBar.style.setProperty("--width", `${width}px`);
    hideIcons(hideIcon || width < 1e3);
  }
  function hideIcons(condition = setting_default.getState().playbar.hideIcons) {
    if (!nowPlayingBar) return;
    if (condition) {
      nowPlayingBar.setAttribute("hide-icons", "true");
    } else {
      nowPlayingBar.removeAttribute("hide-icons");
    }
  }
  function mountPlaybar() {
    window.addEventListener("resize", handleResize);
    mountPlaybarStyles();
    hideIcons(hideIcon || (nowPlayingBar?.clientWidth || 0) < 900);
    setting_default.subscribe((state) => {
      hideIcon = state.playbar.hideIcons;
      hideIcons(hideIcon || (nowPlayingBar?.clientWidth || 0) < 900);
      mountPlaybarStyles(state.playbar);
    }, "playbar");
    handleResize();
  }

  // extension/store/modal.ts
  var modalState = new store_default(
    {
      isFloating: false,
      position: {
        top: 16,
        left: 16
      }
    },
    { persist: true, localStorageKey: "lucid-modal-position" }
  );

  // extension/icons.ts
  var CLOSE_ICON = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z" fill="currentColor"/></svg>`;
  var GITHUB_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px"><path fill="currentColor" d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/></svg>`;
  var DISCORD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px"><path fill="currentColor" d="M25.12,6.946c-2.424-1.948-6.257-2.278-6.419-2.292c-0.256-0.022-0.499,0.123-0.604,0.357 c-0.004,0.008-0.218,0.629-0.425,1.228c2.817,0.493,4.731,1.587,4.833,1.647c0.478,0.278,0.638,0.891,0.359,1.368 C22.679,9.572,22.344,9.75,22,9.75c-0.171,0-0.343-0.043-0.501-0.135C21.471,9.598,18.663,8,15.002,8 C11.34,8,8.531,9.599,8.503,9.615C8.026,9.892,7.414,9.729,7.137,9.251C6.86,8.775,7.021,8.164,7.497,7.886 c0.102-0.06,2.023-1.158,4.848-1.65c-0.218-0.606-0.438-1.217-0.442-1.225c-0.105-0.235-0.348-0.383-0.604-0.357 c-0.162,0.013-3.995,0.343-6.451,2.318C3.564,8.158,1,15.092,1,21.087c0,0.106,0.027,0.209,0.08,0.301 c1.771,3.11,6.599,3.924,7.699,3.959c0.007,0,0.013,0,0.019,0.001c0.194,0,0.377-0.093,0.492-0.25l1.19-1.612 c-2.61-0.629-3.99-1.618-4.073-1.679c-0.444-0.327-0.54-0.953-0.213-1.398c0.326-0.443,0.95-0.541,1.394-0.216 C7.625,20.217,10.172,22,15,22c4.847,0,7.387-1.79,7.412-1.808c0.444-0.322,1.07-0.225,1.395,0.221 c0.324,0.444,0.23,1.066-0.212,1.392c-0.083,0.061-1.456,1.048-4.06,1.677l1.175,1.615c0.115,0.158,0.298,0.25,0.492,0.25 c0.007,0,0.013,0,0.019-0.001c1.101-0.035,5.929-0.849,7.699-3.959c0.053-0.092,0.08-0.195,0.08-0.301 C29,15.092,26.436,8.158,25.12,6.946z M11,19c-1.105,0-2-1.119-2-2.5S9.895,14,11,14s2,1.119,2,2.5S12.105,19,11,19z M19,19 c-1.105,0-2-1.119-2-2.5s0.895-2.5,2-2.5s2,1.119,2,2.5S20.105,19,19,19z"/></svg>`;
  var SAVE_ICON = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z" fill="currentColor"/></svg>`;
  var TOOLTIP_ICON = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12 6.477 2 12 2Zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333 0 4.595 3.738 8.333 8.333 8.333 4.595 0 8.333-3.738 8.333-8.333 0-4.595-3.738-8.333-8.333-8.333ZM12 15.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-8.75a2.75 2.75 0 0 1 2.75 2.75c0 1.01-.297 1.574-1.051 2.359l-.169.171c-.622.622-.78.886-.78 1.47a.75.75 0 0 1-1.5 0c0-1.01.297-1.574 1.051-2.359l.169-.171c.622-.622.78-.886.78-1.47a1.25 1.25 0 0 0-2.493-.128l-.007.128a.75.75 0 0 1-1.5 0A2.75 2.75 0 0 1 12 6.75Z" fill="currentColor"/></svg>`;
  var EYEDROPPER_ICON = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.03 2.97a3.578 3.578 0 0 0-5.06 0L14 4.94l-.013-.013a1.75 1.75 0 0 0-2.475 0l-.585.586a1.75 1.75 0 0 0 0 2.474l.012.013-6.78 6.78a2.25 2.25 0 0 0-.659 1.591v.688l-1.28 2.347c-.836 1.533.841 3.21 2.374 2.374l2.347-1.28h.688a2.25 2.25 0 0 0 1.59-.659L16 13.061l.012.012a1.75 1.75 0 0 0 2.475 0l.586-.585a1.75 1.75 0 0 0 0-2.475L19.061 10l1.97-1.97a3.578 3.578 0 0 0 0-5.06ZM12 9.06 14.94 12l-6.78 6.78a.75.75 0 0 1-.531.22H6.75a.75.75 0 0 0-.359.092l-2.515 1.372a.234.234 0 0 1-.159.032.264.264 0 0 1-.138-.075.264.264 0 0 1-.075-.138.234.234 0 0 1 .033-.159l1.372-2.515A.75.75 0 0 0 5 17.25v-.879a.75.75 0 0 1 .22-.53L12 9.061Z" fill="currentColor"/></svg>`;
  var SETTINGS_ICON = `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="currentColor"/></svg>`;

  // extension/links.ts
  var GITHUB_LINK = "https://github.com/sanoojes/Spicetify-Lucid";
  var DISCORD_LINK = "https://discord.gg/PWEyKduwJh";

  // extension/utils/styles/encoreUtils.ts
  var getColorClass = (variant = "base") => `encore-internal-color-text-${variant}`;
  var getTextClass = (type = "variable-text", color = "base") => `encore-text ${type === "variable-text" ? `encore-${type}` : `encore-text-${type}`} ${getColorClass(color)}`;

  // extension/components/ui/button.ts
  var Button = class extends HTMLElement {
    customClass = "";
    _type = "primary";
    _isIcon = false;
    onChange;
    constructor(options) {
      super();
      if (options) {
        this.type = options.type ?? this.type;
        this.customClass = options.customClass ?? this.customClass;
        this.disabled = options.disabled ?? this.disabled;
        this.isIcon = options.isIcon ?? this._isIcon;
        this.onChange = options.onChange;
        if (options.textContent) this.textContent = options.textContent;
        if (options.innerHTML) this.innerHTML = options.innerHTML;
        if (options.ariaLabel) this.ariaLabel = options.ariaLabel;
        if (options.style) Object.assign(this.style, options.style);
      }
      this.addEventListener("click", this._handleClick);
    }
    connectedCallback() {
      this.classList.add("lucid-button");
      this._updateClasses();
      this.setAttribute("role", "button");
    }
    disconnectedCallback() {
      this.removeEventListener("click", this._handleClick);
    }
    _updateClasses() {
      this.className = `lucid-button ${this.customClass}`;
      this.classList.toggle("icon", this._isIcon);
      this.classList.toggle("disabled", this.disabled);
      for (const className of this.classList) {
        if (["primary", "secondary", "tertiary", "danger"].includes(className)) {
          this.classList.remove(className);
        }
      }
      this.classList.add(this.type);
      if (this._isIcon && this.type === "icon") {
        const textClass = getTextClass("body-small-bold");
        if (textClass) {
          this.classList.add(textClass);
        }
      }
    }
    set isIcon(isIcon) {
      this._isIcon = isIcon;
      if (isIcon) {
        this.classList.add("icon");
        this.setAttribute("is-icon", "true");
      } else {
        this.classList.remove("icon");
        this.removeAttribute("is-icon");
      }
      this._updateClasses();
    }
    get isIcon() {
      return this._isIcon;
    }
    set type(value) {
      this._type = value;
      this.setAttribute("type", value);
      this._updateClasses();
    }
    get type() {
      return this._type;
    }
    set disabled(disabled) {
      if (disabled) {
        this.setAttribute("disabled", "true");
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("disabled");
        this.removeAttribute("aria-disabled");
      }
      this._updateClasses();
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    _handleClick = () => {
      if (!this.disabled && this.onChange) {
        this.onChange();
      }
    };
  };
  customElements.define("custom-button", Button);

  // extension/components/modal.ts
  var Modal = class _Modal extends HTMLElement {
    _modalElem;
    _bodyElem;
    _scrollElem;
    _closeBtn;
    _githubBtn;
    _discordBtn;
    _headerWrapperElem;
    _headerElem;
    _bgElem;
    _previouslyFocusedElement = null;
    static zIndexCounter = 1e3;
    constructor() {
      super();
      this._bgElem = createElement("div", {
        className: "modal-backdrop"
      });
      this._bgElem.addEventListener("click", () => this.close());
      this._modalElem = createElement("div", {
        className: "modal",
        role: "dialog",
        ariaModal: "true"
      });
      this._headerWrapperElem = createElement("div", {
        className: "modal-header-container"
      });
      this._headerElem = createElement("h2", {
        className: `modal-header ${getTextClass("title-small")}`,
        id: "modal-header"
      });
      const buttons = createElement("div", {
        className: "modal-header-buttons"
      });
      this._closeBtn = this.createIconButton("close", "Close Button", CLOSE_ICON, () => this.close());
      this._githubBtn = this.createIconButton(
        "github",
        "Github Button",
        GITHUB_ICON,
        () => window.open(GITHUB_LINK)
      );
      this._discordBtn = this.createIconButton(
        "discord",
        "Discord Button",
        DISCORD_ICON,
        () => window.open(DISCORD_LINK)
      );
      buttons.append(this._discordBtn, this._githubBtn, this._closeBtn);
      this._headerWrapperElem.append(this._headerElem, buttons);
      this._modalElem.appendChild(this._headerWrapperElem);
      this._bodyElem = createElement("div", { className: "modal-body" });
      this._scrollElem = createElement("div", { className: "modal-scroll" });
      this._bodyElem.appendChild(this._scrollElem);
      this._modalElem.appendChild(this._bodyElem);
      this.append(this._bgElem, this._modalElem);
    }
    createIconButton(className, ariaLabel, innerHTML, clickHandler) {
      const button = new Button();
      button.customClass = className;
      button.ariaLabel = ariaLabel;
      button.innerHTML = innerHTML.toString();
      button.type = "icon";
      button.addEventListener("click", clickHandler);
      return button;
    }
    resetPosition() {
      this._modalElem.style.transform = "translate3d(-50%,-50%,0px)";
    }
    get scrollElem() {
      return this._scrollElem;
    }
    set isOpen(open) {
      if (open) this.setAttribute("open", "true");
      else this.removeAttribute("open");
    }
    get isOpen() {
      return Boolean(this.getAttribute("open"));
    }
    setHeader(headerContent) {
      this._headerElem.innerHTML = headerContent.toString();
    }
    open() {
      this.isOpen = true;
      this._previouslyFocusedElement = document.activeElement;
      this._bgElem.classList.add("modal-backdrop--open");
      this._modalElem.classList.add("modal--open");
      this._closeBtn.focus();
      this.resetPosition();
      _Modal.zIndexCounter += 1;
      this._bgElem.style.zIndex = String(_Modal.zIndexCounter);
      this._modalElem.style.zIndex = String(_Modal.zIndexCounter);
      this.dispatchEvent(new Event("open"));
    }
    close() {
      this.isOpen = false;
      this._bgElem.classList.remove("modal-backdrop--open");
      this._modalElem.classList.remove("modal--open");
      this.removeAttribute("open");
      if (this._previouslyFocusedElement) {
        this._previouslyFocusedElement.focus();
        this._previouslyFocusedElement = null;
      }
      this.dispatchEvent(new Event("close"));
    }
    setContent(content) {
      this._scrollElem.textContent = "";
      if (typeof content === "string") {
        this._scrollElem.textContent = content;
      } else {
        this._scrollElem.append(content);
      }
    }
  };
  customElements.define("lucid-modal", Modal);
  var FloatingModal = class extends Modal {
    dragging = false;
    startX = 0;
    startY = 0;
    initialLeft = 0;
    initialTop = 0;
    constructor() {
      super();
      super.setHeader("Lucid Settings");
    }
    setPosition = (top, left) => {
      modalState.setState((state) => ({
        isFloating: state.isFloating,
        position: { top, left }
      }));
    };
    handlePointerDown = (e) => {
      if (!this.isFloating) return;
      this.dragging = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      const rect = this._modalElem.getBoundingClientRect();
      this.initialLeft = rect.left;
      this.initialTop = rect.top;
      this.setAttribute("dragging", "true");
      document.addEventListener("pointermove", this.handlePointerMove);
      document.addEventListener("pointerup", this.handlePointerUp);
    };
    handlePointerMove = (e) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      let newLeft = this.initialLeft + dx;
      let newTop = this.initialTop + dy;
      const modalRect = this._modalElem.getBoundingClientRect();
      const modalWidth = modalRect.width;
      const modalHeight = modalRect.height;
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - modalWidth - 16));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - modalHeight - 16));
      this._modalElem.style.transform = `translate3d(${newLeft}px,${newTop}px,0px)`;
      this.setPosition(newTop, newLeft);
    };
    handlePointerUp = (_e) => {
      this.dragging = false;
      this.removeAttribute("dragging");
      document.removeEventListener("pointermove", this.handlePointerMove);
      document.removeEventListener("pointerup", this.handlePointerUp);
    };
    makeFloating() {
      const modalPosition = modalState.getState().position;
      if (modalPosition && modalPosition.top !== void 0 && modalPosition.left !== void 0) {
        this._modalElem.style.transform = `translate3d(${modalPosition.left}px,${modalPosition.top}px,0px)`;
      }
      this.setAttribute("floating", "true");
      this._modalElem.classList.add("modal--floating");
      this._bgElem.classList.add("modal-backdrop--floating");
      this._headerWrapperElem.addEventListener("pointerdown", this.handlePointerDown);
    }
    removeFloating() {
      this.removeAttribute("floating");
      this.resetPosition();
      this._bgElem.classList.remove("modal-backdrop--floating");
      this._modalElem.classList.remove("modal--floating");
      this._headerWrapperElem.removeEventListener("pointerdown", this.handlePointerDown);
    }
    set isFloating(isFloating) {
      if (!isFloating) {
        this.removeAttribute("is-floating");
        this.removeFloating();
      } else {
        this.setAttribute("is-floating", "true");
        this.makeFloating();
      }
    }
    get isFloating() {
      return Boolean(this.getAttribute("is-floating"));
    }
    open() {
      super.open();
      if (this.isFloating) {
        const modalPosition = modalState.getState().position;
        if (modalPosition && modalPosition.top !== void 0 && modalPosition.left !== void 0) {
          this._modalElem.style.transform = `translate3d(${modalPosition.left}px,${modalPosition.top}px,0px)`;
        }
      }
    }
  };
  customElements.define("lucid-settings-modal", FloatingModal);
  window.Modal = Modal;
  window.FloatingModal = FloatingModal;

  // extension/utils/addSettingAccess.ts
  var settingsElement = null;
  function addSettingAccess(position, cb) {
    if (settingsElement) {
      if (settingsElement instanceof Spicetify.Topbar.Button) {
        settingsElement.element?.remove();
      } else {
        settingsElement.deregister();
      }
      settingsElement = null;
    }
    if (position === "context-menu") {
      if (Spicetify?.Menu?.Item) {
        settingsElement = new Spicetify.Menu.Item("Lucid Settings", false, cb, SETTINGS_ICON);
        settingsElement.register();
      } else {
        console.error("Context menu unavailable.Try Switching to Nav.");
      }
    } else if (position === "nav") {
      if (Spicetify?.Topbar?.Button) {
        settingsElement = new Spicetify.Topbar.Button(
          "Lucid Settings",
          SETTINGS_ICON,
          cb,
          false,
          true
        );
      } else {
        console.error("Nav bar unavailable.Try Switching to Context Menu.");
      }
    }
  }

  // extension/components/ui/tooltip.ts
  var showTimeout = null;
  var hideTimeout = null;
  var showDelay = 100;
  var hideDelay = 150;
  var tooltipElement = createElement("div", {
    id: "tooltip",
    role: "tooltip",
    ariaHidden: "true",
    style: {
      position: "fixed",
      display: "block",
      padding: "0.5rem 1rem",
      border: "1px solid var(--border-color, var(--clr-surface-0))",
      color: "var(--clr-on-surface, #fafafa)",
      backgroundColor: "rgba(var(--clr-surface-0-rgb, var(--spice-rgb-main)), 0.85)",
      borderRadius: "6px",
      boxShadow: "0 4px 12px rgba(var(--clr-shadow-rgb), 0.25)",
      backdropFilter: "blur(10px)",
      transition: "opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s ease-out",
      pointerEvents: "auto",
      zIndex: "1000",
      opacity: "0",
      visibility: "hidden",
      transform: "translateY(-5px) scale(0.95)",
      maxWidth: `${window.innerWidth / 2}px`,
      fontSize: "0.875rem",
      textAlign: "center"
    }
  });
  var tooltipContent = createElement("span", {
    className: "tooltip-content",
    style: { display: "inline-block", transition: "opacity 0.3s ease" }
  });
  tooltipElement.appendChild(tooltipContent);
  document.body.appendChild(tooltipElement);
  tooltipElement.addEventListener("mouseenter", () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  });
  tooltipElement.addEventListener("mouseleave", () => {
    hideTooltip();
  });
  function showTooltip(event, text) {
    if (!text) return;
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    showTimeout = setTimeout(() => {
      if (typeof text === "string") {
        tooltipContent.innerHTML = `<span style="font-weight: 500; color: inherit;">${text}</span>`;
      } else {
        tooltipContent.innerHTML = "";
        tooltipContent.appendChild(text);
      }
      tooltipElement.style.visibility = "visible";
      tooltipElement.style.opacity = "1";
      tooltipElement.style.transform = "translateY(0) scale(1)";
      tooltipElement.setAttribute("aria-hidden", "false");
      let left;
      let top;
      if (event.target instanceof HTMLElement) {
        const rect = event.target.getBoundingClientRect();
        left = rect.left + rect.width / 2 - tooltipElement.offsetWidth / 2;
        top = rect.top - tooltipElement.offsetHeight;
      } else {
        left = event.clientX + 10;
        top = event.clientY + 10;
      }
      left = Math.max(0, Math.min(left, window.innerWidth - tooltipElement.offsetWidth));
      tooltipElement.style.left = `${left}px`;
      tooltipElement.style.top = `${top}px`;
      tooltipElement.style.maxWidth = `${window.innerWidth / 2}px`;
      showTimeout = null;
    }, showDelay);
  }
  function hideTooltip() {
    if (tooltipElement.matches(":hover") || tooltipContent.matches(":hover")) {
      return;
    }
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    hideTimeout = setTimeout(() => {
      tooltipElement.style.opacity = "0";
      tooltipElement.style.transform = "translateY(-5px) scale(0.95)";
      tooltipElement.style.visibility = "hidden";
      tooltipElement.setAttribute("aria-hidden", "true");
      hideTimeout = null;
    }, hideDelay);
  }
  var Tooltip = class {
    elem;
    content;
    mouseoverHandler;
    mouseoutHandler;
    open = false;
    constructor(content) {
      this.content = content;
      this.elem = createElement("div", {
        className: "tooltip-wrapper",
        innerHTML: `<span class="icon" style="height:24px; width:24px;">${TOOLTIP_ICON}</span>`,
        style: {
          cursor: "help",
          display: "inline-flex"
        },
        ariaLabel: typeof content === "string" ? content : void 0,
        ariaHasPopup: "true"
      });
      this.mouseoverHandler = (e) => {
        this.open = true;
        showTooltip(e, this.content);
      };
      this.mouseoutHandler = () => {
        if (!this.elem.matches(":hover") && this.open) {
          hideTooltip();
          this.open = false;
        }
      };
      this.elem.addEventListener("mouseenter", this.mouseoverHandler);
      this.elem.addEventListener("mouseleave", this.mouseoutHandler);
    }
    dispose() {
      this.elem.removeEventListener("mouseenter", this.mouseoverHandler);
      this.elem.removeEventListener("mouseleave", this.mouseoutHandler);
      if (this.elem.parentNode) {
        this.elem.parentNode.removeChild(this.elem);
      }
    }
  };

  // extension/components/ui/select.ts
  var Select = class extends HTMLElement {
    _options = [];
    _value = "";
    _isOpen = false;
    _highlightedIndex = -1;
    _trigger;
    _selectedValueSpan;
    _optionsList;
    shadow;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }
    set options(opts) {
      this._options = opts;
      this.renderOptions();
    }
    get options() {
      return this._options;
    }
    set value(val) {
      this._value = val;
      this.updateSelected();
    }
    get value() {
      return this._value;
    }
    connectedCallback() {
      this.render();
      document.addEventListener("click", this.handleDocumentClick);
    }
    disconnectedCallback() {
      document.removeEventListener("click", this.handleDocumentClick);
    }
    render() {
      this.shadow.innerHTML = `
        <style>.option,.trigger{cursor:pointer;transition:background 225ms ease-in-out}.select-container{width:100%;min-width:6rem;position:relative}.options,.options::before{width:100%;position:absolute}.trigger{padding:.5rem .75rem;background-color:var(--clr-surface-2);width:100%;display:flex;align-items:center;text-align:left;line-height:1px;justify-content:space-between;color:var(--clr-on-surface);border:var(--border-thickness,1px) var(--border-style,solid) var(--border-color,#45454550);border-radius:var(--btn-base-radius,.5rem)}.options{list-style:none;padding:0;margin:0;border:1px solid #ccc;scrollbar-width:thin;background:rgba(var(--clr-surface-1-rgb),.5);z-index:10;max-height:200px;overflow-y:auto;border:var(--border-thickness,1px) var(--border-style,solid) var(--border-color,#45454550);border-radius:var(--btn-base-radius,.5rem);-webkit-backdrop-filter:blur(8px) saturate(150%);backdrop-filter:blur(8px) saturate(150%)}.options.hidden{display:none}.option{padding:.5rem}.option:last-child{border-bottom:none}.option.highlighted,.option[aria-selected=true]{background:rgba(var(--clr-surface-2-rgb),.7)}.option:hover,.trigger:hover,.trigger[aria-expanded=true]{background:rgba(var(--clr-surface-3-rgb),.75)}.icon{color:var(--clr-on-surface,var(--spice-text));height:20px;width:20px}.trigger,.option{font-size: .85rem;font-weight:500;font-family:inherit;color: var(--clr-on-surface,var(--spice-text,#fafafa))}</style>
        <div class="select-container">
          <button type="button" class="trigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="selected-value"></span>
            <span class="icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.79681 7C4.95612 7 4.49064 7.97434 5.01887 8.62834L8.83333 13.351C9.43371 14.0943 10.5668 14.0943 11.1672 13.351L14.9816 8.62834C15.5098 7.97434 15.0444 7 14.2037 7H5.79681Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <ul class="options hidden" role="listbox" tabindex="-1"></ul>
        </div>
      `;
      this._trigger = this.shadow.querySelector(".trigger");
      this._selectedValueSpan = this.shadow.querySelector(".selected-value");
      this._optionsList = this.shadow.querySelector(".options");
      this._trigger.addEventListener("click", () => this.checkboxOptions());
      this._trigger.addEventListener("keydown", (e) => this.handleTriggerKeydown(e));
      this._optionsList.addEventListener("click", (e) => this.handleOptionClick(e));
      this._optionsList.addEventListener("keydown", (e) => this.handleOptionsKeydown(e));
      this.renderOptions();
      this.updateSelected();
    }
    renderOptions() {
      if (!this._optionsList) return;
      this._optionsList.innerHTML = "";
      for (const [index, option] of this._options.entries()) {
        const li = createElement("li", {
          role: "option",
          className: "option",
          textContent: option.label,
          ariaSelected: option.value === this._value ? "true" : "false"
        });
        li.setAttribute("data-index", index.toString());
        li.setAttribute("data-value", option.value);
        this._optionsList.appendChild(li);
      }
    }
    updateSelected() {
      if (!this._selectedValueSpan) return;
      const selectedOption = this._options.find((opt) => opt.value === this._value);
      this._selectedValueSpan.textContent = selectedOption ? selectedOption.label : "Select an option";
      const children = Array.from(this._optionsList.children);
      for (const child of children) {
        const optionValue = child.getAttribute("data-value");
        child.setAttribute("aria-selected", optionValue === this._value ? "true" : "false");
      }
    }
    checkboxOptions() {
      this._isOpen = !this._isOpen;
      if (this._isOpen) {
        this.openOptions();
      } else {
        this.closeOptions();
      }
    }
    openOptions() {
      this._optionsList.classList.remove("hidden");
      this._trigger.setAttribute("aria-expanded", "true");
      this._highlightedIndex = this._options.findIndex((opt) => opt.value === this._value);
      if (this._highlightedIndex === -1) this._highlightedIndex = 0;
      this.highlightOption(this._highlightedIndex);
      this._optionsList.focus();
    }
    closeOptions() {
      this._isOpen = false;
      this._optionsList.classList.add("hidden");
      this._trigger.setAttribute("aria-expanded", "false");
      this._highlightedIndex = -1;
    }
    handleTriggerKeydown(e) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.openOptions();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          this.checkboxOptions();
          break;
      }
    }
    handleOptionsKeydown(e) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.moveHighlight(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.moveHighlight(-1);
          break;
        case "Enter":
          e.preventDefault();
          this.selectHighlighted();
          break;
        case "Escape":
          e.preventDefault();
          this.closeOptions();
          this._trigger.focus();
          break;
      }
    }
    handleOptionClick(e) {
      const target = e.target;
      if (target && target.getAttribute("role") === "option") {
        const index = Number.parseInt(target.getAttribute("data-index") || "0", 10);
        this._highlightedIndex = index;
        this.selectHighlighted();
      }
    }
    moveHighlight(delta) {
      const count = this._options.length;
      if (count === 0) return;
      this._highlightedIndex = (this._highlightedIndex + delta + count) % count;
      this.highlightOption(this._highlightedIndex);
    }
    highlightOption(index) {
      const options = this._optionsList.querySelectorAll(".option");
      let idx = 0;
      for (const option of options) {
        if (idx === index) {
          option.classList.add("highlighted");
          option.scrollIntoView({ block: "nearest" });
        } else {
          option.classList.remove("highlighted");
        }
        idx++;
      }
    }
    selectHighlighted() {
      if (this._highlightedIndex >= 0 && this._highlightedIndex < this._options.length) {
        const selected = this._options[this._highlightedIndex];
        this._value = selected.value;
        this.updateSelected();
        this.closeOptions();
        this._trigger.focus();
        this.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    handleDocumentClick(event) {
      if (!this.contains(event.target)) {
        this.closeOptions();
      }
    }
  };
  customElements.define("accessible-select", Select);

  // extension/utils/shallowEqual.ts
  function shallowEqual(objA, objB) {
    if (objA === objB) return true;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    return true;
  }

  // extension/components/ui/input.ts
  var CustomInput = class extends HTMLElement {
    _inputOptions;
    _renderedOptions = null;
    _inputElement = null;
    _previewElement = null;
    set inputOptions(options) {
      this._inputOptions = options;
      this.render();
    }
    get inputOptions() {
      return this._inputOptions;
    }
    connectedCallback() {
      this.render();
    }
    removeContent() {
      this._inputElement = null;
      this._previewElement = null;
      this.innerHTML = "";
    }
    render() {
      if (this._renderedOptions && shallowEqual(this._renderedOptions, this._inputOptions)) {
        return;
      }
      this.removeContent();
      const handleSaveClick = (validator, onChange, convert) => {
        const target = this._inputElement;
        const rawValue = target.value;
        const newValue = convert ? convert(rawValue) : rawValue;
        if (!validator) {
          onChange?.(newValue);
          return;
        }
        const res = validator(newValue);
        if (res.isValid) {
          target.classList.remove("error", "shake-error");
          onChange?.(newValue);
        } else {
          target.classList.remove("shake-error");
          void target.offsetWidth;
          target.classList.add("error", "shake-error");
          if (res.message) {
            showNotification(res.message, true, 2e3);
          }
        }
      };
      switch (this._inputOptions.type) {
        case "button": {
          const { buttonType, onClick, contents } = this._inputOptions;
          this._inputElement = new Button();
          this._inputElement.type = buttonType || "primary";
          if (onClick) this._inputElement.onclick = onClick;
          this._inputElement.innerHTML = contents?.toString() || "Button";
          this.append(this._inputElement);
          break;
        }
        case "number": {
          const { type, step, value, onChange, validator } = this._inputOptions;
          this._inputElement = createElement("input", {
            type,
            step: step?.toString() || "1",
            value: value?.toString(),
            className: "input number"
          });
          const saveButton = new Button();
          saveButton.innerHTML = SAVE_ICON;
          saveButton.type = "icon";
          saveButton.onclick = () => handleSaveClick(validator, onChange, (value2) => Number.parseFloat(value2));
          this.append(this._inputElement, saveButton);
          break;
        }
        case "text": {
          const { type, value, onChange, validator } = this._inputOptions;
          this._inputElement = createElement("input", {
            type,
            value,
            className: "input text"
          });
          const saveButton = new Button();
          saveButton.innerHTML = SAVE_ICON;
          saveButton.type = "icon";
          saveButton.onclick = () => handleSaveClick(validator, onChange);
          this.append(this._inputElement, saveButton);
          break;
        }
        case "checkbox": {
          const { onChange, checked, type } = this._inputOptions;
          this._inputElement = createElement("input", {
            checked,
            type,
            className: "checkbox custom"
          });
          this._inputElement.onchange = (e) => onChange?.(e.target.checked);
          this.append(this._inputElement);
          break;
        }
        case "select": {
          const { options, value, onChange } = this._inputOptions;
          this._inputElement = new Select();
          if (options) this._inputElement.options = options;
          if (value) this._inputElement.value = value;
          this._inputElement.onchange = (e) => onChange?.(e.target.value);
          this.append(this._inputElement);
          break;
        }
        case "color": {
          const { value, onChange } = this._inputOptions;
          this._inputElement = createElement("input", {
            type: "color",
            value,
            className: "input color"
          });
          const eyeDropperButton = new Button();
          eyeDropperButton.innerHTML = EYEDROPPER_ICON;
          eyeDropperButton.type = "icon";
          eyeDropperButton.onclick = async () => {
            if (!("EyeDropper" in window) && window.EyeDropper) {
              showNotification("EyeDropper API is not supported in this browser.", true, 3e3);
              return;
            }
            try {
              if (!window.EyeDropper) return;
              const eyeDropper = new window.EyeDropper();
              const result = await eyeDropper.open();
              const color = result.sRGBHex;
              this._inputElement.value = color;
              onChange?.(color);
            } catch (e) {
              if (e instanceof Error && e.message !== "No color selected") {
                console.error("EyeDropper Error:", e);
                showNotification("Failed to pick color with EyeDropper.", true, 3e3);
              }
            }
          };
          const saveButton = new Button();
          saveButton.innerHTML = SAVE_ICON;
          saveButton.type = "icon";
          saveButton.onclick = () => {
            handleSaveClick(() => ({ isValid: true }), onChange);
          };
          if (window.EyeDropper) {
            this.append(this._inputElement, eyeDropperButton, saveButton);
          } else this.append(this._inputElement, saveButton);
          break;
        }
        case "image": {
          const { onChange } = this._inputOptions;
          this._inputElement = createElement("input", {
            type: "file",
            accept: "image/*",
            className: "input image",
            style: {
              display: "none",
              visibility: "hidden"
            }
          });
          this._previewElement = createElement("img", {
            className: "image-preview",
            style: {
              borderRadius: "0.5rem"
            }
          });
          this._previewElement.src = "";
          this.prepend(this._previewElement);
          this._inputElement.onchange = (e) => {
            const target = e.target;
            const file = target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const dataUrl = event.target?.result;
                onChange?.(dataUrl);
                if (!this._previewElement) return;
                this._previewElement.src = dataUrl;
              };
              reader.readAsDataURL(file);
            } else {
              onChange?.(null);
              if (this._previewElement) {
                this._previewElement.src = "";
              }
            }
          };
          this.append(
            new Button({
              type: "primary",
              textContent: "Select Image",
              onChange: () => {
                this._inputElement?.click();
              }
            }),
            this._inputElement
          );
          break;
        }
        default:
          console.error("Unsupported input options:", this._inputOptions);
      }
      this._renderedOptions = this._inputOptions;
    }
  };
  customElements.define("custom-input", CustomInput);

  // extension/components/settings/section.ts
  var SettingsMain = class extends HTMLElement {
    _isRender = false;
    rendered = false;
    _settings = [];
    sectionElements = [];
    connectedCallback() {
      if (!this.sectionElements.length && this._settings.length) {
        this.createSectionElements();
      }
      this.render();
      this.updateVisibility();
    }
    set options(options) {
      this._settings = options;
      this.updateSectionElements();
      this.render();
      this.updateVisibility();
    }
    set isRender(isRender) {
      this._isRender = isRender;
      this.updateVisibility();
    }
    get isRender() {
      return this._isRender;
    }
    updateVisibility() {
      if (this._isRender) {
        this.removeAttribute("hidden");
        this.style.display = "flex";
        this.style.visibility = "visible";
      } else {
        this.setAttribute("hidden", "true");
        this.style.display = "none";
        this.style.visibility = "hidden";
      }
    }
    clear() {
      this.innerHTML = "";
    }
    createSectionElements() {
      this.sectionElements = [];
      for (const section of this._settings) {
        const sectionElement = new SettingSection();
        sectionElement.options = section;
        this.sectionElements.push(sectionElement);
      }
    }
    updateSectionElements() {
      const existingSectionsMap = /* @__PURE__ */ new Map();
      for (const sectionElement of this.sectionElements) {
        const sectionKey = sectionElement._name;
        existingSectionsMap.set(sectionKey, sectionElement);
      }
      const newSectionElements = [];
      for (const section of this._settings) {
        const sectionKey = section.name;
        let sectionElement = existingSectionsMap.get(sectionKey);
        if (sectionElement) {
          sectionElement.options = section;
        } else {
          sectionElement = new SettingSection();
          sectionElement.options = section;
        }
        newSectionElements.push(sectionElement);
      }
      this.sectionElements = newSectionElements;
    }
    render() {
      if (!this._settings || this._settings.length === 0 || this.rendered) {
        return;
      }
      this.clear();
      this.append(...this.sectionElements);
      this.rendered = true;
    }
  };
  customElements.define("settings-main", SettingsMain);
  var SettingSection = class extends HTMLElement {
    _isRender = false;
    rendered = false;
    _headerElement;
    _groupsWrapperElement;
    _name = "";
    _groups = [];
    groupElements = [];
    constructor() {
      super();
      this._headerElement = createElement("div", {
        className: "header-wrapper",
        style: { textAlign: "center" }
      });
      this._groupsWrapperElement = createElement("div", {
        style: {
          marginTop: ".25rem",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          width: "100%"
        }
      });
    }
    connectedCallback() {
      if (!this.groupElements.length && this._groups.length) {
        this.createGroupElements();
      }
      this.render();
      this.updateVisibility();
    }
    set options(options) {
      this._name = options.name;
      this._groups = options.groups;
      this._isRender = options.render;
      this.updateGroupElements();
      this.render();
      this.updateVisibility();
    }
    set isRender(isRender) {
      this._isRender = isRender;
      this.updateVisibility();
    }
    get isRender() {
      return this._isRender;
    }
    updateVisibility() {
      if (this._isRender) {
        this.removeAttribute("hidden");
        this.style.display = "block";
        this.style.visibility = "visible";
      } else {
        this.setAttribute("hidden", "true");
        this.style.display = "none";
        this.style.visibility = "hidden";
      }
    }
    clear() {
      this.innerHTML = "";
      this._headerElement.innerHTML = "";
      this._groupsWrapperElement.innerHTML = "";
    }
    createGroupElements() {
      this.groupElements = [];
      for (const group of this._groups) {
        const groupElement = new SettingGroup();
        groupElement.options = group;
        this.groupElements.push(groupElement);
      }
    }
    updateGroupElements() {
      const existingGroupsMap = /* @__PURE__ */ new Map();
      for (const groupElement of this.groupElements) {
        existingGroupsMap.set(groupElement._key, groupElement);
      }
      const newGroupElements = [];
      for (const group of this._groups) {
        let groupElement = existingGroupsMap.get(group.key);
        if (groupElement) {
          groupElement.options = group;
        } else {
          groupElement = new SettingGroup();
          groupElement.options = group;
        }
        newGroupElements.push(groupElement);
      }
      this.groupElements = newGroupElements;
    }
    render() {
      if (!this._groups || this._groups.length === 0 || this.rendered) {
        return;
      }
      this.dataset.tabId = this._name.toLowerCase();
      this.clear();
      this._headerElement.append(
        createElement("h3", {
          textContent: this._name,
          className: getTextClass("title-small"),
          style: {
            fontSize: "1.25rem"
          }
        })
      );
      this._groupsWrapperElement.append(...this.groupElements);
      this.append(this._headerElement, this._groupsWrapperElement);
      this.rendered = true;
    }
  };
  customElements.define("setting-section", SettingSection);
  var SettingGroup = class extends HTMLElement {
    _isRender = false;
    rendered = false;
    _nameContainerElement;
    _fieldsContainerElement;
    _showName = true;
    _name = "Section";
    _fields = [];
    _key = "";
    fieldElements = [];
    constructor() {
      super();
      this._nameContainerElement = createElement("div");
      this._fieldsContainerElement = createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }
      });
    }
    connectedCallback() {
      if (!this.fieldElements.length && this._fields.length) {
        this.createFieldElements();
      }
      this.render();
      this.updateVisibility();
    }
    set options(options) {
      this._name = options.name;
      this._fields = options.fields;
      this._isRender = options.render;
      this._key = options.key;
      this._showName = options.showName ?? true;
      this.updateFieldElements();
      this.updateVisibility();
    }
    set isRender(isRender) {
      this._isRender = isRender;
      this.updateVisibility();
    }
    get isRender() {
      return this._isRender;
    }
    updateVisibility() {
      if (this._isRender) {
        this.removeAttribute("hidden");
        this.style.display = "flex";
        this.style.visibility = "visible";
      } else {
        this.setAttribute("hidden", "true");
        this.style.display = "none";
        this.style.visibility = "hidden";
      }
    }
    clear() {
      this.innerHTML = "";
      this._nameContainerElement.innerHTML = "";
      this._fieldsContainerElement.innerHTML = "";
    }
    createFieldElements() {
      this.fieldElements = [];
      for (const field of this._fields) {
        const fieldElement = new SettingField();
        fieldElement.isRender = field.render ?? true;
        fieldElement.inputOptions = field.inputOptions;
        fieldElement.label = field.label;
        fieldElement.fieldKey = field.key;
        if (field.tooltip) fieldElement.tooltip = field.tooltip;
        this.fieldElements.push(fieldElement);
      }
    }
    updateFieldElements() {
      const existingFieldsMap = /* @__PURE__ */ new Map();
      for (const fieldElement of this.fieldElements) {
        existingFieldsMap.set(fieldElement.fieldKey, fieldElement);
      }
      const newFieldElements = [];
      for (const field of this._fields) {
        let fieldElement = existingFieldsMap.get(field.key);
        if (fieldElement) {
          fieldElement.isRender = field.render ?? true;
          fieldElement.inputOptions = field.inputOptions;
          if (field.tooltip) fieldElement.tooltip = field.tooltip;
        } else {
          fieldElement = new SettingField();
          fieldElement.isRender = field.render ?? true;
          fieldElement.inputOptions = field.inputOptions;
          fieldElement.label = field.label;
          fieldElement.fieldKey = field.key;
          if (field.tooltip) fieldElement.tooltip = field.tooltip;
        }
        newFieldElements.push(fieldElement);
      }
      this.fieldElements = newFieldElements;
    }
    render() {
      if (!this._fields || this._fields.length === 0 || this.rendered) {
        return;
      }
      this.dataset.groupId = this._name.toLowerCase();
      this.clear();
      if (this._name && this._showName) {
        this._nameContainerElement.append(
          createElement("h4", {
            textContent: this._name,
            className: getTextClass("body-small-bold"),
            style: {
              fontSize: ".8rem",
              marginLeft: ".25rem",
              lineHeight: "normal"
            }
          })
        );
        this.append(this._nameContainerElement);
      }
      this._fieldsContainerElement.append(...this.fieldElements);
      this.append(this._fieldsContainerElement);
      this.rendered = true;
    }
  };
  customElements.define("setting-group", SettingGroup);
  var SettingField = class extends HTMLElement {
    _isRender;
    rendered;
    _labelContainer;
    _inputElement;
    _tooltipInstance;
    _label;
    _fieldKey = "";
    inputOptions;
    constructor() {
      super();
      this._isRender = false;
      this.rendered = false;
      this._label = "Section";
      this._tooltipInstance = null;
      this.inputOptions = null;
      this._inputElement = new CustomInput();
      this._labelContainer = createElement("div", {
        className: "label-wrapper",
        style: { display: "flex", gap: "0.5rem", alignItems: "center" }
      });
    }
    connectedCallback() {
      if (!this.rendered) this.render();
      this.updateVisibility();
    }
    disconnectedCallback() {
      this._tooltipInstance?.dispose();
    }
    set isRender(isRender) {
      this._isRender = isRender;
      this.updateVisibility();
    }
    get isRender() {
      return this._isRender;
    }
    updateVisibility() {
      if (this._isRender) {
        this.removeAttribute("hidden");
        this.style.display = "flex";
        this.style.visibility = "visible";
      } else {
        this.setAttribute("hidden", "true");
        this.style.display = "none";
        this.style.visibility = "hidden";
      }
    }
    set tooltip(tooltip) {
      if (!tooltip) return;
      if (!this._tooltipInstance) this._tooltipInstance = new Tooltip(tooltip);
      this._tooltipInstance.content = tooltip;
    }
    clear() {
      this.innerHTML = "";
    }
    render() {
      if (!this.inputOptions || this.rendered) {
        return;
      }
      this.dataset.fieldId = this._label.toLowerCase();
      this._labelContainer.append(
        createElement("p", {
          textContent: this._label,
          className: getTextClass("body-small")
        })
      );
      if (this._tooltipInstance) {
        this._labelContainer.append(this._tooltipInstance.elem);
      }
      this._inputElement.inputOptions = this.inputOptions;
      this.append(this._labelContainer, this._inputElement);
      this.rendered = true;
    }
    set label(value) {
      this._label = value;
      if (this.rendered) {
        this.render();
      }
    }
    get label() {
      return this._label;
    }
    set fieldKey(value) {
      this._fieldKey = value;
    }
    get fieldKey() {
      return this._fieldKey;
    }
  };
  customElements.define("setting-field", SettingField);

  // extension/utils/validationUtils.ts
  var isValidUrl = (value) => {
    const message = "Invalid URL";
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) {
        return { isValid: false, message };
      }
      return { isValid: true };
    } catch {
      return { isValid: false, message };
    }
  };
  var isValidNumberInRange = (value, min, max) => {
    const message = `Enter a number between ${min} and ${max}.`;
    if (typeof value !== "number" || Number.isNaN(value)) {
      return { isValid: false, message };
    }
    if (value < min || value > max) {
      return { isValid: false, message };
    }
    return { isValid: true };
  };
  var isValidNumberInRange512 = (value) => {
    return isValidNumberInRange(value, 0, 512);
  };
  var isValidNumberInRange256 = (value) => {
    return isValidNumberInRange(value, 0, 256);
  };
  var isValidNumberInRange200 = (value) => {
    return isValidNumberInRange(value, 0, 200);
  };
  var isValidNumberInRange100 = (value) => {
    return isValidNumberInRange(value, 0, 100);
  };
  var isValidNumberInRange10 = (value) => {
    return isValidNumberInRange(value, 0, 10);
  };
  var isValidGoogleFontURL = (url) => {
    if (!url || url.trim() === "") {
      return { isValid: false, message: "URL cannot be empty." };
    }
    try {
      const parsedURL = new URL(url);
      if (!parsedURL.hostname.endsWith("fonts.googleapis.com") && !parsedURL.hostname.endsWith("fonts.gstatic.com")) {
        return {
          isValid: false,
          message: "Hostname is not a Google Fonts domain."
        };
      }
      if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
        return { isValid: false, message: "Protocol must be HTTP or HTTPS." };
      }
      if (!parsedURL.pathname.startsWith("/css") && !parsedURL.pathname.startsWith("/earlyaccess")) {
        if (!parsedURL.hostname.endsWith("fonts.gstatic.com")) {
          return {
            isValid: false,
            message: "Path is not a typical Google Fonts CSS path."
          };
        }
      }
      if (parsedURL.hostname.endsWith("fonts.googleapis.com")) {
        if (!parsedURL.searchParams.has("family")) {
          return {
            isValid: false,
            message: "URL does not contain the 'family' parameter."
          };
        }
      }
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: "Invalid URL format." };
    }
  };

  // extension/utils/clipboardUtils.ts
  async function copyToClipboard(text, successMessage = "Text copied to clipboard!") {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        console.debug(successMessage);
        showNotification(successMessage, false, 5e3);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
        showNotification(
          `Error copying to clipboard: ${err instanceof Error ? err.message : err}`,
          true,
          5e3
        );
      }
    } else {
      console.error("Error copying text (navigator.clipboard not found)");
      showNotification("Error copying text (navigator.clipboard not found)", true, 5e3);
    }
  }

  // extension/hooks/guide.ts
  async function mountAndOpenGuide(open = false) {
    if (!localStorage.getItem(GUIDE_STORAGE_KEY) || open) {
      await mountGuide();
      setTimeout(() => {
        if (window?.guide) {
          window.guide.open();
          localStorage.setItem(GUIDE_STORAGE_KEY, "true");
        } else {
          console.error("Guide script loaded, but window.guide is not available.");
        }
      }, 1e3);
    }
  }
  async function mountGuide() {
    const id = "guideScript";
    let guideScript = document.getElementById(id);
    if (guideScript) {
      console.debug("Guide script already mounted.");
      return;
    }
    try {
      showNotification("Please wait. Guided Tour is loading.", false, 1e3);
      const scriptText = await fetchAndCache(GUIDE_SCRIPT_URLS, GUIDE_SCRIPT_CACHE_KEY);
      guideScript = createElement("script", {
        id,
        type: "text/javascript",
        defer: true
      });
      if (!guideScript) return;
      guideScript.textContent = scriptText;
      document.body.appendChild(guideScript);
      console.debug("Mounted Guide script.");
    } catch (error) {
      console.error("Failed to load guide script:", error);
      showNotification("Failed to load Guided Tour.", true);
    }
  }

  // extension/imageDb.ts
  var db = null;
  var initDB = () => {
    return new Promise((resolve, reject) => {
      if (db) {
        console.debug("Lucid: Database already initialized.");
        resolve();
        return;
      }
      const request = window.indexedDB.open("LucidImageDB", 1);
      request.onerror = (event) => {
        console.error("Database error:", event);
        reject(event);
      };
      request.onsuccess = () => {
        db = request.result;
        console.debug("Lucid: Database initialized.");
        resolve();
      };
      request.onupgradeneeded = () => {
        db = request.result;
        console.debug("Lucid: Upgrading database...");
        if (!db.objectStoreNames.contains("imageStore")) {
          const store = db.createObjectStore("imageStore", { keyPath: "id" });
          store.createIndex("data", "data", { unique: false });
        }
      };
    });
  };
  var addImage = (imageDataUrl, cb) => {
    return new Promise((resolve, reject) => {
      const operation = () => {
        if (!db) return;
        const transaction = db.transaction(["imageStore"], "readwrite");
        const store = transaction.objectStore("imageStore");
        const imageRecord = {
          id: 1,
          data: imageDataUrl
        };
        const request = store.put(imageRecord);
        request.onsuccess = () => {
          console.debug("Image added/updated successfully.");
          cb?.();
          resolve();
        };
        request.onerror = (event) => {
          console.error("Error adding/updating image", event);
          reject(event);
        };
      };
      if (!db) {
        initDB().then(operation).catch(reject);
      } else {
        operation();
      }
    });
  };
  var getImageData = () => {
    return new Promise((resolve, reject) => {
      const operation = () => {
        if (!db) return;
        const transaction = db.transaction(["imageStore"], "readonly");
        const store = transaction.objectStore("imageStore");
        const request = store.get(1);
        request.onsuccess = () => {
          const result = request.result;
          resolve(result ? result.data : null);
        };
        request.onerror = (event) => {
          console.error("Error retrieving image", event);
          reject(event);
        };
      };
      if (!db) {
        initDB().then(operation).catch(reject);
      } else {
        operation();
      }
    });
  };

  // extension/utils/serializeCSSFilters.ts
  function serializeCSSFilters(filters) {
    let filterString = "";
    if (filters?.blur !== void 0) filterString += `blur(${filters.blur}px) `;
    if (filters?.brightness !== void 0) filterString += `brightness(${filters.brightness}%) `;
    if (filters?.contrast !== void 0) filterString += `contrast(${filters.contrast}%) `;
    if (filters?.grayscale !== void 0) filterString += `grayscale(${filters.grayscale}) `;
    if (filters?.hueRotate !== void 0) filterString += `hue-rotate(${filters.hueRotate}) `;
    if (filters?.invert !== void 0) filterString += `invert(${filters.invert}) `;
    if (filters?.opacity !== void 0) filterString += `opacity(${filters.opacity}%) `;
    if (filters?.saturate !== void 0) filterString += `saturate(${filters.saturate || 0}%) `;
    if (filters?.sepia !== void 0) filterString += `sepia(${filters.sepia}) `;
    return filterString.trim();
  }

  // extension/hooks/background.ts
  var bgWrapper = document.querySelector("lucid-bg-wrapper");
  var bgElem = bgWrapper?.querySelector("lucid-bg");
  var staticImage = null;
  var solidBg = null;
  var animatedBg = null;
  var createSolidBg = () => {
    staticImage = null;
    animatedBg = null;
    if (!bgElem) ensureBgInDOM();
    if (!solidBg && bgElem) {
      solidBg = createElement("div", {
        className: "solid-bg",
        style: {
          backgroundColor: "var(--solid-bg-color, var(--clr-surface))",
          height: "100%",
          width: "100%"
        }
      });
      bgElem.innerHTML = "";
      bgElem.appendChild(solidBg);
    }
  };
  var createStaticBg = () => {
    solidBg = null;
    animatedBg = null;
    if (!bgElem) ensureBgInDOM();
    if (!staticImage && bgElem) {
      staticImage = createElement("img", {
        className: "static-bg",
        style: {
          display: "block",
          height: "100%",
          width: "100%",
          objectFit: "cover",
          filter: "var(--static-bg-filter)"
        }
      });
      bgElem.innerHTML = "";
      bgElem.appendChild(staticImage);
    }
  };
  var createAnimatedBg = () => {
    staticImage = null;
    solidBg = null;
    if (!bgElem) ensureBgInDOM();
    if (!animatedBg && bgElem) {
      animatedBg = createElement("div", {
        className: "animated-bg-wrapper",
        style: {
          position: "relative",
          height: "100%",
          width: "100%"
        }
      });
      bgElem.innerHTML = `
<style>
.img{ position: absolute; border-radius: 20em; width: 200%; animation: animBg 40s linear infinite;}
.img-0 { right: 30%; top: 0; z-index: 2 }
.img-1 { animation-direction: reverse; bottom: 0; left: 0; z-index: 1}
.img-2 { animation-direction: reverse; right: -50%; top: -20%; width: 300%; z-index: 0 }
@keyframes animBg { 0% { transform: rotate(0deg) translate3d(0px,0px,0px); } to { transform: rotate(1turn) translate3d(0px,0px,0px); } }
</style>
`;
      for (let i = 0; i < 3; i++) {
        const imgDiv = createElement("img", {
          className: `img img-${i}`,
          style: {
            willChange: "transform",
            backgroundImage: "url(var(--image-url))"
          }
        });
        animatedBg.appendChild(imgDiv);
      }
      bgElem.appendChild(animatedBg);
    }
  };
  var applyBgSettings = (settings = setting_default.getState()) => {
    const background = settings.background;
    switch (background.mode) {
      case "solid": {
        if (!solidBg) createSolidBg();
        const { hex, alpha } = background.options.solid.color;
        solidBg?.style.setProperty("--solid-bg-color", `${hex}${alphaToHex(alpha)}`);
        break;
      }
      case "static": {
        if (!staticImage) createStaticBg();
        if (!staticImage) return;
        const { filter, isCustomImage } = background.options.static;
        if (isCustomImage) {
          staticImage.setAttribute("custom-image", "");
        } else {
          staticImage.removeAttribute("custom-image");
        }
        staticImage.style.setProperty("--static-bg-filter", serializeCSSFilters(filter));
        reloadBgImage();
        break;
      }
      case "animated": {
        if (!animatedBg) createAnimatedBg();
        if (!animatedBg) return;
        const { filter } = background.options.animated;
        if (animatedBg) {
          animatedBg.style.filter = serializeCSSFilters(filter);
        }
        reloadBgImage();
        break;
      }
      default: {
        console.error("Unexpected background mode:", background.mode);
        showNotification("Unexpected error setting background.");
        break;
      }
    }
  };
  var setBgImage = (imageUrl) => {
    if (bgElem && imageUrl) {
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        if (!bgElem) {
          ensureBgInDOM();
        }
        if (staticImage) staticImage.src = imageUrl ?? "";
        if (animatedBg) {
          const elems = animatedBg.querySelectorAll("img");
          for (const elem of elems) {
            elem.src = imageUrl ?? "";
          }
        }
      };
    }
  };
  var ensureBgInDOM = () => {
    if (!bgWrapper) {
      bgWrapper = createElement("div", {
        className: "lucid-bg-wrapper",
        style: {
          display: "block",
          position: "fixed",
          height: "100vh",
          width: "100vw",
          zIndex: "-1",
          top: "0",
          left: "0",
          overflow: "hidden"
        }
      });
      const mainElement = document.getElementById("main");
      (mainElement ?? document.body).prepend(bgWrapper);
    }
    if (!bgElem) {
      bgElem = createElement("div", {
        className: "lucid-bg",
        style: {
          display: "block",
          height: "100%",
          width: "100%",
          overflow: "hidden"
        }
      });
      bgWrapper.prepend(bgElem);
    }
  };
  var reloadBgImage = async () => {
    const settings = setting_default.getState();
    if (settings.background.mode === "solid") return;
    let imageUrl = "";
    if (settings.background.options.static.isCustomImage) {
      if (settings.customImage.type === "local") {
        imageUrl = await getImageData();
      } else {
        imageUrl = settings.customImage.options.url.data;
      }
    } else {
      imageUrl = npvState.getState().url;
    }
    setBgImage(imageUrl ?? "");
  };
  function initBackground() {
    ensureBgInDOM();
    applyBgSettings();
    reloadBgImage();
    setting_default.subscribe((state) => {
      applyBgSettings(state);
    }, "background");
    setting_default.subscribe(() => {
      reloadBgImage();
    }, "customImage.type");
    npvState.subscribe(() => {
      reloadBgImage();
    });
  }

  // extension/hooks/settings.ts
  var _openSettings = null;
  var _closeSettings = null;
  var settingModal = new FloatingModal();
  var openSettings = () => {
    _openSettings?.();
  };
  var closeSettings = () => {
    _closeSettings?.();
  };
  var getSettingsContents = () => {
    const settingsContainer = createElement("div", { id: "settings-container" });
    const settingSectionElement = new SettingsMain();
    settingSectionElement.isRender = true;
    settingSectionElement.options = getSettings();
    setting_default.subscribe((state) => {
      settingSectionElement.options = getSettings(state);
    });
    settingsContainer.appendChild(settingSectionElement);
    return settingsContainer;
  };
  function mountSettings() {
    settingModal.isFloating = modalState.getState().isFloating;
    settingModal.setContent(getSettingsContents());
    modalState.subscribe((state) => {
      settingModal.isFloating = state.isFloating;
    }, "isFloating");
    document.getElementById("main")?.append(settingModal);
    _openSettings = () => settingModal.open();
    _closeSettings = () => settingModal.close();
    addSettingAccess(setting_default.getState().position, openSettings);
    setting_default.subscribe((state) => {
      if (_openSettings) addSettingAccess(state.position, openSettings);
    }, "position");
  }
  var fieldTexts = {
    floatWin: ["Floating Window", "Allows settings to float. Drag header to reposition."],
    winPos: ["Window Position", "Settings window opens from context menu or nav bar."],
    bgMode: ["Mode", "Select background type."],
    solidColor: ["Solid Color", "Pick solid background color."],
    custImg: ["Custom Image", "Use custom image URL for static background."],
    custUMVImg: ["Custom Image", "Use custom image URL for playlist background."],
    imgSrc: ["Image Source", "Upload image or use URL for custom background."],
    custImgUrl: ["Custom Image URL", "Enter image URL for static background."],
    custImgInput: ["Select Custom Image", "Select local image for static background."],
    custImgLocal: ["Select Local Image", "Select images for static background."],
    filterBlur: ["Blur", "Blur level of image (0-200)."],
    filterBlurCustom: ["Blur (Custom)", "Blur level for custom page background (0-200)."],
    filterBlurNormal: ["Blur (Default)", "Blur level for default page background (0-200)."],
    filterBlurNpv: ["Blur (NPV)", "Blur level for NPV page background (0-200)."],
    filterExtendedBlur: [
      "Extended background Blur",
      "Blur level of extended page background (0-200)."
    ],
    filterBright: ["Brightness", "Brightness of image (0-200)."],
    filterSat: ["Saturation", "Saturation of image (0-200)."],
    dynColor: ["Dynamic Color", "Dynamic color themes based on artwork."],
    tonalColor: ["Tonal Color", "Tonal color scheme for UI."],
    custColorEnable: ["Custom Color", "Enable custom color to override theme color."],
    custColorPicker: [
      "Select Custom Color",
      `Choose base theme color. Preview: <a href="https://material-foundation.github.io/material-theme-builder/">Material Theme Builder</a>`
    ],
    gFontsEnable: ["Google Fonts", "Enable fonts from Google Fonts."],
    gFontsUrl: ["Google Fonts URL", "URL of Google Fonts stylesheet."],
    fontFamily: ["Font Family", "Font family for UI when Google Fonts disabled."],
    grainType: ["Grain Type", "Type of grain effect overlay."],
    winCtrlHeight: ["Control Height", "Height of window control buttons on Windows (0-200)."],
    winPanelGap: ["Panel Gap", "Gap between main cards."],
    borderThick: ["Thickness", "Thickness of interface border (0-10)."],
    borderColor: ["Color", "Color of application border."],
    borderStyle: ["Style", "Visual style of interface border."],
    pagesBgStyle: ["Style", "Background display on pages."],
    pagesImageStyle: ["Image Style", "Image on pages. (playlist/album art)"],
    homeHeaderBg: ["Home Header Background", "Enable/Disable Home header background."],
    scrollUmvBg: ["Scroll Background", "Scroll background main view background."],
    scaleUmvBg: ["Scale Background", "Scale background main view background."],
    rsbViewMode: ["View Mode", "Normal or compact 'Now Playing' sidebar."],
    rsbSize: ["Compact Sidebar Width", "Width of compact 'Now Playing' sidebar (0-512px)."],
    rsbPos: ["Position", "Position of compact 'Now Playing' sidebar."],
    rsbBgBlur: ["Blur", "Background blur of compact 'Now Playing' view (0-256)."],
    rsbCustBgEnable: ["Custom Background", "Enable custom background for Now Playing view."],
    rsbBgColor: ["Color", "Background color for 'Now Playing' sidebar."],
    rsbBgAlpha: ["Alpha", "Background transparency (alpha) value (0-100)."],
    rsbBorderAlpha: ["Border Alpha", "Border transparency (alpha) value (0-100)."],
    playbarType: ["Playbar Type", "Default or Compact playbar style."],
    compactPbHideIcons: [
      "Hide Extra Playbar Icons",
      "Hides extra icons in compact playbar (on hover)."
    ],
    compactPbBorderRad: ["Border Radius", "Border Radius of compact playbar in pixels."],
    normalPbBorderRad: ["Border Radius", "Border Radius of normal playbar in pixels."],
    compactPbImgBorderRad: [
      "Art Border Radius",
      "Border Radius of the cover image in compact playbar in pixels."
    ],
    normalPbImgBorderRad: [
      "Art Border Radius",
      "Border Radius of the cover image in normal playbar in pixels."
    ],
    compactPbHeight: ["Height", "Height of compact playbar in pixels."],
    normalPbHeight: ["Height", "Height of normal playbar in pixels."],
    playbarFloat: ["Floating", "Now playing bar is floating."],
    pbBackdropBlur: ["Backdrop Blur", "Blur of normal playbar backdrop (0-256)."],
    pbBackdropSat: ["Backdrop Saturation", "Saturation of normal playbar backdrop (0-256)."],
    pbBackdropBright: ["Backdrop Brightness", "Brightness of normal playbar backdrop (0-256)."],
    showChangelog: ["Show Changelog", "Changelog modal after updates."],
    lucidTour: ["Take a Lucid Tour", "Guided walkthrough of Lucid theme features."],
    exportSettings: ["Export Settings", "Export settings to clipboard as JSON."],
    importSettings: ["Import Settings", "Import settings from JSON."],
    resetSettings: ["Reset All Settings", "Reset all settings to default values (irreversible)."],
    pagesScrollType: ["Image Source", "Now Playing View art or default playlist art for pages."]
  };
  function getSettings(state = setting_default.getState(), settings = setting_default) {
    const field = (key, inputOptions, render) => ({
      render: render === void 0 ? true : render,
      inputOptions,
      label: fieldTexts[key][0],
      tooltip: fieldTexts[key][1],
      key: key.replace(/([A-Z])/g, "-$1").toLowerCase()
    });
    return [
      {
        name: "General",
        render: true,
        groups: [
          {
            render: true,
            name: "Behavior",
            key: "group-behavior",
            showName: false,
            fields: [
              field("lucidTour", {
                type: "button",
                buttonType: "primary",
                contents: "Start",
                onClick: () => {
                  localStorage.removeItem("lucid-guided-tour");
                  closeSettings();
                  mountAndOpenGuide(true);
                }
              }),
              field("floatWin", {
                type: "checkbox",
                checked: modalState.getState().isFloating,
                onChange: (isFloating) => {
                  modalState.setState((state2) => ({ ...state2, isFloating }));
                }
              }),
              field("winPos", {
                type: "select",
                value: state.position,
                options: [
                  { label: "Context Menu", value: "context-menu" },
                  { label: "Navigation Bar", value: "nav" }
                ],
                onChange: (value) => {
                  settings.setPosition(value);
                }
              })
            ]
          }
        ]
      },
      {
        name: "Background",
        render: true,
        groups: [
          {
            render: true,
            name: "Mode",
            key: "group-background-mode",
            fields: [
              field("bgMode", {
                type: "select",
                value: state.background.mode,
                options: [
                  { label: "Animated", value: "animated" },
                  { label: "Solid Color", value: "solid" },
                  { label: "Static Image", value: "static" }
                ],
                onChange: (value) => {
                  settings.setBackgroundMode(value);
                }
              })
            ]
          },
          {
            name: "Background",
            key: "group-bg-background",
            render: true,
            fields: [
              field(
                "solidColor",
                {
                  type: "color",
                  value: state.background.options.solid.color.hex,
                  onChange: (hex) => {
                    settings.setSolidBackgroundColor({ hex });
                  }
                },
                state.background.mode === "solid"
              ),
              field(
                "rsbBgAlpha",
                {
                  type: "number",
                  value: state.background.options.solid.color.alpha,
                  validator: isValidNumberInRange100,
                  onChange: (alpha) => {
                    settings.setSolidBackgroundColor({ alpha });
                  }
                },
                state.background.mode === "solid"
              ),
              field(
                "custImg",
                {
                  type: "checkbox",
                  checked: state.background.options.static.isCustomImage,
                  onChange: (isCustomImage) => {
                    settings.setStaticBackgroundOptions({ isCustomImage });
                  }
                },
                state.background.mode !== "solid"
              ),
              field(
                "imgSrc",
                {
                  type: "select",
                  value: state.customImage.type,
                  options: [
                    { label: "Local", value: "local" },
                    { label: "From Url", value: "url" }
                  ],
                  onChange: (type) => {
                    settings.setCustomImageType(type);
                  }
                },
                state.background.mode !== "solid" && state.background.options.static.isCustomImage
              ),
              field(
                "custImgUrl",
                {
                  type: "text",
                  value: state.customImage.options.url.data ?? "Enter Image URL",
                  validator: isValidUrl,
                  onChange: (data) => {
                    settings.setCustomImageOptions("url", { data });
                  }
                },
                state.background.mode !== "solid" && state.background.options.static.isCustomImage && state.customImage.type === "url"
              ),
              field(
                "custImgInput",
                {
                  type: "image",
                  onChange: (data) => {
                    if (data) addImage(data, reloadBgImage);
                  }
                },
                state.background.mode !== "solid" && state.background.options.static.isCustomImage && state.customImage.type === "local"
              )
            ]
          },
          {
            render: state.background.mode !== "solid",
            name: "Filters",
            key: "group-bg-filters",
            fields: [
              field(
                "filterBlur",
                {
                  type: "number",
                  value: state.background.options.static.filter.blur,
                  onChange: (blur) => {
                    settings.setStaticBackgroundFilter({ blur });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                state.background.mode === "static"
              ),
              field(
                "filterBright",
                {
                  type: "number",
                  value: state.background.options.static.filter.brightness,
                  onChange: (brightness) => {
                    settings.setStaticBackgroundFilter({ brightness });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                state.background.mode === "static"
              ),
              field(
                "filterSat",
                {
                  type: "number",
                  value: state.background.options.static.filter.saturate,
                  onChange: (saturate) => {
                    settings.setStaticBackgroundFilter({ saturate });
                  },
                  step: 0.1,
                  validator: isValidNumberInRange200
                },
                state.background.mode === "static"
              ),
              field(
                "filterBlur",
                {
                  type: "number",
                  value: state.background.options.animated.filter.blur,
                  onChange: (blur) => {
                    settings.setAnimatedBackgroundFilter({ blur });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                state.background.mode === "animated"
              ),
              field(
                "filterBright",
                {
                  type: "number",
                  value: state.background.options.animated.filter.brightness,
                  onChange: (brightness) => {
                    settings.setAnimatedBackgroundFilter({ brightness });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                state.background.mode === "animated"
              ),
              field(
                "filterSat",
                {
                  type: "number",
                  value: state.background.options.animated.filter.saturate,
                  onChange: (saturate) => {
                    settings.setAnimatedBackgroundFilter({ saturate });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                state.background.mode === "animated"
              )
            ]
          },
          {
            render: true,
            name: "Color",
            key: "group-color",
            fields: [
              field("dynColor", {
                type: "checkbox",
                checked: state.color.isDynamic,
                onChange: (value) => {
                  settings.setDynamicColor(value);
                }
              }),
              field("tonalColor", {
                type: "checkbox",
                checked: state.color.isTonal,
                onChange: (value) => {
                  settings.setTonalColor(value);
                }
              }),
              field(
                "custColorEnable",
                {
                  type: "checkbox",
                  checked: state.color.isCustom,
                  onChange: (value) => {
                    settings.setIsCustomColor(value);
                  }
                },
                !state.color.isDynamic
              ),
              field(
                "custColorPicker",
                {
                  type: "color",
                  value: state.color.customColor.hex,
                  onChange: (hex) => {
                    settings.setCustomColor({ hex });
                  }
                },
                !state.color.isDynamic && state.color.isCustom
              )
            ]
          }
        ]
      },
      {
        name: "Interface",
        render: true,
        groups: [
          {
            render: true,
            name: "Font",
            key: "group-font",
            fields: [
              field("gFontsEnable", {
                type: "checkbox",
                checked: state.font.isGoogleFonts,
                onChange: (isGoogleFonts) => {
                  settings.setFont({ isGoogleFonts });
                }
              }),
              field(
                "gFontsUrl",
                {
                  type: "text",
                  value: state.font.fontUrl || "",
                  validator: isValidGoogleFontURL,
                  onChange: (fontUrl) => {
                    settings.setFont({ fontUrl });
                  }
                },
                state.font.isGoogleFonts
              ),
              field(
                "fontFamily",
                {
                  type: "text",
                  value: state.font.fontFamily || "",
                  onChange: (fontFamily) => {
                    settings.setFont({ fontFamily });
                  }
                },
                !state.font.isGoogleFonts
              )
            ]
          },
          {
            render: true,
            key: "group-grain-effect",
            name: "Grain Effect",
            fields: [
              field("grainType", {
                type: "select",
                value: state.grains.type,
                options: [
                  { label: "Normal", value: "default" },
                  { label: "Starry", value: "starry" },
                  { label: "None", value: "none" }
                ],
                onChange: (value) => {
                  settings.setGrainsType(value);
                }
              })
            ]
          },
          {
            render: true,
            key: "group-window-controls",
            name: "Window",
            fields: [
              field("winPanelGap", {
                type: "number",
                step: 1,
                value: state.pages.panelGap,
                validator: isValidNumberInRange100,
                onChange: (panelGap) => {
                  settings.setPages({ panelGap });
                }
              }),
              field(
                "winCtrlHeight",
                {
                  type: "number",
                  step: 1,
                  value: state.control.height,
                  validator: isValidNumberInRange200,
                  onChange: (value) => {
                    settings.setControlHeight(value);
                  }
                },
                isWindows()
              )
            ]
          },
          {
            render: true,
            key: "group-border",
            name: "Border",
            fields: [
              field("borderThick", {
                type: "number",
                step: 1,
                value: state.border.thickness,
                validator: isValidNumberInRange10,
                onChange: (thickness) => {
                  settings.setBorder({ thickness });
                }
              }),
              field("borderStyle", {
                type: "select",
                options: [
                  { label: "None", value: "none" },
                  { label: "Solid", value: "solid" },
                  { label: "Dotted", value: "dotted" },
                  { label: "Dashed", value: "dashed" },
                  { label: "Double", value: "double" },
                  { label: "Groove", value: "groove" },
                  { label: "Ridge", value: "ridge" },
                  { label: "Inset", value: "inset" },
                  { label: "Outset", value: "outset" }
                ],
                onChange: (style) => {
                  settings.setBorder({ style });
                },
                value: state.border.style
              }),
              field("borderColor", {
                type: "color",
                value: state.border.color.hex,
                onChange: (hex) => {
                  settings.setBorderColor({ hex });
                }
              }),
              field("rsbBorderAlpha", {
                type: "number",
                value: state.border.color.alpha,
                validator: isValidNumberInRange100,
                onChange: (alpha) => {
                  settings.setBorderColor({ alpha });
                }
              })
            ]
          },
          {
            render: true,
            key: "group-now-playing-view",
            name: "Now Playing View",
            fields: [
              field("rsbViewMode", {
                type: "select",
                value: state.rightSidebar.mode,
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Compact", value: "compact" }
                ],
                onChange: (mode) => {
                  settings.setRightSidebar({ mode });
                }
              }),
              field(
                "rsbSize",
                {
                  type: "number",
                  value: state.rightSidebar.size,
                  validator: isValidNumberInRange512,
                  onChange: (size) => {
                    settings.setRightSidebar({ size });
                  }
                },
                state.rightSidebar.mode === "compact"
              ),
              field(
                "rsbPos",
                {
                  type: "select",
                  value: state.rightSidebar.position,
                  options: [
                    { label: "Top Left", value: "top left" },
                    { label: "Top Right", value: "top right" },
                    { label: "Bottom Left", value: "bottom left" },
                    { label: "Bottom Right", value: "bottom right" }
                  ],
                  onChange: (position) => {
                    settings.setRightSidebar({ position });
                  }
                },
                state.rightSidebar.mode === "compact"
              ),
              field(
                "rsbBgBlur",
                {
                  type: "number",
                  value: state.rightSidebar.blur,
                  validator: isValidNumberInRange256,
                  onChange: (blur) => {
                    settings.setRightSidebar({ blur });
                  }
                },
                state.rightSidebar.mode === "compact"
              ),
              field("rsbCustBgEnable", {
                type: "checkbox",
                checked: state.rightSidebar.isCustomBg,
                onChange: (isCustomBg) => {
                  settings.setRightSidebar({ isCustomBg });
                }
              }),
              field(
                "rsbBgColor",
                {
                  type: "color",
                  value: state.rightSidebar.color.hex,
                  onChange: (hex) => {
                    settings.setRightSidebarColor({ hex });
                  }
                },
                state.rightSidebar.isCustomBg
              ),
              field(
                "rsbBgAlpha",
                {
                  type: "number",
                  value: state.rightSidebar.color.alpha,
                  validator: isValidNumberInRange100,
                  onChange: (alpha) => {
                    settings.setRightSidebarColor({ alpha });
                  }
                },
                state.rightSidebar.isCustomBg
              )
            ]
          }
        ]
      },
      {
        name: "Page Settings",
        render: true,
        groups: [
          {
            render: true,
            key: "group-page-style",
            name: "Page Styles",
            fields: [
              field("homeHeaderBg", {
                type: "checkbox",
                checked: state.pages.hideHomeHeader,
                onChange: (hideHomeHeader) => {
                  settings.setPages({ hideHomeHeader });
                }
              }),
              field("pagesBgStyle", {
                type: "select",
                value: state.pages.style,
                onChange: (style) => {
                  settings.setPageStyle(style);
                },
                options: [
                  { label: "Default", value: "normal" },
                  { label: "Card", value: "card" },
                  { label: "Compact", value: "compact" },
                  { label: "Compact Card", value: "compact-card" }
                ]
              }),
              field("pagesImageStyle", {
                type: "select",
                value: state.pages.imageStyle,
                onChange: (style) => {
                  settings.setPageImageStyle(style);
                },
                options: [
                  { label: "Default", value: "default" },
                  { label: "As Bg", value: "as-bg" },
                  { label: "Hidden", value: "hidden" }
                ]
              }),
              field("pagesScrollType", {
                type: "select",
                value: state.pages.umv.type,
                options: [
                  { value: "normal", label: "Default" },
                  { value: "custom", label: "Custom" },
                  { value: "npv", label: "Now Playing Art" }
                ],
                onChange: (type) => {
                  settings.setUMV({ type });
                }
              }),
              field(
                "custUMVImg",
                {
                  type: "text",
                  validator: isValidUrl,
                  value: state.pages.umv.options.custom.url ?? "Enter a Url",
                  onChange: (url) => {
                    settings.setUMVOption("custom", { url });
                  }
                },
                state.pages.umv.type === "custom"
              )
            ]
          },
          {
            key: "group-page-image-filter",
            name: "Page Background Image Filter",
            render: true,
            fields: [
              field(
                "filterBlurCustom",
                {
                  type: "number",
                  validator: isValidNumberInRange200,
                  value: state.pages.umv.options.custom.filter?.blur,
                  onChange: (blur) => {
                    settings.setUMVFilter("custom", { blur });
                  }
                },
                state.pages.umv.type === "custom"
              ),
              field(
                "filterBlurNormal",
                {
                  type: "number",
                  validator: isValidNumberInRange200,
                  value: state.pages.umv.options.normal.filter?.blur,
                  onChange: (blur) => {
                    settings.setUMVFilter("normal", { blur });
                  }
                },
                state.pages.umv.type === "normal"
              ),
              field(
                "filterBlurNpv",
                {
                  type: "number",
                  validator: isValidNumberInRange200,
                  value: state.pages.umv.options.npv.filter?.blur,
                  onChange: (blur) => {
                    settings.setUMVFilter("npv", { blur });
                  }
                },
                state.pages.umv.type === "npv"
              ),
              field("filterExtendedBlur", {
                type: "number",
                validator: isValidNumberInRange200,
                value: state.pages.umv.options.expanded.filter?.blur,
                onChange: (blur) => {
                  settings.setUMVFilter("expanded", { blur });
                }
              })
            ]
          },
          {
            key: "group-page-bg-behavior",
            name: "Background Behavior",
            render: true,
            fields: [
              field("scrollUmvBg", {
                type: "checkbox",
                checked: state.pages.umv.isScroll,
                onChange: (isScroll) => {
                  settings.setUMV({ isScroll });
                }
              }),
              field("scaleUmvBg", {
                type: "checkbox",
                checked: state.pages.umv.isScaling,
                onChange: (isScaling) => {
                  settings.setUMV({ isScaling });
                }
              })
            ]
          }
        ]
      },
      {
        name: "Playbar Settings",
        render: true,
        groups: [
          {
            render: true,
            name: "General",
            key: "group-playbar-general",
            showName: false,
            fields: [
              field("playbarType", {
                type: "select",
                value: state.playbar.type,
                onChange: (type) => {
                  settings.setPlaybar({ type });
                },
                options: [
                  { label: "Default", value: "normal" },
                  { label: "Compact", value: "compact" }
                ]
              }),
              field("playbarFloat", {
                type: "checkbox",
                checked: state.playbar.isFloating,
                onChange: (isFloating) => {
                  settings.setPlaybar({ isFloating });
                }
              })
            ]
          },
          {
            render: state.playbar.type === "compact",
            name: "Compact Playbar",
            key: "group-playbar-compact",
            showName: true,
            fields: [
              field("compactPbHideIcons", {
                type: "checkbox",
                checked: state.playbar.hideIcons,
                onChange: (hideIcons2) => {
                  settings.setPlaybar({ hideIcons: hideIcons2 });
                }
              }),
              field("compactPbHeight", {
                type: "number",
                value: state.playbar.options.compact.height,
                validator: isValidNumberInRange512,
                onChange: (height) => {
                  settings.setPlaybarOptions("compact", { height });
                }
              }),
              field("compactPbBorderRad", {
                type: "number",
                value: state.playbar.options.compact.borderRadius,
                validator: isValidNumberInRange512,
                onChange: (borderRadius) => {
                  settings.setPlaybarOptions("compact", { borderRadius });
                }
              }),
              field(
                "pbBackdropBlur",
                {
                  type: "number",
                  value: state.playbar.options.compact.backdropFilter.blur,
                  validator: isValidNumberInRange256,
                  onChange: (blur) => {
                    settings.setPlaybarFilter("compact", { blur });
                  }
                },
                state.playbar.isFloating
              ),
              field(
                "pbBackdropSat",
                {
                  type: "number",
                  value: state.playbar.options.compact.backdropFilter.saturate,
                  validator: isValidNumberInRange256,
                  onChange: (saturate) => {
                    settings.setPlaybarFilter("compact", { saturate });
                  }
                },
                state.playbar.isFloating
              ),
              field(
                "pbBackdropBright",
                {
                  type: "number",
                  value: state.playbar.options.compact.backdropFilter.brightness,
                  validator: isValidNumberInRange256,
                  onChange: (brightness) => {
                    settings.setPlaybarFilter("compact", { brightness });
                  }
                },
                state.playbar.isFloating
              ),
              field("compactPbImgBorderRad", {
                type: "number",
                value: state.playbar.options.compact.imageRadius,
                validator: isValidNumberInRange512,
                onChange: (imageRadius) => {
                  settings.setPlaybarOptions("compact", { imageRadius });
                }
              })
            ]
          },
          {
            render: state.playbar.type === "normal",
            name: "Normal Playbar",
            key: "group-playbar-normal",
            showName: true,
            fields: [
              field("normalPbHeight", {
                type: "number",
                value: state.playbar.options.normal.height,
                validator: isValidNumberInRange512,
                onChange: (height) => {
                  settings.setPlaybarOptions("normal", { height });
                }
              }),
              field("normalPbBorderRad", {
                type: "number",
                value: state.playbar.options.normal.borderRadius,
                validator: isValidNumberInRange512,
                onChange: (borderRadius) => {
                  settings.setPlaybarOptions("normal", { borderRadius });
                }
              }),
              field(
                "pbBackdropBlur",
                {
                  type: "number",
                  value: state.playbar.options.normal.backdropFilter.blur,
                  validator: isValidNumberInRange256,
                  onChange: (blur) => {
                    settings.setPlaybarFilter("normal", { blur });
                  }
                },
                state.playbar.isFloating
              ),
              field(
                "pbBackdropSat",
                {
                  type: "number",
                  value: state.playbar.options.normal.backdropFilter.saturate,
                  validator: isValidNumberInRange256,
                  onChange: (saturate) => {
                    settings.setPlaybarFilter("normal", { saturate });
                  }
                },
                state.playbar.isFloating
              ),
              field(
                "pbBackdropBright",
                {
                  type: "number",
                  value: state.playbar.options.normal.backdropFilter.brightness,
                  validator: isValidNumberInRange256,
                  onChange: (brightness) => {
                    settings.setPlaybarFilter("normal", { brightness });
                  }
                },
                state.playbar.isFloating
              ),
              field("normalPbImgBorderRad", {
                type: "number",
                value: state.playbar.options.normal.imageRadius,
                validator: isValidNumberInRange512,
                onChange: (imageRadius) => {
                  settings.setPlaybarOptions("normal", { imageRadius });
                }
              })
            ]
          }
        ]
      },
      {
        name: "Advanced Settings",
        render: true,
        groups: [
          {
            render: true,
            name: "App Settings",
            key: "group-application-settings",
            showName: false,
            fields: [
              field("showChangelog", {
                type: "checkbox",
                checked: state.showChangelog,
                onChange: (state2) => {
                  settings.setChangelog(state2);
                }
              }),
              field("exportSettings", {
                type: "button",
                buttonType: "primary",
                contents: "Copy Settings",
                onClick: () => {
                  copyToClipboard(settings.exportSettings(), "Settings copied to clipboard!");
                }
              }),
              field("importSettings", {
                type: "text",
                value: "",
                validator: (text) => {
                  try {
                    if (isValidAppSettings(JSON.parse(text))) return { isValid: true };
                    return { isValid: false, message: "Not a valid lucid settings." };
                  } catch {
                    return { isValid: false, message: "Not a valid lucid settings." };
                  }
                },
                onChange: (json) => {
                  settings.importSettings(json);
                }
              }),
              field("resetSettings", {
                type: "button",
                buttonType: "danger",
                contents: "Reset",
                onClick: () => {
                  if (confirm(
                    "Are you sure you want to reset all settings to default values? This action cannot be undone."
                  )) {
                    settings.resetState();
                    window.location.reload();
                  }
                }
              })
            ]
          }
        ]
      }
    ];
  }

  // extension/hooks/npv.ts
  function mountNPVStyles(settings = setting_default.getState().rightSidebar) {
    if (settings.position) {
      document.body.setAttribute("npv-position", settings.position);
    } else document.body.removeAttribute("npv-position");
    if (settings.mode) {
      document.body.setAttribute("npv-mode", settings.mode);
    } else document.body.removeAttribute("npv-mode");
    document.body.style.setProperty("--npv-blur", `${settings.blur}px`);
    if (settings.isCustomBg)
      document.body.style.setProperty(
        "--npv-bg-color",
        `${settings.color.hex}${alphaToHex(settings.color.alpha)}`
      );
    else document.body.style.removeProperty("--npv-bg-color");
    function updateVariable(value) {
      document.body.style.setProperty("--npv-size", `${value}px`);
    }
    updateVariable(settings.size);
  }
  function mountNPV() {
    mountNPVStyles();
    setting_default.subscribe((state) => {
      mountNPVStyles(state.rightSidebar);
    }, "rightSidebar");
  }

  // extension/hooks/grains.ts
  var currentGrainType = null;
  function mountGrainStyles(settings = setting_default.getState().grains) {
    const newGrainType = settings.type;
    if (currentGrainType === newGrainType) return;
    if (currentGrainType) {
      document.body.classList.remove(`grain-${currentGrainType}`);
    }
    if (newGrainType) {
      document.body.setAttribute("grain-type", newGrainType);
      document.body.classList.add(`grain-${newGrainType}`);
    } else {
      document.body.removeAttribute("grain-type");
    }
    currentGrainType = newGrainType;
  }
  function mountGrains() {
    mountGrainStyles();
    setting_default.subscribe((state) => {
      mountGrainStyles(state.grains);
    }, "grains");
  }

  // extension/components/changelog/changelog.ts
  function compareVersions(v1, v2) {
    const parts1 = v1.split(".").map(Number);
    const parts2 = v2.split(".").map(Number);
    const maxLength = Math.max(parts1.length, parts2.length);
    for (let i = 0; i < maxLength; i++) {
      const p1 = parts1[i] || 0;
      const p2 = parts2[i] || 0;
      if (p1 > p2) return 1;
      if (p1 < p2) return -1;
    }
    return 0;
  }
  var Changelog = class extends HTMLElement {
    _data = null;
    _currentVersion;
    hasUpdate = false;
    constructor(data) {
      super();
      this._currentVersion = APPLICATION_VERSION;
      if (data) {
        this._data = data;
        this.hasUpdate = this.checkForUpdate();
      }
    }
    connectedCallback() {
      lazyLoadStyleById("lucid-changelog").textContent = ".changelog-entry,.update-available-header {  padding: 1rem 1rem;  background-color: rgba(var(--clr-on-secondary-rgb), 0.5);  color: var(--clr-secondary);  margin-bottom: 0.5rem;  border-radius: 0.5rem;}.update-available-header {  text-align: center;  font-size: 1.8em;  color: var(--clr-primary);}.changelog-entry > p {  margin-bottom: 0.5rem;}.changes-wrapper {  display: flex;  flex-wrap: wrap;  gap: 0.5rem;}.changelog-entry,.update-available-header,.change-card {  border: var(--border-thickness, 1px) var(--border-style, solid)    var(--border-color, var(--clr-surface-5, #1c1b1e));}.change-card {  flex-grow: 1;  padding: 10px;  border-radius: 0.75rem;  min-width: 10em;}.change-card:nth-child(2n) {  background-color: rgba(var(--clr-on-primary-rgb), 0.7);  color: var(--clr-primary);}.change-card:nth-child(2n + 1) {  background-color: rgba(var(--clr-on-secondary-rgb), 0.7);  color: var(--clr-secondary);}.change-card:nth-child(2n + 3) {  background-color: rgba(var(--clr-on-tertiary-rgb), 0.7);  color: var(--clr-tertiary);}.change-card li {  list-style: disc;  margin-left: 2rem;}.change-card li:marker {  right: 4px;}";
      this.render();
    }
    checkForUpdate() {
      if (this._data && this._data.length > 0 && this._currentVersion) {
        const firstChangelogVersion = this._data[0].version;
        return compareVersions(firstChangelogVersion, this._currentVersion) > 0;
      }
      return false;
    }
    render() {
      this.innerHTML = "";
      if (!this._data) {
        this.innerHTML = "<p>Error loading changelog data.</p>";
        console.error("Invalid changelog data format.");
        return;
      }
      if (this._data.length < 1) {
        this.innerHTML = "<p>No changelog entries available.</p>";
        console.warn("No elements present to show changelog.");
        return;
      }
      const changelogEntriesHTML = this._data.map((entry) => {
        let changesHTML = "";
        for (const changeType in entry.changes) {
          if (Object.prototype.hasOwnProperty.call(entry.changes, changeType)) {
            const changesArray = entry.changes[changeType];
            if (changesArray && changesArray.length > 0) {
              const itemsHTML = changesArray.map((change) => `<li>${change}</li>`).join("");
              changesHTML += `
                    <div class="change-card">
                      <h3 class='encore-text encore-text-small-bold'>${changeType}</h3>
                      <ul>${itemsHTML}</ul>
                    </div>
                  `;
            }
          }
        }
        const descHTML = entry.desc ? `<p>${entry.desc}</p>` : "";
        return `
              <div class="changelog-entry">
                <h2>${entry.version} - ${entry.date}</h2>
                ${descHTML}
                <div class="changes-wrapper">
                  ${changesHTML}
                </div>
              </div>
            `;
      }).join("");
      let updateAvailableHTML = "";
      if (this.hasUpdate) {
        updateAvailableHTML = `<h1 class="update-available-header">Update Available</h1>`;
      }
      const container = document.createElement("div");
      container.innerHTML = `
        ${updateAvailableHTML}
        <div class="changelog-entries-container">${changelogEntriesHTML}</div>`;
      this.appendChild(container);
    }
    updateData(data) {
      this._data = data;
      this.hasUpdate = this.checkForUpdate();
      this.render();
    }
  };
  customElements.define("changelog-component", Changelog);

  // extension/changelog/changelog.ts
  async function getChangelogData() {
    try {
      const changelogData = await fetchAndCache(
        CHANGELOG_DATA_URLS,
        CHANGELOG_DATA_STORAGE_KEY,
        21600
      );
      const parsedData = JSON.parse(changelogData);
      return parsedData;
    } catch (error) {
      console.error("Error fetching changelog.", error);
      return [];
    }
  }
  async function mountChangelog(targetElement = document.body) {
    if (!setting_default.getState().showChangelog) return;
    const data = await getChangelogData();
    if (typeof data === "object" && data.length < 1) {
      console.error("Changelog data not found.");
      return;
    }
    const modal = new Modal();
    modal.setHeader("Lucid Changelog");
    const element = new Changelog(data);
    const hasShown = localStorage.getItem(LUCID_VERSION_STORAGE_KEY) === APPLICATION_VERSION;
    if (!hasShown || element.hasUpdate) {
      modal.setContent(element);
      targetElement.appendChild(modal);
      modal.open();
      localStorage.setItem(LUCID_VERSION_STORAGE_KEY, APPLICATION_VERSION);
    } else {
      console.debug("Changelog already shown for this version.");
    }
  }

  // extension/utils/setGlobals.ts
  var setGlobals_default = () => {
    window.lucid = {
      config: () => setting_default.getState(),
      reset: () => {
        setting_default.resetState();
      },
      store: setting_default,
      version: localStorage.getItem(LUCID_VERSION_STORAGE_KEY) ?? "2.1.2",
      settings: { openSettings, closeSettings, settingModal }
    };
  };

  // extension/hooks/border.ts
  function mountBorders(settings = setting_default.getState()) {
    const border = settings.border;
    const styleSheet2 = lazyLoadStyleById("lucid-border");
    styleSheet2.textContent = ":root{";
    styleSheet2.textContent += `--border-color:${border.color.hex}${alphaToHex(border.color.alpha)};`;
    if (border.style) {
      styleSheet2.textContent += `--border-style:${border.style};`;
    }
    if (border.thickness) {
      styleSheet2.textContent += `--border-thickness:${border.thickness}px;`;
    }
    styleSheet2.textContent += "}";
  }
  setting_default.subscribe(mountBorders, "border");

  // extension/utils/dom/extractUrl.ts
  function extractUrl(input) {
    const match = input.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  }

  // extension/hooks/umv.ts
  var UMV_MAIN_CLASS = "lucid-umv-wrapper";
  var UMV_CLASS = "umv";
  var UMV_IMAGE_CLASS = "umv-img";
  var UMV_STYLE_ID = "lucid-umv";
  var SCROLL_INDICATOR_STYLE_ID = "lucid-scroll";
  var umvMainElem = createElement("div", { className: UMV_MAIN_CLASS });
  var imgWrapperElem = createElement("div", {
    className: UMV_CLASS
  });
  var umvImgElem = createElement("div", { className: UMV_IMAGE_CLASS });
  function mountScrollIndicator() {
    waitForElement([SCROLL_SELECTOR], ([scrollElem]) => {
      if (!scrollElem) {
        showNotification("Lucid: No scroll element found.", true);
        return;
      }
      if (typeof imgWrapperElem === "undefined" || !imgWrapperElem) {
        showNotification("Lucid: imgWrapperElem is not defined.", true);
        return;
      }
      const styleElement = lazyLoadStyleById(SCROLL_INDICATOR_STYLE_ID);
      if (!styleElement) {
        showNotification("Lucid: Failed to load scroll indicator style.", true);
        return;
      }
      styleElement.textContent = `
      @property --scroll-top {
        syntax: '<length>';
        inherits: false;
        initial-value: 0;
      }
      @property --scroll-coefficient {
        syntax: '<number>';
        inherits: false;
        initial-value: 0;
      }
    `;
      let isReadyForTrigger = true;
      scrollElem.addEventListener("scrollend", () => {
        isReadyForTrigger = true;
      });
      scrollElem.addEventListener("scroll", (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const scrollTop = target.scrollTop;
        if (scrollTop > window.innerHeight) return;
        imgWrapperElem.style.setProperty("--scroll-top", `-${Math.round(scrollTop)}px`);
        imgWrapperElem.style.setProperty(
          "--scroll-coefficient",
          `${Math.min(1, Math.max(0, scrollTop / window.innerHeight))}`
        );
        if (isReadyForTrigger) {
          document.querySelector("#main")?.style.setProperty(
            "--scroll-trigger-px",
            `${Math.random().toFixed(1)}px`
          );
          isReadyForTrigger = false;
        }
      });
    });
  }
  function injectUMVStyles() {
    lazyLoadStyleById(UMV_STYLE_ID).innerHTML = `
.under-main-view { display: none; }
.main-entityHeader-container.main-entityHeader-withBackgroundImage{
  height: calc(100cqh - var(--umv-offset) - 1rem);
}
.main-entityHeader-container{ height: 40cqh; }
.main-entityHeader-backgroundColor,.main-actionBarBackground-background { background: none !important;}
.playlist-playlist-playlistContent,.EmeHQXR87mUskYK6xEde { background-color: rgba(var(--clr-surface-1-rgb),.5) !important; }
.${UMV_MAIN_CLASS} .${UMV_CLASS} {height: 50cqh;width: 100%;position: absolute;z-index: -1;inset: 0}
.${UMV_MAIN_CLASS} .${UMV_CLASS}.expanded,
body[npb-is-floating] .main-entityHeader-container.main-entityHeader-withBackgroundImage{height: calc(100cqh - var(--umv-offset))}
.${UMV_IMAGE_CLASS} {height: 100%;width: 100%;object-fit: contain;border: none;box-shadow: none;background-image: none;transition: background-image .3s ease-in-out;background-position: center center;background-repeat: no-repeat;background-size: cover;-webkit-mask-image: linear-gradient(rgb(0, 0, 0) 35cqh, rgba(0, 0, 0, 0) 100%);mask-image: linear-gradient(rgb(0, 0, 0) 35cqh, rgba(0, 0, 0, 0) 100%)}
.normal .${UMV_IMAGE_CLASS}{background-image: var(--page-img-url);filter: var(--normal-filter)}
.custom .${UMV_IMAGE_CLASS}{background-image: var(--custom-img-url);filter: var(--custom-filter)}
.expanded .${UMV_IMAGE_CLASS}{background-image: var(--umv-img-url);filter: var(--expanded-filter);-webkit-mask-image: none;mask-image: none}
`;
  }
  function applyUMVOptions(settings = setting_default.getState().pages.umv) {
    imgWrapperElem.style.transform = `translate3d(0px,${settings.isScroll ? "var(--scroll-top)" : "0px"},0px) scale(${settings.isScaling ? "calc(1 + var(--scroll-coefficient))" : "1"})`;
    imgWrapperElem.style.filter = "blur(calc(16px * var(--scroll-coefficient)))";
    for (const key in settings.options) {
      const option = settings.options[key];
      umvMainElem.style.setProperty(`--${key}-filter`, serializeCSSFilters(option.filter ?? {}));
      if (key === "custom") {
        umvImgElem.style.setProperty("--custom-img-url", `url(${option?.url ?? ""})`);
      }
      imgWrapperElem.classList.toggle("custom", settings.type === "custom");
    }
  }
  function setupSettingsListener() {
    const updateUMVFromSettings = (state = setting_default.getState()) => {
      applyUMVOptions(state.pages.umv);
    };
    setting_default.subscribe(updateUMVFromSettings, "pages.umv");
    updateUMVFromSettings();
  }
  function observePageChanges() {
    const handlePageChange = async (url = Spicetify?.Platform?.History?.location) => {
      if (url?.pathname) {
        const pageURL = await getArtworkBySpotifyURL(url.pathname);
        imgWrapperElem.classList.toggle("normal", !!pageURL);
        umvImgElem.style.setProperty("--page-img-url", `url("${pageURL}")`);
      }
    };
    handlePageChange();
    Spicetify.Platform?.History?.listen(async (url) => {
      await handlePageChange(url);
    });
  }
  function observeUMVVisibility() {
    const targetNode = document.querySelector(UNDER_MAIN_VIEW_SELECTOR);
    if (!targetNode) {
      console.warn(
        `Element "${UNDER_MAIN_VIEW_SELECTOR}" not found. UMV visibility observation will not work.`
      );
      return;
    }
    const observerCB = () => {
      const gradientElement = targetNode.querySelector(
        MAIN_ENTITY_HEADER_GRADIENT_SELECTOR
      );
      imgWrapperElem.classList.remove("expanded");
      if (gradientElement) {
        const underMainViewURL = extractUrl(gradientElement.style.backgroundImage);
        if (underMainViewURL) {
          imgWrapperElem.classList.add("expanded");
          umvImgElem.style.setProperty("--umv-img-url", `url(${underMainViewURL})`);
        }
      } else {
        umvImgElem.style.removeProperty("--umv-img-url");
      }
    };
    const observer = new MutationObserver(observerCB);
    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });
  }
  function addUMVToDOM() {
    const underMainViewParent = document.querySelector(".under-main-view")?.parentElement;
    if (underMainViewParent) {
      underMainViewParent.prepend(umvMainElem);
    } else {
      document.querySelector(".main-view-container")?.prepend(umvMainElem);
    }
  }
  function initUMV() {
    mountScrollIndicator();
    injectUMVStyles();
    addUMVToDOM();
    imgWrapperElem.appendChild(umvImgElem);
    umvMainElem.appendChild(imgWrapperElem);
    setupSettingsListener();
    observePageChanges();
    observeUMVVisibility();
  }

  // extension/App.tsx
  var main = () => {
    try {
      setGlobals_default();
      waitForElement([".Root__now-playing-bar", ".Root__globalNav"], ([playbar, nav]) => {
        document.body.style.setProperty(
          "--umv-offset",
          `${(playbar?.clientHeight || 80) + (nav?.clientHeight || 64)}px`
        );
      });
      initUMV();
      initBackground();
      mountBorders();
      patchIcons();
      mountAndWatchFont();
      mountGrains();
      mountPageStyles();
      mountPageType();
      controls_default();
      mountPlaybar();
      mountNPV();
      mountColor();
      setting_default.subscribe((state) => {
        mountColor(state.color);
      }, "color");
      mountSettings();
      mountAndOpenGuide();
      mountChangelog();
    } catch (e) {
      console.error("Unexpected Error: ", e);
      showNotification("Lucid: Unexpected error. please report it to dev");
    }
  };
  console.time("Main fn start");
  main();
  console.timeEnd("Main fn start");
})();
})();