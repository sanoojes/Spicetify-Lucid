import React from 'react';
import type { SettingCardProps } from '@/types/settings';

const SettingsCard = ({
  title,
  tooltip,
  selectedValue,
  children,
}: SettingCardProps) => {
  return (
    <div className='card'>
      <div className='title-wrapper'>
        {title && <h5 className='title'>{title}</h5>}
        {tooltip && <p className='tooltip'>{tooltip}</p>}
        {selectedValue && (
          <p className='selected-value'>Selected: {selectedValue}</p>
        )}
      </div>
      <div className='children-wrapper'>{children}</div>
    </div>
  );
};

export default SettingsCard;
