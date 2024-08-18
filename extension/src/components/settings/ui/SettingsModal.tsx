import React from 'react';
import Modal from '@/components/modal/Modal';
import SettingSection from '@/components/settings/ui/SettingSection';
import BackgroundSection from '@/components/settings/sections/BackgroundSection';
import ResetSection from '@/components/settings/sections/ResetSection';
import type { SettingSections } from '@/types/settings';
import FontSection from '@/components/settings/sections/FontSection';
import GrainSection from '../sections/GrainSection';
import PlaylistViewSection from '../sections/PlaylistViewSection';

const SettingsModal = () => {
  const SETTING_SECTIONS: SettingSections = [
    {
      key: 'background',
      title: 'Background',
      description:
        'Customize the look and feel of your theme with a variety of backgrounds.',
      content: <BackgroundSection />,
    },
    {
      key: 'font',
      title: 'Font',
      description: 'Set your desired font.',
      content: <FontSection />,
    },
    {
      key: 'grains',
      title: 'Grains',
      description: 'Set your desired grain texture.',
      content: <GrainSection />,
    },
    {
      key: 'playlistView',
      title: 'Playlist View',
      description: 'Set your desired Playlist View.',
      content: <PlaylistViewSection />,
    },
    {
      key: 'reset',
      title: 'Reset Settings',
      description: 'Reset all settings to factory value.',
      content: <ResetSection />,
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
};

export default SettingsModal;
