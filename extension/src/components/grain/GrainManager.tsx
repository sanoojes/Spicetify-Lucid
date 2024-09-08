import { useSettingsStore } from '@/store/useSettingsStore';
import React, { useEffect } from 'react';

const Grains = () => {
  const { grainEffect } = useSettingsStore();

  useEffect(() => {
    document.body.classList.add(`grain-${grainEffect}`);

    return () => {
      document.body.classList.remove(`grain-${grainEffect}`);
    };
  }, [grainEffect]);

  return <div id='grainEffect' data-grainEffect={grainEffect} />;
};

export default Grains;
