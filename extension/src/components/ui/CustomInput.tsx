import React, { type ChangeEvent, type FC } from 'react';

interface CustomInputProps {
  name: string;
  type: string;
  step?: number;
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  step,
  type,
  value,
  placeholder,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <input
      type={type}
      name={name}
      step={step}
      placeholder={placeholder}
      value={value !== undefined ? value.toString() : ''}
      className='input'
      onChange={handleChange}
    />
  );
};

export default React.memo(CustomInput);
