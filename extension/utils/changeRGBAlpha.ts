export function changeRGBAlpha(className: string, a = 0.5) {
  const cards = document.querySelectorAll(className) as NodeListOf<HTMLDivElement> | null;
  if (!cards) return;

  for (const card of cards) {
    const prev = card.style.backgroundColor;
    const rgbaValues = prev.match(/rgb?\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbaValues && rgbaValues.length === 4) {
      const r = rgbaValues[1];
      const g = rgbaValues[2];
      const b = rgbaValues[3];
      const rgbString = `${r},${g},${b}`;

      card.style.setProperty('--accent-color', `${rgbString}`);
      card.style.backgroundColor = `rgba(${rgbString},${a})`;
    }
  }
}
