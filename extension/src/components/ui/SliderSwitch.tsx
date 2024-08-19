import React from 'react';

type SliderSwitchProps = {
  currentValue: boolean;
  onChange: (value: boolean) => void;
};

const SliderSwitch = ({ onChange, currentValue }: SliderSwitchProps) => {
  const toggleSwtich = () => {
    onChange(!currentValue);
  };

  return (
    <div className='slider-wrapper'>
      <label className='switch'>
        <input type='checkbox' checked={currentValue} onChange={toggleSwtich} />
        <span className='slider round' />
      </label>
    </div>
  );
};

export default SliderSwitch;
