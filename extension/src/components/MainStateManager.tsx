import React from 'react';
import { useFontManager } from '@/components/font/FontManager';
import ColorManager from '@/components/colors/ColorManager';
import GrainManager from '@/components/grain/GrainManager';
import { logDebug } from '@/utils/logUtils';
import GlobalNavManager from '@/components/nav/GlobalNavManager';
import usePlaybarManager from '@/hooks/usePlaybarManager';
import mountUnderMainViewWatcher from '@/hooks/mountUnderMainViewWatcher';
import useArtworkManager from '@/hooks/useArtworkManager';
import { usePathManagement } from '@/utils/pathUtils';

/**
 * Manages state for the whole theme
 */
const MainStateManager = React.memo(() => {
  logDebug('Render <MainStateManager />');

  usePathManagement();

  useFontManager();
  usePlaybarManager();

  mountUnderMainViewWatcher();

  useArtworkManager();

  return (
    <>
      <ColorManager />
      <GrainManager />
      <GlobalNavManager />
    </>
  );
});

export default MainStateManager;
