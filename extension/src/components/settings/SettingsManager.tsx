import React from 'react';
import { useModal } from '@/context/ModalContextProvider';
import SettingsModal from '@/components/settings/ui/SettingsModal';
import { logDebug } from '@/utils/logUtils';
import useSettingsProfileMenu from '@/hooks/useSettingsProfileMenu';
import useGlobalNavSettingsMenu from '@/hooks/useGlobalNavSettingsMenu';
import { isSpotifyV16Above } from '@/constants/constants';

const SettingsManager = React.memo(() => {
  logDebug('Render <SettingsManager />');

  const { isOpen, openModal } = useModal('settings');

  if (isSpotifyV16Above) useGlobalNavSettingsMenu({ onClick: openModal });
  else useSettingsProfileMenu({ onClick: openModal });

  return <>{isOpen && <SettingsModal />}</>;
});

export default SettingsManager;
