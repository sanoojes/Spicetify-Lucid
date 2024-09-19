import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useBodyClass } from '@/hooks/useBodyClass';

const GrainManager = () => {
  const { grainEffect } = useSettingsStore();

  useBodyClass(`grain-${grainEffect}`);

  return <div id='grainEffect' data-grainEffect={grainEffect} />;
};

export default GrainManager;
