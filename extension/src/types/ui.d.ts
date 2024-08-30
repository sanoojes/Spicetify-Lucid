type DropdownProps = {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
};
