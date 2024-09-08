type DropdownProps = {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
};

type CustomInputProps = {
  name: string;
  type: string;
  step?: number;
  placeholder?: string;
  value: string | number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isURL?: boolean;
  expectURL?: boolean;
};
