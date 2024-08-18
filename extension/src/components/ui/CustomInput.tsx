import React, { type ChangeEvent, type FC } from 'react';

interface CustomInputProps {
  name: string;
  type: string;
  placeholder: string;
  step?: number | undefined;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  type,
  placeholder,
  value,
  step,
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

export default CustomInput;
