import type { CSSFilter } from '@app/types/settings.ts';

export function serializeCSSFilters(filters: CSSFilter): string {
  let filterString = '';

  if (filters?.blur !== undefined) filterString += `blur(${filters.blur}px) `;
  if (filters?.brightness !== undefined) filterString += `brightness(${filters.brightness}%) `;
  if (filters?.contrast !== undefined) filterString += `contrast(${filters.contrast}%) `;
  if (filters?.grayscale !== undefined) filterString += `grayscale(${filters.grayscale}) `;
  if (filters?.hueRotate !== undefined) filterString += `hue-rotate(${filters.hueRotate}) `;
  if (filters?.invert !== undefined) filterString += `invert(${filters.invert}) `;
  if (filters?.opacity !== undefined) filterString += `opacity(${filters.opacity}%) `;
  if (filters?.saturate !== undefined) filterString += `saturate(${filters.saturate || 0}%) `;
  if (filters?.sepia !== undefined) filterString += `sepia(${filters.sepia}) `;

  return filterString.trim();
}
