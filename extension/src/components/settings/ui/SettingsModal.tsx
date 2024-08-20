import React from 'react';
import Modal from '@/components/modal/Modal';
import SettingSection from '@/components/settings/ui/SettingSection';
import BackgroundSection from '@/components/settings/sections/BackgroundSettingsSection';
import type { SettingSectionData } from '@/types/settingTypes';
import ResetSettingsSection from '@/components/settings/sections/ResetSettingsSection';
import FontSection from '@/components/settings/sections/FontSettingsSection';
import PlaylistViewSettingsSection from '@/components/settings/sections/PlaylistViewSettingsSection';
import GrainSection from '@/components/settings/sections/GrainSettingsSection';

const SettingsModal = React.memo(() => {
  const SETTING_SECTIONS: SettingSectionData = [
    {
      key: 'background',
      title: 'Background',
      description: "Customize your theme's background.",
      content: <BackgroundSection />,
    },
    {
      key: 'grains',
      title: 'Grains',
      description: 'Set your grain texture.',
      content: <GrainSection />,
    },
    {
      key: 'playlistView',
      title: 'Playlist View',
      description: 'Configure your playlist view.',
      content: <PlaylistViewSettingsSection />,
    },
    {
      key: 'font',
      title: 'Font',
      description: 'Select your desired font.',
      content: <FontSection />,
    },
    {
      key: 'reset',
      title: 'Reset Settings',
      description: 'Reset to default settings.',
      content: <ResetSettingsSection />,
    },
  ];
  return (
    <Modal title='Lucid Settings'>
      <div className='sections-container'>
        {SETTING_SECTIONS.map((section) => (
          <div className='section-wrapper' key={section.key} id={section.key}>
            <SettingSection
              title={section.title}
              description={section.description}
            >
              {section.content}
            </SettingSection>
          </div>
        ))}
      </div>
    </Modal>
  );
});

export default SettingsModal;
