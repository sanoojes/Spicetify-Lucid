import type { ValidatorResult } from '@utils/validationUtils.ts';
import type { ButtonType } from '@components/ui/button.ts';

// Input types
export type CheckboxInput = {
  type: 'checkbox';
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export type ButtonInput = {
  type: 'button';
  buttonType?: ButtonType;
  contents?: string | HTMLElement;
  onClick?: (e: Event) => void;
};

export type SelectInput = {
  type: 'select';
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
};

export type TextInput = {
  type: 'text';
  value?: string;
  onChange?: (value: string) => void;
  validator?: (value: string) => ValidatorResult;
};

export type NumberInput = {
  type: 'number';
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  validator?: (value: number) => ValidatorResult;
};
export type ColorInput = {
  type: 'color';
  value?: string;
  onChange?: (value: string) => void;
};

export type ImageInput = {
  type: 'image';
  onChange?: (value: string | null) => void;
};

export type InputOptionsMap = {
  checkbox: CheckboxInput;
  button: ButtonInput;
  select: SelectInput;
  text: TextInput;
  color: ColorInput;
  number: NumberInput;
  image: ImageInput;
};

export type InputOptionsUnion = InputOptionsMap[keyof InputOptionsMap];
