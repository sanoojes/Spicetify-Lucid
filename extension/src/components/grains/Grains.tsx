import { useGrainContext } from '@/context/GrainContext';
import React, { useEffect } from 'react';

const Grains = () => {
  const { selectedGrain } = useGrainContext();

  useEffect(() => {
    document.body.classList.remove(
      'grain-stary',
      'grain-default',
      'grain-none'
    );

    document.body.classList.add(`grain-${selectedGrain}`);

    return () => {
      document.body.classList.remove(`grain-${selectedGrain}`);
    };
  }, [selectedGrain]);

  return <div id='selectedGrain' data-selectedGrain={selectedGrain} />;
};

export default Grains;
