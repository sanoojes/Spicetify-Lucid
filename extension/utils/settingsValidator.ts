// deno-lint-ignore-file no-explicit-any

import type {
  AnimatedBackgroundOptions,
  AppSettings,
  Background,
  BackgroundOptions,
  BorderSettings,
  Color,
  ColorSettings,
  CSSFilter,
  GrainSettings,
  PageOptions,
  PageSettings,
  PageType,
  PlaybarOptions,
  PlaybarSettings,
  PlaybarTypes,
  RightSidebarSettings,
  SolidBackgroundOptions,
  StaticBackgroundOptions,
  UMVSettings,
} from '@app/types/settings.ts';

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isString(value: any): boolean {
  return typeof value === 'string';
}

function isNumber(value: any): boolean {
  return typeof value === 'number';
}

function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

function isValidColor(value: any): value is Color {
  return isObject(value) && isString(value.hex) && isNumber(value.alpha);
}

function isValidCSSFilter(value: any): value is CSSFilter {
  return (
    isObject(value) &&
    (value.blur === undefined || isNumber(value.blur)) &&
    (value.brightness === undefined || isNumber(value.brightness)) &&
    (value.contrast === undefined || isNumber(value.contrast)) &&
    (value.grayscale === undefined || isString(value.grayscale)) &&
    (value.hueRotate === undefined || isString(value.hueRotate)) &&
    (value.invert === undefined || isString(value.invert)) &&
    (value.opacity === undefined || isNumber(value.opacity)) &&
    (value.saturate === undefined || isNumber(value.saturate)) &&
    (value.sepia === undefined || isString(value.sepia))
  );
}

function isValidStaticBackgroundOptions(value: any): value is StaticBackgroundOptions {
  return (
    isObject(value) &&
    isBoolean(value.isCustomImage) &&
    isString(value.customImageURL) &&
    isValidCSSFilter(value.filter)
  );
}

function isValidSolidBackgroundOptions(value: any): value is SolidBackgroundOptions {
  return isObject(value) && isValidColor(value.color);
}

function isValidAnimatedBackgroundOptions(value: any): value is AnimatedBackgroundOptions {
  return isObject(value) && isValidCSSFilter(value.filter);
}

function isValidBackgroundOptions(value: any): value is BackgroundOptions {
  return (
    isObject(value) &&
    isValidStaticBackgroundOptions(value.static) &&
    isValidSolidBackgroundOptions(value.solid) &&
    isValidAnimatedBackgroundOptions(value.animated)
  );
}

function isValidBackground(value: any): value is Background {
  return isObject(value) && isString(value.mode) && isValidBackgroundOptions(value.options);
}

function isValidBorderSettings(value: any): value is BorderSettings {
  return (
    isObject(value) &&
    isNumber(value.thickness) &&
    isValidColor(value.color) &&
    isString(value.style)
  );
}

function isValidRightSidebarSettings(value: any): value is RightSidebarSettings {
  return (
    isObject(value) &&
    isString(value.mode) &&
    isString(value.position) &&
    isNumber(value.blur) &&
    isValidColor(value.color)
  );
}

function isValidPageOptionsItem(value: any): value is PageOptions[PageType] {
  return (
    isObject(value) &&
    isBoolean(value.isScaling) &&
    isBoolean(value.isScroll) &&
    (value.filter === null || isValidCSSFilter(value.filter))
  );
}

function isValidPageOptions(value: any): value is PageOptions {
  return (
    isObject(value) &&
    isValidPageOptionsItem(value.normal) &&
    isValidPageOptionsItem(value.expanded) &&
    isValidPageOptionsItem(value.npv)
  );
}

function isValidUMVSettings(value: any): value is UMVSettings {
  return isObject(value) && isString(value.type) && isValidPageOptions(value.options);
}

function isValidPageSettings(value: any): value is PageSettings {
  return isObject(value) && isString(value.style) && isValidUMVSettings(value.umv);
}

function isValidColorSettings(value: any): value is ColorSettings {
  return (
    isObject(value) &&
    isBoolean(value.isDynamic) &&
    isBoolean(value.isCustom) &&
    isBoolean(value.isTonal) &&
    isValidColor(value.customColor) &&
    isString(value.defaultPrimary)
  );
}

function isValidPlaybarOptionsItem(value: any): value is PlaybarOptions[PlaybarTypes] {
  return (
    isObject(value) &&
    isValidCSSFilter(value.backdropFilter) &&
    isNumber(value.height) &&
    isNumber(value.paddingX) &&
    isValidColor(value.bgColor) &&
    isNumber(value.bgOpacity) &&
    isNumber(value.borderRadius)
  );
}

function isValidPlaybarOptions(value: any): value is PlaybarOptions {
  return (
    isObject(value) &&
    isValidPlaybarOptionsItem(value.compact) &&
    isValidPlaybarOptionsItem(value.normal)
  );
}

function isValidPlaybarSettings(value: any): value is PlaybarSettings {
  return (
    isObject(value) &&
    isString(value.type) &&
    isValidPlaybarOptions(value.options) &&
    isBoolean(value.isFloating)
  );
}

function isValidGrainSettings(value: any): value is GrainSettings {
  return isObject(value) && isString(value.type);
}

export function isValidAppSettings(settings: any): settings is AppSettings {
  if (!isObject(settings)) return false;
  const app = settings as AppSettings;

  return (
    isValidBackground(app.background) &&
    isValidColorSettings(app.color) &&
    isString(app.position) &&
    isValidBorderSettings(app.border) &&
    isValidRightSidebarSettings(app.rightSidebar) &&
    isObject(app.control) &&
    isNumber(app.control.height) &&
    isObject(app.font) &&
    isString(app.font.fontFamily) &&
    (app.font.fontUrl === null || isString(app.font.fontUrl)) &&
    isBoolean(app.font.isGoogleFonts) &&
    isValidGrainSettings(app.grains) &&
    isValidPlaybarSettings(app.playbar) &&
    isValidPageSettings(app.pages)
  );
}
