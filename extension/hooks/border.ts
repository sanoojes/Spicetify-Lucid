import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { alphaToHex } from '@utils/colors/convert.ts';
import appSettingsStore from '@store/setting.ts';

export function mountBorders(settings = appSettingsStore.getState()) {
  const border = settings.border;
  const styleSheet = lazyLoadStyleById('lucid-border');
  styleSheet.textContent = ':root{';
  styleSheet.textContent += `--border-color:${border.color.hex}${alphaToHex(border.color.alpha)};`;
  if (border.style) {
    styleSheet.textContent += `--border-style:${border.style};`;
  }
  if (border.thickness) {
    styleSheet.textContent += `--border-thickness:${border.thickness}px;`;
  }
  styleSheet.textContent += '}';
}
appSettingsStore.subscribe(mountBorders, 'border');
