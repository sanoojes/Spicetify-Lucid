export const alphaToHex = (alpha: number) => {
  if (alpha < 0 || alpha > 100) {
    throw new Error('Alpha value must be between 0 and 100');
  }

  const alphaDecimal = alpha / 100;
  const alpha255 = Math.round(alphaDecimal * 255);
  let alphaHex = alpha255.toString(16).toUpperCase();

  if (alphaHex.length === 1) {
    alphaHex = `0${alphaHex}`;
  }

  return alphaHex;
};
