interface ColorSelectionOptions {
  signal?: AbortSignal;
}

interface ColorSelectionResult {
  sRGBHex: string;
}

interface EyeDropper {
  open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>;
}

interface EyeDropperConstructor {
  new (): EyeDropper;
}

interface Window {
  lucidMainElement: HTMLElement | undefined;
  lucidState: {
    NPVArtworkUrl: string | null | undefined;
  };
  lucid: {
    config?: () => void;
    reset?: () => void;
    store?: unknown;
  };
  EyeDropper?: EyeDropperConstructor | undefined;
}
