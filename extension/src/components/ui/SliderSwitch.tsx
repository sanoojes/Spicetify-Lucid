import React from 'react';

type SliderSwitchProps = {
  currentValue: boolean | null;
  onChange: (value: boolean) => void;
};

const SliderSwitch = ({ onChange, currentValue }: SliderSwitchProps) => {
  const [value, setValue] = React.useState<boolean>(currentValue || false);

  const toggleSwtich = () => {
    setValue((prev) => !prev);
  };

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div className='slider-wrapper'>
      <label className='switch'>
        <input type='checkbox' checked={value} onChange={toggleSwtich} />
        <span className='slider round' />
      </label>
    </div>
  );
};

export default SliderSwitch;
