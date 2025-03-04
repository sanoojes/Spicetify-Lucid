export type TextType =
  | 'variable-text'
  | 'headline-large'
  | 'headline-medium'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-medium'
  | 'body-medium-bold'
  | 'body-small'
  | 'body-small-bold';

export type ColorVariant =
  | 'base'
  | 'subdued'
  | 'bright-accent'
  | 'negative'
  | 'warning'
  | 'positive'
  | 'announcement';

export const getColorClass = (variant: ColorVariant = 'base'): string =>
  `encore-internal-color-text-${variant}`;
export const getTextClass = (
  type: TextType = 'variable-text',
  color: ColorVariant = 'base'
): string =>
  `encore-text ${
    type === 'variable-text' ? `encore-${type}` : `encore-text-${type}`
  } ${getColorClass(color)}`;
