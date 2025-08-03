import type { GoogleFont } from '@utils/font.ts';
import type { ReactNode } from 'react';
import type { ZodSafeParseResult } from 'zod';

export interface FontPickerProps {
  value?: string;
  onChange?: (font: GoogleFont) => void;
}

export type DropdownOptions = [label: string, value: string];
export interface DropdownProps {
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOptions[];
}

export interface BaseInputProps {
  className?: string;
  icon?: ReactNode | null;
  placeholder?: string;
}

export type InputProps =
  | (BaseInputProps & {
      inputType: 'text';
      value?: string;
      onChange: (value: string) => void;
      validation?: (value: string) => ZodSafeParseResult<string> | boolean;
    })
  | (BaseInputProps & {
      inputType: 'number';
      value?: number;
      onChange: (value: number) => void;
      validation?: (value: number) => ZodSafeParseResult<number> | boolean;
      step?: number;
    });

export interface ToggleProps {
  isChecked: boolean;
  onChange: (value: boolean) => void;
}

export interface ButtonProps {
  className?: string;
  variant?: 'default' | 'primary' | 'danger' | 'icon' | 'icon-no-border';
  onClick: () => void;
  buttonText?: string | ReactNode;
  children?: string | ReactNode;
}

export interface ColorPickerProps {
  color: string;
  initialColor?: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  hideAlpha?: boolean;
}
