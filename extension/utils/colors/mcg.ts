import {
  argbFromHex,
  hexFromArgb,
  type Scheme,
  type Theme,
  themeFromSourceColor,
  type TonalPalette,
} from '@material/material-color-utilities';

function setSchemeProperties(target: HTMLElement, scheme: Scheme, suffix = '') {
  for (const [key, value] of Object.entries(scheme.toJSON())) {
    const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const color = hexFromArgb(value);
    target.style.setProperty(`--clr-${token}${suffix}`, color);
    target.style.setProperty(`--clr-${token}${suffix}-rgb`, hexToRgbString(color));
  }
}

function hexToRgbString(hex: string) {
  const bigint = Number.parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r},${g},${b}`;
}

function setPaletteProperties(
  target: HTMLElement,
  palette: TonalPalette,
  schemeType: 'surface' | 'primary' | 'on-surface' | 'on-primary',
  isDark: boolean
) {
  let tonesLight: number[];
  let tonesDark: number[];
  let propertyPrefix: string;

  switch (schemeType) {
    case 'surface':
      tonesLight = [99, 98, 95, 90, 80, 70];
      tonesDark = [6, 12, 20, 24, 28, 38];
      propertyPrefix = '--clr-surface';
      break;
    case 'primary':
      tonesLight = [40, 50, 60, 70, 80, 90];
      tonesDark = [80, 70, 60, 50, 40, 30];
      propertyPrefix = '--clr-primary';
      break;
    case 'on-primary':
      tonesLight = [6, 12, 20, 24, 28, 38];
      tonesDark = [99, 95, 90, 80, 70, 60];
      propertyPrefix = '--clr-on-primary';
      break;
    case 'on-surface':
      tonesLight = [6, 12, 20, 24, 28, 38];
      tonesDark = [99, 95, 90, 80, 70, 60];
      propertyPrefix = '--clr-on-surface';
      break;

    default:
      console.error(`Unknown scheme type: ${schemeType}`);
      return;
  }

  const tones = isDark ? tonesDark : tonesLight;

  for (let i = 0; i <= 5; i++) {
    const tone = palette.tone(tones[i]);
    const color = hexFromArgb(tone);
    target.style.setProperty(`${propertyPrefix}-${i}`, color);
    target.style.setProperty(`${propertyPrefix}-${i}-rgb`, hexToRgbString(color));
  }
}
type ApplyThemeOptions = {
  dark?: boolean;
  target?: HTMLElement;
  tonal?: boolean;
};
function applyTheme(theme: Theme, options: ApplyThemeOptions) {
  const target = options?.target || document.body;
  const isDark = options?.dark ?? false;
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  const isTonal = options?.tonal ?? true;

  setSchemeProperties(target, scheme);
  console.log(theme);

  setPaletteProperties(
    target,
    isTonal ? theme.palettes.neutralVariant : theme.palettes.neutral,
    'surface',
    isDark
  );
  setPaletteProperties(
    target,
    isTonal ? theme.palettes.neutralVariant : theme.palettes.neutral,
    'on-surface',
    isDark
  );
  setPaletteProperties(target, theme.palettes.primary, 'primary', isDark);
  setPaletteProperties(target, theme.palettes.primary, 'on-primary', isDark);
}

export function applyThemeFromHex(hex: string, options?: ApplyThemeOptions) {
  const theme = themeFromSourceColor(argbFromHex(hex));

  applyTheme(theme, {
    dark: true,
    ...options,
  });
}
