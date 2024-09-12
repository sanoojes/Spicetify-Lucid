import React from 'react';
import { useModal } from '@/context/ModalContext';
import SettingsMenuItem from '@/components/menu/SettingsMenuItem';
import SettingsModal from '@/components/settings/ui/SettingsModal';

const SettingsManager = React.memo(() => {
  const { isOpen, openModal } = useModal('settings');

  return (
    <>
      <SettingsMenuItem cb={openModal} />
      {isOpen && <SettingsModal />}
    </>
  );
});

export default SettingsManager;
