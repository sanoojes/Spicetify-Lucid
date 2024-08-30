import React from 'react';
import type { SettingCardProps } from '@/types/settingTypes';

const SettingsCard = ({
  title,
  tooltip,
  selectedValue,
  children,
}: SettingCardProps) => {
  return (
    <div className='card'>
      <div className='title-container'>
        <div className='title-wrapper'>
          {title && <h5 className='title'>{title}</h5>}
          {tooltip && (
            <div className='tooltip-container'>
              <div className='tooltip'>
                <span className='tooltip-icon'>
                  <svg
                    role='img'
                    aria-label='question mark icon'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12 6.477 2 12 2Zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333 0 4.595 3.738 8.333 8.333 8.333 4.595 0 8.333-3.738 8.333-8.333 0-4.595-3.738-8.333-8.333-8.333ZM12 15.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-8.75a2.75 2.75 0 0 1 2.75 2.75c0 1.01-.297 1.574-1.051 2.359l-.169.171c-.622.622-.78.886-.78 1.47a.75.75 0 0 1-1.5 0c0-1.01.297-1.574 1.051-2.359l.169-.171c.622-.622.78-.886.78-1.47a1.25 1.25 0 0 0-2.493-.128l-.007.128a.75.75 0 0 1-1.5 0A2.75 2.75 0 0 1 12 6.75Z'
                      fill='currentColor'
                    />
                  </svg>
                </span>
                <span className='tooltip-content'>{tooltip}</span>
              </div>
            </div>
          )}
        </div>
        {selectedValue && (
          <p className='selected-value'>Selected: {selectedValue}</p>
        )}
      </div>
      <div className='children-wrapper'>{children}</div>
    </div>
  );
};

export default SettingsCard;