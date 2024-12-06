export type NpvMode = "compact" | "normal";
export type NpvPosition = "left" | "right";

export type NpvSettings = {
  mode: NpvMode;
  position: NpvPosition;
  blur: number;
};
