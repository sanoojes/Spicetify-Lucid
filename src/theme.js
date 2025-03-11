(async () => { while (!Spicetify.React || !Spicetify.ReactDOM) { await new Promise((resolve) => setTimeout(resolve, 10));}"use strict";
var Lucid = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
    var _a4;
    let mut_iterablesIndex = 0;
    let mut_iterator = (_a4 = iterables[0]) == null ? void 0 : _a4[Symbol.iterator]();
    return {
      [Symbol.iterator]() {
        return {
          next() {
            var _a5;
            do {
              if (mut_iterator === void 0) {
                return { done: true, value: void 0 };
              }
              const result = mut_iterator.next();
              if (result.done === true) {
                mut_iterablesIndex += 1;
                mut_iterator = (_a5 = iterables[mut_iterablesIndex]) == null ? void 0 : _a5[Symbol.iterator]();
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
    var _a4, _b2, _c;
    return {
      defaultMergeFunctions: mergeFunctions,
      mergeFunctions: __spreadValues(__spreadValues({}, mergeFunctions), Object.fromEntries(Object.entries(options).filter(([key, option]) => Object.hasOwn(mergeFunctions, key)).map(([key, option]) => option === false ? [key, mergeFunctions.mergeOthers] : [key, option]))),
      metaDataUpdater: (_a4 = options.metaDataUpdater) != null ? _a4 : defaultMetaDataUpdater,
      deepmerge: customizedDeepmerge,
      useImplicitDefaultMerging: (_b2 = options.enableImplicitDefaultMerging) != null ? _b2 : false,
      filterValues: options.filterValues === false ? void 0 : (_c = options.filterValues) != null ? _c : defaultFilterValues,
      actions
    };
  }
  function mergeUnknowns(values, utils, meta) {
    var _a4, _b2;
    const filteredValues = (_b2 = (_a4 = utils.filterValues) == null ? void 0 : _a4.call(utils, values, meta)) != null ? _b2 : values;
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
    constructor(initialState, options = {}) {
      __publicField(this, "state");
      __publicField(this, "subscribers", []);
      __publicField(this, "options");
      this.options = __spreadValues({
        persist: false,
        localStorageKey: "storeState"
      }, options);
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
      const oldState = __spreadValues({}, this.state);
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
  function isValidStaticBackgroundOptions(obj) {
    return isObject(obj) && typeof obj.isCustomImage === "boolean" && typeof obj.customImageURL === "string" && isValidCSSFilter(obj.filter);
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

  // extension/constant.ts
  var _a, _b;
  var APPLICATION_VERSION = (_b = (_a = window == null ? void 0 : window.lucid) == null ? void 0 : _a.version) != null ? _b : "2.0.0";
  var GUIDE_STORAGE_KEY = "lucid-guided-tour";
  var WORKER_SCIRPT_URLS = [
    "https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/beta/src/workers/getColor.js",
    "https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/beta/src/workers/getColor.js"
  ];
  var WORKER_SCRIPT_CACHE_KEY = "LUCID_COLOR_SCRIPT_CACHE";
  var DEFAULT_COLOR = "#1bc858";
  var GUIDE_SCRIPT_CACHE_KEY = "LUCID_GUIDE_SCRIPT_CACHE";
  var GUIDE_SCRIPT_URLS = [
    "https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/beta/src/guidedTour.js",
    "https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/src/guidedTour.js"
  ];
  var APP_SETTINGS_KEY = "lucid-theme-settings";
  var LUCID_VERSION_STORAGE_KEY = "lucid-current-version";
  var CHANGELOG_DATA_URLS = [
    "https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/beta/changelog.json",
    "https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/beta/changelog.json"
  ];
  var CHANGELOG_DATA_STORAGE_KEY = "lucid-changelog-data";
  var DEFAULT_APP_SETTINGS = {
    showChangelog: true,
    position: "nav",
    background: {
      mode: "static",
      options: {
        static: {
          isCustomImage: false,
          customImageURL: "https://picsum.photos/1920/1080?random",
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
      isDynamic: false
    },
    pages: {
      panelGap: 8,
      hideHomeHeader: false,
      style: "card",
      umv: {
        type: "normal",
        options: {
          expanded: {
            isScroll: false,
            isScaling: true,
            filter: { blur: 0 }
          },
          normal: {
            isScroll: false,
            isScaling: true,
            filter: { blur: 8 }
          },
          npv: {
            isScroll: false,
            isScaling: true,
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
          bgColor: {
            hex: "",
            alpha: 50
          },
          bgOpacity: 100,
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
          borderRadius: 8,
          backdropFilter: { blur: 32, saturate: 150, brightness: 60 }
        }
      },
      isFloating: true
    }
  };

  // extension/store/setting.ts
  var AppSettingsStore = class extends store_default {
    constructor(initialState = DEFAULT_APP_SETTINGS, options = {
      persist: true,
      localStorageKey: APP_SETTINGS_KEY
    }) {
      super(initialState, options);
    }
    setChangelog(showChangelog) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), { showChangelog }));
    }
    setPages(pages) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), { pages: __spreadValues(__spreadValues({}, state.pages), pages) }));
    }
    setUMV(umv) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        pages: __spreadProps(__spreadValues({}, state.pages), {
          umv: __spreadValues(__spreadValues({}, state.pages.umv), umv)
        })
      }));
    }
    setUMVOption(key, options) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        pages: __spreadProps(__spreadValues({}, state.pages), {
          umv: __spreadProps(__spreadValues({}, state.pages.umv), {
            options: __spreadProps(__spreadValues({}, state.pages.umv.options), {
              [key]: __spreadValues(__spreadValues({}, state.pages.umv.options[key]), options)
            })
          })
        })
      }));
    }
    setPosition(position) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), { position }));
    }
    setBackgroundMode(mode) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), { mode })
      }));
    }
    setStaticBackgroundOptions(options) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), {
          options: __spreadProps(__spreadValues({}, state.background.options), {
            static: __spreadValues(__spreadValues({}, state.background.options.static), options)
          })
        })
      }));
    }
    setStaticBackgroundFilter(filter) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), {
          options: __spreadProps(__spreadValues({}, state.background.options), {
            static: __spreadProps(__spreadValues({}, state.background.options.static), {
              filter: __spreadValues(__spreadValues({}, state.background.options.static.filter), filter)
            })
          })
        })
      }));
    }
    setAnimatedBackgroundFilter(filter) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), {
          options: __spreadProps(__spreadValues({}, state.background.options), {
            animated: __spreadProps(__spreadValues({}, state.background.options.animated), {
              filter: __spreadValues(__spreadValues({}, state.background.options.animated.filter), filter)
            })
          })
        })
      }));
    }
    setStaticBgFilter(filter) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), {
          options: __spreadProps(__spreadValues({}, state.background.options), {
            static: __spreadProps(__spreadValues({}, state.background.options.static), {
              filter: __spreadValues(__spreadValues({}, state.background.options.static.filter), filter)
            })
          })
        })
      }));
    }
    setSolidBackgroundColor(color) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), {
          options: __spreadProps(__spreadValues({}, state.background.options), {
            solid: __spreadProps(__spreadValues({}, state.background.options.solid), {
              color: __spreadValues(__spreadValues({}, state.background.options.solid.color), color)
            })
          })
        })
      }));
    }
    setAnimatedBackgroundOptions(options) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        background: __spreadProps(__spreadValues({}, state.background), {
          options: __spreadProps(__spreadValues({}, state.background.options), { animated: options })
        })
      }));
    }
    setBorder(border) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        border: __spreadValues(__spreadValues({}, state.border), border)
      }));
    }
    setBorderColor(color) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        border: __spreadProps(__spreadValues({}, state.border), {
          color: __spreadValues(__spreadValues({}, state.border.color), color)
        })
      }));
    }
    setControlHeight(height) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        control: __spreadProps(__spreadValues({}, state.control), { height })
      }));
    }
    setFont(font) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), { font: __spreadValues(__spreadValues({}, state.font), font) }));
    }
    setGrains(grains) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        grains: __spreadValues(__spreadValues({}, state.grains), grains)
      }));
    }
    setRightSidebar(rightSidebar) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        rightSidebar: __spreadValues(__spreadValues({}, state.rightSidebar), rightSidebar)
      }));
    }
    setColor(color) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        color: __spreadValues(__spreadValues({}, state.color), color)
      }));
    }
    setPageStyle(style) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        pages: __spreadProps(__spreadValues({}, state.pages), {
          style
        })
      }));
    }
    setPlaybar(playbar) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        playbar: __spreadValues(__spreadValues({}, state.playbar), playbar)
      }));
    }
    setPlaybarOptions(type, value) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        playbar: __spreadProps(__spreadValues({}, state.playbar), {
          options: __spreadProps(__spreadValues({}, state.playbar.options), {
            [type]: __spreadValues(__spreadValues({}, state.playbar.options[type]), value)
          })
        })
      }));
    }
    setPlaybarFilter(type, value) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        playbar: __spreadProps(__spreadValues({}, state.playbar), {
          options: __spreadProps(__spreadValues({}, state.playbar.options), {
            [type]: __spreadProps(__spreadValues({}, state.playbar.options[type]), {
              backdropFilter: __spreadValues(__spreadValues({}, state.playbar.options[type].backdropFilter), value)
            })
          })
        })
      }));
    }
    setRightSidebarColor(color) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        rightSidebar: __spreadProps(__spreadValues({}, state.rightSidebar), {
          color: __spreadValues(__spreadValues({}, state.rightSidebar.color), color)
        })
      }));
    }
    setGrainsType(type) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        grains: __spreadProps(__spreadValues({}, state.grains), {
          type
        })
      }));
    }
    setDynamicColor(isDynamic) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        color: __spreadProps(__spreadValues({}, state.color), {
          isDynamic
        })
      }));
    }
    setIsCustomColor(isCustom) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        color: __spreadProps(__spreadValues({}, state.color), {
          isCustom
        })
      }));
    }
    setCustomColor(color) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        color: __spreadProps(__spreadValues({}, state.color), {
          customColor: __spreadValues(__spreadValues({}, state.color.customColor), color)
        })
      }));
    }
    setTonalColor(isTonal) {
      this.setState((state) => __spreadProps(__spreadValues({}, state), {
        color: __spreadProps(__spreadValues({}, state.color), {
          isTonal
        })
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
        Spicetify == null ? void 0 : Spicetify.showNotification("Error reseting settings.", true, 5e3);
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
          Spicetify == null ? void 0 : Spicetify.showNotification("Import failed: Invalid settings format.", true, 5e3);
        } else {
          appSettingsStore.setState((state) => deepmerge(state, parsed));
          Spicetify == null ? void 0 : Spicetify.showNotification("Settings imported successfully!", false, 5e3);
        }
      } catch (error) {
        console.error("Error importing settings:", error);
        Spicetify == null ? void 0 : Spicetify.showNotification("Import failed: Unable to parse settings JSON.", true, 5e3);
      }
    }
  };
  var appSettingsStore = new AppSettingsStore();
  var _a2;
  window.lucid = {
    config: () => appSettingsStore.getState(),
    reset: () => {
      appSettingsStore.resetState();
    },
    store: appSettingsStore,
    version: (_a2 = localStorage.getItem(LUCID_VERSION_STORAGE_KEY)) != null ? _a2 : "2.0.0"
  };
  var setting_default = appSettingsStore;

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
    const _a4 = options, { style, attributes } = _a4, rest = __objRest(_a4, ["style", "attributes"]);
    Object.assign(element, rest);
    return element;
  }

  // extension/utils/lazyLoadUtils.ts
  var lazyLoadElementByTag = (tag) => {
    let element = document.getElementById(tag);
    if (!element) {
      element = document.createElement(tag);
      document.body.appendChild(element);
    }
    return element;
  };
  var lazyLoadStyleById = (id) => {
    let element = document.querySelector(`#style-${id}`);
    if (!element) {
      element = createElement("style", { id: `style-${id}` });
      document.head.appendChild(element);
    }
    return element;
  };

  // extension/utils/artworkUtils.ts
  var getNPVElementImage = () => {
    const npv = document.querySelector(
      ".Root__right-sidebar .main-nowPlayingView-nowPlayingWidget .main-image-image"
    );
    return (npv == null ? void 0 : npv.src) || "";
  };
  var getNowPlayingArtworkURL = async () => {
    var _a4, _b2;
    while (!((_a4 = Spicetify.Player) == null ? void 0 : _a4.data)) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    const item = (_b2 = Spicetify.Player.data) == null ? void 0 : _b2.item;
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
          __spreadProps(__spreadValues({}, query), { operation: "query", value: null }),
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
    const id = pathname.match(/\/(playlist|artist|album|user|show)\/([^/]+)/);
    if (!id) {
      console.warn("No valid type or ID found in pathname:", pathname);
      return null;
    }
    const [, type, extractedId] = id;
    return `spotify:${type}:${extractedId}`;
  };
  var getArtworkBySpotifyURL = async (url) => {
    var _a4, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const uri = getSpotifyURL(url);
    if (!uri) return null;
    const [, type, id] = uri.split(":");
    try {
      switch (type) {
        case "playlist":
        case "show": {
          const meta = await Spicetify.Platform.PlaylistAPI.getMetadata(uri);
          return ((_a4 = meta.images[0]) == null ? void 0 : _a4.url) || null;
        }
        case "artist": {
          const meta = await getArtistMetaData(uri);
          const visuals = (_c = (_b2 = meta == null ? void 0 : meta.data) == null ? void 0 : _b2.artistUnion) == null ? void 0 : _c.visuals;
          return ((_e = (_d = visuals == null ? void 0 : visuals.headerImage) == null ? void 0 : _d.sources[0]) == null ? void 0 : _e.url) || ((_g = (_f = visuals == null ? void 0 : visuals.avatarImage) == null ? void 0 : _f.sources[0]) == null ? void 0 : _g.url) || null;
        }
        case "album": {
          const meta = await getAlbumMetaData(uri);
          const sources = (_j = (_i = (_h = meta == null ? void 0 : meta.data) == null ? void 0 : _h.albumUnion) == null ? void 0 : _i.coverArt) == null ? void 0 : _j.sources;
          return ((_k = sources == null ? void 0 : sources[2]) == null ? void 0 : _k.url) || ((_l = sources == null ? void 0 : sources[0]) == null ? void 0 : _l.url) || null;
        }
        case "user": {
          const response = await Spicetify.Platform.RequestBuilder.build().withHost("https://spclient.wg.spotify.com/user-profile-view/v3").withPath(`/profile/${id}`).send();
          return ((_m = response == null ? void 0 : response.body) == null ? void 0 : _m.image_url) || null;
        }
        default:
          return null;
      }
    } catch (error) {
      console.error(`Error fetching ${type} artwork:`, error);
      return null;
    }
  };

  // extension/utils/dom/extractUrl.ts
  function extractUrl(input) {
    const match = input.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  }

  // extension/utils/dom/waitForElement.ts
  function waitForElement(els, func, timeout = 100) {
    const queries = els.map((el) => document.querySelector(el));
    if (queries.every((a) => a)) {
      func(queries);
    } else if (timeout > 0) {
      setTimeout(waitForElement, 300, els, func, --timeout);
    }
  }

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

  // extension/components/ui/umv-image.ts
  var UMVImageElement = class extends HTMLElement {
    constructor(imageSrc) {
      super();
      __publicField(this, "imgElement");
      __publicField(this, "transitionDuration", 0.5);
      __publicField(this, "filter", "blur(0px)");
      __publicField(this, "transitionTimingFunction", "ease-in-out");
      if (imageSrc) this.imageSrc = imageSrc;
      Object.assign(this.style, {
        width: "100%",
        height: "100%",
        display: "block"
      });
      this.imgElement = createElement("img", {
        className: "umv-img",
        style: {
          filter: this.filter,
          opacity: "1",
          transition: `opacity ${this.transitionDuration}s ${this.transitionTimingFunction}`,
          willChange: "opacity, transform"
        }
      });
      this.append(this.imgElement);
    }
    setFilter(filter) {
      this.style.filter = filter;
    }
    set imageSrc(imageSrc) {
      if (!imageSrc) {
        this.style.opacity = "0";
        return;
      }
      this.style.opacity = "1";
      if (imageSrc.trim() === "") {
        return;
      }
      if (this.imgElement.src === imageSrc) return;
      const preloader = new Image();
      preloader.onload = () => {
        this._performTransition(imageSrc);
      };
      preloader.onerror = () => {
        console.error("Failed to load image:", imageSrc);
      };
      preloader.src = imageSrc;
    }
    _performTransition(src) {
      if (this.imgElement.src === src) return;
      const oldElement = this.imgElement;
      const newElement = createElement("img", {
        className: "umv-img",
        style: {
          width: "100%",
          height: "100%",
          objectPosition: "center",
          position: "absolute",
          top: "0",
          left: "0",
          objectFit: "cover",
          filter: this.filter,
          opacity: "0",
          transform: "scale(1.05)",
          transition: `opacity ${this.transitionDuration}s ${this.transitionTimingFunction}, transform ${this.transitionDuration}s ${this.transitionTimingFunction}`,
          willChange: "opacity, transform"
        }
      });
      newElement.src = src;
      this.appendChild(newElement);
      requestAnimationFrame(() => {
        newElement.style.opacity = "1";
        newElement.style.transform = "scale(1)";
      });
      oldElement.style.opacity = "0";
      oldElement.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.imgElement.remove();
        this.imgElement = newElement;
      }, this.transitionDuration * 1e3);
    }
    hideImage() {
      this.imgElement.style.opacity = "0";
    }
    unhideImage() {
      this.imgElement.style.opacity = "1";
    }
  };
  customElements.define("umv-image", UMVImageElement);

  // extension/components/umv.ts
  var SCROLL_SELECTOR = ".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]";
  var UMV_OVERRIDE_STYLE_ID = "umv-overrides";
  var ROOT_MAIN_VIEW_SELECTOR = ".Root__main-view";
  var UNDER_MAIN_VIEW_SELECTOR = ".under-main-view";
  var MAIN_ENTITY_HEADER_GRADIENT_SELECTOR = ".main-entityHeader-gradient, .XUwMufC5NCgIyRMyGXLD";
  var umvStylesContent = `
  .under-main-view { display: none; }
  umv-container {
    width: 100%;
    display: block;
    position: absolute;
    inset: 0px;
    height: 50cqh;
    -webkit-mask-image: linear-gradient(rgb(0, 0, 0) 40cqh, rgba(0, 0, 0, 0) 100%);
    mask-image: linear-gradient(rgb(0, 0, 0) 40cqh, rgba(0, 0, 0, 0) 100%);
    transform: translate3d(0px, 0px, 0px) scale(1);
    will-change: transform;
  }
  umv-container[source="expanded"] {
    height: calc(100cqh - var(--umv-offset, 526px));
    transform: translate3d(0px, 0px, 0px) scale(1);
    -webkit-mask-image: none;
    mask-image: none;
  }
  .main-entityHeader-container.main-entityHeader-withBackgroundImage{
    height: calc(100cqh - var(--umv-offset) - 1rem);
  }
  body[npb-is-floating] .main-entityHeader-container.main-entityHeader-withBackgroundImage{
    height: calc(100cqh - var(--umv-offset));
  }
  .main-entityHeader-container{ height: 40cqh; }
  .main-entityHeader-backgroundColor,.main-actionBarBackground-background { background: none !important;}
  .playlist-playlist-playlistContent,.EmeHQXR87mUskYK6xEde { background-color: rgba(var(--clr-surface-1-rgb),.5) !important; }
`;
  var UMVElement = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "umvImage");
      __publicField(this, "scrollElem");
      __publicField(this, "mainViewElement");
      __publicField(this, "_source");
      __publicField(this, "_imageUrl");
      __publicField(this, "_settings");
      __publicField(this, "_isNpv", false);
      __publicField(this, "isArtist", false);
      __publicField(this, "options");
      __publicField(this, "pageUrl");
      __publicField(this, "umvArtUrl");
      __publicField(this, "pageArtUrl");
      __publicField(this, "unlistenHistory");
      __publicField(this, "unobserveUMV");
      __publicField(this, "unsubscribeNPV");
      const umvStyles = lazyLoadStyleById(UMV_OVERRIDE_STYLE_ID);
      umvStyles.textContent = umvStylesContent;
      this.mainViewElement = null;
      this.umvImage = new UMVImageElement();
      this.append(this.umvImage);
      this._source = "normal";
      this._imageUrl = null;
      this.pageUrl = "";
      this._settings = null;
      this.settings = setting_default.getState().pages.umv;
      setting_default.subscribe((state) => {
        this.settings = state.pages.umv;
      }, "pages.umv");
      this.scrollElem = null;
      this.umvArtUrl = null;
      this.pageArtUrl = null;
      this.unsubscribeNPV = null;
    }
    connectedCallback() {
      var _a4, _b2, _c;
      waitForElement([ROOT_MAIN_VIEW_SELECTOR], ([mainElem]) => {
        this.mainViewElement = mainElem;
      });
      waitForElement([SCROLL_SELECTOR], ([scrollElem]) => {
        this.scrollElem = scrollElem;
        this._scrollEventCb = this._scrollEventCb.bind(this);
        this._listenScrollChange();
      });
      this._listenForUMVChange();
      this.updateImageUrlFromPage(((_c = (_b2 = (_a4 = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _a4.History) == null ? void 0 : _b2.location) == null ? void 0 : _c.pathname) || "/");
    }
    disconnectedCallback() {
      if (this.scrollElem) {
        this.scrollElem.removeEventListener("scroll", this._scrollEventCb);
      }
      if (this.unobserveUMV) {
        this.unobserveUMV();
      }
      if (this.unlistenHistory) {
        this.unlistenHistory();
      }
      if (this.unsubscribeNPV) {
        this.unsubscribeNPV();
        this.unsubscribeNPV = null;
      }
    }
    set settings(settings) {
      this._settings = settings;
      this.options = settings.options[this._source];
      if (settings.type === "npv") this.isNpv = true;
      else this.isNpv = false;
      this._scrollEventCb();
    }
    get settings() {
      var _a4;
      return (_a4 = this._settings) != null ? _a4 : setting_default.getState().pages.umv;
    }
    set isNpv(isNpv) {
      var _a4;
      this._isNpv = isNpv;
      if (!isNpv) {
        (_a4 = this.unsubscribeNPV) == null ? void 0 : _a4.call(this);
        this.unsubscribeNPV = null;
        this._updateImageBasedOnUrls();
        return;
      }
      this._updateImageBasedOnUrls();
      this.unsubscribeNPV = npvState.subscribe(() => {
        this._updateImageBasedOnUrls();
      });
    }
    get isNpv() {
      return this._isNpv;
    }
    set source(source) {
      var _a4, _b2, _c, _d;
      this._source = source;
      this.isArtist = (_b2 = (_a4 = document.body.getAttribute("path")) == null ? void 0 : _a4.startsWith("artist", 1)) != null ? _b2 : false;
      this.setAttribute("source", source);
      this.umvImage.setFilter(`blur(${(_d = (_c = this.settings.options[source].filter) == null ? void 0 : _c.blur) != null ? _d : 0}px)`);
      this.options = this.settings.options[source];
      this._scrollEventCb();
    }
    get source() {
      return this._source;
    }
    set imageUrl(imageUrl) {
      if (imageUrl === this._imageUrl) return;
      this._imageUrl = imageUrl;
      this.umvImage.imageSrc = imageUrl;
    }
    async updateImageUrlFromPage(url) {
      try {
        let artworkURL = null;
        if (artworkURL === "/") {
          this.pageArtUrl = null;
          this._updateImageBasedOnUrls();
          return;
        }
        if (url) {
          artworkURL = await getArtworkBySpotifyURL(url);
        }
        this.pageArtUrl = artworkURL;
        this._updateImageBasedOnUrls();
      } catch (error) {
        console.error("Error updating image URL from page:", error);
        console.error("URL that caused the error:", url);
      }
    }
    _listenForPageChanges() {
      var _a4, _b2, _c, _d, _e, _f;
      this.pageUrl = ((_c = (_b2 = (_a4 = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _a4.History) == null ? void 0 : _b2.location) == null ? void 0 : _c.pathname) || "/";
      this.unlistenHistory = (_f = (_e = (_d = Spicetify.Platform) == null ? void 0 : _d.History) == null ? void 0 : _e.listen((url) => {
        if (url == null ? void 0 : url.pathname) {
          this.pageUrl = url.pathname;
          this.umvArtUrl = null;
          this.pageArtUrl = null;
          this.updateImageUrlFromPage(url.pathname);
        }
      })) != null ? _f : () => {
        console.error(
          "Error unloading History listener. Spicetify.Platform?.History might be undefined."
        );
      };
    }
    _observeUMVImage() {
      const targetNode = document.querySelector(UNDER_MAIN_VIEW_SELECTOR);
      if (!targetNode) {
        console.warn(
          `Element "${UNDER_MAIN_VIEW_SELECTOR}" not found. UMV observation will not work.`
        );
        return null;
      }
      const observerCB = () => {
        const element = targetNode.querySelector(MAIN_ENTITY_HEADER_GRADIENT_SELECTOR);
        if (element) {
          const underMainViewURL = extractUrl(element.style.backgroundImage);
          if (underMainViewURL) {
            this.umvArtUrl = underMainViewURL;
          } else {
            this.umvArtUrl = null;
          }
          this._updateImageBasedOnUrls();
        } else {
          this.umvArtUrl = null;
          this._updateImageBasedOnUrls();
        }
      };
      const observer = new MutationObserver(observerCB);
      observer.observe(targetNode, {
        childList: true,
        subtree: true
      });
      this.unobserveUMV = () => observer.disconnect();
    }
    _listenForUMVChange() {
      this._listenForPageChanges();
      this._observeUMVImage();
    }
    _scrollEventCb(e) {
      var _a4, _b2, _c, _d, _e, _f;
      if (!this.settings) return;
      const scrollTop = (_d = (_c = (_a4 = this.scrollElem) == null ? void 0 : _a4.scrollTop) != null ? _c : (_b2 = e == null ? void 0 : e.target) == null ? void 0 : _b2.scrollTop) != null ? _d : 0;
      const sourceOptions = this.settings.options[this.source];
      requestAnimationFrame(() => {
        var _a5;
        if (sourceOptions.isScaling) {
          this.umvImage.style.transform = `scale(${Math.min(100 + scrollTop / 10, 150)}%)`;
        } else {
          this.umvImage.style.transform = "scale(1)";
        }
        if (sourceOptions.isScroll) {
          this.style.transform = `translate3d(0px,-${Math.min(scrollTop, window.innerHeight)}px,0px)`;
        } else {
          this.style.transform = "translate3d(0px,0px,0px)";
        }
        const blurValue = Math.min(
          scrollTop / 10 + (((_a5 = sourceOptions.filter) == null ? void 0 : _a5.blur) || 0),
          this.isArtist ? scrollTop / 10 : 32
        );
        const brightnessValue = Math.max(60, 100 - scrollTop / window.innerHeight * 40);
        const opacityValue = Math.max(70, 100 - scrollTop / window.innerHeight * 30);
        this.umvImage.setFilter(
          `blur(${blurValue}px) brightness(${brightnessValue}%) opacity(${opacityValue}%)`
        );
      });
      if (scrollTop > window.innerHeight / 5) {
        (_e = this.mainViewElement) == null ? void 0 : _e.style.setProperty("--top-bar-opacity", "1");
      } else (_f = this.mainViewElement) == null ? void 0 : _f.style.setProperty("--top-bar-opacity", "0");
    }
    _listenScrollChange() {
      if (!this.scrollElem) return;
      this.scrollElem.addEventListener("scroll", this._scrollEventCb);
    }
    _updateImageBasedOnUrls() {
      if (this.umvArtUrl) {
        this.imageUrl = this.umvArtUrl;
        this.source = "expanded";
        return;
      }
      if (this.isNpv && this.pageArtUrl) {
        this.imageUrl = npvState.getState().url;
        this.source = "npv";
        return;
      }
      if (this.pageArtUrl) {
        this.imageUrl = this.pageArtUrl;
        this.source = "normal";
        return;
      }
      this.imageUrl = null;
      this.source = "normal";
    }
  };
  customElements.define("umv-container", UMVElement);

  // extension/utils/patchIcons.ts
  function getIconStyle() {
    const id = "lucid-icon-patch";
    let iconStyle = document.getElementById(id);
    if (!iconStyle) {
      iconStyle = createElement("style", { id });
      document.head.appendChild(iconStyle);
    }
    return iconStyle;
  }
  var patchIcons = () => {
    const style = getIconStyle();
    function cleanLabel(label) {
      const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, "").trim();
      return cleanedLabel;
    }
    const LocaleAPI = Spicetify.Locale;
    if (!LocaleAPI) return;
    const locales = {
      home: LocaleAPI.get("view.web-player-home"),
      browse: LocaleAPI.get("browse"),
      pause: LocaleAPI.get("pause"),
      play: LocaleAPI.get("play"),
      search: LocaleAPI.get("navbar.search"),
      "friend-activity": LocaleAPI.get("buddy-feed.friend-activity"),
      "whats-new": LocaleAPI.get("web-player.whats-new-feed.button-label"),
      "skip-forward": LocaleAPI.get("playback-control.skip-forward"),
      "skip-back": LocaleAPI.get("playback-control.skip-back"),
      "disable-shuffle": LocaleAPI.get("playback-control.disable-shuffle"),
      "enable-shuffle": LocaleAPI.get("playback-control.enable-shuffle"),
      "disable-shuffle-generic": LocaleAPI.get(
        "web-player.smart-shuffle.button-disable-shuffle-generic"
      ),
      "disable-shuffle-specific": cleanLabel(
        LocaleAPI.get("web-player.smart-shuffle.button-disable-shuffle-specific")
      ),
      "enable-shuffle-generic": LocaleAPI.get(
        "web-player.smart-shuffle.button-enable-shuffle-generic"
      ),
      "enable-shuffle-specific": cleanLabel(
        LocaleAPI.get("web-player.smart-shuffle.button-enable-shuffle-specific")
      ),
      "enable-smart-shuffle-specific": cleanLabel(
        LocaleAPI.get("web-player.smart-shuffle.button-enable-smart-shuffle-specific")
      ),
      "enable-smart-shuffle-generic": LocaleAPI.get(
        "web-player.smart-shuffle.button-enable-smart-shuffle-generic"
      ),
      "enable-repeat": LocaleAPI.get("playback-control.enable-repeat"),
      "enable-repeat-one": LocaleAPI.get("playback-control.enable-repeat-one"),
      "disable-repeat": LocaleAPI.get("playback-control.disable-repeat")
    };
    style.innerText = `
.main-yourLibraryX-navLink[aria-label="${locales.home}"] path,
button[aria-label="${locales.home}"] path {
	d: var(--home-icon);
}
.main-yourLibraryX-navLink[aria-label="${locales.home}"].active path,
.main-globalNav-navLinkActive[aria-label="${locales.home}"] path {
	d: var(--home-filled-icon);
}
.main-topBar-buddyFeed[aria-label*="${locales["whats-new"]}"] svg,
.main-topBar-buddyFeed[aria-label*="${locales["friend-activity"]}"] svg{
	transform: scale(1.1);
}

.main-topBar-buddyFeed[aria-label*="${locales["friend-activity"]}"] svg path{
	d: var(--people-icon);
}
.main-topBar-buddyFeed[aria-label*="${locales["friend-activity"]}"] .Svg-img-icon-small-textBase path{
	d: var(--people-filled-icon);
}
.main-topBar-buddyFeed[aria-label*="${locales["whats-new"]}"] svg path{
	d: var(--bell-icon);
}
.main-topBar-buddyFeed .Svg-img-icon-small[aria-label*="${locales["whats-new"]}"] .Svg-img-icon-small-textBase path{
	d: var(--bell-filled-icon);
}
.b7r2WRiu5f9Q99qmyreh .M9l40ptEBXPm03dU3X1k,
.player-controls__left button[aria-label*="${locales["disable-shuffle"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["disable-shuffle-specific"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["disable-shuffle-generic"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["enable-shuffle"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["enable-shuffle-specific"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["enable-shuffle-generic"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["enable-smart-shuffle-generic"]}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales["enable-smart-shuffle-specific"]}"] path:nth-of-type(n+2),
.Root__globalNav button[aria-label="${locales.browse}"] path:nth-of-child(n + 2) {
	display: none;
}
.Root__globalNav .main-globalNav-navLink.custom-navlink[aria-label*="Marketplace"] path {
	d: var(--appstore-icon);
	transform: translate(0px,0px) scale(3, 3) !important;
}
.Root__globalNav .main-globalNav-navLinkActive.custom-navlink[aria-label*="Marketplace"] path{
	d: var(--appstore-filled-icon);
}
.Root__globalNav .IconContainer-leading:first-child svg path,
.Root__globalNav .IconContainer-leading:has(button[aria-label*="${locales.search}"]) div > svg path {
	d: var(--search-icon);
}
.Root__globalNav button[aria-label="${locales.browse}"] path {
	d: var(--compass-icon);
}
.Root__globalNav button[aria-label="${locales.browse}"].j4xi27AJ3oy5qZ8CGhhQ path {
	d: var(--compass-filled-icon);
}
.player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"] path,
.player-controls__buttons .player-controls__left button[aria-label*="${locales["skip-back"]}"] path {
  fill: var(--clr-on-surface);
  d: var(--prev-icon);
}
.player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"] path,
.player-controls__buttons .player-controls__right button[aria-label="${locales["skip-forward"]}"] path {
  fill: var(--clr-on-surface);
  d: var(--next-icon);
}
.player-controls__left button[aria-label*="${locales["disable-shuffle"]}"],
.player-controls__left button[aria-label*="${locales["disable-shuffle-specific"]}"],
.player-controls__left button[aria-label*="${locales["disable-shuffle-generic"]}"],
.player-controls__left button[aria-label*="${locales["enable-shuffle"]}"],
.player-controls__left button[aria-label*="${locales["enable-shuffle-specific"]}"],
.player-controls__left button[aria-label*="${locales["enable-shuffle-generic"]}"],
.player-controls__left button[aria-label*="${locales["enable-smart-shuffle-generic"]}"],
.player-controls__left button[aria-label*="${locales["enable-smart-shuffle-specific"]}"],
.player-controls__right button[aria-label="${locales["enable-repeat"]}"],
.player-controls__right button[aria-label="${locales["enable-repeat-one"]}"],
.player-controls__right button[aria-label="${locales["disable-repeat"]}"]{
	--encore-graphic-size-decorative-smaller: 22px;
	--encore-control-size-smaller: 22px;
}
.player-controls__right button[aria-label="${locales["enable-repeat"]}"] path {
	d: var(--repeat-icon);
}
.player-controls__right button[aria-label="${locales["enable-repeat-one"]}"] path {
	d: var(--repeat-one-icon);
}
.player-controls__right button[aria-label="${locales["disable-repeat"]}"] path {
	d: var(--disable-repeat-icon);
}
.player-controls__left button[aria-label*="${locales["enable-shuffle"]}"] path,
.player-controls__left button[aria-label*="${locales["enable-shuffle-specific"]}"] path,
.player-controls__left button[aria-label*="${locales["enable-shuffle-generic"]}"] path{
	d: var(--disable-shuffle-icon);
}

.player-controls__left button[aria-label*="${locales["enable-smart-shuffle-generic"]}"] path,
.player-controls__left button[aria-label*="${locales["enable-smart-shuffle-specific"]}"] path{
	d: var(--shuffle-icon);
}

.player-controls__left button[aria-label*="${locales["disable-shuffle"]}"] path,
.player-controls__left button[aria-label*="${locales["disable-shuffle-specific"]}"] path,
.player-controls__left button[aria-label*="${locales["disable-shuffle-generic"]}"] path{
	d: var(--smart-shuffle-icon);
}
  
.player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"],
.player-controls__buttons .player-controls__right button[aria-label="${locales["skip-forward"]}"],
.player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"],
.player-controls__buttons .player-controls__left button[aria-label*="${locales["skip-back"]}"]{
	--encore-graphic-size-decorative-smaller: 22px;
	--encore-control-size-smaller: 22px;
	color: var(--subtext-color);
}
.player-controls__buttons button[aria-label="${locales.play}"] path {
  fill: var(--clr-on-surface);
  d: var(--play-icon);
}

.player-controls__buttons button[aria-label="${locales.pause}"] path {
  fill: var(--clr-on-surface);
  d: var(--pause-icon);
}
.player-controls__buttons > button,
.player-controls__buttons button[data-testid=control-button-playpause] { --encore-graphic-size-decorative-smaller: 1.5rem; --encore-control-size-smaller: 1.5rem; }
.player-controls__buttons button[data-testid=control-button-playpause],
.player-controls__buttons button[data-testid=control-button-playpause]:hover,
.player-controls__buttons button[data-testid=control-button-playpause] span:hover,
.player-controls__buttons button[data-testid=control-button-playpause] span { background: none !important; }`;
  };

  // extension/components/main.ts
  var MainElement = class extends HTMLElement {
  };
  customElements.define("lucid-main", MainElement);
  var main_default = MainElement;

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
  var lastClassName = null;
  function mountPageStyles(pageSettings = setting_default.getState().pages) {
    const newClassName = `playlist-${pageSettings.style}`;
    if (lastClassName !== newClassName) {
      if (lastClassName) {
        document.body.classList.replace(lastClassName, newClassName);
      } else document.body.classList.add(newClassName);
      lastClassName = newClassName;
    }
    if (!pageSettings.hideHomeHeader) document.body.classList.add("hide-home-header");
    else document.body.classList.remove("hide-home-header");
    document.body.style.setProperty("--custom-panel-gap", `${pageSettings.panelGap}px`);
  }
  setting_default.subscribe((state) => {
    mountPageStyles(state.pages);
  }, "pages");

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
    const cachedDataStr = localStorage.getItem(localKey);
    let cachedData = null;
    if (cachedDataStr) {
      try {
        cachedData = JSON.parse(cachedDataStr);
      } catch (e) {
        console.error("Error parsing cached guide script JSON:", e);
      }
    }
    if (navigator.onLine && (cachedData == null ? void 0 : cachedData.script) && cachedData.timestamp) {
      const age = Date.now() - cachedData.timestamp;
      if (age < time) {
        console.debug("Using cached guide script.");
        return cachedData.script;
      }
    }
    if (!navigator.onLine && (cachedData == null ? void 0 : cachedData.script)) {
      console.debug("Offline, using cached guide script.");
      return cachedData.script;
    }
    let scriptText = null;
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        scriptText = await response.text();
        console.debug(`Fetched guide script from ${url}`);
        break;
      } catch (error) {
        console.error(`Failed to fetch guide script from ${url}:`, error);
      }
    }
    if (!scriptText) {
      if (cachedData == null ? void 0 : cachedData.script) {
        console.warn("Using outdated cached script because network fetch failed.");
        return cachedData.script;
      }
      throw new Error("Failed to fetch guide script from all sources.");
    }
    const newCache = { script: scriptText, timestamp: Date.now() };
    localStorage.setItem(localKey, JSON.stringify(newCache));
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
    unsubscribe == null ? void 0 : unsubscribe();
    if (settings.isDynamic) {
      const currentUrl = npvState.getState().url;
      if (currentUrl) {
        sendImageData({
          url: convertSpotifyImageUrl(currentUrl),
          isTonal: settings.isTonal,
          isDark: true
        });
      }
      unsubscribe = npvState.subscribe((state) => {
        if (state.url) {
          sendImageData({
            url: convertSpotifyImageUrl(state.url),
            isTonal: settings.isTonal,
            isDark: true
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
      document.body.removeAttribute("color-from-worker");
      console.error("Failed to initialize worker from both endpoints.");
      Spicetify == null ? void 0 : Spicetify.showNotification(
        "Failed to initialize the color worker. If this issue persists, please report it. (Dynamic and custom colors may not function properly.)",
        true,
        5e3
      );
      return;
    }
    document.body.setAttribute("color-from-worker", "true");
    worker.onmessage = (event) => {
      const { message, data } = event.data || {};
      if (data) {
        console.debug(message, "\nEvent Data:", event.data);
        styleSheet.textContent = `:root,body{${data.style}}`;
      } else {
        console.error(message != null ? message : "Color not applied");
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
    document.body.setAttribute("path", pathname);
    document.body.setAttribute("page-type", getPathCategory(pathname));
  }
  function mountPageType() {
    var _a4, _b2, _c, _d, _e;
    setPage(((_c = (_b2 = (_a4 = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _a4.History) == null ? void 0 : _b2.location) == null ? void 0 : _c.pathname) || "/");
    (_e = (_d = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _d.History) == null ? void 0 : _e.listen((state) => {
      if (!state || !state.pathname) return;
      setPage(state.pathname);
    });
  }

  // extension/utils/platformUtils.ts
  var isWindows = () => {
    var _a4, _b2;
    if (Spicetify.Platform && Spicetify.Platform.operatingSystem === "Windows") {
      return true;
    }
    if ((_b2 = (_a4 = Spicetify.Platform) == null ? void 0 : _a4.PlatformData) == null ? void 0 : _b2.os_name) {
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
  var _a3;
  var isV46 = ((_a3 = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _a3.version) >= "1.2.46";
  function mountTransparentWindowControls(height) {
    const { zoom, inverseZoom } = getZoom();
    const ch = isV46 ? height > 32 ? Math.max(32, Math.round(height / (2 * zoom))) : height / zoom : height / zoom;
    const cw = Math.round(135 * inverseZoom);
    const top = isV46 ? (height / zoom - Math.min(32 / zoom, height)) / 2 : 0;
    const transparentStyles = lazyLoadStyleById("transparent-controls");
    transparentStyles.textContent = `
    body::after {
      content: "";
      height: var(--control-height, ${ch}px);
      width: var(--control-width, ${cw}px);
      position: fixed;
      top: ${top}px;
      right: 0;
      -webkit-backdrop-filter: brightness(2.1);
      backdrop-filter: brightness(2.1);
    }
  `;
  }
  async function updateTitlebarHeight(height) {
    var _a4, _b2, _c, _d, _e, _f;
    await ((_c = (_b2 = (_a4 = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _a4.ControlMessageAPI) == null ? void 0 : _b2._updateUiClient) == null ? void 0 : _c.updateTitlebarHeight({ height }));
    await ((_f = (_e = (_d = Spicetify == null ? void 0 : Spicetify.Platform) == null ? void 0 : _d.UpdateAPI) == null ? void 0 : _e._updateUiClient) == null ? void 0 : _f.updateTitlebarHeight({
      height
    }));
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

  // extension/hooks/playbar.ts
  function mountPlaybarStyles(settings = setting_default.getState().playbar) {
    var _a4, _b2, _c, _d, _e, _f, _g;
    const curr = settings.options[settings.type];
    const styles = lazyLoadStyleById("lucid-playbar");
    styles.textContent = `
    :root,
    .Root__now-playing-bar{
        --npb-height: ${(_a4 = curr.height) != null ? _a4 : 80}px;
        --npb-blur: ${(_b2 = curr.backdropFilter.blur) != null ? _b2 : 32}px;
        --npb-padding-x: ${(_c = curr.paddingX) != null ? _c : 8}px;
        --npb-saturate: ${(_d = curr.backdropFilter.saturate) != null ? _d : 150}%;
        --npb-brightness: ${(_e = curr.backdropFilter.brightness) != null ? _e : 80}%;
        --npb-border-radius: ${(_f = curr.borderRadius) != null ? _f : 16}px;
        --npb-bg-opacity: ${(_g = curr.bgOpacity) != null ? _g : 50}%;
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
    hideIcons(hideIcon || ((nowPlayingBar == null ? void 0 : nowPlayingBar.clientWidth) || 0) < 900);
    setting_default.subscribe((state) => {
      hideIcon = state.playbar.hideIcons;
      hideIcons(hideIcon || ((nowPlayingBar == null ? void 0 : nowPlayingBar.clientWidth) || 0) < 900);
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
    constructor() {
      super(...arguments);
      __publicField(this, "onChange");
      __publicField(this, "customClass", "");
    }
    connectedCallback() {
      this.className = `lucid-button ${this.customClass} ${getTextClass("body-small-bold")}`;
      this.updateButtonType();
    }
    set type(value) {
      this.setAttribute("type", value);
      this.updateButtonType();
    }
    get type() {
      const attr = this.getAttribute("type");
      return attr != null ? attr : "primary";
    }
    updateButtonType() {
      var _a4;
      switch (this.type) {
        case "danger":
          this.classList.add("danger");
          this.classList.remove("primary", "icon");
          break;
        case "icon":
          this.classList.add("icon");
          this.classList.remove("primary", "danger");
          break;
        default:
          this.classList.add("primary");
          this.classList.remove("danger", "icon");
          break;
      }
      (_a4 = this.onChange) == null ? void 0 : _a4.call(this);
    }
    set disabled(disabled) {
      if (disabled) this.classList.add("disabled");
      else this.classList.remove("disabled");
    }
  };
  customElements.define("custom-button", Button);

  // extension/components/modal.ts
  var Modal = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "_modalElem");
      __publicField(this, "_bodyElem");
      __publicField(this, "_scrollElem");
      __publicField(this, "_closeBtn");
      __publicField(this, "_githubBtn");
      __publicField(this, "_discordBtn");
      __publicField(this, "_headerWrapperElem");
      __publicField(this, "_headerElem");
      __publicField(this, "_bgElem");
      __publicField(this, "_previouslyFocusedElement", null);
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
    constructor() {
      super();
      __publicField(this, "dragging", false);
      __publicField(this, "startX", 0);
      __publicField(this, "startY", 0);
      __publicField(this, "initialLeft", 0);
      __publicField(this, "initialTop", 0);
      __publicField(this, "setPosition", (top, left) => {
        modalState.setState((state) => ({
          isFloating: state.isFloating,
          position: { top, left }
        }));
      });
      __publicField(this, "handlePointerDown", (e) => {
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
      });
      __publicField(this, "handlePointerMove", (e) => {
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
      });
      __publicField(this, "handlePointerUp", (_e) => {
        this.dragging = false;
        this.removeAttribute("dragging");
        document.removeEventListener("pointermove", this.handlePointerMove);
        document.removeEventListener("pointerup", this.handlePointerUp);
      });
      super.setHeader("Lucid Settings");
    }
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
    var _a4, _b2, _c;
    if (settingsElement) {
      if (settingsElement instanceof Spicetify.Topbar.Button) {
        (_a4 = settingsElement.element) == null ? void 0 : _a4.remove();
      } else {
        settingsElement.deregister();
      }
      settingsElement = null;
    }
    if (position === "context-menu") {
      if ((_b2 = Spicetify == null ? void 0 : Spicetify.Menu) == null ? void 0 : _b2.Item) {
        settingsElement = new Spicetify.Menu.Item("Lucid Settings", false, cb, SETTINGS_ICON);
        settingsElement.register();
      } else {
        console.error("Context menu unavailable.Try Switching to Nav.");
      }
    } else if (position === "nav") {
      if ((_c = Spicetify == null ? void 0 : Spicetify.Topbar) == null ? void 0 : _c.Button) {
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
    constructor(content) {
      __publicField(this, "elem");
      __publicField(this, "content");
      __publicField(this, "mouseoverHandler");
      __publicField(this, "mouseoutHandler");
      __publicField(this, "open", false);
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
    constructor() {
      super();
      __publicField(this, "_options", []);
      __publicField(this, "_value", "");
      __publicField(this, "_isOpen", false);
      __publicField(this, "_highlightedIndex", -1);
      __publicField(this, "_trigger");
      __publicField(this, "_selectedValueSpan");
      __publicField(this, "_optionsList");
      __publicField(this, "shadow");
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
    constructor() {
      super(...arguments);
      __publicField(this, "_inputOptions");
      __publicField(this, "_renderedOptions", null);
      __publicField(this, "_inputElement", null);
    }
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
          onChange == null ? void 0 : onChange(newValue);
          return;
        }
        const res = validator(newValue);
        if (res.isValid) {
          target.classList.remove("error", "shake-error");
          onChange == null ? void 0 : onChange(newValue);
        } else {
          target.classList.remove("shake-error");
          void target.offsetWidth;
          target.classList.add("error", "shake-error");
          if (res.message) {
            Spicetify == null ? void 0 : Spicetify.showNotification(res.message, true, 2e3);
          }
        }
      };
      switch (this._inputOptions.type) {
        case "button": {
          const { buttonType, onClick, contents } = this._inputOptions;
          this._inputElement = new Button();
          this._inputElement.type = buttonType || "primary";
          if (onClick) this._inputElement.onclick = onClick;
          this._inputElement.innerHTML = (contents == null ? void 0 : contents.toString()) || "Button";
          this.append(this._inputElement);
          break;
        }
        case "number": {
          const { type, step, value, onChange, validator } = this._inputOptions;
          this._inputElement = createElement("input", {
            type,
            step: (step == null ? void 0 : step.toString()) || "1",
            value: value == null ? void 0 : value.toString(),
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
          this._inputElement.onchange = (e) => onChange == null ? void 0 : onChange(e.target.checked);
          this.append(this._inputElement);
          break;
        }
        case "select": {
          const { options, value, onChange } = this._inputOptions;
          this._inputElement = new Select();
          if (options) this._inputElement.options = options;
          if (value) this._inputElement.value = value;
          this._inputElement.onchange = (e) => onChange == null ? void 0 : onChange(e.target.value);
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
              Spicetify == null ? void 0 : Spicetify.showNotification(
                "EyeDropper API is not supported in this browser.",
                true,
                3e3
              );
              return;
            }
            try {
              if (!window.EyeDropper) return;
              const eyeDropper = new window.EyeDropper();
              const result = await eyeDropper.open();
              const color = result.sRGBHex;
              this._inputElement.value = color;
              onChange == null ? void 0 : onChange(color);
            } catch (e) {
              if (e instanceof Error && e.message !== "No color selected") {
                console.error("EyeDropper Error:", e);
                Spicetify == null ? void 0 : Spicetify.showNotification("Failed to pick color with EyeDropper.", true, 3e3);
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
        default:
          console.error("Unsupported input options:", this._inputOptions);
      }
      this._renderedOptions = this._inputOptions;
    }
  };
  customElements.define("custom-input", CustomInput);

  // extension/components/settings/section.ts
  var SettingsMain = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "_isRender", false);
      __publicField(this, "rendered", false);
      __publicField(this, "_settings", []);
      __publicField(this, "sectionElements", []);
    }
    connectedCallback() {
      if (!this.sectionElements.length && this._settings.length) {
        this.createSectionElements();
      }
      this.render();
      this.updateVisibility();
    }
    set options(options) {
      console.debug("SettingsMain options updated:", options);
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
      console.debug("Creating Section Elements:", this._settings);
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
    constructor() {
      super();
      __publicField(this, "_isRender", false);
      __publicField(this, "rendered", false);
      __publicField(this, "_headerElement");
      __publicField(this, "_groupsWrapperElement");
      __publicField(this, "_name", "");
      __publicField(this, "_groups", []);
      __publicField(this, "groupElements", []);
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
    constructor() {
      super();
      __publicField(this, "_isRender", false);
      __publicField(this, "rendered", false);
      __publicField(this, "_nameContainerElement");
      __publicField(this, "_fieldsContainerElement");
      __publicField(this, "_showName", true);
      __publicField(this, "_name", "Section");
      __publicField(this, "_fields", []);
      __publicField(this, "_key", "");
      __publicField(this, "fieldElements", []);
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
      var _a4;
      this._name = options.name;
      this._fields = options.fields;
      this._isRender = options.render;
      this._key = options.key;
      this._showName = (_a4 = options.showName) != null ? _a4 : true;
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
      var _a4;
      this.fieldElements = [];
      for (const field of this._fields) {
        const fieldElement = new SettingField();
        fieldElement.isRender = (_a4 = field.render) != null ? _a4 : true;
        fieldElement.inputOptions = field.inputOptions;
        fieldElement.label = field.label;
        fieldElement.fieldKey = field.key;
        if (field.tooltip) fieldElement.tooltip = field.tooltip;
        this.fieldElements.push(fieldElement);
      }
    }
    updateFieldElements() {
      var _a4, _b2;
      const existingFieldsMap = /* @__PURE__ */ new Map();
      for (const fieldElement of this.fieldElements) {
        existingFieldsMap.set(fieldElement.fieldKey, fieldElement);
      }
      const newFieldElements = [];
      for (const field of this._fields) {
        let fieldElement = existingFieldsMap.get(field.key);
        if (fieldElement) {
          fieldElement.isRender = (_a4 = field.render) != null ? _a4 : true;
          fieldElement.inputOptions = field.inputOptions;
          if (field.tooltip) fieldElement.tooltip = field.tooltip;
        } else {
          fieldElement = new SettingField();
          fieldElement.isRender = (_b2 = field.render) != null ? _b2 : true;
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
    constructor() {
      super();
      __publicField(this, "_isRender");
      __publicField(this, "rendered");
      __publicField(this, "_labelContainer");
      __publicField(this, "_inputElement");
      __publicField(this, "_tooltipInstance");
      __publicField(this, "_label");
      __publicField(this, "_fieldKey", "");
      __publicField(this, "inputOptions");
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
      var _a4;
      (_a4 = this._tooltipInstance) == null ? void 0 : _a4.dispose();
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
    } catch (e) {
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
        Spicetify == null ? void 0 : Spicetify.showNotification(successMessage, false, 5e3);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
        Spicetify == null ? void 0 : Spicetify.showNotification(
          `Error copying to clipboard: ${err instanceof Error ? err.message : err}`,
          true,
          5e3
        );
      }
    } else {
      console.error("Error copying text (navigator.clipboard not found)");
      Spicetify == null ? void 0 : Spicetify.showNotification("Error copying text (navigator.clipboard not found)", true, 5e3);
    }
  }

  // extension/hooks/guide.ts
  async function mountAndOpenGuide(open = false) {
    var _a4;
    if (!localStorage.getItem(GUIDE_STORAGE_KEY) || open) {
      await mountGuide();
      if ((_a4 = window == null ? void 0 : window.guide) == null ? void 0 : _a4.open) {
        window.guide.open();
        localStorage.setItem(GUIDE_STORAGE_KEY, "true");
      } else {
        console.error("Guide script loaded, but window.guide is not available.");
      }
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
      Spicetify == null ? void 0 : Spicetify.showNotification("Please wait. Guided Tour is loading.", false, 1e3);
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
      Spicetify == null ? void 0 : Spicetify.showNotification("Failed to load Guided Tour.", true);
    }
  }

  // extension/hooks/settings.ts
  var _openSettings = null;
  var _closeSettings = null;
  var settingModal = new FloatingModal();
  var openSettings = () => {
    _openSettings == null ? void 0 : _openSettings();
  };
  var closeSettings = () => {
    _closeSettings == null ? void 0 : _closeSettings();
  };
  window.lucid.settings = {
    openSettings,
    closeSettings,
    settingModal
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
  function mountSettings(lucidMain) {
    var _a4;
    settingModal.isFloating = modalState.getState().isFloating;
    settingModal.setContent(getSettingsContents());
    modalState.subscribe((state) => {
      settingModal.isFloating = state.isFloating;
    }, "isFloating");
    (_a4 = lucidMain != null ? lucidMain : document.getElementById("main")) == null ? void 0 : _a4.append(settingModal);
    _openSettings = () => settingModal.open();
    _closeSettings = () => settingModal.close();
    addSettingAccess(setting_default.getState().position, openSettings);
    setting_default.subscribe((state) => {
      if (_openSettings) addSettingAccess(state.position, openSettings);
    }, "position");
  }
  var fieldTexts = {
    "floating-window": [
      "Floating Window",
      "Allows the settings window to float above other content. Drag the header to reposition it."
    ],
    "window-position": [
      "Window Position",
      "Choose where the settings window opens: from the context menu or the navigation bar."
    ],
    "background-mode": ["Background Mode", "Select the type of background you want to display."],
    "solid-color": ["Solid Color", "Pick a solid background color using the color picker."],
    "custom-image": [
      "Custom Image",
      "Use a custom image URL for the static background instead of the default image."
    ],
    "custom-image-url": [
      "Custom Image URL",
      "Enter the full URL of the image for your static background. URL validation is enabled."
    ],
    "static-image-blur": [
      "Image Blur",
      "Adjust the blur level of the static background image (0-200). 0 is no blur, 200 is maximum blur."
    ],
    "static-image-brightness": [
      "Image Brightness",
      "Adjust the brightness of the static background image (0-200). 0 is darkest, 200 is brightest."
    ],
    "static-image-saturation": [
      "Image Saturation",
      "Adjust the color saturation of the static background image (0-200). 0 is grayscale, 200 is highly saturated."
    ],
    "animated-blur": [
      "Animation Blur",
      "Adjust the blur level of the animated background (0-200). 0 is no blur, 200 is maximum blur."
    ],
    "animated-brightness": [
      "Animation Brightness",
      "Adjust the brightness of the animated background (0-200). 0 is darkest, 200 is brightest."
    ],
    "animated-saturation": [
      "Animation Saturation",
      "Adjust the color saturation of the animated background (0-200). 0 is grayscale, 200 is highly saturated."
    ],
    "dynamic-color": [
      "Dynamic Color",
      "Enable dynamic color themes based on the artwork of the currently playing music."
    ],
    "tonal-color": [
      "Tonal Color",
      "Apply a tonal color scheme for a more harmonious user interface."
    ],
    "custom-color-enable": [
      "Custom Color",
      "Enable a custom color to override the default or dynamic theme color when dynamic color is off."
    ],
    "custom-color-picker": [
      "Select Custom Color",
      `Choose a base color for your application theme. For preview, use the <a href="https://material-foundation.github.io/material-theme-builder/">Material Theme Builder</a>`
    ],
    "google-fonts-enable": [
      "Google Fonts",
      "Enable fonts from Google Fonts for a wider typography selection."
    ],
    "google-fonts-url": [
      "Google Fonts URL",
      "Enter the URL of the Google Fonts stylesheet to load custom fonts from Google."
    ],
    "font-family": [
      "Font Family",
      "Enter the name of a font family installed on your system to use as the interface font when Google Fonts is disabled."
    ],
    "grain-type": [
      "Grain Type",
      "Select the type of grain effect to overlay for a textured appearance."
    ],
    "win-control-height": [
      "Control Height",
      "Adjust the height of window control buttons (minimize, maximize, close) on Windows (0-200)."
    ],
    "win-panel-gap": ["Panel Gap", "Set gap between main cards (main, now playing, library)."],
    "border-thickness": ["Thickness", "Set the thickness of the interface border in pixels (0-10)."],
    "border-color": ["Color", "Choose the color of the application border using the color picker."],
    "border-style": ["Style", "Select the visual style of the interface border."],
    "pages-background-style": [
      "Background Style",
      "Choose how the background is displayed on different pages."
    ],
    "pages-enable-home-header": ["Home Header Background", "Enable/Disable Home header background."],
    "pages-scroll-fullscreen-image": [
      "Scroll Fullscreen Background Image",
      "Allow the background image to scroll with page content when the playlist background is fullscreen (expanded)."
    ],
    "pages-scale-fullscreen-image": [
      "Scale Fullscreen Background Image",
      "Automatically scale the background image to fit the page width when the playlist background is fullscreen (expanded)."
    ],
    "pages-scroll-npv-image": [
      "Scroll NPV Background Image",
      "Allow the background image to scroll with page content in Now playing art playlist background mode."
    ],
    "pages-scale-npv-image": [
      "Scale NPV Background Image",
      "Automatically scale the background image to fit the page width in Now playing art playlist background mode."
    ],
    "pages-scroll-normal-image": [
      "Scroll Normal Background Image",
      "Allow the background image to scroll with page content in normal playlist background mode."
    ],
    "pages-scale-normal-image": [
      "Scale Normal Background Image",
      "Automatically scale the background image to fit the page width in normal playlist background mode."
    ],
    "right-sidebar-view-mode": [
      "View Mode",
      "Select between normal or compact display for the 'Now Playing' sidebar."
    ],
    "right-sidebar-size": [
      "Compact Sidebar Width",
      "Set the width of the 'Now Playing' sidebar when in compact mode.  Enter a value between 0 and 512 pixels."
    ],
    "right-sidebar-position": [
      "Position",
      "In compact mode, choose if 'Now Playing' appears on the left or right."
    ],
    "right-sidebar-background-blur": [
      "Background Blur",
      "Adjust the background blur of the 'Now Playing' view in compact mode (0-256)."
    ],
    "right-sidebar-custom-bg-enable": [
      "Custom Background",
      "Enable a custom background for the Now Playing view."
    ],
    "right-sidebar-background-color": [
      "Background",
      "Set the background color for the 'Now Playing' sidebar."
    ],
    "right-sidebar-background-alpha": [
      "Background Alpha",
      "Set the background transparency (alpha) value (0-100)."
    ],
    "playbar-type": ["Playbar Type", "Choose between a Default or Compact style for the playbar."],
    "compact-playbar-hide-icons": [
      "Hide Extra Playbar Icons",
      "Hides extra icons in compact playbar (visible on hover). Main controls remain visible."
    ],
    "compact-playbar-height": ["Height", "Set the height of the compact playbar in pixels."],
    "normal-playbar-height": ["Height", "Set the height of the normal playbar in pixels."],
    "playbar-is-floating": ["Floating", "Set if the now playing bar is floating."],
    "playbar-backdrop-blur": [
      "Backdrop Blur",
      "Adjust the blur intensity of the normal playbar backdrop (0-256)."
    ],
    "playbar-backdrop-saturation": [
      "Backdrop Saturation",
      "Adjust the color saturation of the normal playbar backdrop (0-256)."
    ],
    "playbar-backdrop-brightness": [
      "Backdrop Brightness",
      "Adjust the color brightness of the normal playbar backdrop (0-256)."
    ],
    "toggle-changelog-modal": [
      "Show Changelog",
      "Enable or disable the changelog modal that appears after theme updates."
    ],
    "start-lucid-tour": [
      "Take a Lucid Tour",
      "Start a guided walkthrough of the Lucid theme to learn its features."
    ],
    "export-app-settings": [
      "Export Settings",
      "Export your settings to the clipboard as JSON for backup or sharing."
    ],
    "import-app-settings": [
      "Import Settings",
      "Paste exported JSON settings here to import and apply them."
    ],
    "reset-app-settings": [
      "Reset All Settings",
      "Reset all settings to default values. This is irreversible and will reload the application."
    ],
    "pages-scroll-type": [
      "Background Image Source",
      "Choose whether to use the Now Playing View art or the default playlist art as the background for pages."
    ]
  };
  function getSettings(state = setting_default.getState(), settings = setting_default) {
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
              {
                render: true,
                inputOptions: {
                  type: "button",
                  buttonType: "primary",
                  contents: "Start",
                  onClick: () => {
                    localStorage.removeItem("lucid-guided-tour");
                    closeSettings();
                    mountAndOpenGuide(true);
                  }
                },
                label: fieldTexts["start-lucid-tour"][0],
                tooltip: fieldTexts["start-lucid-tour"][1],
                key: "start-lucid-tour"
              },
              {
                render: true,
                inputOptions: {
                  type: "checkbox",
                  checked: modalState.getState().isFloating,
                  onChange: (isFloating) => {
                    modalState.setState((state2) => __spreadProps(__spreadValues({}, state2), { isFloating }));
                  }
                },
                label: fieldTexts["floating-window"][0],
                tooltip: fieldTexts["floating-window"][1],
                key: "floating-window"
              },
              {
                render: true,
                inputOptions: {
                  type: "select",
                  value: state.position,
                  options: [
                    { label: "Context Menu", value: "context-menu" },
                    { label: "Navigation Bar", value: "nav" }
                  ],
                  onChange: (value) => {
                    settings.setPosition(value);
                  }
                },
                label: fieldTexts["window-position"][0],
                tooltip: fieldTexts["window-position"][1],
                key: "window-position"
              }
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
              {
                render: true,
                inputOptions: {
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
                },
                label: fieldTexts["background-mode"][0],
                tooltip: fieldTexts["background-mode"][1],
                key: "background-mode"
              },
              {
                render: state.background.mode === "solid",
                inputOptions: {
                  type: "color",
                  value: state.background.options.solid.color.hex,
                  onChange: (hex) => {
                    settings.setSolidBackgroundColor({ hex });
                  }
                },
                label: fieldTexts["solid-color"][0],
                tooltip: fieldTexts["solid-color"][1],
                key: "solid-color"
              },
              {
                render: state.background.mode === "static",
                inputOptions: {
                  type: "checkbox",
                  checked: state.background.options.static.isCustomImage || false,
                  onChange: (isCustomImage) => {
                    settings.setStaticBackgroundOptions({ isCustomImage });
                  }
                },
                label: fieldTexts["custom-image"][0],
                tooltip: fieldTexts["custom-image"][1],
                key: "custom-image"
              },
              {
                render: state.background.mode === "static" && state.background.options.static.isCustomImage,
                inputOptions: {
                  type: "text",
                  value: state.background.options.static.customImageURL || "Enter Image URL",
                  validator: isValidUrl,
                  onChange: (customImageURL) => {
                    settings.setStaticBackgroundOptions({ customImageURL });
                  }
                },
                label: fieldTexts["custom-image-url"][0],
                tooltip: fieldTexts["custom-image-url"][1],
                key: "custom-image-url"
              },
              {
                render: state.background.mode === "static",
                inputOptions: {
                  type: "number",
                  value: state.background.options.static.filter.blur,
                  onChange: (blur) => {
                    settings.setStaticBackgroundFilter({ blur });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                label: fieldTexts["static-image-blur"][0],
                tooltip: fieldTexts["static-image-blur"][1],
                key: "static-image-blur"
              },
              {
                render: state.background.mode === "static",
                inputOptions: {
                  type: "number",
                  value: state.background.options.static.filter.brightness,
                  onChange: (brightness) => {
                    settings.setStaticBackgroundFilter({ brightness });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                label: fieldTexts["static-image-brightness"][0],
                tooltip: fieldTexts["static-image-brightness"][1],
                key: "static-image-brightness"
              },
              {
                render: state.background.mode === "static",
                inputOptions: {
                  type: "number",
                  value: state.background.options.static.filter.saturate,
                  onChange: (saturate) => {
                    settings.setStaticBackgroundFilter({ saturate });
                  },
                  step: 0.1,
                  validator: isValidNumberInRange200
                },
                label: fieldTexts["static-image-saturation"][0],
                tooltip: fieldTexts["static-image-saturation"][1],
                key: "static-image-saturation"
              },
              {
                render: state.background.mode === "animated",
                inputOptions: {
                  type: "number",
                  value: state.background.options.animated.filter.blur,
                  onChange: (blur) => {
                    settings.setAnimatedBackgroundFilter({ blur });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                label: fieldTexts["animated-blur"][0],
                tooltip: fieldTexts["animated-blur"][1],
                key: "animated-blur"
              },
              {
                render: state.background.mode === "animated",
                inputOptions: {
                  type: "number",
                  value: state.background.options.animated.filter.brightness,
                  onChange: (brightness) => {
                    settings.setAnimatedBackgroundFilter({ brightness });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                label: fieldTexts["animated-brightness"][0],
                tooltip: fieldTexts["animated-brightness"][1],
                key: "animated-brightness"
              },
              {
                render: state.background.mode === "animated",
                inputOptions: {
                  type: "number",
                  value: state.background.options.animated.filter.saturate,
                  onChange: (saturate) => {
                    settings.setAnimatedBackgroundFilter({ saturate });
                  },
                  step: 1,
                  validator: isValidNumberInRange200
                },
                label: fieldTexts["animated-saturation"][0],
                tooltip: fieldTexts["animated-saturation"][1],
                key: "animated-saturation"
              }
            ]
          },
          {
            render: true,
            name: "Color",
            key: "group-color",
            fields: [
              {
                key: "dynamic-color",
                render: true,
                label: fieldTexts["dynamic-color"][0],
                tooltip: fieldTexts["dynamic-color"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.color.isDynamic,
                  onChange: (value) => {
                    settings.setDynamicColor(value);
                  }
                }
              },
              {
                key: "tonal-color",
                render: true,
                label: fieldTexts["tonal-color"][0],
                tooltip: fieldTexts["tonal-color"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.color.isTonal,
                  onChange: (value) => {
                    settings.setTonalColor(value);
                  }
                }
              },
              {
                key: "custom-color-enable",
                render: !state.color.isDynamic,
                label: fieldTexts["custom-color-enable"][0],
                tooltip: fieldTexts["custom-color-enable"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.color.isCustom,
                  onChange: (value) => {
                    settings.setIsCustomColor(value);
                  }
                }
              },
              {
                key: "custom-color-picker",
                render: !state.color.isDynamic && state.color.isCustom,
                label: fieldTexts["custom-color-picker"][0],
                tooltip: fieldTexts["custom-color-picker"][1],
                inputOptions: {
                  type: "color",
                  value: state.color.customColor.hex,
                  onChange: (hex) => {
                    settings.setCustomColor({ hex });
                  }
                }
              }
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
              {
                render: true,
                key: "google-fonts-enable",
                label: fieldTexts["google-fonts-enable"][0],
                tooltip: fieldTexts["google-fonts-enable"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.font.isGoogleFonts,
                  onChange: (isGoogleFonts) => {
                    settings.setFont({ isGoogleFonts });
                  }
                }
              },
              {
                render: state.font.isGoogleFonts,
                key: "google-fonts-url",
                label: fieldTexts["google-fonts-url"][0],
                tooltip: fieldTexts["google-fonts-url"][1],
                inputOptions: {
                  type: "text",
                  value: state.font.fontUrl || "",
                  validator: isValidGoogleFontURL,
                  onChange: (fontUrl) => {
                    settings.setFont({ fontUrl });
                  }
                }
              },
              {
                render: !state.font.isGoogleFonts,
                key: "font-family",
                label: fieldTexts["font-family"][0],
                tooltip: fieldTexts["font-family"][1],
                inputOptions: {
                  type: "text",
                  value: state.font.fontFamily || "",
                  onChange: (fontFamily) => {
                    settings.setFont({ fontFamily });
                  }
                }
              }
            ]
          },
          {
            render: true,
            key: "group-grain-effect",
            name: "Grain Effect",
            fields: [
              {
                render: true,
                inputOptions: {
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
                },
                label: fieldTexts["grain-type"][0],
                tooltip: fieldTexts["grain-type"][1],
                key: "grain-type"
              }
            ]
          },
          {
            render: true,
            key: "group-window-controls",
            name: "Window",
            fields: [
              {
                render: true,
                inputOptions: {
                  type: "number",
                  step: 1,
                  value: state.pages.panelGap,
                  validator: isValidNumberInRange100,
                  onChange: (panelGap) => {
                    settings.setPages({ panelGap });
                  }
                },
                label: fieldTexts["win-panel-gap"][0],
                tooltip: fieldTexts["win-panel-gap"][1],
                key: "win-panel-gap"
              },
              {
                render: isWindows(),
                inputOptions: {
                  type: "number",
                  step: 1,
                  value: state.control.height,
                  validator: isValidNumberInRange200,
                  onChange: (value) => {
                    settings.setControlHeight(value);
                  }
                },
                label: fieldTexts["win-control-height"][0],
                tooltip: fieldTexts["win-control-height"][1],
                key: "win-control-height"
              }
            ]
          },
          {
            render: true,
            key: "group-border",
            name: "Border",
            fields: [
              {
                render: true,
                inputOptions: {
                  type: "number",
                  step: 1,
                  value: state.border.thickness,
                  validator: isValidNumberInRange10,
                  onChange: (thickness) => {
                    settings.setBorder({ thickness });
                  }
                },
                label: fieldTexts["border-thickness"][0],
                tooltip: fieldTexts["border-thickness"][1],
                key: "border-thickness"
              },
              {
                render: true,
                inputOptions: {
                  type: "color",
                  value: state.border.color.hex,
                  onChange: (hex) => {
                    settings.setBorderColor({ hex });
                  }
                },
                label: fieldTexts["border-color"][0],
                tooltip: fieldTexts["border-color"][1],
                key: "border-color"
              },
              {
                render: true,
                label: fieldTexts["border-style"][0],
                key: "border-style",
                inputOptions: {
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
                },
                tooltip: fieldTexts["border-style"][1]
              }
            ]
          },
          {
            render: true,
            key: "group-page-display",
            name: "Page Display",
            fields: [
              {
                key: "pages-background-style",
                label: fieldTexts["pages-background-style"][0],
                render: true,
                tooltip: fieldTexts["pages-background-style"][1],
                inputOptions: {
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
                }
              },
              {
                render: true,
                key: "pages-enable-home-header",
                label: fieldTexts["pages-enable-home-header"][0],
                tooltip: fieldTexts["pages-enable-home-header"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.hideHomeHeader,
                  onChange: (hideHomeHeader) => {
                    settings.setPages({ hideHomeHeader });
                  }
                }
              },
              {
                render: true,
                key: "pages-scroll-type",
                label: fieldTexts["pages-scroll-type"][0],
                tooltip: fieldTexts["pages-scroll-type"][1],
                inputOptions: {
                  type: "select",
                  value: state.pages.umv.type,
                  options: [
                    { value: "normal", label: "Default" },
                    { value: "npv", label: "Now Playing Art" }
                  ],
                  onChange: (type) => {
                    settings.setUMV({ type });
                  }
                }
              },
              {
                render: state.pages.umv.type === "normal",
                key: "pages-scroll-normal-image",
                label: fieldTexts["pages-scroll-normal-image"][0],
                tooltip: fieldTexts["pages-scroll-normal-image"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.umv.options.normal.isScroll,
                  onChange: (isScroll) => {
                    settings.setUMVOption("normal", { isScroll });
                  }
                }
              },
              {
                render: state.pages.umv.type === "normal",
                key: "pages-scale-normal-image",
                label: fieldTexts["pages-scale-normal-image"][0],
                tooltip: fieldTexts["pages-scale-normal-image"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.umv.options.normal.isScaling,
                  onChange: (isScaling) => {
                    settings.setUMVOption("normal", { isScaling });
                  }
                }
              },
              {
                render: state.pages.umv.type === "npv",
                key: "pages-scroll-npv-image",
                label: fieldTexts["pages-scroll-npv-image"][0],
                tooltip: fieldTexts["pages-scroll-npv-image"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.umv.options.npv.isScroll,
                  onChange: (isScroll) => {
                    settings.setUMVOption("npv", { isScroll });
                  }
                }
              },
              {
                render: state.pages.umv.type === "npv",
                key: "pages-scale-normal-image",
                label: fieldTexts["pages-scale-npv-image"][0],
                tooltip: fieldTexts["pages-scale-npv-image"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.umv.options.npv.isScaling,
                  onChange: (isScaling) => {
                    settings.setUMVOption("npv", { isScaling });
                  }
                }
              },
              {
                render: true,
                key: "pages-scroll-fullscreen-image",
                label: fieldTexts["pages-scroll-fullscreen-image"][0],
                tooltip: fieldTexts["pages-scroll-fullscreen-image"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.umv.options.expanded.isScroll,
                  onChange: (isScroll) => {
                    settings.setUMVOption("expanded", { isScroll });
                  }
                }
              },
              {
                render: true,
                key: "pages-scale-fullscreen-image",
                label: fieldTexts["pages-scale-fullscreen-image"][0],
                tooltip: fieldTexts["pages-scale-fullscreen-image"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.pages.umv.options.expanded.isScaling,
                  onChange: (isScaling) => {
                    settings.setUMVOption("expanded", { isScaling });
                  }
                }
              }
            ]
          },
          {
            render: true,
            key: "group-now-playing-view",
            name: "Now Playing View",
            fields: [
              {
                key: "right-sidebar-view-mode",
                label: fieldTexts["right-sidebar-view-mode"][0],
                render: true,
                tooltip: fieldTexts["right-sidebar-view-mode"][1],
                inputOptions: {
                  type: "select",
                  value: state.rightSidebar.mode,
                  options: [
                    { label: "Normal", value: "normal" },
                    { label: "Compact", value: "compact" }
                  ],
                  onChange: (mode) => {
                    settings.setRightSidebar({ mode });
                  }
                }
              },
              {
                key: "right-sidebar-size",
                label: fieldTexts["right-sidebar-size"][0],
                render: state.rightSidebar.mode === "compact",
                inputOptions: {
                  type: "number",
                  value: state.rightSidebar.size,
                  validator: isValidNumberInRange512,
                  onChange: (size) => {
                    settings.setRightSidebar({ size });
                  }
                },
                tooltip: fieldTexts["right-sidebar-size"][1]
              },
              {
                key: "right-sidebar-position",
                label: fieldTexts["right-sidebar-position"][0],
                render: state.rightSidebar.mode === "compact",
                inputOptions: {
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
                tooltip: fieldTexts["right-sidebar-position"][1]
              },
              {
                key: "right-sidebar-background-blur",
                label: fieldTexts["right-sidebar-background-blur"][0],
                render: state.rightSidebar.mode === "compact",
                inputOptions: {
                  type: "number",
                  value: state.rightSidebar.blur,
                  validator: isValidNumberInRange256,
                  onChange: (blur) => {
                    settings.setRightSidebar({ blur });
                  }
                },
                tooltip: fieldTexts["right-sidebar-background-blur"][1]
              },
              {
                render: true,
                inputOptions: {
                  type: "checkbox",
                  checked: state.rightSidebar.isCustomBg,
                  onChange: (isCustomBg) => {
                    settings.setRightSidebar({ isCustomBg });
                  }
                },
                label: fieldTexts["right-sidebar-custom-bg-enable"][0],
                tooltip: fieldTexts["right-sidebar-custom-bg-enable"][1],
                key: "right-sidebar-custom-bg-enable"
              },
              {
                key: "right-sidebar-background-color",
                label: fieldTexts["right-sidebar-background-color"][0],
                render: state.rightSidebar.isCustomBg,
                inputOptions: {
                  type: "color",
                  value: state.rightSidebar.color.hex,
                  onChange: (hex) => {
                    settings.setRightSidebarColor({ hex });
                  }
                },
                tooltip: fieldTexts["right-sidebar-background-color"][1]
              },
              {
                key: "right-sidebar-background-alpha",
                label: fieldTexts["right-sidebar-background-alpha"][0],
                render: state.rightSidebar.isCustomBg,
                inputOptions: {
                  type: "number",
                  value: state.rightSidebar.color.alpha,
                  validator: isValidNumberInRange100,
                  onChange: (alpha) => {
                    settings.setRightSidebarColor({ alpha });
                  }
                },
                tooltip: fieldTexts["right-sidebar-background-alpha"][1]
              }
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
              {
                key: "playbar-type",
                label: fieldTexts["playbar-type"][0],
                render: true,
                tooltip: fieldTexts["playbar-type"][1],
                inputOptions: {
                  type: "select",
                  value: state.playbar.type,
                  onChange: (type) => {
                    settings.setPlaybar({ type });
                  },
                  options: [
                    { label: "Default", value: "normal" },
                    { label: "Compact", value: "compact" }
                  ]
                }
              },
              {
                render: true,
                key: "playbar-is-floating",
                label: fieldTexts["playbar-is-floating"][0],
                tooltip: fieldTexts["playbar-is-floating"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.playbar.isFloating,
                  onChange: (isFloating) => {
                    settings.setPlaybar({ isFloating });
                  }
                }
              }
            ]
          },
          {
            render: state.playbar.type === "compact",
            name: "Compact Playbar",
            key: "group-playbar-compact",
            showName: true,
            fields: [
              {
                render: true,
                key: "compact-playbar-height",
                label: fieldTexts["compact-playbar-height"][0],
                tooltip: fieldTexts["compact-playbar-height"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.compact.height,
                  validator: isValidNumberInRange512,
                  onChange: (height) => {
                    settings.setPlaybarOptions("compact", { height });
                  }
                }
              },
              {
                render: true,
                key: "compact-playbar-hide-icons",
                label: fieldTexts["compact-playbar-hide-icons"][0],
                tooltip: fieldTexts["compact-playbar-hide-icons"][1],
                inputOptions: {
                  type: "checkbox",
                  checked: state.playbar.hideIcons,
                  onChange: (hideIcons2) => {
                    settings.setPlaybar({ hideIcons: hideIcons2 });
                  }
                }
              },
              {
                render: state.playbar.isFloating,
                key: "compact-playbar-backdrop-blur",
                label: fieldTexts["playbar-backdrop-blur"][0],
                tooltip: fieldTexts["playbar-backdrop-blur"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.compact.backdropFilter.blur,
                  validator: isValidNumberInRange256,
                  onChange: (blur) => {
                    settings.setPlaybarFilter("compact", { blur });
                  }
                }
              },
              {
                render: state.playbar.isFloating,
                key: "compact-playbar-backdrop-saturation",
                label: fieldTexts["playbar-backdrop-saturation"][0],
                tooltip: fieldTexts["playbar-backdrop-saturation"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.compact.backdropFilter.saturate,
                  validator: isValidNumberInRange256,
                  onChange: (saturate) => {
                    settings.setPlaybarFilter("compact", { saturate });
                  }
                }
              },
              {
                render: state.playbar.isFloating,
                key: "compact-playbar-backdrop-brightness",
                label: fieldTexts["playbar-backdrop-brightness"][0],
                tooltip: fieldTexts["playbar-backdrop-brightness"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.compact.backdropFilter.brightness,
                  validator: isValidNumberInRange256,
                  onChange: (brightness) => {
                    settings.setPlaybarFilter("compact", { brightness });
                  }
                }
              }
            ]
          },
          {
            render: state.playbar.type === "normal",
            name: "Normal Playbar",
            key: "group-playbar-normal",
            showName: true,
            fields: [
              {
                render: true,
                key: "normal-playbar-height",
                label: fieldTexts["normal-playbar-height"][0],
                tooltip: fieldTexts["normal-playbar-height"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.normal.height,
                  validator: isValidNumberInRange512,
                  onChange: (height) => {
                    settings.setPlaybarOptions("normal", { height });
                  }
                }
              },
              {
                render: state.playbar.isFloating,
                key: "playbar-backdrop-blur",
                label: fieldTexts["playbar-backdrop-blur"][0],
                tooltip: fieldTexts["playbar-backdrop-blur"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.normal.backdropFilter.blur,
                  validator: isValidNumberInRange256,
                  onChange: (blur) => {
                    settings.setPlaybarFilter("normal", { blur });
                  }
                }
              },
              {
                render: state.playbar.isFloating,
                key: "playbar-backdrop-saturation",
                label: fieldTexts["playbar-backdrop-saturation"][0],
                tooltip: fieldTexts["playbar-backdrop-saturation"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.normal.backdropFilter.saturate,
                  validator: isValidNumberInRange256,
                  onChange: (saturate) => {
                    settings.setPlaybarFilter("normal", { saturate });
                  }
                }
              },
              {
                render: state.playbar.isFloating,
                key: "playbar-backdrop-brightness",
                label: fieldTexts["playbar-backdrop-brightness"][0],
                tooltip: fieldTexts["playbar-backdrop-brightness"][1],
                inputOptions: {
                  type: "number",
                  value: state.playbar.options.normal.backdropFilter.brightness,
                  validator: isValidNumberInRange256,
                  onChange: (brightness) => {
                    settings.setPlaybarFilter("normal", { brightness });
                  }
                }
              }
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
              {
                render: true,
                inputOptions: {
                  type: "checkbox",
                  checked: state.showChangelog,
                  onChange: (state2) => {
                    settings.setChangelog(state2);
                  }
                },
                label: fieldTexts["toggle-changelog-modal"][0],
                tooltip: fieldTexts["toggle-changelog-modal"][1],
                key: "toggle-changelog-modal"
              },
              {
                render: true,
                inputOptions: {
                  type: "button",
                  buttonType: "primary",
                  contents: "Copy Settings",
                  onClick: () => {
                    copyToClipboard(settings.exportSettings(), "Settings copied to clipboard!");
                  }
                },
                label: fieldTexts["export-app-settings"][0],
                tooltip: fieldTexts["export-app-settings"][1],
                key: "export-app-settings"
              },
              {
                render: true,
                inputOptions: {
                  type: "text",
                  value: "",
                  validator: (text) => {
                    try {
                      if (isValidAppSettings(JSON.parse(text))) return { isValid: true };
                      return { isValid: false, message: "Not a valid lucid settings." };
                    } catch (e) {
                      return { isValid: false, message: "Not a valid lucid settings." };
                    }
                  },
                  onChange: (json) => {
                    settings.importSettings(json);
                  }
                },
                label: fieldTexts["import-app-settings"][0],
                tooltip: fieldTexts["import-app-settings"][1],
                key: "import-app-settings"
              },
              {
                render: true,
                inputOptions: {
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
                },
                label: fieldTexts["reset-app-settings"][0],
                tooltip: fieldTexts["reset-app-settings"][1],
                key: "reset-app-settings"
              }
            ]
          }
        ]
      }
    ];
  }

  // extension/utils/serializeCSSFilters.ts
  function serializeCSSFilters(filters) {
    let filterString = "";
    if (filters.blur) {
      filterString += `blur(${filters.blur}px) `;
    }
    if (filters.brightness) {
      filterString += `brightness(${filters.brightness}%) `;
    }
    if (filters.contrast) {
      filterString += `contrast(${filters.contrast}%) `;
    }
    if (filters.grayscale) {
      filterString += `grayscale(${filters.grayscale}) `;
    }
    if (filters.hueRotate) {
      filterString += `hue-rotate(${filters.hueRotate}) `;
    }
    if (filters.invert) {
      filterString += `invert(${filters.invert}) `;
    }
    if (filters.opacity) {
      filterString += `opacity(${filters.opacity}%) `;
    }
    if (filters.saturate) {
      filterString += `saturate(${filters.saturate || 0}%) `;
    }
    if (filters.sepia) {
      filterString += `sepia(${filters.sepia}) `;
    }
    return filterString.trim();
  }

  // extension/components/background/static.ts
  var StaticBackground = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "imgElement");
      __publicField(this, "transitionDuration", "0.3s");
      __publicField(this, "currentFilters", null);
      // Store the current filter value
      __publicField(this, "src", "");
      this.imgElement = createElement("div", {
        style: {
          width: "100%",
          height: "100ch",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translate3d(0px,0px,0px)",
          transition: `background-image ${this.transitionDuration} ease-in-out`
        }
      });
      this.appendChild(this.imgElement);
    }
    set customFilter(filters) {
      this.currentFilters = filters;
      this.style.filter = serializeCSSFilters(filters);
    }
    setImageSource(src) {
      if (this.src === src) return;
      this.src = src;
      const preloader = new Image();
      preloader.onload = () => {
        this.performTransition(src);
      };
      preloader.onerror = () => {
        console.error("Failed to load image:", src);
      };
      preloader.src = src;
    }
    performTransition(src) {
      const oldImgElement = this.imgElement;
      const newImgElement = createElement("div", {
        style: {
          width: "100%",
          height: "100ch",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translate3d(0px,0px,0px)",
          transition: `opacity ${this.transitionDuration} ease-in-out`,
          backgroundImage: `url(${src})`,
          position: "absolute",
          top: "0",
          left: "0",
          opacity: "0"
        }
      });
      this.appendChild(newImgElement);
      newImgElement.offsetWidth;
      newImgElement.style.opacity = "1";
      setTimeout(() => {
        if (this.src !== src) {
          this.removeChild(newImgElement);
          return;
        }
        this.removeChild(oldImgElement);
        this.imgElement = newImgElement;
        if (this.currentFilters) {
          this.style.filter = serializeCSSFilters(this.currentFilters);
        }
        newImgElement.style.position = "";
      }, Number.parseFloat(this.transitionDuration) * 1e3);
    }
  };
  customElements.define("static-background", StaticBackground);
  var static_default = StaticBackground;

  // extension/components/background/animated.ts
  var AnimatedBackground = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "imgElements", []);
      __publicField(this, "src", "");
      __publicField(this, "transitionDuration", "0.3s");
      this.style.display = "block";
      const style = document.createElement("style");
      style.textContent = `
#image-1 {
	left: 0%;
	top: -50%;
	z-index: 1;
}
#image-2 {
	animation-direction: reverse;
	top: 20%;
	left: -50%;
	z-index: 1;
}
#image-3 {
	animation-direction: reverse;
	right: -50%;
	top: -20%;
	width: 200%;
	z-index: 0;
}
@keyframes animBg {
	0% {
		transform: rotate(0turn) translate3d(0px,0px,0px);
	}
	to {
		transform: rotate(1turn) translate3d(0px,0px,0px);
	}
}`;
      this.appendChild(style);
      for (let i = 0; i < 3; i++) {
        const imgElement = document.createElement("div");
        imgElement.id = `image-${i + 1}`;
        imgElement.classList.add("image", `${i + 1}`);
        Object.assign(imgElement.style, {
          width: "100ch",
          height: "100ch",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: "animBg 30s linear infinite",
          willChange: "contents",
          position: "absolute",
          transition: `opacity ${this.transitionDuration} ease-in-out`,
          opacity: "0"
        });
        this.imgElements.push(imgElement);
        this.appendChild(imgElement);
        imgElement.offsetWidth;
        imgElement.style.opacity = "1";
      }
    }
    get customFilter() {
      return this.customFilter;
    }
    set customFilter(filters) {
      this.style.filter = serializeCSSFilters(filters);
    }
    setImageSource(src) {
      if (this.src !== src) {
        this.src = src;
        this.performTransition(src);
      }
    }
    performTransition(src) {
      for (const imgElement of this.imgElements) {
        const preloader = new Image();
        preloader.onload = () => {
          imgElement.style.backgroundImage = `url(${src})`;
        };
        preloader.onerror = () => {
          console.error("Failed to load image:", src);
        };
        preloader.src = src;
      }
    }
  };
  customElements.define("animated-background", AnimatedBackground);
  var animated_default = AnimatedBackground;

  // extension/components/background.ts
  var BackgroundElement = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "backgroundElement", null);
      __publicField(this, "options", null);
      this.attachShadow({ mode: "open" });
      Object.assign(this.style, {
        width: "100%",
        height: "100vh",
        display: "block",
        position: "fixed",
        inset: "0px",
        backgroundColor: "var(--clr-surface)"
      });
    }
    static get observedAttributes() {
      return ["image", "mode"];
    }
    get image() {
      return this.getAttribute("image") || "";
    }
    set image(value) {
      if (this.mode !== "solid") this.setAttribute("image", value);
      else this.removeAttribute("image");
    }
    get mode() {
      return this.getAttribute("mode") || "static";
    }
    set mode(value) {
      this.setAttribute("mode", value);
    }
    setOptions(options) {
      this.options = options;
      this.render();
    }
    getOptions() {
      return this.options;
    }
    connectedCallback() {
      if (!this.isConnected) {
        this.render();
      }
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "image" && this.backgroundElement instanceof static_default || this.backgroundElement instanceof animated_default) {
        if (this.mode === "static" || this.mode === "animated") {
          this.backgroundElement.setImageSource(newValue || "");
        }
      } else if (name === "mode") {
        if (this.isConnected) this.render();
      }
    }
    render() {
      var _a4, _b2, _c, _d, _e, _f, _g, _h;
      if (!this.shadowRoot) return;
      const mode = this.mode;
      const imageUrl = this.image;
      const backgroundContainer = createElement("div");
      backgroundContainer.style.width = "100%";
      backgroundContainer.style.height = "100%";
      switch (mode) {
        case "static": {
          let staticElement;
          if (this.backgroundElement instanceof static_default) {
            staticElement = this.backgroundElement;
            staticElement.customFilter = ((_a4 = this.options) == null ? void 0 : _a4.static.filter) || {};
          } else {
            staticElement = new static_default();
            staticElement.setImageSource(imageUrl);
            staticElement.customFilter = ((_b2 = this.options) == null ? void 0 : _b2.static.filter) || {};
            this.backgroundElement = staticElement;
          }
          backgroundContainer.appendChild(staticElement);
          break;
        }
        case "solid": {
          let solidElement;
          if (this.backgroundElement instanceof HTMLDivElement && this.backgroundElement.classList.contains("solid")) {
            solidElement = this.backgroundElement;
            Object.assign(solidElement.style, {
              backgroundColor: ((_c = this.options) == null ? void 0 : _c.solid.color.hex) + alphaToHex(((_d = this.options) == null ? void 0 : _d.solid.color.alpha) || 1) || "var(--clr-surface, #101010)"
            });
          } else {
            solidElement = createElement("div", {
              className: "solid background"
            });
            Object.assign(solidElement.style, {
              backgroundColor: ((_e = this.options) == null ? void 0 : _e.solid.color.hex) + alphaToHex(((_f = this.options) == null ? void 0 : _f.solid.color.alpha) || 1) || "var(--clr-surface, #101010)",
              width: "100%",
              height: "100vh"
            });
            this.backgroundElement = solidElement;
          }
          backgroundContainer.appendChild(solidElement);
          break;
        }
        case "animated": {
          let animatedElement;
          if (this.backgroundElement instanceof animated_default) {
            animatedElement = this.backgroundElement;
            animatedElement.customFilter = ((_g = this.options) == null ? void 0 : _g.animated.filter) || {};
          } else {
            animatedElement = new animated_default();
            animatedElement.setImageSource(imageUrl);
            animatedElement.customFilter = ((_h = this.options) == null ? void 0 : _h.animated.filter) || {};
            this.backgroundElement = animatedElement;
          }
          backgroundContainer.appendChild(animatedElement);
          break;
        }
      }
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(backgroundContainer);
    }
  };
  customElements.define("lucid-background-container", BackgroundElement);
  var background_default = BackgroundElement;

  // extension/hooks/background.ts
  function mountBackground() {
    const backgroundMain = new background_default();
    const settings = setting_default.getState();
    const bgState = settings.background;
    const isCustomImage = settings.background.options.static.isCustomImage;
    backgroundMain.mode = bgState.mode;
    backgroundMain.setOptions(bgState.options);
    backgroundMain.image = isCustomImage ? settings.background.options.static.customImageURL : npvState.getState().url || "";
    let unsubscribeNpv = null;
    if (!isCustomImage) {
      unsubscribeNpv = npvState.subscribe((state) => {
        backgroundMain.image = state.url || "";
      });
    }
    setting_default.subscribe((state) => {
      const updatedBg = state.background;
      const useCustom = updatedBg.options.static.isCustomImage;
      backgroundMain.mode = updatedBg.mode;
      backgroundMain.setOptions(updatedBg.options);
      if (useCustom) {
        if (unsubscribeNpv) {
          unsubscribeNpv();
          unsubscribeNpv = null;
        }
        backgroundMain.image = updatedBg.options.static.customImageURL;
      } else {
        if (!unsubscribeNpv) {
          unsubscribeNpv = npvState.subscribe((state2) => {
            backgroundMain.image = state2.url || "";
          });
        }
        backgroundMain.image = npvState.getState().url || "";
      }
    }, "background");
    let backgroundContainer = document.getElementById("lucid-bg");
    if (!backgroundContainer) {
      backgroundContainer = createElement("div");
      backgroundContainer.id = "lucid-bg";
      lazyLoadElementByTag("main").prepend(backgroundMain);
    } else {
      backgroundContainer.appendChild(backgroundMain);
    }
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
    constructor(data) {
      super();
      __publicField(this, "_data", null);
      __publicField(this, "_currentVersion");
      __publicField(this, "hasUpdate", false);
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
      console.debug("Changelog update available, but already shown for this version.");
    }
  }
  mountChangelog();

  // extension/App.tsx
  var main = () => {
    const lucidMain = new main_default();
    function mountMain() {
      const mainElement = document.getElementById("main");
      if (mainElement) mainElement.append(lucidMain);
      else document.body.appendChild(lucidMain);
    }
    function mountBorders() {
      const setStyles = () => {
        const borderSetting = setting_default.getState().border;
        const styleSheet2 = lazyLoadStyleById("lucid-border");
        styleSheet2.textContent = ":root{";
        styleSheet2.textContent += `--border-color:${borderSetting.color.hex}${alphaToHex(
          borderSetting.color.alpha
        )};`;
        if (borderSetting.style) {
          styleSheet2.textContent += `--border-style:${borderSetting.style};`;
        }
        if (borderSetting.thickness) {
          styleSheet2.textContent += `--border-thickness:${borderSetting.thickness}px;`;
        }
        styleSheet2.textContent += "}";
      };
      setStyles();
      setting_default.subscribe(setStyles, "border");
    }
    function mountUnderMainView() {
      var _a4, _b2;
      waitForElement([".Root__now-playing-bar", ".Root__globalNav"], ([playbar, nav]) => {
        document.body.style.setProperty(
          "--umv-offset",
          `${((playbar == null ? void 0 : playbar.clientHeight) || 80) + ((nav == null ? void 0 : nav.clientHeight) || 64)}px`
        );
      });
      const underMainView = new UMVElement();
      const underMainViewParent = (_a4 = document.querySelector(".under-main-view")) == null ? void 0 : _a4.parentElement;
      if (underMainViewParent) underMainViewParent.prepend(underMainView);
      else (_b2 = document.querySelector(".main-view-container")) == null ? void 0 : _b2.prepend(underMainView);
    }
    setTimeout(mountUnderMainView, 500);
    mountMain();
    mountBorders();
    mountBackground();
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
    mountSettings(lucidMain);
    mountAndOpenGuide();
    mountChangelog();
  };
  console.time("Main fn start");
  main();
  console.timeEnd("Main fn start");
})();
})();