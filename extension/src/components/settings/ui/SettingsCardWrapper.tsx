import React, { type ReactNode } from 'react';

const SettingsCardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='cards-wrapper'>{children}</div>
    </>
  );
};

export default SettingsCardWrapper;
