import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';
import TransparentWindowControl from '@/components/windowControls/TransparentWindowControl';

const WindowControlsManager = React.memo(() => {
  const { isWindows } = useLucidStore();

  return (
    <>
      {isWindows ? (
        <div
          id='transperent-controls-container'
          className='transperent-controls-container'
          style={{ containerType: 'normal' }}
        >
          <TransparentWindowControl />
        </div>
      ) : null}
    </>
  );
});

export default WindowControlsManager;
