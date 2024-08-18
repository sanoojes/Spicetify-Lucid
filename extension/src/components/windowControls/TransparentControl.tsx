import React from 'react';

const TransparentControl = () => {
  const transparentControlRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={transparentControlRef}
      className='lucid-transperent-window-controls'
    />
  );
};

export default TransparentControl;
