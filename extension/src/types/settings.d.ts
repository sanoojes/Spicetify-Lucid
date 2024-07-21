export interface SettingItem {
  label: string;
  key: string;
  min: number;
  max: number;
  unit: string;
  default: number;
  tooltip?: string;
  value?: number;
}

export interface SettingSection {
  section: string;
  items: SettingItem[];
}
