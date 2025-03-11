import {
  argbFromHex,
  hexFromArgb,
  labFromArgb,
  themeFromSourceColor,
  type Scheme,
  type TonalPalette,
} from '@material/material-color-utilities';

const toRgb = (hex: string): string => {
  const int = Number.parseInt(hex.slice(1), 16);
  return `${(int >> 16) & 255},${(int >> 8) & 255},${int & 255}`;
};

type ApplyThemeOptions = {
  dark?: boolean;
  tonal?: boolean;
};

type SchemeType = 'surface' | 'primary' | 'on-surface' | 'on-primary';
type SchemeProps = {
  primary: number;
  onPrimary: number;
  primaryContainer: number;
  onPrimaryContainer: number;
  secondary: number;
  onSecondary: number;
  secondaryContainer: number;
  onSecondaryContainer: number;
  tertiary: number;
  onTertiary: number;
  tertiaryContainer: number;
  onTertiaryContainer: number;
  error: number;
  onError: number;
  errorContainer: number;
  onErrorContainer: number;
  background: number;
  onBackground: number;
  surface: number;
  onSurface: number;
  surfaceVariant: number;
  onSurfaceVariant: number;
  outline: number;
  outlineVariant: number;
  shadow: number;
  scrim: number;
  inverseSurface: number;
  inverseOnSurface: number;
  inversePrimary: number;
};

type PaletteToneConfig = {
  light: number[];
  dark: number[];
  prefix: string;
};

const SURFACE_PREFIX = 'clr-surface';
const PRIMARY_PREFIX = 'clr-primary';
const ON_PRIMARY_PREFIX = 'clr-on-primary';
const ON_SURFACE_PREFIX = 'clr-on-surface';

const paletteToneConfig: Record<SchemeType, PaletteToneConfig> = {
  surface: {
    light: [99, 98, 95, 90, 80, 70],
    dark: [6, 12, 20, 24, 28, 38],
    prefix: SURFACE_PREFIX,
  },
  primary: {
    light: [40, 50, 60, 70, 80, 90],
    dark: [80, 70, 60, 50, 40, 30],
    prefix: PRIMARY_PREFIX,
  },
  'on-primary': {
    light: [6, 12, 20, 24, 28, 38],
    dark: [99, 95, 90, 80, 70, 60],
    prefix: ON_PRIMARY_PREFIX,
  },
  'on-surface': {
    light: [6, 12, 20, 24, 28, 38],
    dark: [99, 95, 90, 80, 70, 60],
    prefix: ON_SURFACE_PREFIX,
  },
};

const createCssProperty = (property: string, value: string): string => {
  return `--${property}: ${value};`;
};

function getProperties(palette: TonalPalette, schemeType: SchemeType, isDark: boolean): string {
  const config = paletteToneConfig[schemeType];
  if (!config) {
    console.error(`Unknown scheme type: ${schemeType}`);
    return '';
  }
  const tones = isDark ? config.dark : config.light;
  const prefix = config.prefix;

  return tones
    .map((toneValue, index) => {
      const color = hexFromArgb(palette.tone(toneValue));
      return (
        createCssProperty(`${prefix}-${index}`, color) +
        createCssProperty(`${prefix}-${index}-rgb`, toRgb(color))
      );
    })
    .join('');
}

function getSchemeProperties(scheme: SchemeProps): string {
  let cssString = '';
  for (const key in scheme) {
    const value = scheme[key as keyof SchemeProps];
    if (typeof value === 'number') {
      const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const color = hexFromArgb(value);
      cssString += createCssProperty(`clr-${token}`, color);
      cssString += createCssProperty(`clr-${token}-rgb`, toRgb(color));
    }
  }
  return cssString;
}

export function getStyles(hex: string, options: ApplyThemeOptions = {}): string {
  const { dark = false, tonal = true } = options;
  const theme = themeFromSourceColor(argbFromHex(hex));
  const scheme = dark ? theme.schemes.dark : theme.schemes.light;
  const surfacePalette = tonal ? theme.palettes.neutralVariant : theme.palettes.neutral;
  const primaryPalette = theme.palettes.primary;

  return `${getSchemeProperties(scheme.toJSON())}${getProperties(surfacePalette, 'surface', dark)}${getProperties(surfacePalette, 'on-surface', dark)}${getProperties(primaryPalette, 'primary', dark)}${getProperties(primaryPalette, 'on-primary', dark)}`;
}
