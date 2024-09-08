import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';

const Grains = () => {
  const { grainEffect } = useSettingsStore();

  React.useEffect(() => {
    document.body.classList.add(`grain-${grainEffect}`);

    return () => {
      document.body.classList.remove(`grain-${grainEffect}`);
    };
  }, [grainEffect]);

  return <div id='grainEffect' data-grainEffect={grainEffect} />;
};

export default Grains;
