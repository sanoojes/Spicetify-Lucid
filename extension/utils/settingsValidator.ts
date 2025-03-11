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
  PlaybarOption,
  PlaybarOptions,
  PlaybarSettings,
  PlaybarTypes,
  RightSidebarSettings,
  SolidBackgroundOptions,
  StaticBackgroundOptions,
  UMVSettings,
} from '@app/types/settings.ts';

function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === 'object';
}

function isValidCSSFilter(filter: any): filter is CSSFilter {
  return (
    isObject(filter) &&
    (filter.blur === undefined || typeof filter.blur === 'number') &&
    (filter.brightness === undefined || typeof filter.brightness === 'number') &&
    (filter.contrast === undefined || typeof filter.contrast === 'number') &&
    (filter.grayscale === undefined || typeof filter.grayscale === 'string') &&
    (filter.hueRotate === undefined || typeof filter.hueRotate === 'string') &&
    (filter.invert === undefined || typeof filter.invert === 'string') &&
    (filter.opacity === undefined || typeof filter.opacity === 'number') &&
    (filter.saturate === undefined || typeof filter.saturate === 'number') &&
    (filter.sepia === undefined || typeof filter.sepia === 'string')
  );
}

function isValidColor(color: any): color is Color {
  return isObject(color) && typeof color.hex === 'string' && typeof color.alpha === 'number';
}

function isValidStaticBackgroundOptions(obj: any): obj is StaticBackgroundOptions {
  return (
    isObject(obj) &&
    typeof obj.isCustomImage === 'boolean' &&
    typeof obj.customImageURL === 'string' &&
    isValidCSSFilter(obj.filter)
  );
}
function isValidSolidBackgroundOptions(obj: any): obj is SolidBackgroundOptions {
  return isObject(obj) && isValidColor(obj.color);
}
function isValidAnimatedBackgroundOptions(obj: any): obj is AnimatedBackgroundOptions {
  return isObject(obj) && isValidCSSFilter(obj.filter);
}
function isValidBackgroundOptions(obj: any): obj is BackgroundOptions {
  return (
    isObject(obj) &&
    isValidStaticBackgroundOptions(obj.static) &&
    isValidSolidBackgroundOptions(obj.solid) &&
    isValidAnimatedBackgroundOptions(obj.animated)
  );
}
function isValidBackground(obj: any): obj is Background {
  return (
    isObject(obj) &&
    typeof obj.mode === 'string' &&
    (obj.mode === 'static' || obj.mode === 'solid' || obj.mode === 'animated') &&
    isValidBackgroundOptions(obj.options)
  );
}

function isValidBorderSettings(obj: any): obj is BorderSettings {
  return (
    isObject(obj) &&
    typeof obj.thickness === 'number' &&
    isValidColor(obj.color) &&
    typeof obj.style === 'string'
  );
}

function isValidRightSidebarSettings(obj: any): obj is RightSidebarSettings {
  return (
    isObject(obj) &&
    (obj.mode === 'compact' || obj.mode === 'normal') &&
    (obj.position === 'bottom left' ||
      obj.position === 'bottom right' ||
      obj.position === 'top left' ||
      obj.position === 'top right') &&
    typeof obj.blur === 'number' &&
    typeof obj.size === 'number' &&
    typeof obj.isCustomBg === 'boolean' &&
    isValidColor(obj.color)
  );
}

function isValidPageOptions(options: any): options is PageOptions {
  if (!isObject(options)) return false;
  const types: PageType[] = ['normal', 'expanded', 'npv'];
  return types.every((type) => {
    const opt = options[type];
    return (
      isObject(opt) &&
      typeof opt.isScaling === 'boolean' &&
      typeof opt.isScroll === 'boolean' &&
      (opt.filter === null || isValidCSSFilter(opt.filter))
    );
  });
}
function isValidUMVSettings(obj: any): obj is UMVSettings {
  return (
    isObject(obj) &&
    (obj.type === 'npv' || obj.type === 'normal') &&
    isValidPageOptions(obj.options)
  );
}
function isValidPageSettings(obj: any): obj is PageSettings {
  return (
    isObject(obj) &&
    typeof obj.panelGap === 'number' &&
    typeof obj.hideHomeHeader === 'boolean' &&
    typeof obj.style === 'string' &&
    isValidUMVSettings(obj.umv)
  );
}

function isValidColorSettings(obj: any): obj is ColorSettings {
  return (
    isObject(obj) &&
    typeof obj.isDynamic === 'boolean' &&
    typeof obj.isCustom === 'boolean' &&
    typeof obj.isTonal === 'boolean' &&
    isValidColor(obj.customColor)
  );
}

function isValidPlaybarOption(obj: any): obj is PlaybarOption {
  return (
    isObject(obj) &&
    isValidCSSFilter(obj.backdropFilter) &&
    typeof obj.height === 'number' &&
    typeof obj.paddingX === 'number' &&
    isValidColor(obj.bgColor) &&
    typeof obj.bgOpacity === 'number' &&
    typeof obj.borderRadius === 'number'
  );
}
function isValidPlaybarOptions(options: any): options is PlaybarOptions {
  if (!isObject(options)) return false;
  const types: PlaybarTypes[] = ['compact', 'normal'];
  return types.every((type) => isValidPlaybarOption(options[type]));
}
function isValidPlaybarSettings(obj: any): obj is PlaybarSettings {
  return (
    isObject(obj) &&
    (obj.type === 'compact' || obj.type === 'normal') &&
    isValidPlaybarOptions(obj.options) &&
    typeof obj.isFloating === 'boolean' &&
    typeof obj.hideIcons === 'boolean'
  );
}

function isValidGrainSettings(obj: any): obj is GrainSettings {
  return isObject(obj) && (obj.type === 'default' || obj.type === 'starry' || obj.type === 'none');
}

export function isValidAppSettings(obj: any): obj is AppSettings {
  return (
    isObject(obj) &&
    (obj.position === 'context-menu' || obj.position === 'nav') &&
    isValidBackground(obj.background) &&
    isValidBorderSettings(obj.border) &&
    isValidPageSettings(obj.pages) &&
    isValidColorSettings(obj.color) &&
    isObject(obj.control) &&
    typeof obj.control.height === 'number' &&
    isObject(obj.font) &&
    typeof obj.font.fontFamily === 'string' &&
    (typeof obj.font.fontUrl === 'string' || obj.font.fontUrl === null) &&
    typeof obj.font.isGoogleFonts === 'boolean' &&
    isValidGrainSettings(obj.grains) &&
    isValidPlaybarSettings(obj.playbar) &&
    isValidRightSidebarSettings(obj.rightSidebar)
  );
}
