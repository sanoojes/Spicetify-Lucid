import React from 'react';
import { useModal } from '@/context/ModalContext';
import SettingsMenuItem from '@/components/menu/SettingsMenuItem';
import SettingsModal from '@/components/settings/ui/SettingsModal';

const MainSettings = React.memo(() => {
  const { isOpen, openModal } = useModal();
  return (
    <>
      <SettingsMenuItem cb={() => openModal()} />
      {isOpen ? <SettingsModal /> : null}
    </>
  );
});

export default MainSettings;
