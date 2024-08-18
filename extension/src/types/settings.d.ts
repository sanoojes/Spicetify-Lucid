import type { ReactNode } from 'react';

type SettingSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

type SettingCardProps = {
  title?: string | null;
  tooltip?: string;
  selectedValue?: string;
  children: ReactNode;
};

type SettingSections = {
  key: string;
  title: string;
  description?: string;
  content?: ReactNode;
}[];
