import React from 'react';

const TransparentWindowControl = () => {
  const TransparentWindowControlRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={TransparentWindowControlRef}
      className='lucid-transperent-window-controls'
    />
  );
};

export default TransparentWindowControl;
