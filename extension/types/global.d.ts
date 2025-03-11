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

type CallBack = () => void;
interface Window {
  lucidMainElement: HTMLElement | undefined;
  lucidState: {
    NPVArtworkUrl: string | null | undefined;
  };
  lucid: {
    config?: CallBack;
    reset?: CallBack;
    version?: string;
    store?: any;
    settings?: {
      openSettings?: CallBack;
      closeSettings?: CallBack;
      settingModal: any;
    };
  };
  guide: {
    open: CallBack;
  };
  EyeDropper?: EyeDropperConstructor | undefined;
  Modal?: any;
  FloatingModal?: any;
}
