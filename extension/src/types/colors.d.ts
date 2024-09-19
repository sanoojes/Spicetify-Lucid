export interface Color {
  r: number;
  g: number;
  b: number;
  hex: string;
}

export interface ColorPalette {
  main: Color;
  sidebar: Color;
  card: Color;
  accent: Color;
  highlight: Color;
  button: Color;
  player: Color;
  'progress-bar': Color;
  'button-active': Color;
  text: Color;
  subtext: Color;
  primary: Color;
  secondary: Color;
  tertiary: Color;
}

type ExtractedColors = {
  baseColor: Color;
  secondaryColor: Color;
  tertiaryColor: Color;
};
