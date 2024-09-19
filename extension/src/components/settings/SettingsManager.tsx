import React from 'react';
import { useModal } from '@/context/ModalContext';
import SettingsMenuItem from '@/components/menu/SettingsMenuItem';
import SettingsModal from '@/components/settings/ui/SettingsModal';
import { logDebug } from '@/utils/logUtils';

const SettingsManager = React.memo(() => {
  logDebug('Render <SettingsManager />');

  const { isOpen, openModal } = useModal('settings');

  return (
    <>
      <SettingsMenuItem cb={openModal} />
      {isOpen && <SettingsModal />}
    </>
  );
});

export default SettingsManager;
