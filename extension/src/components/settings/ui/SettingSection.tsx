import React from 'react';
import type { SettingSectionProps } from '@/types/settings';

const SettingSection = ({
  title,
  description,
  children,
}: SettingSectionProps) => {
  return (
    <div className='setting-section'>
      <div className='heading-wrapper'>
        <h3 className='title'>{title}</h3>
        {description && <p className='description'>{description}</p>}
      </div>
      <div className='cards-wrapper'>{children}</div>
    </div>
  );
};

export default SettingSection;
