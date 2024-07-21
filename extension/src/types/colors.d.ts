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
  "button-active": Color;
  text: Color;
  subtext: Color;
  primary: Color;
  secondary: Color;
  tertiary: Color;
}
