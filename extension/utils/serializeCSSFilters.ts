import type { CSSFilter } from '@app/types/settings.ts';

export function serializeCSSFilters(filters: CSSFilter): string {
  let filterString = '';

  if (filters.blur) {
    filterString += `blur(${filters.blur}px) `;
  }
  if (filters.brightness) {
    filterString += `brightness(${filters.brightness}%) `;
  }
  if (filters.contrast) {
    filterString += `contrast(${filters.contrast}%) `;
  }
  if (filters.grayscale) {
    filterString += `grayscale(${filters.grayscale}) `;
  }
  if (filters.hueRotate) {
    filterString += `hue-rotate(${filters.hueRotate}) `;
  }
  if (filters.invert) {
    filterString += `invert(${filters.invert}) `;
  }
  if (filters.opacity) {
    filterString += `opacity(${filters.opacity}%) `;
  }
  if (filters.saturate) {
    filterString += `saturate(${filters.saturate || 0}%) `;
  }
  if (filters.sepia) {
    filterString += `sepia(${filters.sepia}) `;
  }

  return filterString.trim();
}
