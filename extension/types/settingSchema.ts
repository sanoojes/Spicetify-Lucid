import type {
  ButtonProps,
  ColorPickerProps,
  DropdownProps,
  FontPickerProps,
  InputProps,
  ToggleProps,
} from '@app/types/uiSchema.ts';
import type { ReactNode } from 'react';

interface BaseComponentProps {
  id: string;
  label: string;
  tippy?: string | ReactNode;
  visible?: () => boolean;
}

type DropdownComponent = {
  type: 'Dropdown';
} & DropdownProps &
  BaseComponentProps;

type InputComponent = {
  type: 'Input';
  textArea?: boolean;
} & InputProps &
  BaseComponentProps;

type ToggleComponent = {
  type: 'Toggle';
} & ToggleProps &
  BaseComponentProps;

type ButtonComponent = {
  type: 'Button';
} & ButtonProps &
  BaseComponentProps;

type ColorPickerComponent = {
  type: 'Color';
} & ColorPickerProps &
  BaseComponentProps;
type FontPickerComponent = {
  type: 'Font';
} & FontPickerProps &
  BaseComponentProps;

export type Component =
  | DropdownComponent
  | InputComponent
  | ToggleComponent
  | ButtonComponent
  | ColorPickerComponent
  | FontPickerComponent;

export interface GroupProps {
  id: string;
  groupName?: string;
  visible?: () => boolean;
  components: Component[];
}

export interface SectionProps {
  id: string;
  sectionName: string;
  groups: GroupProps[];
  visible?: () => boolean;
}
