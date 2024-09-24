import React from 'react';
import { useModal } from '@/context/ModalContext';
import SettingsModal from '@/components/settings/ui/SettingsModal';
import { logDebug } from '@/utils/logUtils';
import useSettingsProfileMenu from '@/hooks/useSettingsProfileMenu';
import { useLucidStore } from '@/store/useLucidStore';
import useGlobalNavSettingsMenu from '@/hooks/useGlobalNavSettingsMenu';

const SettingsManager = React.memo(() => {
  logDebug('Render <SettingsManager />');

  const { isSpotifyV16Above } = useLucidStore();
  const { isOpen, openModal } = useModal('settings');

  if (isSpotifyV16Above) useGlobalNavSettingsMenu({ onClick: openModal });
  else useSettingsProfileMenu({ onClick: openModal });

  return <>{isOpen && <SettingsModal />}</>;
});

export default SettingsManager;
