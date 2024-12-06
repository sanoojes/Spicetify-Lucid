(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var lucid = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // lucid:react
  var require_react = __commonJS({
    "lucid:react"(exports, module) {
      module.exports = Spicetify.React;
    }
  });

  // node_modules/canvas/lib/parse-font.js
  var require_parse_font = __commonJS({
    "node_modules/canvas/lib/parse-font.js"(exports, module) {
      "use strict";
      var weights = "bold|bolder|lighter|[1-9]00";
      var styles = "italic|oblique";
      var variants = "small-caps";
      var stretches = "ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded";
      var units = "px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q";
      var string = `'([^']+)'|"([^"]+)"|[\\w\\s-]+`;
      var weightRe = new RegExp(`(${weights}) +`, "i");
      var styleRe = new RegExp(`(${styles}) +`, "i");
      var variantRe = new RegExp(`(${variants}) +`, "i");
      var stretchRe = new RegExp(`(${stretches}) +`, "i");
      var sizeFamilyRe = new RegExp(
        `([\\d\\.]+)(${units}) *((?:${string})( *, *(?:${string}))*)`
      );
      var cache = {};
      var defaultHeight = 16;
      module.exports = (str) => {
        if (cache[str]) return cache[str];
        const sizeFamily = sizeFamilyRe.exec(str);
        if (!sizeFamily) return;
        const font = {
          weight: "normal",
          style: "normal",
          stretch: "normal",
          variant: "normal",
          size: parseFloat(sizeFamily[1]),
          unit: sizeFamily[2],
          family: sizeFamily[3].replace(/["']/g, "").replace(/ *, */g, ",")
        };
        let weight, style, variant, stretch;
        const substr = str.substring(0, sizeFamily.index);
        if (weight = weightRe.exec(substr)) font.weight = weight[1];
        if (style = styleRe.exec(substr)) font.style = style[1];
        if (variant = variantRe.exec(substr)) font.variant = variant[1];
        if (stretch = stretchRe.exec(substr)) font.stretch = stretch[1];
        switch (font.unit) {
          case "pt":
            font.size /= 0.75;
            break;
          case "pc":
            font.size *= 16;
            break;
          case "in":
            font.size *= 96;
            break;
          case "cm":
            font.size *= 96 / 2.54;
            break;
          case "mm":
            font.size *= 96 / 25.4;
            break;
          case "%":
            break;
          case "em":
          case "rem":
            font.size *= defaultHeight / 0.75;
            break;
          case "q":
            font.size *= 96 / 25.4 / 4;
            break;
        }
        return cache[str] = font;
      };
    }
  });

  // node_modules/canvas/browser.js
  var require_browser = __commonJS({
    "node_modules/canvas/browser.js"(exports) {
      var parseFont = require_parse_font();
      exports.parseFont = parseFont;
      exports.createCanvas = function(width, height) {
        return Object.assign(document.createElement("canvas"), { width, height });
      };
      exports.createImageData = function(array, width, height) {
        switch (arguments.length) {
          case 0:
            return new ImageData();
          case 1:
            return new ImageData(array);
          case 2:
            return new ImageData(array, width);
          default:
            return new ImageData(array, width, height);
        }
      };
      exports.loadImage = function(src, options) {
        return new Promise(function(resolve, reject) {
          const image = Object.assign(document.createElement("img"), options);
          function cleanup() {
            image.onload = null;
            image.onerror = null;
          }
          image.onload = function() {
            cleanup();
            resolve(image);
          };
          image.onerror = function() {
            cleanup();
            reject(new Error('Failed to load the image "' + src + '"'));
          };
          image.src = src;
        });
      };
    }
  });

  // extension/components/modal/Modal.tsx
  var import_react = __toESM(require_react());
  var Modal = (0, import_react.memo)(({ title, children, headingChild, onClose, isOpen = false }) => {
    return isOpen ? /* @__PURE__ */ import_react.default.createElement("div", { className: "modal-container" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `modal-overlay ${isOpen && "open"}`, style: { zIndex: 20 }, onClick: onClose }), /* @__PURE__ */ import_react.default.createElement("dialog", { open: isOpen, className: `modal-section ${isOpen && "open"}`, "aria-label": title, "aria-modal": "true" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "main-embedWidgetGenerator-container" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "main-trackCreditsModal-header" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "encore-text encore-title-body-medium" }, title), headingChild && /* @__PURE__ */ import_react.default.createElement("div", null, headingChild), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        type: "button",
        "aria-label": "Close",
        className: "main-trackCreditsModal-closeBtn",
        onClick: () => onClose()
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ import_react.default.createElement("title", null, "Close"), /* @__PURE__ */ import_react.default.createElement(
        "path",
        {
          d: "M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143",
          fill: "currentColor",
          "fill-rule": "evenodd"
        }
      ))
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "modal-contents" }, /* @__PURE__ */ import_react.default.createElement("main", { className: "modal-wrapper" }, children))))) : null;
  });
  var Modal_default = Modal;

  // extension/components/settings/ui/SettingSection.tsx
  var import_react2 = __toESM(require_react());
  var Section = ({ title, description, children }) => {
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "setting-section" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "heading-wrapper" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "title encore-text encore-text-title-small" }, title), description && /* @__PURE__ */ import_react2.default.createElement("p", { className: "desc encore-text encore-text-body-small" }, description)), children);
  };
  var SettingSection_default = Section;

  // extension/constants/dropdown.ts
  var BACKGROUND_MODE_OPTIONS = [
    { label: "Animated", value: "animated" },
    { label: "Static", value: "static" },
    { label: "Solid", value: "solid" }
  ];
  var PLAYBAR_MODE_OPTIONS = [
    { label: "Compact", value: "compact" },
    { label: "Default", value: "default" },
    { label: "Rounded", value: "rounded" }
  ];
  var GRAIN_MODE_OPTIONS = [
    { label: "Starry", value: "starry" },
    { label: "Default", value: "default" },
    { label: "none", value: "none" }
  ];
  var PLAYLIST_BACKGROUND_MODE_OPTIONS = [
    { label: "Now Playing", value: "now-playing" },
    { label: "Playlist Cover", value: "inherit" },
    { label: "none", value: "none" }
  ];
  var PLAYLIST_VIEW_MODE_OPTIONS = [
    { label: "Card", value: "card" },
    { label: "Compact Card", value: "compact-card" },
    { label: "Compact", value: "compact" },
    { label: "Default", value: "default" }
  ];
  var BORDER_STYLE_OPTIONS = [
    { label: "None", value: "none" },
    { label: "Hidden", value: "hidden" },
    { label: "Dotted", value: "dotted" },
    { label: "Dashed", value: "dashed" },
    { label: "Solid", value: "solid" },
    { label: "Double", value: "double" },
    { label: "Groove", value: "groove" },
    { label: "Ridge", value: "ridge" },
    { label: "Inset", value: "inset" },
    { label: "Outset", value: "outset" }
  ];
  var SETTINGS_ACCESS_MODE_OPTIONS = [
    { label: "Profile Context Menu", value: "context-menu" },
    { label: "Global Nav", value: "nav" }
  ];
  var NPV_MODE_OPTIONS = [
    { label: "Compact", value: "compact" },
    { label: "Normal", value: "normal" }
  ];
  var NPV_POSITION_OPTIONS = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ];

  // extension/components/svg/Dismiss.tsx
  var import_react3 = __toESM(require_react());
  var Dismiss = () => {
    return /* @__PURE__ */ import_react3.default.createElement(
      "svg",
      {
        role: "img",
        "aria-label": "dismiss",
        width: "24",
        height: "24",
        fill: "none",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ import_react3.default.createElement(
        "path",
        {
          d: "m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z",
          fill: "#ffffff"
        }
      )
    );
  };
  var Dismiss_default = Dismiss;

  // extension/components/ui/Button.tsx
  var import_react4 = __toESM(require_react());
  var Button = ({ variant = "primary", size = "medium", icon, children, ...rest }) => {
    return /* @__PURE__ */ import_react4.default.createElement("button", { className: `button button-${variant} button-${size}`, ...rest }, icon && /* @__PURE__ */ import_react4.default.createElement("span", { className: "button-icon" }, icon), children);
  };
  var Button_default = Button;

  // extension/services/toastService.tsx
  var import_react5 = __toESM(require_react());
  var toastId = 0;
  var ToastService = /* @__PURE__ */ (() => {
    let addToast2;
    const ToastContainer2 = () => {
      const [toasts, setToasts] = (0, import_react5.useState)([]);
      const addToastInternal = (0, import_react5.useCallback)(
        (message, isError = false) => {
          const id = toastId++;
          setToasts((prev) => [
            ...prev,
            { id, message, isError, exiting: false }
          ]);
          const timeoutId = setTimeout(() => {
            handleCloseElement(id);
          }, 3e3);
          return () => clearTimeout(timeoutId);
        },
        []
      );
      addToast2 = addToastInternal;
      const handleCloseElement = (id) => {
        setToasts((prev) => {
          return prev.map(
            (toast) => toast.id === id ? { ...toast, exiting: true } : toast
          );
        });
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 500);
      };
      return /* @__PURE__ */ import_react5.default.createElement("div", { className: "toast-container" }, toasts.map((toast) => /* @__PURE__ */ import_react5.default.createElement(
        "div",
        {
          key: toast.id,
          className: `toast-element ${toast.exiting ? "toast-exit" : ""}`,
          style: {
            backgroundColor: `${toast.isError ? "rgba(200,20,20,0.5)" : "rgba(20,20,20,0.5)"}`
          }
        },
        toast.message,
        /* @__PURE__ */ import_react5.default.createElement(
          Button_default,
          {
            icon: /* @__PURE__ */ import_react5.default.createElement(Dismiss_default, null),
            onClick: () => handleCloseElement(toast.id)
          }
        )
      )));
    };
    return {
      ToastContainer: ToastContainer2,
      addToast: (message, isError) => addToast2(message, isError)
    };
  })();
  var { ToastContainer, addToast } = ToastService;

  // node_modules/zustand/esm/vanilla.mjs
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState = () => state;
    const getInitialState = () => initialState;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const api = { setState, getState, getInitialState, subscribe };
    const initialState = state = createState(setState, getState, api);
    return api;
  };
  var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

  // node_modules/zustand/esm/react.mjs
  var import_react6 = __toESM(require_react(), 1);
  var identity = (arg) => arg;
  function useStore(api, selector = identity) {
    const slice = import_react6.default.useSyncExternalStore(
      api.subscribe,
      () => selector(api.getState()),
      () => selector(api.getInitialState())
    );
    import_react6.default.useDebugValue(slice);
    return slice;
  }
  var createImpl = (createState) => {
    const api = createStore(createState);
    const useBoundStore = (selector) => useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
  };
  var create = (createState) => createState ? createImpl(createState) : createImpl;

  // node_modules/zustand/esm/middleware.mjs
  function createJSONStorage(getStorage, options) {
    let storage;
    try {
      storage = getStorage();
    } catch (e) {
      return;
    }
    const persistStorage = {
      getItem: (name) => {
        var _a;
        const parse = (str2) => {
          if (str2 === null) {
            return null;
          }
          return JSON.parse(str2, options == null ? void 0 : options.reviver);
        };
        const str = (_a = storage.getItem(name)) != null ? _a : null;
        if (str instanceof Promise) {
          return str.then(parse);
        }
        return parse(str);
      },
      setItem: (name, newValue) => storage.setItem(
        name,
        JSON.stringify(newValue, options == null ? void 0 : options.replacer)
      ),
      removeItem: (name) => storage.removeItem(name)
    };
    return persistStorage;
  }
  var toThenable = (fn) => (input) => {
    try {
      const result = fn(input);
      if (result instanceof Promise) {
        return result;
      }
      return {
        then(onFulfilled) {
          return toThenable(onFulfilled)(result);
        },
        catch(_onRejected) {
          return this;
        }
      };
    } catch (e) {
      return {
        then(_onFulfilled) {
          return this;
        },
        catch(onRejected) {
          return toThenable(onRejected)(e);
        }
      };
    }
  };
  var persistImpl = (config, baseOptions) => (set, get, api) => {
    let options = {
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => state,
      version: 0,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState
      }),
      ...baseOptions
    };
    let hasHydrated = false;
    const hydrationListeners = /* @__PURE__ */ new Set();
    const finishHydrationListeners = /* @__PURE__ */ new Set();
    let storage = options.storage;
    if (!storage) {
      return config(
        (...args) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
          );
          set(...args);
        },
        get,
        api
      );
    }
    const setItem = () => {
      const state = options.partialize({ ...get() });
      return storage.setItem(options.name, {
        state,
        version: options.version
      });
    };
    const savedSetState = api.setState;
    api.setState = (state, replace) => {
      savedSetState(state, replace);
      void setItem();
    };
    const configResult = config(
      (...args) => {
        set(...args);
        void setItem();
      },
      get,
      api
    );
    api.getInitialState = () => configResult;
    let stateFromStorage;
    const hydrate = () => {
      var _a, _b;
      if (!storage) return;
      hasHydrated = false;
      hydrationListeners.forEach((cb) => {
        var _a2;
        return cb((_a2 = get()) != null ? _a2 : configResult);
      });
      const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
      return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
        if (deserializedStorageValue) {
          if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
            if (options.migrate) {
              const migration = options.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              );
              if (migration instanceof Promise) {
                return migration.then((result) => [true, result]);
              }
              return [true, migration];
            }
            console.error(
              `State loaded from storage couldn't be migrated since no migrate function was provided`
            );
          } else {
            return [false, deserializedStorageValue.state];
          }
        }
        return [false, void 0];
      }).then((migrationResult) => {
        var _a2;
        const [migrated, migratedState] = migrationResult;
        stateFromStorage = options.merge(
          migratedState,
          (_a2 = get()) != null ? _a2 : configResult
        );
        set(stateFromStorage, true);
        if (migrated) {
          return setItem();
        }
      }).then(() => {
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
        stateFromStorage = get();
        hasHydrated = true;
        finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
      }).catch((e) => {
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
      });
    };
    api.persist = {
      setOptions: (newOptions) => {
        options = {
          ...options,
          ...newOptions
        };
        if (newOptions.storage) {
          storage = newOptions.storage;
        }
      },
      clearStorage: () => {
        storage == null ? void 0 : storage.removeItem(options.name);
      },
      getOptions: () => options,
      rehydrate: () => hydrate(),
      hasHydrated: () => hasHydrated,
      onHydrate: (cb) => {
        hydrationListeners.add(cb);
        return () => {
          hydrationListeners.delete(cb);
        };
      },
      onFinishHydration: (cb) => {
        finishHydrationListeners.add(cb);
        return () => {
          finishHydrationListeners.delete(cb);
        };
      }
    };
    if (!options.skipHydration) {
      hydrate();
    }
    return stateFromStorage || configResult;
  };
  var persist = persistImpl;

  // extension/store/useImageStore.ts
  var DEFAULT_IMAGE_SETTINGS = {
    isUseLocalImage: false,
    selectedLocalImage: null
  };
  var useImageStore = create(
    persist(
      (set) => ({
        ...DEFAULT_IMAGE_SETTINGS,
        setUseLocalImage: (isUseLocalImage) => set(() => ({ isUseLocalImage })),
        setSelectedLocalImage: (selectedLocalImage) => set(() => ({ selectedLocalImage })),
        clearSelectedLocalImage: () => set(() => ({ ...DEFAULT_IMAGE_SETTINGS }))
      }),
      {
        name: "lucid-bg-image"
      }
    )
  );

  // extension/constants/settingsStore.ts
  var DEFAULT_BACKGROUND_STYLES = {
    solid: {
      opacity: 1,
      backgroundColor: "var(--spice-main)"
    },
    static: {
      blur: 32,
      opacity: 1,
      saturation: 1.1,
      contrast: 1.2,
      brightness: 0.5
    },
    animated: {
      blur: 32,
      time: 45,
      opacity: 1,
      saturation: 1.1,
      contrast: 1.2,
      brightness: 0.475
    }
  };
  var DEFAULT_PLAYBAR_STYLES = {
    compact: {
      height: 64,
      opacity: 1,
      saturation: 1.1,
      contrast: 1.2,
      brightness: 0.8,
      borderRadius: 8,
      backdropBlur: 32,
      paddingX: 6,
      backgroundColor: "rgba(var(--spice-rgb-player, var(--spice-rgb-card)), 0.5)"
    },
    default: {
      height: 80,
      opacity: 1,
      paddingX: 6,
      saturation: 1.1,
      contrast: 1.2,
      borderRadius: 8,
      brightness: 0.8,
      backdropBlur: 32,
      backgroundColor: "rgba(var(--spice-rgb-player, var(--spice-rgb-card)), 0.5)"
    },
    rounded: {
      height: 80,
      opacity: 1,
      paddingX: 20,
      saturation: 1.1,
      contrast: 1.2,
      borderRadius: 999,
      brightness: 0.8,
      backdropBlur: 32,
      backgroundColor: "rgba(var(--spice-rgb-player, var(--spice-rgb-card)), 0.5)"
    }
  };
  var DEFAULT_APP_SETTINGS = {
    backgroundSettings: {
      mode: "static",
      styles: DEFAULT_BACKGROUND_STYLES,
      customBackgroundOverride: {
        url: null
      }
    },
    interfaceSettings: {
      controlSettings: {
        height: 64
      },
      fontSettings: {
        body: {
          url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
          fontFamily: "Poppins"
        }
      },
      grainSettings: {
        grainEffect: "default"
      },
      pagesSettings: {
        isScrollMode: false,
        backgroundImageMode: "inherit",
        playlistViewMode: "card"
      },
      borderSettings: {
        color: "rgba(var(--spice-rgb-selected-row, var(--spice-rgb-text)), 0.125)",
        style: "inset",
        thickness: 1,
        roundedRadius: 12
      }
    },
    npvSettings: {
      mode: "normal",
      position: "right",
      blur: 24
    },
    colorSettings: {
      isDynamicColor: false
    },
    playbarSettings: {
      mode: "default",
      styles: DEFAULT_PLAYBAR_STYLES
    },
    settingAccessPosition: "nav"
  };

  // extension/store/useSettingsStore.ts
  var isValidSettings = (data) => {
    return typeof data === "object" && data !== null && "backgroundSettings" in data && "interfaceSettings" in data && "playbarSettings" in data && "colorSettings" in data && typeof data.backgroundSettings === "object" && "mode" in data.backgroundSettings && "styles" in data.backgroundSettings && typeof data.interfaceSettings === "object" && "borderSettings" in data.interfaceSettings && "fontSettings" in data.interfaceSettings && typeof data.playbarSettings === "object" && "mode" in data.playbarSettings && typeof data.colorSettings === "object" && "isDynamicColor" in data.colorSettings;
  };
  var useSettingsStore = create(
    persist(
      (set, get) => ({
        ...DEFAULT_APP_SETTINGS,
        exportSettings: () => {
          const state = get();
          return JSON.stringify(state);
        },
        importSettings: (json) => {
          try {
            const importedSettings = JSON.parse(json);
            if (!isValidSettings(importedSettings)) {
              throw new Error("Invalid settings structure");
            }
            set(importedSettings);
            addToast("Settings imported successfully!");
            return true;
          } catch (error) {
            const errorMessage = error instanceof SyntaxError ? "Failed to parse JSON: Please ensure your input is valid JSON." : error instanceof Error ? error.message : "An unknown error occurred.";
            addToast(errorMessage, true);
            return false;
          }
        },
        setBackgroundSettings: (newBackgroundSettings) => set((state) => ({
          backgroundSettings: {
            ...state.backgroundSettings,
            ...newBackgroundSettings
          }
        })),
        setNpvMode: (mode) => set((state) => ({
          npvSettings: {
            ...state.npvSettings,
            mode
          }
        })),
        setNpvBlur: (blur) => set((state) => ({
          npvSettings: {
            ...state.npvSettings,
            blur
          }
        })),
        setCompactNpvPosition: (position) => set((state) => ({
          npvSettings: {
            ...state.npvSettings,
            position
          }
        })),
        setSettingAccessPosition: (settingAccessPosition) => set(() => ({ settingAccessPosition })),
        setControlHeight: (height) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            controlSettings: {
              height
            }
          }
        })),
        setCustomBackgroundOverride: (url) => set((state) => ({
          backgroundSettings: {
            ...state.backgroundSettings,
            customBackgroundOverride: {
              ...state.backgroundSettings.customBackgroundOverride,
              url
            }
          }
        })),
        setBorderColor: (color) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            borderSettings: {
              ...state.interfaceSettings.borderSettings,
              color
            }
          }
        })),
        setBorderStyle: (style) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            borderSettings: {
              ...state.interfaceSettings.borderSettings,
              style
            }
          }
        })),
        setRoundedBorderRadius: (value) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            borderSettings: {
              ...state.interfaceSettings.borderSettings,
              roundedRadius: value
            }
          }
        })),
        setBorderThickness: (thickness) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            borderSettings: {
              ...state.interfaceSettings.borderSettings,
              thickness
            }
          }
        })),
        setBackgroundStyles: (newStyles, mode) => set((state) => ({
          backgroundSettings: {
            ...state.backgroundSettings,
            styles: {
              ...state.backgroundSettings.styles,
              [mode]: {
                ...state.backgroundSettings.styles[mode],
                ...newStyles
              }
            }
          }
        })),
        setColorSettings: (newColorSettings) => set((state) => ({
          colorSettings: { ...state.colorSettings, ...newColorSettings }
        })),
        setBorderSettings: (borderSettings) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            borderSettings: {
              ...state.interfaceSettings.borderSettings,
              ...borderSettings
            }
          }
        })),
        setPlaybarSettings: (newPlaybarSettings) => set((state) => ({
          playbarSettings: { ...state.playbarSettings, ...newPlaybarSettings }
        })),
        setInterfaceSettings: (newInterfaceSettings) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            ...newInterfaceSettings
          }
        })),
        setBackgroundMode: (mode) => set((state) => ({
          backgroundSettings: { ...state.backgroundSettings, mode }
        })),
        updateBackgroundStyle: (mode, key, value) => set((state) => ({
          backgroundSettings: {
            ...state.backgroundSettings,
            styles: {
              ...state.backgroundSettings.styles,
              [mode]: {
                ...state.backgroundSettings.styles[mode],
                [key]: value
              }
            }
          }
        })),
        setFont: (fontType, fontData) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            fontSettings: {
              ...state.interfaceSettings.fontSettings,
              [fontType]: {
                ...fontData
              }
            }
          }
        })),
        setGrainEffect: (grainEffect) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            grainSettings: {
              ...state.interfaceSettings.grainSettings,
              grainEffect
            }
          }
        })),
        setIsScrollMode: (isScrollMode) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            pagesSettings: {
              ...state.interfaceSettings.pagesSettings,
              isScrollMode
            }
          }
        })),
        setPagesBackgroundImageMode: (backgroundImageMode) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            pagesSettings: {
              ...state.interfaceSettings.pagesSettings,
              backgroundImageMode
            }
          }
        })),
        setPlaylistViewMode: (playlistViewMode) => set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            pagesSettings: {
              ...state.interfaceSettings.pagesSettings,
              playlistViewMode
            }
          }
        })),
        setIsDynamicColor: (isDynamicColor) => set((state) => ({
          colorSettings: { ...state.colorSettings, isDynamicColor }
        })),
        updatePlaybarStyle: (mode, key, value) => set((state) => ({
          playbarSettings: {
            ...state.playbarSettings,
            styles: {
              ...state.playbarSettings.styles,
              [mode]: {
                ...state.playbarSettings.styles[mode],
                [key]: value
              }
            }
          }
        })),
        setPlaybarMode: (mode) => set((state) => ({
          playbarSettings: {
            ...state.playbarSettings,
            mode
          }
        })),
        // Reset all settings to default
        resetAllSettings: () => {
          set(DEFAULT_APP_SETTINGS);
        }
      }),
      {
        name: "lucid-settings",
        version: 1.1,
        migrate: (persistedState) => {
          const state = {
            ...DEFAULT_APP_SETTINGS,
            ...persistedState
          };
          return state;
        }
      }
    )
  );

  // extension/utils/fontUtils.ts
  var isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  var extractFontFamilyFromUrl = (url) => {
    return decodeURIComponent(url.match(/family=([^&:]+)/)?.[1]?.replace(/\+/g, " ") || "") || "";
  };
  var loadFontFromUrl = (url, fontId) => {
    let customFont = document.getElementById(fontId);
    if (!customFont) {
      customFont = document.createElement("link");
      customFont.rel = "stylesheet";
      customFont.id = fontId;
      document.head.appendChild(customFont);
    }
    customFont.href = url;
  };
  var getFontDataFromInput = (value) => {
    let fontFamily = "";
    let url = "";
    if (isValidUrl(value)) {
      url = value;
      fontFamily = extractFontFamilyFromUrl(value);
    } else {
      url = value;
      fontFamily = value;
    }
    return { url, fontFamily };
  };

  // extension/utils/getStyleInputMap.ts
  var getStyleInputMap = (styles, mode, setter) => {
    return Object.entries(styles[mode]).map(
      ([key, style]) => ({
        id: `style-${mode}`,
        sectionName: "Styles",
        conditionalRender: true,
        cardProps: {
          title: `Set ${key}`,
          type: "input",
          settings: {
            label: "",
            defaultValue: style,
            ...typeof style === "number" ? {
              type: "number",
              onChange: (value) => {
                setter(mode, key, Number(value));
              },
              settings: {
                max: 256,
                min: 0,
                step: 0.5
              }
            } : {
              type: "text",
              onChange: (value) => {
                setter(mode, key, value);
              }
            }
          }
        }
      })
    );
  };

  // extension/utils/logUtils.ts
  var originalLog = console.log;
  var originalDebug = console.debug;
  var originalError = console.error;
  var originalWarn = console.warn;
  var logStyles = {
    prefix: "font-weight: bold; color: #4DB6AC; font-size: 0.85rem;",
    error: "color: #dc3545;",
    warn: "color: #ffc107;",
    debug: "color: #17a2b8;",
    info: ""
  };
  var logWithLevel = (level, message, ...optionalParams) => {
    const logFn = {
      info: originalLog,
      debug: originalDebug,
      error: originalError,
      warn: originalWarn
    }[level];
    const levelStyle = logStyles[level];
    logFn(`%c[Lucid] %c${message}`, logStyles.prefix, levelStyle, ...optionalParams);
  };
  var logInfo = (message, ...optionalParams) => logWithLevel("info", message, ...optionalParams);
  var logDebug = (message, ...optionalParams) => logWithLevel("debug", message, ...optionalParams);
  var logError = (message, ...optionalParams) => logWithLevel("error", message, ...optionalParams);
  var logWarn = (message, ...optionalParams) => logWithLevel("warn", message, ...optionalParams);

  // extension/components/settings/ui/Tooltip.tsx
  var import_react7 = __toESM(require_react());
  var Tooltip = ({ children }) => {
    return /* @__PURE__ */ import_react7.default.createElement("div", { className: "tooltip-container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "tooltip" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "tooltip-icon" }, /* @__PURE__ */ import_react7.default.createElement(
      "svg",
      {
        role: "img",
        "aria-label": "Tooltip icon",
        width: "24",
        height: "24",
        fill: "none",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ import_react7.default.createElement(
        "path",
        {
          d: "M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12 6.477 2 12 2Zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333 0 4.595 3.738 8.333 8.333 8.333 4.595 0 8.333-3.738 8.333-8.333 0-4.595-3.738-8.333-8.333-8.333ZM12 15.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-8.75a2.75 2.75 0 0 1 2.75 2.75c0 1.01-.297 1.574-1.051 2.359l-.169.171c-.622.622-.78.886-.78 1.47a.75.75 0 0 1-1.5 0c0-1.01.297-1.574 1.051-2.359l.169-.171c.622-.622.78-.886.78-1.47a1.25 1.25 0 0 0-2.493-.128l-.007.128a.75.75 0 0 1-1.5 0A2.75 2.75 0 0 1 12 6.75Z",
          fill: "currentColor"
        }
      )
    )), /* @__PURE__ */ import_react7.default.createElement("span", { className: "tooltip-content" }, children)));
  };
  var Tooltip_default = Tooltip;

  // extension/components/settings/ui/TitleContainer.tsx
  var import_react8 = __toESM(require_react());
  var TitleContainer = ({ title, tooltip, selectedValue }) => {
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "title-container" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "title-wrapper" }, title && /* @__PURE__ */ import_react8.default.createElement("h5", { className: "encore-text encore-text-body-medium-bold" }, title), tooltip && /* @__PURE__ */ import_react8.default.createElement(Tooltip_default, null, tooltip)), selectedValue && /* @__PURE__ */ import_react8.default.createElement("p", { className: "selected-value" }, "Selected: ", selectedValue));
  };
  var TitleContainer_default = TitleContainer;

  // extension/components/svg/ArrowDown.tsx
  var import_react9 = __toESM(require_react());
  var ArrowDown = () => {
    return /* @__PURE__ */ import_react9.default.createElement(
      "svg",
      {
        role: "img",
        "aria-label": "Arrow Down",
        width: "24",
        height: "24",
        fill: "none",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ import_react9.default.createElement(
        "path",
        {
          d: "M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z",
          fill: "#ffffff"
        }
      )
    );
  };
  var ArrowDown_default = ArrowDown;

  // extension/components/ui/Dropdown.tsx
  var import_react10 = __toESM(require_react());
  var Dropdown = ({ options, selectedValue, onChange, placeholder, disabled }) => {
    const dropdownRef = (0, import_react10.useRef)(null);
    const [isOpen, setIsOpen] = (0, import_react10.useState)(false);
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };
    const handleSelect = (value) => {
      setIsOpen(false);
      onChange(value);
    };
    (0, import_react10.useEffect)(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "dropdown-container", ref: dropdownRef }, /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        className: `dropdown-button ${isOpen ? "open" : ""}`,
        onClick: handleToggle,
        "aria-label": "Toggle dropdown menu",
        type: "button"
      },
      /* @__PURE__ */ import_react10.default.createElement("p", { className: "encore-text" }, placeholder || selectedValue || "Dropdown"),
      /* @__PURE__ */ import_react10.default.createElement("span", { className: "dropdown-arrow" }, /* @__PURE__ */ import_react10.default.createElement(ArrowDown_default, null))
    ), /* @__PURE__ */ import_react10.default.createElement("div", { className: `dropdown-menu ${isOpen ? "open" : ""}` }, isOpen ? options?.map((option) => /* @__PURE__ */ import_react10.default.createElement(
      "li",
      {
        key: option.value,
        className: `dropdown-item ${selectedValue === option.value ? "selected" : ""}`,
        onClick: () => !option.disabled && handleSelect(option.value),
        onKeyDown: (e) => !option.disabled && e.key === "Enter" && handleSelect(option.value),
        style: { opacity: `${disabled ? 0.75 : 1}` }
      },
      /* @__PURE__ */ import_react10.default.createElement("p", { className: "encore-text" }, option.label)
    )) : null)));
  };
  var Dropdown_default = Dropdown;

  // extension/utils/debounce.ts
  var debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // extension/components/ui/Input.tsx
  var import_react11 = __toESM(require_react());
  var Input = (0, import_react11.forwardRef)(
    ({ label, defaultValue, onChange, type, placeholder, settings, validation }, ref) => {
      const [inputValue, setInputValue] = (0, import_react11.useState)(
        defaultValue || null
      );
      const [errorMessage, setErrorMessage] = (0, import_react11.useState)(null);
      const isFileInput = type === "file";
      const isNumberInput = type === "number";
      const debouncedStringOnChange = (0, import_react11.useMemo)(() => {
        return debounce((value) => {
          if (!isFileInput) {
            onChange?.(value);
          }
        }, 1e3);
      }, [onChange]);
      const handleChange = (0, import_react11.useCallback)(
        (e) => {
          if (isFileInput) {
            const files = e.target.files;
            onChange?.(files);
          } else if (isNumberInput && settings) {
            const value = Number(e.target.value);
            const maxValue = settings.max ?? 100;
            const minValue = settings.min ?? 0;
            if (value > maxValue) {
              setErrorMessage(`Value cannot exceed ${maxValue}`);
            } else if (value < minValue) {
              setErrorMessage(`Value cannot be less than ${minValue}`);
            } else {
              setErrorMessage(null);
            }
            const limitedValue = Math.min(
              Math.max(value, minValue),
              maxValue
            ).toString();
            setInputValue(limitedValue);
            debouncedStringOnChange(limitedValue);
          } else {
            const value = e.target.value;
            setInputValue(value);
            setErrorMessage(null);
            ``;
            debouncedStringOnChange(value);
          }
        },
        [debouncedStringOnChange, settings]
      );
      (0, import_react11.useEffect)(() => {
        if (errorMessage) {
          addToast(errorMessage, true);
        }
      }, [errorMessage]);
      return /* @__PURE__ */ import_react11.default.createElement("div", { className: "input-container" }, /* @__PURE__ */ import_react11.default.createElement("label", { "aria-label": label, className: isFileInput ? "input" : "label" }, /* @__PURE__ */ import_react11.default.createElement(
        "input",
        {
          "aria-label": label,
          type,
          accept: isFileInput ? settings?.accept ?? "image/*" : void 0,
          multiple: isFileInput ? settings?.multiple ?? false : void 0,
          className: "input encore-text",
          value: inputValue ?? "",
          onChange: handleChange,
          placeholder,
          step: isNumberInput ? settings?.step ?? 1 : void 0,
          min: isNumberInput ? settings?.min : void 0,
          max: isNumberInput ? settings?.max : void 0,
          ref,
          style: isFileInput ? { display: "none" } : {}
        }
      ), isFileInput ? "Upload Image" : null));
    }
  );
  var Input_default = Input;

  // extension/components/ui/SliderSwitch.tsx
  var import_react12 = __toESM(require_react());
  var SliderSwitch = ({ onChange, checked, label }) => {
    const toggleSwtich = () => {
      onChange(!checked);
    };
    return /* @__PURE__ */ import_react12.default.createElement("div", { className: "slider-wrapper" }, /* @__PURE__ */ import_react12.default.createElement("label", { className: "switch", "aria-label": label }, /* @__PURE__ */ import_react12.default.createElement("input", { "aria-label": "toggleSwtich", type: "checkbox", checked, onChange: toggleSwtich }), /* @__PURE__ */ import_react12.default.createElement("span", { className: "slider round" })));
  };
  var SliderSwitch_default = SliderSwitch;

  // extension/components/settings/ui/Card.tsx
  var import_react13 = __toESM(require_react());
  var Card = ({ title, tooltip, selectedValue, type, settings, children, style }) => {
    return /* @__PURE__ */ import_react13.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react13.default.createElement(TitleContainer_default, { title, tooltip, selectedValue }), /* @__PURE__ */ import_react13.default.createElement("div", { className: "children-wrapper", style: style || {} }, type === "dropdown" && /* @__PURE__ */ import_react13.default.createElement(Dropdown_default, { ...settings }), type === "input" && /* @__PURE__ */ import_react13.default.createElement(Input_default, { ...settings }), type === "toggle" && /* @__PURE__ */ import_react13.default.createElement(SliderSwitch_default, { ...settings }), type === "button" && /* @__PURE__ */ import_react13.default.createElement(Button_default, { ...settings }), children));
  };
  var Card_default = Card;

  // extension/components/settings/ui/CardWrapper.tsx
  var import_react14 = __toESM(require_react());
  var CardWrapper = (props) => {
    const { children, className, ...restProps } = props;
    return /* @__PURE__ */ import_react14.default.createElement("div", { ...restProps, className: `cards-wrapper ${className || ""}` }, children);
  };
  var CardWrapper_default = CardWrapper;

  // extension/utils/render/renderCards.tsx
  var import_react15 = __toESM(require_react());
  var renderCards = (cards) => {
    const [cardGroups, setCardGroups] = (0, import_react15.useState)(
      /* @__PURE__ */ new Map()
    );
    import_react15.default.useEffect(() => {
      const newCardGroups = /* @__PURE__ */ new Map();
      for (const card of cards) {
        if (!newCardGroups.has(card.id)) {
          newCardGroups.set(card.id, []);
        }
        newCardGroups.get(card.id)?.push(card);
      }
      setCardGroups(newCardGroups);
    }, [cards]);
    return Array.from(cardGroups.entries()).map(([cardId, cardGroup]) => {
      const visibleCards = cardGroup.filter((card) => card.conditionalRender);
      if (visibleCards.length > 0) {
        return /* @__PURE__ */ import_react15.default.createElement(CardWrapper_default, { key: cardId, id: cardId, className: `${cardId} combine` }, visibleCards[0]?.sectionName ? /* @__PURE__ */ import_react15.default.createElement("label", { "aria-label": visibleCards[0]?.sectionName, htmlFor: cardId }, visibleCards[0]?.sectionName) : null, visibleCards.map((card) => /* @__PURE__ */ import_react15.default.createElement(Card_default, { key: card.id, ...card.cardProps })));
      } else {
        return null;
      }
    });
  };

  // extension/components/settings/section/BackgroundSection.tsx
  var import_react16 = __toESM(require_react());
  var BackgroundSection = () => {
    const {
      backgroundSettings: { mode, styles, customBackgroundOverride },
      colorSettings: { isDynamicColor },
      setBackgroundMode,
      updateBackgroundStyle,
      setIsDynamicColor,
      setCustomBackgroundOverride
    } = useSettingsStore();
    const {
      isUseLocalImage,
      setUseLocalImage,
      clearSelectedLocalImage,
      selectedLocalImage,
      setSelectedLocalImage
    } = useImageStore();
    const [selectedMode, setSelectedMode] = (0, import_react16.useState)(mode);
    const onBackgroundModeChange = (value) => {
      setSelectedMode(value);
      setBackgroundMode(value);
    };
    const BACKGROUND_SETTINGS_CARDS = [
      {
        id: "backgroundOption",
        conditionalRender: true,
        cardProps: {
          title: "Background Option",
          type: "dropdown",
          tooltip: "Select the background mode to customize your background.",
          settings: {
            placeholder: selectedMode,
            selectedValue: selectedMode,
            options: BACKGROUND_MODE_OPTIONS,
            onChange: onBackgroundModeChange
          }
        }
      },
      ...getStyleInputMap(styles, mode, updateBackgroundStyle),
      {
        id: "backgroundCustomImage",
        sectionName: "Custom Background",
        conditionalRender: mode === "static",
        cardProps: {
          title: "Background image",
          type: "input",
          tooltip: /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null, /* @__PURE__ */ import_react16.default.createElement("span", null, "Use a custom URL for the background image."), /* @__PURE__ */ import_react16.default.createElement("span", null, "Ensure the URL is a valid image link (e.g., .jpg, .png)."), /* @__PURE__ */ import_react16.default.createElement("span", null, 'Use "now-playing" for the now playing art image.'), /* @__PURE__ */ import_react16.default.createElement("span", null, 'Use "current-page" for the current page art image.')),
          settings: {
            type: "text",
            defaultValue: customBackgroundOverride?.url || "",
            label: "Url",
            validation: (value) => isValidUrl(value),
            onChange: (value) => {
              setCustomBackgroundOverride(value);
            }
          }
        }
      },
      {
        id: "backgroundCustomImage",
        conditionalRender: mode === "static",
        cardProps: {
          title: "Use Local Image",
          type: "toggle",
          tooltip: /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null, /* @__PURE__ */ import_react16.default.createElement("p", null, "Import an image from your device to use as the background."), selectedLocalImage?.dataURL ? /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement(
            "img",
            {
              width: "20rem",
              src: selectedLocalImage.dataURL,
              alt: `${selectedLocalImage?.fileName} image`,
              style: {
                display: "block",
                width: "20rem",
                borderRadius: "0.5rem",
                border: "var(--border-thickness) var(--border-style, solid) var(--border-color, rgba(var(--spice-rgb-text), 0.125))"
              }
            }
          ), selectedLocalImage?.fileName ? /* @__PURE__ */ import_react16.default.createElement("p", null, "File name: ", /* @__PURE__ */ import_react16.default.createElement("span", null, selectedLocalImage.fileName)) : null, selectedLocalImage?.dateAdded ? /* @__PURE__ */ import_react16.default.createElement("p", null, "Date Added: ", /* @__PURE__ */ import_react16.default.createElement("span", null, selectedLocalImage.dateAdded)) : null) : null),
          settings: {
            checked: isUseLocalImage,
            label: "Enable Local Image",
            onChange: (value) => {
              setUseLocalImage(value);
              if (value === false) {
                clearSelectedLocalImage();
              }
            }
          }
        }
      },
      {
        id: "backgroundCustomImageInput",
        conditionalRender: mode === "static" && isUseLocalImage,
        cardProps: {
          title: "Select Background Image",
          type: "input",
          tooltip: "Choose an image file from your device.",
          settings: {
            type: "file",
            label: "Choose File",
            onChange: (value) => {
              const imgFile = value?.[0];
              if (imgFile) {
                const reader = new FileReader();
                reader.readAsDataURL(imgFile);
                reader.onload = (e) => {
                  const dataURL = e.target?.result || "";
                  logDebug("Local Image Data URL:", dataURL);
                  addToast(
                    /* @__PURE__ */ import_react16.default.createElement("div", { style: { display: "flex", alignItems: "center" } }, /* @__PURE__ */ import_react16.default.createElement("span", { style: { marginRight: "10px" } }, "Successfully Added Local Image as background from File name:"), /* @__PURE__ */ import_react16.default.createElement("span", { style: { fontWeight: "bold" } }, imgFile.name))
                  );
                  setSelectedLocalImage({
                    dataURL,
                    fileName: imgFile.name || "",
                    dateAdded: (/* @__PURE__ */ new Date()).toLocaleString()
                  });
                };
              }
            }
          }
        }
      },
      {
        // TODO: add color export and import and change it to 'ColorSection'
        id: "dynamicColorToggle",
        conditionalRender: true,
        cardProps: {
          title: "Dynamic Color",
          type: "toggle",
          tooltip: "Enable dynamic color to adjust colors based on current playing album art.",
          settings: {
            checked: isDynamicColor,
            label: "Dynamic Color Toggle",
            onChange: (value) => {
              setIsDynamicColor(value);
              if (value) {
                addToast("Enabled Dynamic Color.");
              }
            }
          }
        }
      }
    ];
    return /* @__PURE__ */ import_react16.default.createElement(
      SettingSection_default,
      {
        title: "Background Settings",
        description: "Set your Spotify interface settings."
      },
      renderCards(BACKGROUND_SETTINGS_CARDS)
    );
  };
  var BackgroundSection_default = BackgroundSection;

  // extension/components/settings/section/ImportExportSection.tsx
  var import_react17 = __toESM(require_react());
  var ImportExportSection = () => {
    const { exportSettings, importSettings } = useSettingsStore();
    const [isImportVisible, setIsImportVisible] = (0, import_react17.useState)(false);
    const inputRef = (0, import_react17.useRef)(null);
    const handleImportToggle = () => {
      setIsImportVisible((prev) => !prev);
      if (isImportVisible) {
        if (inputRef.current) inputRef.current.value = "";
      }
    };
    const handleImport = () => {
      const jsonString = inputRef.current?.value.trim() || "{}";
      if (jsonString === "{}") {
        addToast("Please enter valid JSON settings.", true);
        return;
      }
      importSettings(jsonString);
    };
    const handleExport = () => {
      const settings = exportSettings();
      navigator.clipboard.writeText(settings).then(() => {
        addToast("Settings exported to clipboard!");
      }).catch((err) => {
        logError("Failed to copy: ", err);
        addToast("Failed to copy settings to clipboard.", true);
      });
    };
    const handlePaste = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (inputRef.current) {
          inputRef.current.value = clipboardText;
          handleImport();
        }
        addToast("Clipboard content pasted successfully!");
      } catch (err) {
        logError("Failed to read clipboard: ", err);
        addToast("Failed to read clipboard content.", true);
      }
    };
    return /* @__PURE__ */ import_react17.default.createElement(SettingSection_default, { title: "Settings Import/Export", description: "Manage your settings easily." }, /* @__PURE__ */ import_react17.default.createElement(CardWrapper_default, null, /* @__PURE__ */ import_react17.default.createElement(
      Card_default,
      {
        title: "Import and Export Settings",
        type: "normal",
        tooltip: "Use these buttons to import settings from a JSON file or export your current theme settings to your clipboard.",
        style: { display: "flex", gap: "0.5rem" }
      },
      /* @__PURE__ */ import_react17.default.createElement(Button_default, { onClick: handleExport }, "Export"),
      /* @__PURE__ */ import_react17.default.createElement(Button_default, { onClick: handleImportToggle, variant: isImportVisible ? "danger" : "primary" }, isImportVisible ? "Cancel Import" : "Import")
    ), isImportVisible && /* @__PURE__ */ import_react17.default.createElement(
      Card_default,
      {
        title: "Import Settings JSON",
        type: "normal",
        tooltip: "Paste your JSON settings here to import them. Ensure the JSON is correctly formatted.",
        style: { display: "flex", gap: "0.5rem" }
      },
      /* @__PURE__ */ import_react17.default.createElement(Button_default, { onClick: handlePaste }, "Paste And Import"),
      /* @__PURE__ */ import_react17.default.createElement(Input_default, { ref: inputRef, type: "text", label: "Paste JSON here", placeholder: "Paste JSON here" }),
      /* @__PURE__ */ import_react17.default.createElement(Button_default, { onClick: handleImport }, "Import")
    )));
  };
  var ImportExportSection_default = ImportExportSection;

  // extension/utils/platformUtils.ts
  var detectWindows = () => {
    if (Spicetify.Platform && Spicetify.Platform.operatingSystem === "Windows") {
      return true;
    }
    if (Spicetify.Platform?.PlatformData?.os_name) {
      return Spicetify.Platform.PlatformData.os_name.toLowerCase().includes("win");
    }
    return false;
  };
  var getIsLightMode = () => Spicetify?.Config.color_scheme === "light" || false;
  var getIsGlobalNav = () => !!(document.querySelector(".globalNav") || document.querySelector(".Root__globalNav"));
  var checkSpotifyVersionIsAbove = (version) => Spicetify.Platform.version >= version;

  // extension/utils/windowControlUtils.ts
  async function setWindowControlsHeight(height) {
    try {
      if (Spicetify?.CosmosAsync?.post)
        await Spicetify.CosmosAsync.post("sp://messages/v1/container/control", {
          type: "update_titlebar",
          height
        });
      logInfo(`Control height set to ${height}px`);
    } catch (error) {
      logError(`Error setting control height: ${height}`);
    }
  }
  function getIsCustomControls() {
    if (document.getElementById("customControls")) {
      document.querySelector(".lucid-transperent-window-controls")?.remove();
      return true;
    }
    return false;
  }

  // extension/constants/constants.ts
  var GITHUB_RELEASES_URL = "https://api.github.com/repos/sanoojes/spicetify-lucid/releases";
  var SCROLL_NODE_SELECTORS = ".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]";
  var PLAYLIST_ART_IMAGE_CLASS_PREFIX = "playlist-art-image-";
  var PLAYLIST_VIEW_CLASS_PREFIX = "playlist-view-";
  var isSpotifyV16Above = checkSpotifyVersionIsAbove("1.2.46");
  var isLightModeEnabled = getIsLightMode();
  var isWindowsPlatform = detectWindows();
  var isGlobalNav = getIsGlobalNav();
  var isCustomControls = getIsCustomControls();

  // extension/components/settings/section/InterfaceSection.tsx
  var import_react18 = __toESM(require_react());
  var InterfaceSection = () => {
    const {
      interfaceSettings: {
        controlSettings: { height: controlHeight },
        fontSettings: {
          body: { fontFamily }
        },
        grainSettings: { grainEffect },
        pagesSettings: { isScrollMode, backgroundImageMode, playlistViewMode },
        borderSettings: {
          color: borderColor,
          style: borderStyle,
          thickness: borderThickness,
          roundedRadius: borderRoundedRadius
        }
      },
      npvSettings: { mode: npvMode, position: npvPosition, blur: npvBlur },
      setFont,
      setGrainEffect,
      setControlHeight,
      setPagesBackgroundImageMode,
      setPlaylistViewMode,
      setIsScrollMode,
      setNpvMode,
      setNpvBlur,
      setCompactNpvPosition,
      setBorderColor,
      setBorderStyle,
      setBorderThickness,
      settingAccessPosition,
      setRoundedBorderRadius,
      setSettingAccessPosition
    } = useSettingsStore();
    const [selectedGrainMode, setSelectedGrainMode] = (0, import_react18.useState)(grainEffect);
    const [selectedBackgroundImageMode, setSelectedBackgroundImageMode] = (0, import_react18.useState)(backgroundImageMode);
    const [selectedPlaylistViewMode, setSelectedPlaylistViewMode] = (0, import_react18.useState)(playlistViewMode);
    const onGrainModeChange = (value) => {
      setSelectedGrainMode(value);
      setGrainEffect(value);
    };
    const onBackgroundImageModeChange = (value) => {
      setSelectedBackgroundImageMode(value);
      setPagesBackgroundImageMode(value);
    };
    const onPlaylistViewModeChange = (value) => {
      setSelectedPlaylistViewMode(value);
      setPlaylistViewMode(value);
    };
    const INTERFACE_SETTINGS_CARDS = [
      {
        id: "controlSettings",
        conditionalRender: isWindowsPlatform,
        cardProps: {
          title: "Set Control Height",
          tooltip: "Set the height of your window controls in pixels.",
          type: "input",
          settings: {
            type: "number",
            label: "Enter Control Height",
            defaultValue: controlHeight,
            onChange: (value) => {
              setControlHeight(Number(value));
            },
            settings: {
              step: 1,
              min: 1,
              max: 64
            }
          }
        }
      },
      {
        id: "themeSettings",
        conditionalRender: true,
        cardProps: {
          title: "Settings Access Position",
          tooltip: "Choose how to access settings: via the context menu button or a navigation button.",
          type: "dropdown",
          settings: {
            options: SETTINGS_ACCESS_MODE_OPTIONS,
            placeholder: settingAccessPosition,
            selectedValue: settingAccessPosition,
            onChange: (value) => {
              setSettingAccessPosition(value);
            }
          }
        }
      },
      {
        id: "npvSettings",
        conditionalRender: true,
        cardProps: {
          title: "Set Right Sidebar Mode",
          tooltip: /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, /* @__PURE__ */ import_react18.default.createElement("h3", { className: "encore-text encore-text-medium-bold" }, "Select how the right sidebar appears during playback."), /* @__PURE__ */ import_react18.default.createElement("span", null, "Choose 'Compact' for a minimized view or 'Normal' for a detailed layout")),
          type: "dropdown",
          settings: {
            options: NPV_MODE_OPTIONS,
            placeholder: npvMode,
            selectedValue: npvMode,
            onChange: (value) => {
              setNpvMode(value);
            }
          }
        }
      },
      {
        id: "npvSettings",
        conditionalRender: npvMode === "compact",
        cardProps: {
          title: "Set Compact Sidebar Position",
          tooltip: /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, /* @__PURE__ */ import_react18.default.createElement("h3", { className: "encore-text encore-text-medium-bold" }, "Select where the right sidebar appears.")),
          type: "dropdown",
          settings: {
            options: NPV_POSITION_OPTIONS,
            placeholder: npvPosition,
            selectedValue: npvPosition,
            onChange: (value) => {
              setCompactNpvPosition(value);
            }
          }
        }
      },
      {
        id: "npvSettings",
        sectionName: "Styles",
        conditionalRender: npvMode === "compact",
        cardProps: {
          title: "Set Npv Background Blur",
          type: "input",
          settings: {
            label: "Npv Background Blur input",
            defaultValue: npvBlur,
            onChange: (value) => {
              setNpvBlur(Number(value));
            },
            type: "number",
            settings: {
              max: 256,
              min: 0,
              step: 0.5
            }
          }
        }
      },
      {
        id: "font",
        conditionalRender: true,
        cardProps: {
          title: "Font",
          type: "input",
          tooltip: /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, "Supports both Google Fonts via URL and local fonts.", /* @__PURE__ */ import_react18.default.createElement("span", null, "For Google Fonts, use the full URL (e.g., https://fonts.googleapis.com/css2?family=Roboto).", " "), /* @__PURE__ */ import_react18.default.createElement("span", null, "For local fonts, type the font family name (e.g., 'Arial').")),
          settings: {
            type: "text",
            label: "Font Family or URL",
            defaultValue: fontFamily,
            onChange: (value) => {
              const type = "body";
              setFont(type, getFontDataFromInput(value.toString()));
            }
          }
        }
      },
      {
        id: "grains",
        conditionalRender: true,
        cardProps: {
          type: "dropdown",
          title: "Grains",
          tooltip: "Choose a grain texture mode.",
          settings: {
            options: GRAIN_MODE_OPTIONS,
            placeholder: selectedGrainMode,
            selectedValue: selectedGrainMode,
            onChange: onGrainModeChange
          }
        }
      },
      {
        id: "pageSettings",
        sectionName: "Pages Setting",
        conditionalRender: true,
        cardProps: {
          type: "dropdown",
          title: "Pages Background Image",
          tooltip: "Choose a background image mode for playlist pages.",
          settings: {
            options: PLAYLIST_BACKGROUND_MODE_OPTIONS,
            placeholder: selectedBackgroundImageMode,
            selectedValue: selectedBackgroundImageMode,
            onChange: onBackgroundImageModeChange
          }
        }
      },
      {
        id: "pageSettings",
        conditionalRender: true,
        cardProps: {
          type: "dropdown",
          tooltip: "Sets the view mode for playlists.",
          title: "Playlist View",
          settings: {
            options: PLAYLIST_VIEW_MODE_OPTIONS,
            placeholder: selectedPlaylistViewMode,
            selectedValue: selectedPlaylistViewMode,
            onChange: onPlaylistViewModeChange
          }
        }
      },
      {
        id: "pageSettings",
        conditionalRender: true,
        cardProps: {
          title: "Toggle Playlist Scroll Mode",
          tooltip: "Enable or disable scrolling for the playlist art image.",
          type: "toggle",
          settings: {
            checked: isScrollMode,
            label: "Scroll Mode Toggle",
            onChange: (value) => {
              setIsScrollMode(value);
            }
          }
        }
      },
      {
        id: "borderSettings",
        conditionalRender: true,
        sectionName: "Border Settings",
        cardProps: {
          title: "Border Thickness",
          type: "input",
          settings: {
            type: "number",
            label: "Border Thickness",
            defaultValue: borderThickness,
            onChange: (value) => {
              setBorderThickness(Number(value));
            },
            settings: {
              step: 1,
              min: 0,
              max: 8
            }
          }
        }
      },
      {
        id: "borderSettings",
        conditionalRender: true,
        sectionName: "Border Settings",
        cardProps: {
          title: "Rounded Border Radius",
          type: "input",
          settings: {
            type: "number",
            label: "Rounded Border Radius",
            defaultValue: borderRoundedRadius,
            onChange: (value) => {
              setRoundedBorderRadius(Number(value));
            },
            settings: {
              step: 1,
              min: 0,
              max: 999
            }
          }
        }
      },
      {
        id: "borderSettings",
        conditionalRender: true,
        cardProps: {
          title: "Border Color",
          type: "input",
          settings: {
            type: "text",
            label: "Border Color",
            defaultValue: borderColor,
            onChange: (value) => {
              setBorderColor(value);
            }
          }
        }
      },
      {
        id: "borderSettings",
        conditionalRender: true,
        cardProps: {
          title: "Border Style",
          type: "dropdown",
          settings: {
            options: BORDER_STYLE_OPTIONS,
            selectedValue: borderStyle,
            onChange: (value) => {
              setBorderStyle(value);
            }
          }
        }
      }
    ];
    return /* @__PURE__ */ import_react18.default.createElement(
      SettingSection_default,
      {
        title: "Interface Settings",
        description: "Set your Spotify interface settings."
      },
      renderCards(INTERFACE_SETTINGS_CARDS)
    );
  };
  var InterfaceSection_default = InterfaceSection;

  // extension/components/settings/section/PlaybarSection.tsx
  var import_react19 = __toESM(require_react());
  var PlaybarSection = () => {
    const {
      playbarSettings: { mode, styles },
      setPlaybarMode,
      updatePlaybarStyle
    } = useSettingsStore();
    const [selectedMode, setSelectedMode] = (0, import_react19.useState)(mode);
    const onPlaybarModeChange = (value) => {
      setSelectedMode(value);
      setPlaybarMode(value);
    };
    const PLAYBAR_SETTINGS_CARDS = [
      {
        id: "playbarOption",
        conditionalRender: true,
        cardProps: {
          title: "Playbar Option",
          type: "dropdown",
          settings: {
            placeholder: selectedMode,
            selectedValue: selectedMode,
            options: PLAYBAR_MODE_OPTIONS,
            onChange: onPlaybarModeChange
          }
        }
      },
      ...getStyleInputMap(styles, mode, updatePlaybarStyle)
    ];
    return /* @__PURE__ */ import_react19.default.createElement(SettingSection_default, { title: "Playbar Settings", description: "Set your Spotify Now Playing Bar settings." }, renderCards(PLAYBAR_SETTINGS_CARDS));
  };
  var PlaybarSection_default = PlaybarSection;

  // extension/components/settings/section/ResetSection.tsx
  var import_react20 = __toESM(require_react());
  var ResetSection = () => {
    const { resetAllSettings } = useSettingsStore();
    const handleSettingsReset = () => {
      if (window.confirm(
        "Are you sure you want to reset all settings to their default values? This action cannot be undone."
      )) {
        resetAllSettings();
      }
    };
    const RESET_SETTINGS_CARDS = [
      {
        id: "resetButtonCard",
        conditionalRender: true,
        cardProps: {
          title: "Reset All Settings",
          type: "button",
          settings: {
            variant: "danger",
            size: "medium",
            children: "Reset",
            onClick: handleSettingsReset
          }
        }
      }
    ];
    return /* @__PURE__ */ import_react20.default.createElement(SettingSection_default, { title: "Reset Settings", description: "Reset your theme settings." }, renderCards(RESET_SETTINGS_CARDS));
  };
  var ResetSection_default = ResetSection;

  // extension/context/ModalContextProvider.tsx
  var import_react21 = __toESM(require_react());
  var INITIAL_MODAL_STATES = {
    settings: false,
    changelog: false
  };
  var createModalContext = () => {
    const ModalContext = (0, import_react21.createContext)(null);
    const ModalContextProvider2 = ({ children }) => {
      const [modalStates, setModalStates] = (0, import_react21.useState)(INITIAL_MODAL_STATES);
      const useModal2 = (0, import_react21.useCallback)(
        (modalName) => {
          const isOpen = modalStates[modalName];
          const openModal = (0, import_react21.useCallback)(() => {
            setModalStates((prevStates) => ({
              ...prevStates,
              [modalName]: true
            }));
          }, [modalName]);
          const closeModal = (0, import_react21.useCallback)(() => {
            setModalStates((prevStates) => ({
              ...prevStates,
              [modalName]: false
            }));
          }, [modalName]);
          return { isOpen, openModal, closeModal };
        },
        [modalStates]
      );
      const value = (0, import_react21.useMemo)(() => useModal2, [useModal2]);
      return /* @__PURE__ */ import_react21.default.createElement(ModalContext.Provider, { value }, children);
    };
    const useModalFromContext = (modalName) => {
      const contextUseModal = (0, import_react21.useContext)(ModalContext);
      if (contextUseModal) {
        return contextUseModal(modalName);
      }
      throw new Error("Wrap Element with ModalContextProvider");
    };
    return { ModalContextProvider: ModalContextProvider2, useModal: useModalFromContext };
  };
  var { ModalContextProvider, useModal } = createModalContext();

  // extension/components/settings/SettingsModal.tsx
  var import_react22 = __toESM(require_react());
  var SettingsModal = (0, import_react22.memo)(() => {
    const { isOpen, closeModal } = useModal("settings");
    return /* @__PURE__ */ import_react22.default.createElement(Modal_default, { title: "Lucid Settings", onClose: closeModal, isOpen }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "sections-container" }, /* @__PURE__ */ import_react22.default.createElement(BackgroundSection_default, null), /* @__PURE__ */ import_react22.default.createElement(InterfaceSection_default, null), /* @__PURE__ */ import_react22.default.createElement(PlaybarSection_default, null), /* @__PURE__ */ import_react22.default.createElement(ResetSection_default, null), /* @__PURE__ */ import_react22.default.createElement(ImportExportSection_default, null)));
  });
  var SettingsModal_default = SettingsModal;

  // extension/hooks/useSettingsAccess.ts
  var import_react23 = __toESM(require_react());
  var useSettingsAccess = () => {
    logDebug("hook running useSettingsAccess");
    const { settingAccessPosition } = useSettingsStore();
    const { openModal } = useModal("settings");
    const element = (0, import_react23.useRef)(null);
    (0, import_react23.useEffect)(() => {
      if (settingAccessPosition === "context-menu") {
        element.current = new Spicetify.Menu.Item(
          "Lucid Settings",
          false,
          openModal,
          `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>`
        );
        element.current.register();
      }
      if (settingAccessPosition === "nav") {
        if (!document.querySelector(".main-actionButtons button[aria-label='Lucid Settings']") && !(element.current instanceof HTMLButtonElement)) {
          const newButton = new Spicetify.Topbar.Button(
            "Lucid Settings",
            `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="currentColor"/></svg>`,
            openModal,
            false,
            true
          );
          element.current = newButton;
        }
      }
      return () => {
        if (element.current instanceof Spicetify.Menu.Item) {
          element.current.deregister();
        }
        if (element.current instanceof Spicetify.Topbar.Button) {
          element.current.element.remove();
        }
        document.querySelector(".Root__globalNav .main-actionButtons div:has(button[aria-label='Lucid Settings'])")?.remove();
      };
    }, [settingAccessPosition, openModal]);
  };
  var useSettingsAccess_default = useSettingsAccess;

  // extension/components/settings/SettingsManager.tsx
  var import_react24 = __toESM(require_react());
  var SettingsManager = (0, import_react24.memo)(() => {
    logDebug("Render <SettingsManager />");
    const { isOpen } = useModal("settings");
    useSettingsAccess_default();
    return /* @__PURE__ */ import_react24.default.createElement(import_react24.default.Fragment, null, isOpen && /* @__PURE__ */ import_react24.default.createElement(SettingsModal_default, null));
  });
  var SettingsManager_default = SettingsManager;

  // extension/utils/styleUtils.ts
  var appendFilter = (currentFilter, newFilter) => [currentFilter, newFilter].filter(Boolean).join(" ").trim();
  var getFormattedStyles = (dynamicStyles) => {
    if (!Object.keys(dynamicStyles).length) return {};
    const styles = {};
    if (dynamicStyles.blur !== void 0) {
      styles.filter = appendFilter(styles.filter, `blur(${dynamicStyles.blur}px)`);
    }
    if (dynamicStyles.backdropBlur !== void 0) {
      styles.backdropFilter = `blur(${dynamicStyles.backdropBlur}px)`;
    }
    if (dynamicStyles.contrast !== void 0) {
      styles.filter = appendFilter(styles.filter, `contrast(${dynamicStyles.contrast})`);
    }
    if (dynamicStyles.brightness !== void 0) {
      styles.filter = appendFilter(styles.filter, `brightness(${dynamicStyles.brightness})`);
    }
    if (dynamicStyles.saturation !== void 0) {
      styles.filter = appendFilter(styles.filter, `saturate(${dynamicStyles.saturation})`);
    }
    if (dynamicStyles.width !== void 0) {
      styles.width = `${dynamicStyles.width}px`;
    }
    if (dynamicStyles.height !== void 0) {
      styles.height = `${dynamicStyles.height}px`;
    }
    if (dynamicStyles.paddingX !== void 0 || dynamicStyles.paddingY !== void 0) {
      styles.padding = `${dynamicStyles.paddingY || 0}px ${dynamicStyles.paddingX || 0}px`;
    }
    if (dynamicStyles.borderRadius !== void 0) {
      styles.borderRadius = `${dynamicStyles.borderRadius}px`;
    }
    if (dynamicStyles.backgroundColor !== void 0) {
      styles.backgroundColor = `${dynamicStyles.backgroundColor}`;
    }
    return styles;
  };
  var getFormattedStylesAsCSSProperty = (dynamicStyles, isString = false) => {
    if (!Object.keys(dynamicStyles).length) return isString ? "" : {};
    const styles = {};
    if (dynamicStyles.blur !== void 0) {
      styles["--blur"] = `${dynamicStyles.blur}px`;
    }
    if (dynamicStyles.backdropBlur !== void 0) {
      styles["--backdrop-blur"] = `${dynamicStyles.backdropBlur}px`;
    }
    if (dynamicStyles.contrast !== void 0) {
      styles["--contrast"] = dynamicStyles.contrast;
    }
    if (dynamicStyles.brightness !== void 0) {
      styles["--brightness"] = dynamicStyles.brightness;
    }
    if (dynamicStyles.saturation !== void 0) {
      styles["--saturation"] = dynamicStyles.saturation;
    }
    if (dynamicStyles.width !== void 0) {
      styles["--width"] = `${dynamicStyles.width}px`;
    }
    if (dynamicStyles.height !== void 0) {
      styles["--height"] = `${dynamicStyles.height}px`;
    }
    if (dynamicStyles.paddingX !== void 0) {
      styles["--padding-x"] = `${dynamicStyles.paddingX}px`;
    }
    if (dynamicStyles.borderRadius !== void 0) {
      styles["--border-radius"] = `${dynamicStyles.borderRadius}px`;
    }
    if (dynamicStyles.backgroundColor !== void 0) {
      styles["--background-color"] = dynamicStyles.backgroundColor;
    }
    if (dynamicStyles.time !== void 0) {
      styles["--time"] = `${dynamicStyles.time}s`;
    }
    if (isString) {
      return Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(" ");
    }
    return styles;
  };

  // extension/components/background/AnimatedBackground.tsx
  var import_react25 = __toESM(require_react());
  var AnimatedBackground = ({ style }) => {
    return /* @__PURE__ */ import_react25.default.createElement(
      "div",
      {
        className: "animated-background-container",
        style: { ...getFormattedStylesAsCSSProperty(style) }
      },
      /* @__PURE__ */ import_react25.default.createElement("div", { className: "back" }),
      /* @__PURE__ */ import_react25.default.createElement("div", { className: "backleft" }),
      /* @__PURE__ */ import_react25.default.createElement("div", { className: "backright" }),
      /* @__PURE__ */ import_react25.default.createElement("div", { className: "front" })
    );
  };
  var AnimatedBackground_default = AnimatedBackground;

  // extension/components/background/SolidBackground.tsx
  var import_react26 = __toESM(require_react());
  var SolidBackground = ({ style }) => {
    return /* @__PURE__ */ import_react26.default.createElement("div", { className: "solid-background", style: { ...getFormattedStyles(style) } });
  };
  var SolidBackground_default = SolidBackground;

  // extension/store/useLucidStore.ts
  var DEFAULT_APP_SETTINGS2 = {
    underMainBackgroundImage: "",
    pageCategory: "other",
    artworkData: {
      nowPlayingArtURL: "",
      currentPageURI: "",
      currentPageArtURL: ""
    },
    windowZoom: 1
  };
  var useLucidStore = create((set) => ({
    ...DEFAULT_APP_SETTINGS2,
    // Setters
    updateArtworkData: (newArtwork) => set((state) => ({
      ...state,
      artworkData: { ...state.artworkData, ...newArtwork }
    })),
    setPageCategory: (pageCategory) => set((state) => ({ ...state, pageCategory })),
    setUnderMainViewBackgroundImage: (url) => set((state) => ({ ...state, underMainBackgroundImage: url })),
    setIsCustomControls: (isCustomControls2) => set((state) => ({ ...state, isCustomControls: isCustomControls2 })),
    setWindowZoom: (windowZoom) => set((state) => ({ ...state, windowZoom }))
  }));

  // extension/components/background/StaticBackground.tsx
  var import_react27 = __toESM(require_react());
  var StaticBackground = ({ style }) => {
    const {
      backgroundSettings: { customBackgroundOverride }
    } = useSettingsStore();
    const { artworkData } = useLucidStore();
    const { isUseLocalImage, selectedLocalImage } = useImageStore();
    const backgroundImage = (() => {
      if (isUseLocalImage && selectedLocalImage?.dataURL) {
        return selectedLocalImage.dataURL;
      } else {
        const overrideUrl = customBackgroundOverride.url;
        if (overrideUrl === "current-page") {
          return artworkData?.currentPageArtURL || artworkData?.nowPlayingArtURL || "";
        }
        if (!overrideUrl || overrideUrl.trim() === "" || overrideUrl === "now-playing") {
          return artworkData?.nowPlayingArtURL || "";
        }
        return overrideUrl || "";
      }
    })();
    return /* @__PURE__ */ import_react27.default.createElement(
      "div",
      {
        className: "static-background",
        style: {
          backgroundImage: `url(${backgroundImage})`,
          ...getFormattedStyles(style)
        }
      }
    );
  };
  var StaticBackground_default = StaticBackground;

  // extension/components/state/BackgroundManager.tsx
  var import_react28 = __toESM(require_react());
  var BackgroundComponents = {
    animated: AnimatedBackground_default,
    static: StaticBackground_default,
    solid: SolidBackground_default
  };
  var BackgroundManager = () => {
    logDebug("Render <BackgroundManager />");
    const {
      backgroundSettings: { mode: backgroundMode, styles: backgroundStyles }
    } = useSettingsStore();
    const currentBackgroundStyles = backgroundStyles[backgroundMode];
    const BackgroundComponent = BackgroundComponents[backgroundMode];
    return /* @__PURE__ */ import_react28.default.createElement("div", { className: "background-wrapper" }, BackgroundComponent ? /* @__PURE__ */ import_react28.default.createElement(BackgroundComponent, { style: currentBackgroundStyles }) : /* @__PURE__ */ import_react28.default.createElement(SolidBackground_default, { style: { backgroundColor: "#202020" } }));
  };
  var BackgroundManager_default = BackgroundManager;

  // extension/utils/artworkUrl.ts
  var getNowPlayingArtworkUrl = async () => {
    const waitForPlayerData = async () => {
      while (!Spicetify?.Player?.data) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };
    await waitForPlayerData();
    const { item } = Spicetify.Player.data;
    if (!item || !item.metadata) {
      logError("No item or metadata found in Spicetify Player data.");
      return "";
    }
    const artworkUrls = [
      item.metadata.image_xlarge_url,
      item.metadata.image_large_url,
      item.metadata.image_url,
      item.metadata.image_small_url
    ];
    const imageUrl = artworkUrls.find((url) => url) || getFallbackImageUrl();
    return imageUrl || "";
  };
  var getFallbackImageUrl = () => {
    const fallbackImage = document.querySelector(
      ".Root__right-sidebar .main-nowPlayingView-nowPlayingWidget .main-image-image"
    );
    return fallbackImage?.src || "";
  };
  var getArtistMetaData = async (uri) => {
    const MAX_RETRIES = 3;
    let retries = 0;
    while (retries <= MAX_RETRIES) {
      try {
        const metadata = await Spicetify.GraphQL.Request(
          {
            name: "queryArtistOverview",
            operation: "query",
            sha256Hash: "35648a112beb1794e39ab931365f6ae4a8d45e65396d641eeda94e4003d41497",
            value: null
          },
          {
            uri,
            includePrerelease: true,
            locale: null
          }
        );
        if (metadata) return metadata;
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("DUPLICATE_REQUEST_ERROR") && retries < MAX_RETRIES) {
            retries++;
            logWarn(`Duplicate request detected (getArtistMetaData). Retrying in 1 second... (Attempt ${retries})`);
            await new Promise((resolve) => setTimeout(resolve, 1e3));
            continue;
          }
        }
        logError("Error fetching artist metadata:", error);
        throw error;
      }
    }
  };
  var getAlbumMetaData = async (uri) => {
    const MAX_RETRIES = 3;
    let retries = 0;
    while (retries <= MAX_RETRIES) {
      try {
        const metadata = await Spicetify.GraphQL.Request(
          {
            name: "getAlbum",
            operation: "query",
            sha256Hash: "469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d",
            value: null
          },
          {
            uri,
            locale: null,
            offset: 0,
            limit: 50
          }
        );
        if (metadata) return metadata;
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("DUPLICATE_REQUEST_ERROR") && retries < MAX_RETRIES) {
            retries++;
            logWarn(`Duplicate request detected (getAlbumMetaData). Retrying in 1 second... (Attempt ${retries})`);
            await new Promise((resolve) => setTimeout(resolve, 1e3));
            continue;
          }
        }
        logError("Error fetching album metadata:", error);
        throw error;
      }
    }
  };
  var getSpotifyURI = (pathname) => {
    const isPlaylist = Spicetify.URI.isPlaylistV1OrV2(pathname);
    const isArtist = Spicetify.URI.isArtist(pathname);
    const isAlbum = Spicetify.URI.isAlbum(pathname);
    const isShow = Spicetify.URI.isShow(pathname);
    const isProfile = Spicetify.URI.isProfile(pathname);
    if (isPlaylist || isArtist || isAlbum || isProfile || isShow) {
      const id = pathname.match(/\/(?:playlist|artist|album|user|show)\/([^/]+)/)?.[1];
      if (!id) {
        logWarn("No ID found in pathname:", pathname);
        return null;
      }
      return `spotify:${isPlaylist ? "playlist" : isArtist ? "artist" : isAlbum ? "album" : isShow ? "show" : "user"}:${id}`;
    }
    return null;
  };
  var fetchArtworkURLFromAPI = async (uri) => {
    const uriType = uri.split(":")[1];
    try {
      switch (uriType) {
        case "playlist":
        case "show": {
          const playlistMetadata = await Spicetify.Platform.PlaylistAPI.getMetadata(uri);
          return playlistMetadata.images.find((image) => image.url)?.url || null;
        }
        case "artist": {
          const artistMetadata = await getArtistMetaData(uri);
          return artistMetadata.data?.artistUnion.visuals.headerImage?.sources?.[0]?.url || artistMetadata.data?.artistUnion.visuals.avatarImage?.sources?.[0]?.url || null;
        }
        case "album": {
          const albumMetadata = await getAlbumMetaData(uri);
          return albumMetadata.data?.albumUnion.coverArt.sources?.[2]?.url || albumMetadata.data?.albumUnion.coverArt.sources?.[0]?.url || null;
        }
        case "user": {
          const req = await Spicetify.Platform.RequestBuilder.build().withHost("https://spclient.wg.spotify.com/user-profile-view/v3").withPath(`/profile/${uri.split(":")[2]}`).send();
          return req?.body?.image_url || null;
        }
        default:
          return null;
      }
    } catch (error) {
      logError(`Error fetching artwork for ${uriType}:`, error);
      return null;
    }
  };

  // extension/components/state/ArtworkManager.tsx
  var import_react29 = __toESM(require_react());
  var ArtworkManager = () => {
    logDebug("Render <ArtworkManager />");
    const { pageCategory, artworkData, updateArtworkData } = useLucidStore();
    const {
      interfaceSettings: { pagesSettings }
    } = useSettingsStore();
    const setPageArtwork = (0, import_react29.useCallback)(async () => {
      const pathname = Spicetify.Platform.History.location.pathname;
      const currentPageURI = getSpotifyURI(pathname);
      if (artworkData.currentPageURI === currentPageURI) {
        return;
      }
      document.documentElement.style.setProperty("--artwork-opacity", "0");
      try {
        if (currentPageURI) {
          const imageUrl = await fetchArtworkURLFromAPI(currentPageURI) || "";
          updateArtworkData({ currentPageArtURL: imageUrl, currentPageURI });
        } else {
          updateArtworkData({ currentPageArtURL: "", currentPageURI: "" });
        }
      } catch (error) {
        logError("Error updating artwork:", error);
        updateArtworkData({ currentPageArtURL: "", currentPageURI: "" });
      } finally {
        setTimeout(() => document.documentElement.style.setProperty("--artwork-opacity", "1"), 500);
      }
    }, [artworkData.currentPageURI, updateArtworkData]);
    (0, import_react29.useEffect)(() => {
      if (artworkData.currentPageArtURL) {
        document.documentElement.style.setProperty("--playlist-art-image", `url(${artworkData.currentPageArtURL})`);
        logInfo(`Updated Playlist Artwork URL to ${artworkData.currentPageArtURL}`);
      } else if (artworkData.currentPageURI && pageCategory !== "other") {
        logError(`No artwork URL found for URI: ${artworkData.currentPageURI}`);
        document.documentElement.style.setProperty("--playlist-art-image", "none");
      }
      if (pagesSettings.backgroundImageMode === "inherit") {
        const unlistenHistory = Spicetify.Platform.History.listen(setPageArtwork);
        setPageArtwork();
        return () => {
          unlistenHistory();
        };
      }
    }, [
      pagesSettings.backgroundImageMode,
      artworkData.currentPageArtURL,
      artworkData.currentPageURI,
      pageCategory,
      setPageArtwork
    ]);
    (0, import_react29.useEffect)(() => {
      if (artworkData.nowPlayingArtURL) {
        document.documentElement.style.setProperty("--now-playing-art-image", `url("${artworkData.nowPlayingArtURL}")`);
        logInfo(`Updated Now Playing Art View: ${artworkData.nowPlayingArtURL}`);
      }
    }, [artworkData.nowPlayingArtURL]);
    (0, import_react29.useEffect)(() => {
      const handleSongChange = async () => {
        const nowPlayingArtURL = await getNowPlayingArtworkUrl();
        updateArtworkData({ nowPlayingArtURL });
      };
      handleSongChange();
      Spicetify.Player.addEventListener("songchange", handleSongChange);
      return () => {
        Spicetify.Player.removeEventListener("songchange", handleSongChange);
      };
    }, [updateArtworkData]);
    return null;
  };
  var ArtworkManager_default = ArtworkManager;

  // extension/components/state/BorderManager.tsx
  var import_react30 = __toESM(require_react());
  var BorderManager = () => {
    const {
      interfaceSettings: { borderSettings }
    } = useSettingsStore();
    (0, import_react30.useEffect)(() => {
      const getFormattedStylesAsCSSProperty2 = (borderSettings2) => {
        if (!Object.keys(borderSettings2).length) return "";
        return Object.entries(borderSettings2).map(
          ([key, value]) => `--border-${key}: ${key === "thickness" || key === "roundedRadius" ? `${value}px` : value};`
        ).join(" ");
      };
      const cssProperties = getFormattedStylesAsCSSProperty2(borderSettings);
      document.documentElement.style.cssText += cssProperties;
    }, [borderSettings]);
    return null;
  };
  var BorderManager_default = BorderManager;

  // extension/utils/colorUtils.ts
  var rgbToHex = (r, g, b) => `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
  var luminance = (r, g, b) => {
    const [r1, g1, b1] = [r / 255, g / 255, b / 255];
    const [r2, g2, b2] = [
      r1 <= 0.03928 ? r1 / 12.92 : ((r1 + 0.055) / 1.055) ** 2.4,
      g1 <= 0.03928 ? g1 / 12.92 : ((g1 + 0.055) / 1.055) ** 2.4,
      b1 <= 0.03928 ? b1 / 12.92 : ((b1 + 0.055) / 1.055) ** 2.4
    ];
    return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
  };
  var darkenColor = (color, factor) => ({
    ...color,
    r: Math.max(0, Math.round(color.r * factor)),
    g: Math.max(0, Math.round(color.g * factor)),
    b: Math.max(0, Math.round(color.b * factor)),
    hex: rgbToHex(
      Math.max(0, Math.round(color.r * factor)),
      Math.max(0, Math.round(color.g * factor)),
      Math.max(0, Math.round(color.b * factor))
    )
  });
  var lightenColor = (color, factor) => ({
    ...color,
    r: Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
    g: Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
    b: Math.min(255, Math.round(color.b + (255 - color.b) * factor)),
    hex: rgbToHex(
      Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
      Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
      Math.min(255, Math.round(color.b + (255 - color.b) * factor))
    )
  });
  var contrastRatio = (color1, color2) => {
    const lum1 = luminance(color1.r, color1.g, color1.b);
    const lum2 = luminance(color2.r, color2.g, color2.b);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  // extension/utils/dynamicColorUtils.tsx
  var import_canvas = __toESM(require_browser());
  async function extractDominantColorsFromImage(imageUrl) {
    try {
      const image = await (0, import_canvas.loadImage)(imageUrl);
      const reductionFactor = 10;
      const reducedWidth = Math.max(image.width / reductionFactor, 10);
      const reducedHeight = Math.max(image.height / reductionFactor, 10);
      const canvas = (0, import_canvas.createCanvas)(reducedWidth, reducedHeight);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, reducedWidth, reducedHeight);
      const imageData = ctx.getImageData(0, 0, reducedWidth, reducedHeight);
      const pixelData = imageData.data;
      const colorCounts = {};
      const colorMap = {};
      const samplePercentage = 0.2;
      const pixelSampleSize = Math.floor(pixelData.length * samplePercentage);
      for (let i = 0; i < pixelSampleSize; i += 4) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];
        const colorKey = `${r}-${g}-${b}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
        colorMap[colorKey] = { r, g, b, hex: rgbToHex(r, g, b) };
      }
      const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).map(([key]) => colorMap[key]);
      const baseColor = sortedColors[0];
      let secondaryColor = sortedColors[1];
      let tertiaryColor = sortedColors[2];
      let colorIndex = 2;
      while (!secondaryColor || contrastRatio(baseColor, secondaryColor) < 2.5) {
        if (colorIndex >= sortedColors.length) {
          secondaryColor = lightenColor(baseColor, 0.2);
          break;
        }
        secondaryColor = sortedColors[colorIndex];
        colorIndex++;
      }
      while (!tertiaryColor || contrastRatio(baseColor, tertiaryColor) < 2.5 || contrastRatio(secondaryColor, tertiaryColor) < 2.5) {
        if (colorIndex >= sortedColors.length) {
          tertiaryColor = lightenColor(secondaryColor, 0.2);
          break;
        }
        tertiaryColor = sortedColors[colorIndex];
        colorIndex++;
      }
      return {
        baseColor,
        secondaryColor,
        tertiaryColor
      };
    } catch (error) {
      logError("Error extracting colors: ", error);
      return error;
    }
  }
  var colorExtractionTimeout = null;
  async function applyExtractedColorsToCSS(styleElement, isDynamicColor, currentArtUrl) {
    if (!isDynamicColor || !currentArtUrl) return null;
    return new Promise((resolve) => {
      if (colorExtractionTimeout) {
        clearTimeout(colorExtractionTimeout);
      }
      colorExtractionTimeout = setTimeout(async () => {
        try {
          const extractedColors = await extractDominantColorsFromImage(currentArtUrl);
          if (extractedColors instanceof Error) {
            logError(`Error extracting colors: ${extractedColors.message}`);
            resolve(null);
            return;
          }
          const colorPalette = generateDarkModePalette(extractedColors);
          applyColorPaletteToCSS(styleElement, colorPalette);
          resolve(extractedColors);
        } catch (error) {
          logError("Error saving colors to style: ", error instanceof Error ? error.message : error);
          resolve(null);
        }
      }, 200);
    });
  }
  function applyColorPaletteToCSS(styleElement, colorPalette) {
    let styleContent = `:root {${Object.entries(colorPalette).map(
      ([name, color]) => `
--spice-${name}: ${color.hex} !important;
--spice-rgb-${name}: ${color.r}, ${color.g}, ${color.b} !important;`
    ).join("")}
}`;
    styleContent += ":root{\nwill-change: --spice-main,--spice-rgb-main,--spice-sidebar,--spice-rgb-sidebar,--spice-card,--spice-rgb-card,--spice-player,--spice-rgb-player,--spice-accent,--spice-rgb-accent,--spice-highlight,--spice-rgb-highlight,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-text,--spice-rgb-text,--spice-progress-bar,--spice-rgb-progress-bar,--spice-subtext,--spice-rgb-subtext,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 0.3s ease-in-out;\n}";
    styleElement.textContent = styleContent;
  }
  async function resetCSSColorVariables(styleElement) {
    styleElement.textContent = ":root{\nwill-change: --spice-main,--spice-rgb-main,--spice-sidebar,--spice-rgb-sidebar,--spice-card,--spice-rgb-card,--spice-player,--spice-rgb-player,--spice-accent,--spice-rgb-accent,--spice-highlight,--spice-rgb-highlight,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-text,--spice-rgb-text,--spice-progress-bar,--spice-rgb-progress-bar,--spice-subtext,--spice-rgb-subtext,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 0.3s ease-in-out;\n}";
  }
  function generateDarkModePalette({ baseColor, secondaryColor, tertiaryColor }) {
    return {
      main: darkenColor(secondaryColor, 0.4),
      sidebar: darkenColor(secondaryColor, 0.5),
      card: darkenColor(tertiaryColor, 0.5),
      player: darkenColor(secondaryColor, 0.6),
      "progress-bar": lightenColor(secondaryColor, 0.6),
      accent: lightenColor(baseColor, 0.4),
      highlight: lightenColor(secondaryColor, 0.2),
      button: lightenColor(tertiaryColor, 0.4),
      "button-active": lightenColor(tertiaryColor, 0.4),
      text: lightenColor(baseColor, 0.9),
      subtext: lightenColor(secondaryColor, 0.9),
      primary: baseColor,
      secondary: secondaryColor,
      tertiary: tertiaryColor
    };
  }

  // extension/components/state/ColorManager.tsx
  var import_react31 = __toESM(require_react());
  var ColorManager = () => {
    logDebug("Render <ColorManager />");
    const {
      colorSettings: { isDynamicColor }
    } = useSettingsStore();
    const { artworkData } = useLucidStore();
    const styleRef = (0, import_react31.useRef)(null);
    const prevArtURL = (0, import_react31.useRef)(null);
    (0, import_react31.useEffect)(() => {
      styleRef.current = document.createElement("style");
      styleRef.current.id = "lucid_dynamic_colors";
      document.head.appendChild(styleRef.current);
      return () => {
        if (styleRef.current) {
          document.head.removeChild(styleRef.current);
        }
      };
    }, []);
    (0, import_react31.useEffect)(() => {
      if (!isDynamicColor) {
        if (prevArtURL.current) {
          prevArtURL.current = null;
        }
        if (styleRef.current) {
          resetCSSColorVariables(styleRef.current);
        }
        return;
      }
      if (isDynamicColor && artworkData.nowPlayingArtURL !== prevArtURL.current) {
        if (styleRef?.current && isDynamicColor && artworkData.nowPlayingArtURL) {
          applyExtractedColorsToCSS(styleRef.current, isDynamicColor, artworkData.nowPlayingArtURL).then(() => {
            logInfo("Dynamic colors updated!");
          }).catch((error) => {
            logError("Error updating colors:", error);
          });
        }
        prevArtURL.current = artworkData.nowPlayingArtURL;
      }
    }, [isDynamicColor, artworkData.nowPlayingArtURL]);
    return null;
  };
  var ColorManager_default = ColorManager;

  // extension/components/state/FontStateManager.tsx
  var import_react32 = __toESM(require_react());
  var FontStateManager = () => {
    const {
      interfaceSettings: { fontSettings }
    } = useSettingsStore();
    const updateCssVariable = (0, import_react32.useCallback)(
      (fontType, fontFamily) => {
        document.documentElement.style.setProperty(
          `--${fontType}-font-to-use`,
          fontFamily
        );
      },
      []
    );
    const handleFontChange = (0, import_react32.useCallback)(
      async (fontType) => {
        const { fontFamily, url } = fontSettings[fontType];
        try {
          await loadFontFromUrl(url, `${fontType}-font`);
          updateCssVariable(fontType, fontFamily);
        } catch (error) {
          logError(`Failed to load font from ${url}`, error);
          updateCssVariable(fontType, fontFamily);
        }
      },
      [fontSettings, updateCssVariable]
    );
    (0, import_react32.useEffect)(() => {
      Object.keys(fontSettings).map(
        (fontType) => handleFontChange(fontType)
      );
    }, [fontSettings, handleFontChange]);
    return null;
  };
  var FontStateManager_default = FontStateManager;

  // extension/hooks/useBodyClass.ts
  var import_react33 = __toESM(require_react());
  var useBodyClass = (className) => {
    (0, import_react33.useEffect)(() => {
      if (!className) return;
      document.body.classList.add(className);
      return () => {
        document.body.classList.remove(className);
      };
    }, [className]);
  };

  // extension/components/state/GlobalNavManager.tsx
  var GlobalNavManager = () => {
    logDebug("Render <GlobalNavManager />");
    useBodyClass(isGlobalNav ? "global-nav" : "control-nav");
    return null;
  };
  var GlobalNavManager_default = GlobalNavManager;

  // extension/components/state/GrainManager.tsx
  var import_react34 = __toESM(require_react());
  var GrainManager = () => {
    logDebug("Render <GrainManager />");
    const {
      interfaceSettings: {
        grainSettings: { grainEffect }
      }
    } = useSettingsStore();
    useBodyClass(`grain-${grainEffect}`);
    return /* @__PURE__ */ import_react34.default.createElement("div", { id: "grainEffect", "data-grainEffect": grainEffect });
  };
  var GrainManager_default = GrainManager;

  // extension/utils/pathUtils.ts
  var getPathCategory = (pathname) => {
    if (Spicetify.URI.isPlaylistV1OrV2(pathname)) return "playlist";
    if (Spicetify.URI.isArtist(pathname)) return "artist";
    if (Spicetify.URI.isAlbum(pathname)) return "album";
    if (Spicetify.URI.isGenre(pathname)) return "genre";
    if (Spicetify.URI.isShow(pathname)) return "show";
    if (Spicetify.URI.isSearch(pathname)) return "search";
    if (Spicetify.URI.isProfile(pathname)) return "profile";
    if (Spicetify.URI.isConcert(pathname) || Spicetify.URI.isArtistConcerts(pathname)) return "concert";
    return "other";
  };

  // extension/components/state/PathManager.tsx
  var import_react35 = __toESM(require_react());
  var PathManager = () => {
    const { pageCategory, setPageCategory } = useLucidStore();
    useBodyClass(pageCategory);
    (0, import_react35.useEffect)(() => {
      const setPath = () => {
        const pathname = Spicetify.Platform.History.location.pathname;
        setPageCategory(getPathCategory(pathname));
      };
      setPath();
      const unlistenHistory = Spicetify.Platform.History.listen(() => {
        setPath();
      });
      return () => {
        unlistenHistory();
      };
    }, [setPageCategory]);
    return null;
  };
  var PathManager_default = PathManager;

  // extension/components/state/PlaybarManager.tsx
  var import_react36 = __toESM(require_react());
  var PLAYBAR_CLASS_NAME = ".Root__now-playing-bar";
  var PlaybarManager = () => {
    const { playbarSettings } = useSettingsStore();
    const playbarRef = (0, import_react36.useRef)(document.querySelector(PLAYBAR_CLASS_NAME));
    useBodyClass(`playbar-${playbarSettings.mode}`);
    (0, import_react36.useEffect)(() => {
      if (!playbarRef.current) {
        logError(`Playbar element with class '${PLAYBAR_CLASS_NAME}' not found!`);
        return;
      }
      const { mode, styles } = playbarSettings;
      const dynamicStyle = getFormattedStylesAsCSSProperty(styles[mode], true);
      const height = mode === "compact" ? styles[mode].height : playbarRef.current?.clientHeight || styles[mode]?.height;
      document.documentElement.style.setProperty("--playbar-height", `${height}px`);
      playbarRef.current.style.cssText = dynamicStyle.toString();
    }, [playbarSettings]);
    return null;
  };
  var PlaybarManager_default = PlaybarManager;

  // extension/hooks/mountUnderMainViewWatcher.ts
  var import_react37 = __toESM(require_react());
  var mountUnderMainViewWatcher = () => {
    const { underMainBackgroundImage, setUnderMainViewBackgroundImage } = useLucidStore();
    const handleMutations = (0, import_react37.useCallback)(
      (mutationsList) => {
        const targetImageNode = mutationsList.reduce((foundNode, mutation) => {
          if (foundNode) return foundNode;
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            const firstAddedNode = mutation.addedNodes[0];
            if (firstAddedNode.firstChild instanceof HTMLDivElement) {
              return firstAddedNode.firstChild;
            }
          }
          return null;
        }, null);
        let imageUrl = null;
        if (targetImageNode?.style) {
          imageUrl = targetImageNode.style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/i, "$1");
        } else if (underMainBackgroundImage !== null) {
          imageUrl = null;
        }
        setUnderMainViewBackgroundImage(imageUrl);
      },
      [setUnderMainViewBackgroundImage, underMainBackgroundImage]
    );
    (0, import_react37.useEffect)(() => {
      const observer = new MutationObserver(handleMutations);
      const underMainView = document.querySelector(".under-main-view");
      if (underMainView) {
        observer.observe(underMainView, { childList: true });
      }
      return () => observer.disconnect();
    }, [handleMutations]);
    (0, import_react37.useEffect)(() => {
      document.documentElement.style.setProperty(
        "--under-main-view-art-image",
        underMainBackgroundImage ? `url(${underMainBackgroundImage})` : null
      );
      return () => {
        document.documentElement.style.removeProperty("--under-main-view-art-image");
      };
    }, [underMainBackgroundImage]);
  };
  var mountUnderMainViewWatcher_default = mountUnderMainViewWatcher;

  // extension/components/state/PlaylistViewManager.tsx
  var import_react38 = __toESM(require_react());
  var PlaylistViewManager = () => {
    const {
      interfaceSettings: {
        pagesSettings: { playlistViewMode, isScrollMode, backgroundImageMode }
      }
    } = useSettingsStore();
    const { pageCategory, underMainBackgroundImage, artworkData } = useLucidStore();
    const backgroundRef = (0, import_react38.useRef)(null);
    const blurRef = (0, import_react38.useRef)(null);
    useBodyClass(`${PLAYLIST_VIEW_CLASS_PREFIX}${playlistViewMode}`);
    useBodyClass(`${PLAYLIST_ART_IMAGE_CLASS_PREFIX}${backgroundImageMode}`);
    useBodyClass(`${underMainBackgroundImage ? "under-main-view-present" : ""}`);
    const handleScroll = (0, import_react38.useCallback)(
      (scrollNode) => {
        const { current: background } = backgroundRef;
        if (background) {
          const scrollAmount = Math.min(scrollNode.scrollTop, window.innerHeight);
          background.style.transform = `translate3d(0, ${isScrollMode ? -scrollAmount : 0}px, 0)`;
          background.style.setProperty("--scroll", `${scrollAmount / 1e3}`);
        }
      },
      [isScrollMode]
    );
    const blurAmount = (0, import_react38.useMemo)(() => {
      return pageCategory !== "artist" && !underMainBackgroundImage ? 4 : 0;
    }, [pageCategory, underMainBackgroundImage]);
    (0, import_react38.useEffect)(() => {
      const { current: blur } = blurRef;
      if (blur) {
        blur.style.setProperty("--blur", `${blurAmount}px`);
      }
    }, [blurAmount]);
    (0, import_react38.useEffect)(() => {
      const scrollNode = document.querySelector(SCROLL_NODE_SELECTORS);
      if (scrollNode) {
        const scrollHandler = () => handleScroll(scrollNode);
        scrollHandler();
        scrollNode.addEventListener("scroll", scrollHandler, { passive: true });
        return () => {
          scrollNode.removeEventListener("scroll", scrollHandler);
        };
      }
    }, [handleScroll]);
    logDebug("New underMainBackgroundImage:", underMainBackgroundImage);
    const backgroundImageUrl = pageCategory !== "other" && backgroundImageMode !== "none" ? underMainBackgroundImage || (backgroundImageMode === "inherit" ? artworkData.currentPageArtURL || "" : artworkData.nowPlayingArtURL || "") : "none";
    const containerClasses = `playlist-art-container ${playlistViewMode} ${backgroundImageMode}`;
    return /* @__PURE__ */ import_react38.default.createElement(
      "span",
      {
        id: "playlistArtContainer",
        className: containerClasses,
        "data-playlist-view-mode": playlistViewMode,
        ref: backgroundRef
      },
      /* @__PURE__ */ import_react38.default.createElement(
        "div",
        {
          className: "background",
          ref: blurRef,
          style: {
            backgroundImage: `url(${backgroundImageUrl})`
          }
        }
      ),
      /* @__PURE__ */ import_react38.default.createElement(
        "div",
        {
          className: "overlay",
          style: {
            height: "100%",
            width: "100%",
            position: "absolute",
            inset: 0
          }
        }
      )
    );
  };
  var PlaylistViewManager_default = PlaylistViewManager;

  // extension/hooks/useUnderMainViewLoader.tsx
  var import_react39 = __toESM(require_react());
  var useUnderMainViewLoader = () => {
    const underMainViewRef = (0, import_react39.useRef)(null);
    (0, import_react39.useEffect)(() => {
      const setUnderMainView = () => {
        if (document.getElementById("lucid-under-main-view")) {
          return;
        }
        const newUnderMainView = document.createElement("div");
        newUnderMainView.id = "lucid-under-main-view";
        newUnderMainView.className = "lucid-under-main-view";
        const mainViewContainer = document.querySelector(".main-view-container");
        if (mainViewContainer) {
          mainViewContainer.prepend(newUnderMainView);
        }
        underMainViewRef.current = newUnderMainView;
        if (underMainViewRef.current) {
          Spicetify.ReactDOM.createRoot(underMainViewRef.current).render(/* @__PURE__ */ import_react39.default.createElement(PlaylistViewManager_default, null));
        }
      };
      setUnderMainView();
      const unlistenHistory = Spicetify.Platform.History.listen(() => {
        setUnderMainView();
      });
      return () => {
        unlistenHistory();
      };
    }, []);
  };

  // extension/components/state/UnderMainViewManager.tsx
  var UnderMainViewManager = () => {
    logDebug("Render <UnderMainViewManager />");
    useUnderMainViewLoader();
    mountUnderMainViewWatcher_default();
    return null;
  };
  var UnderMainViewManager_default = UnderMainViewManager;

  // extension/components/windowControls/TransparentWindowControl.tsx
  var import_react40 = __toESM(require_react());
  var TransparentWindowControl = () => {
    const TransparentWindowControlRef = (0, import_react40.useRef)(null);
    const [style, setStyle] = (0, import_react40.useState)({});
    const { windowZoom } = useLucidStore();
    const {
      interfaceSettings: {
        controlSettings: { height: controlHeight }
      }
    } = useSettingsStore();
    (0, import_react40.useEffect)(() => {
      const setTopBarStyles = () => {
        if (isWindowsPlatform) {
          setWindowControlsHeight(controlHeight);
          if (!isCustomControls && !isLightModeEnabled) {
            const normalHeight = controlHeight || (isSpotifyV16Above ? 32 : 64);
            const controlTop = isSpotifyV16Above ? (controlHeight / windowZoom - Math.min(32 / windowZoom, controlHeight / windowZoom)) / 2 : 0;
            const height = normalHeight / windowZoom - controlTop * 2;
            window.document.body.style.setProperty(
              "--top-bar-padding-start",
              `${(controlHeight <= 16 ? 8 : 64) / windowZoom}px`
            );
            window.document.body.style.setProperty(
              "--top-bar-padding-end",
              `${(controlHeight <= 16 ? 8 : 135) / windowZoom}px`
            );
            const newStyle = {
              position: "fixed",
              right: 0,
              top: `${controlTop}px`,
              height: `${height}px`,
              width: `${135 / windowZoom}px`,
              WebkitBackdropFilter: "brightness(2.12)",
              backdropFilter: "brightness(2.12)",
              pointerEvents: "none",
              zIndex: "var(--above-main-and-now-playing-view-grid-area, 6)"
            };
            setStyle(newStyle);
          } else {
            setStyle({});
          }
        }
      };
      setTopBarStyles();
      const handleResize = () => {
        setTopBarStyles();
      };
      const timeoutId = setTimeout(setTopBarStyles, 1e3);
      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", handleResize);
      };
    }, [windowZoom, controlHeight]);
    return /* @__PURE__ */ import_react40.default.createElement("div", { ref: TransparentWindowControlRef, style });
  };
  var TransparentWindowControl_default = TransparentWindowControl;

  // extension/components/state/WindowControlsManager.tsx
  var import_react41 = __toESM(require_react());
  var WindowControlsManager = (0, import_react41.memo)(() => {
    return /* @__PURE__ */ import_react41.default.createElement(import_react41.default.Fragment, null, isWindowsPlatform ? /* @__PURE__ */ import_react41.default.createElement(
      "div",
      {
        id: "transperent-controls-container",
        style: { containerType: "normal", pointerEvents: "none" }
      },
      !isCustomControls && isWindowsPlatform ? /* @__PURE__ */ import_react41.default.createElement(TransparentWindowControl_default, null) : null
    ) : null);
  });
  var WindowControlsManager_default = WindowControlsManager;

  // extension/components/state/MainStateManager.tsx
  var import_react43 = __toESM(require_react());

  // extension/components/state/ZoomManager.tsx
  var import_react42 = __toESM(require_react());
  var ZoomManager = () => {
    const prevValues = (0, import_react42.useRef)({
      outerWidth: window.outerWidth,
      innerWidth: window.innerWidth,
      ratio: window.devicePixelRatio
    });
    const { windowZoom, setWindowZoom } = useLucidStore();
    const prevOuterWidth = (0, import_react42.useRef)(window.outerWidth);
    const prevInnerWidth = (0, import_react42.useRef)(window.innerWidth);
    const prevRatio = (0, import_react42.useRef)(window.devicePixelRatio);
    const startup = (0, import_react42.useRef)(true);
    const mainRef = (0, import_react42.useRef)(document.querySelector(".Root__main-view"));
    (0, import_react42.useEffect)(() => {
      const updateZoom = () => {
        document.documentElement.style.setProperty("--main-view-height", `${mainRef.current?.clientHeight}px`);
        const newOuterWidth = window.outerWidth;
        const newInnerWidth = window.innerWidth;
        const newRatio = window.devicePixelRatio;
        if (startup.current || (prevOuterWidth.current <= 160 || prevRatio.current !== newRatio) && (prevOuterWidth.current !== newOuterWidth || prevInnerWidth.current !== newInnerWidth)) {
          const modified = newOuterWidth / newInnerWidth || 1;
          setWindowZoom(modified);
          document.documentElement.style.setProperty("--zoom", `${modified}`);
          logDebug(`Zoom Updated: ${newOuterWidth} / ${newInnerWidth} = ${modified}`);
          prevOuterWidth.current = newOuterWidth;
          prevInnerWidth.current = newInnerWidth;
          prevRatio.current = newRatio;
        }
      };
      const handleResize = () => {
        updateZoom();
      };
      updateZoom();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [setWindowZoom]);
    return null;
  };
  var ZoomManager_default = ZoomManager;

  // extension/components/state/NpvManager.tsx
  var NpvManager = () => {
    const {
      npvSettings: { mode, position, blur }
    } = useSettingsStore();
    document.body.style.setProperty("--compact-npv-blur", `${blur}px`);
    useBodyClass(`${mode}-npv`);
    useBodyClass(`${position}-npv`);
    return null;
  };
  var NpvManager_default = NpvManager;

  // extension/components/state/MainStateManager.tsx
  var MainStateManager = () => {
    logDebug("Render <MainStateManager />");
    return /* @__PURE__ */ import_react43.default.createElement(import_react43.default.Fragment, null, /* @__PURE__ */ import_react43.default.createElement(PathManager_default, null), /* @__PURE__ */ import_react43.default.createElement(GrainManager_default, null), /* @__PURE__ */ import_react43.default.createElement(ColorManager_default, null), /* @__PURE__ */ import_react43.default.createElement(ZoomManager_default, null), /* @__PURE__ */ import_react43.default.createElement(PlaybarManager_default, null), /* @__PURE__ */ import_react43.default.createElement(ArtworkManager_default, null), /* @__PURE__ */ import_react43.default.createElement(BorderManager_default, null), /* @__PURE__ */ import_react43.default.createElement(GlobalNavManager_default, null), /* @__PURE__ */ import_react43.default.createElement(FontStateManager_default, null), /* @__PURE__ */ import_react43.default.createElement(NpvManager_default, null), /* @__PURE__ */ import_react43.default.createElement(UnderMainViewManager_default, null), /* @__PURE__ */ import_react43.default.createElement(WindowControlsManager_default, null));
  };
  var MainStateManager_default = MainStateManager;

  // extension/utils/backgroundUtils.ts
  function applyBackgroundStyles(backgroundStyleElement, zIndex) {
    backgroundStyleElement.innerHTML = `
    #lucid-main .background-container .background-wrapper div { z-index: ${zIndex} !important; }
  `;
  }
  function setDefaultBackgroundZIndex(backgroundStyleElement) {
    backgroundStyleElement.innerHTML = `
    #lucid-main .background-container .background-wrapper div { z-index: -1 !important; }
  `;
  }
  function manageBackgroundZIndexForElement(element, containerSelector, backgroundStyleElement, zIndex) {
    let isContainerPresent = false;
    let previousContainer = null;
    const observer = new MutationObserver(() => {
      const container = element.querySelector(containerSelector);
      if (container !== previousContainer) {
        if (container && !isContainerPresent) {
          logInfo(`Applying background z-index: ${zIndex}`);
          isContainerPresent = true;
          applyBackgroundStyles(backgroundStyleElement, zIndex);
        } else if (isContainerPresent) {
          logInfo(`Removing background z-index: ${zIndex}`);
          isContainerPresent = false;
          const lyricsCinemaElement = document.querySelector(
            "#lyrics-cinema .lyrics-lyrics-background, #lyrics-cinema .lyrics-lyrics-container"
          );
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
  var manageBackgroundZIndex = () => {
    let backgroundStyleElement = document.getElementById("lucid-background-style");
    if (!backgroundStyleElement) {
      backgroundStyleElement = document.createElement("style");
      backgroundStyleElement.id = "lucid-background-style";
      document.head.appendChild(backgroundStyleElement);
    }
    const lyricsCinemaElement = document.querySelector("#lyrics-cinema");
    if (lyricsCinemaElement) {
      manageBackgroundZIndexForElement(
        lyricsCinemaElement,
        "#lyrics-cinema .lyrics-lyrics-background, #lyrics-cinema .lyrics-lyrics-container",
        backgroundStyleElement,
        5
      );
    }
    const fullScreenElement = document.querySelector("#main .Root > div:last-child");
    if (fullScreenElement) {
      manageBackgroundZIndexForElement(
        fullScreenElement,
        '.Root div[data-testid="fullscreen-mode-container"], .Root .npv-main-container',
        backgroundStyleElement,
        15
      );
    }
  };

  // extension/utils/replaceIcons.ts
  var replaceIcons = () => {
    const { Locale } = Spicetify;
    function cleanLabel(label) {
      const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, "").trim();
      return cleanedLabel;
    }
    if (!Locale) return;
    let playlistPlayLabel = Locale.get("playlist.a11y.play") || "";
    playlistPlayLabel = cleanLabel(playlistPlayLabel);
    let playlistPauseLabel = Locale.get("playlist.a11y.pause") || "";
    playlistPauseLabel = cleanLabel(playlistPauseLabel);
    const playLabel = Locale.get("play");
    const pauseLabel = Locale.get("pause");
    const browseLabel = Locale.get("browse");
    const skipForwardLabel = Locale.get("playback-control.skip-forward");
    const skipBackLabel = Locale.get("playback-control.skip-back");
    const tracklistPlayLabel = Locale.get("tracklist.a11y.play") || "";
    const homeBtnLabelOne = Locale.get("view.web-player-home");
    const upgradeToPremLabel = Locale.get("upgrade.tooltip.title") || "Upgrade to Premium";
    let tracklistPlayLabelOne;
    let tracklistPlayLabelTwo;
    if (["zh-CN", "zh-TW", "am", "fi"].includes(Locale.getLocale())) {
      [tracklistPlayLabelOne, tracklistPlayLabelTwo] = tracklistPlayLabel.split("{1}");
    } else {
      [tracklistPlayLabelOne, tracklistPlayLabelTwo] = tracklistPlayLabel.split("{0}");
    }
    tracklistPlayLabelOne = cleanLabel(tracklistPlayLabelOne);
    tracklistPlayLabelTwo = cleanLabel(tracklistPlayLabelTwo);
    const enableRepeatLabel = Locale.get("playback-control.enable-repeat");
    const enableOneRepeatLabel = Locale.get("playback-control.enable-repeat-one");
    const disableRepeatLabel = Locale.get("playback-control.disable-repeat");
    const BUTTON_STYLE_LABEL = "lucid_button_styles";
    let ButtonStyles = document.getElementById(BUTTON_STYLE_LABEL);
    if (!ButtonStyles) {
      ButtonStyles = document.createElement("style");
      ButtonStyles.id = BUTTON_STYLE_LABEL;
      document.head.appendChild(ButtonStyles);
    }
    ButtonStyles.innerHTML = `
.Root__globalNav button[aria-label="${upgradeToPremLabel}"],
.Root__globalNav button[title="${upgradeToPremLabel}"] {
  display: none !important;
}

.main-repeatButton-button[aria-checked="false"],
.player-controls__right button[aria-label*="${enableRepeatLabel}"]  span{
  -webkit-mask-image: var(--repeat-off-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/repeat-off.svg"));
  mask-image: var(--repeat-off-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/repeat-off.svg"));
  background-color: var(--spice-subtext);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="mixed"],
.player-controls__right button[aria-label*="${disableRepeatLabel}"] span {
  -webkit-mask-image: var(--repeat-mixed-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/repeat-mixed.svg"));
  mask-image: var(--repeat-mixed-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/repeat-mixed.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="true"],
.player-controls__right button[aria-label*="${enableOneRepeatLabel}"] span {
  -webkit-mask-image: var(--repeat-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/repeat.svg"));
  mask-image: var(--repeat-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/repeat.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.player-controls__right button[aria-label*="${disableRepeatLabel}"] svg,
.player-controls__right button[aria-label*="${enableRepeatLabel}"] svg {
  transform: scale(1.15);
}

.player-controls__right button[aria-label*="${disableRepeatLabel}"] svg,
.player-controls__right button[aria-label*="${enableRepeatLabel}"] svg {
  visibility: hidden;
  opacity: 0;
}

.main-repeatButton-button {
  transform: scale(0.65) !important;
}

.player-controls__right, 
.player-controls__left {
    align-items: center;
}

.player-controls__buttons>button[aria-label*="${playLabel}"] span,
.main-playButton-button[aria-label*="${playLabel}"],
.main-playButton-PlayButton>button[aria-label*="${playLabel}"]{
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--play-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/play.svg")) !important;
  mask-image: var(--play-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/play.svg")) !important;
}

.main-playButton-button[aria-label*="${pauseLabel}"],
.main-playButton-PlayButton>button[aria-label*="${pauseLabel}"],
.main-playPauseButton-button[aria-label*="${pauseLabel}"],
.player-controls__buttons>button[aria-label*="${pauseLabel}"] span {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--pause-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/pause.svg")) !important;
  mask-image: var(--pause-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/pause.svg")) !important;
}

.Root__globalNav button:is([aria-label="Clear search field"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${browseLabel}"] path {
  display: none !important;
}

button[aria-label="${browseLabel}"] svg {
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: var(--compass-outline-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/compass-outline.svg"));
  mask-image: var(--compass-outline-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/compass-outline.svg"));
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}

.main-repeatButton-button[aria-label="${enableRepeatLabel}"],
.main-repeatButton-button[aria-label="${disableRepeatLabel}"],
.main-repeatButton-button[aria-label="${enableOneRepeatLabel}"],
{
scale: 0.75 !important;
background-color: var(--spice-subtext) !important;
color: var(--spice-subtext);

svg {
  display: none;
}
}

.player-controls__buttons>button[aria-label*="${playLabel}"] span,
.player-controls__buttons>button[aria-label*="${pauseLabel}"] span{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  aspect-ratio: 1/1;
}

.main-playPauseButton-button,
.player-controls button[aria-label="${skipBackLabel}"],
.player-controls button[aria-label="${skipForwardLabel}"]
{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
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
  height: var(--button-size, 24px);
  width: var(--button-size, 24px);
  
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}

.player-controls__buttons>button[aria-label*="${playLabel}"] span svg,
.player-controls__buttons>button[aria-label*="${pauseLabel}"] span svg {
  display: none;
  visibility: hidden;
}

.player-controls button[aria-label="${skipBackLabel}"] span,
.player-controls button[aria-label="${skipForwardLabel}"] span {
  opacity: 0;
}

.player-controls button[aria-label="${skipBackLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--prev-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/prev.svg"));
  mask-image: var(--prev-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/prev.svg"));
}

.player-controls button[aria-label="${skipForwardLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--next-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/next.svg"));
  mask-image: var(--next-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/next.svg"));
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"] svg,
button[aria-label="${homeBtnLabelOne}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-outline-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/home-outline.svg"));
  -webkit-mask-image: var(--home-outline-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/home-outline.svg"));
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg,
.main-globalNav-navLinkActive[aria-label="${homeBtnLabelOne}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-filled-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/home-filled.svg"));
  -webkit-mask-image: var(--home-filled-icon, url("https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/assets/icons/home-filled.svg"));
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg {
  path {
display: none !important;
  }

  background-color: var(--spice-accent) !important;
}

#context-menu ul[aria-label*="Add to playlist menu"] {
  p {
max-width: 10rem;
  }
}
`;
  };

  // extension/components/Main.tsx
  var import_react47 = __toESM(require_react());

  // extension/components/changelog/ChangeLogManager.tsx
  var import_react46 = __toESM(require_react());

  // extension/components/changelog/ChangeLog.tsx
  var import_react44 = __toESM(require_react());
  var ChangeLog = ({ releases, isLoading, error }) => {
    if (isLoading) {
      return /* @__PURE__ */ import_react44.default.createElement("div", null, "Loading release data...");
    }
    if (error) {
      return /* @__PURE__ */ import_react44.default.createElement("div", null, "Error fetching release data: ", error.message);
    }
    if (!releases) {
      return /* @__PURE__ */ import_react44.default.createElement("div", null, "No release data found.");
    }
    return /* @__PURE__ */ import_react44.default.createElement("div", { className: "lucid-changelog", id: "lucid-changelog" }, releases.map((release) => /* @__PURE__ */ import_react44.default.createElement("div", { key: release.tag_name, className: "release" }, /* @__PURE__ */ import_react44.default.createElement(
      "button",
      {
        className: "release-button",
        type: "button",
        onClick: () => window.open(release.html_url, "_blank")
      },
      "View on GitHub"
    ), release.body && /* @__PURE__ */ import_react44.default.createElement(
      "div",
      {
        className: "release-content",
        dangerouslySetInnerHTML: { __html: release.body }
      }
    ))));
  };
  var ChangeLog_default = ChangeLog;

  // extension/utils/markdownUtils.ts
  async function getMarkdownHTML(markdown, user, repo) {
    try {
      const postBody = {
        text: markdown,
        context: `${user}/${repo}`,
        mode: "gfm"
      };
      const response = await fetch("https://api.github.com/markdown", {
        method: "POST",
        body: JSON.stringify(postBody)
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

  // extension/hooks/useLocalStorage.ts
  var import_react45 = __toESM(require_react());
  var useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = (0, import_react45.useState)(() => {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    });
    (0, import_react45.useEffect)(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    }, [key, storedValue]);
    return [storedValue, setStoredValue];
  };

  // extension/components/changelog/ChangeLogManager.tsx
  var ChangeLogManager = ({
    currentVersion
  }) => {
    const [releaseData, setReleaseData] = import_react46.default.useState({
      isLoading: true,
      error: null,
      releases: null
    });
    const [previousVersion, setPreviousVersion] = useLocalStorage(
      "lucid:previousVersion",
      null
    );
    const { closeModal, isOpen, openModal } = useModal("changelog");
    const fetchReleaseData = async () => {
      logDebug("Fetching release data...");
      setReleaseData((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const response = await fetch(
          GITHUB_RELEASES_URL || "https://api.github.com/repos/sanoojes/spicetify-lucid/releases"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        logDebug("Fetched release data:", data);
        const releasesWithHTML = await Promise.all(
          data.map(async (release) => ({
            ...release,
            body: await getMarkdownHTML(
              release.body,
              "sanoojes",
              "spicetify-lucid"
            ) || ""
          }))
        );
        setReleaseData({
          isLoading: false,
          error: null,
          releases: releasesWithHTML
        });
        const latestVersion = data[0].tag_name;
        if (previousVersion === null || latestVersion !== previousVersion) {
          console.log("Opening changelog modal because new version detected");
          openModal();
        }
      } catch (error) {
        setReleaseData((prevState) => ({
          ...prevState,
          isLoading: false,
          error: error instanceof Error ? error : new Error("Unknown error")
        }));
        logError("Error fetching release data:", error);
      }
    };
    import_react46.default.useEffect(() => {
      fetchReleaseData();
    }, []);
    const handleCloseModal = import_react46.default.useCallback(() => {
      closeModal();
      const latestVersion = releaseData.releases?.[0]?.tag_name;
      if (latestVersion) {
        setPreviousVersion(latestVersion);
      }
    }, [closeModal, releaseData.releases, setPreviousVersion]);
    return /* @__PURE__ */ import_react46.default.createElement(import_react46.default.Fragment, null, /* @__PURE__ */ import_react46.default.createElement(Modal_default, { title: "Lucid Changelog", onClose: handleCloseModal, isOpen }, /* @__PURE__ */ import_react46.default.createElement(
      ChangeLog_default,
      {
        releases: releaseData.releases,
        isLoading: releaseData.isLoading,
        error: releaseData.error,
        currentVersion
      }
    )));
  };
  var ChangeLogManager_default = ChangeLogManager;

  // extension/components/Main.tsx
  var Main = () => {
    logDebug("Render <Main />");
    (0, import_react47.useEffect)(() => {
      replaceIcons();
      manageBackgroundZIndex();
    }, []);
    return /* @__PURE__ */ import_react47.default.createElement(import_react47.default.Fragment, null, /* @__PURE__ */ import_react47.default.createElement(
      "div",
      {
        id: "background-container",
        className: "background-container",
        style: { containerType: "normal" }
      },
      /* @__PURE__ */ import_react47.default.createElement(BackgroundManager_default, null)
    ), /* @__PURE__ */ import_react47.default.createElement(ModalContextProvider, null, /* @__PURE__ */ import_react47.default.createElement(
      "div",
      {
        id: "modal-container",
        className: "modal-container",
        style: { containerType: "normal" }
      },
      /* @__PURE__ */ import_react47.default.createElement(SettingsManager_default, null),
      /* @__PURE__ */ import_react47.default.createElement(ChangeLogManager_default, null)
    )), /* @__PURE__ */ import_react47.default.createElement("div", { id: "state" }, /* @__PURE__ */ import_react47.default.createElement(MainStateManager_default, null)), /* @__PURE__ */ import_react47.default.createElement(ToastContainer, null));
  };
  var Main_default = Main;

  // extension/App.tsx
  var import_react48 = __toESM(require_react());
  async function App() {
    try {
      while (!Spicetify?.showNotification || !Spicetify?.Player || !Spicetify?.React || !Spicetify?.Platform) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      let rootElement = document.getElementById("lucid-main");
      if (!rootElement) {
        rootElement = document.createElement("div");
        rootElement.id = "lucid-main";
        const mainElement = document.getElementById("main");
        mainElement?.prepend(rootElement);
      }
      if (rootElement && !rootElement.hasChildNodes()) {
        Spicetify.ReactDOM.createRoot(rootElement).render(/* @__PURE__ */ import_react48.default.createElement(Main_default, null));
      }
      console.log(
        "%c Lucid ignited! \u{1F680}",
        "font-weight: bold; font-size: 1.25rem; color: #2196F3; padding: 0.5rem 0;"
      );
    } catch (error) {
      Spicetify.showNotification(
        `[Lucid] Error Occurred: ${error instanceof Error ? error.message : error}`,
        true
      );
      logError(error);
    }
  }
  var App_default = App;

  // ../../../AppData/Local/Temp/lucid-temp/index.jsx
  (async () => {
    await App_default();
  })();
})();

      })();