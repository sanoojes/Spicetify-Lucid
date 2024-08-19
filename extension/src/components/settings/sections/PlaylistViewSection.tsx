import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import type { PlaylistViewMode } from '@/types/settings';
import { useSettingsStore } from '@/store/settingsStore';

const PlaylistViewSection = () => {
  const playlistViewOptions: { label: string; value: PlaylistViewMode }[] = [
    { label: 'Default', value: 'default' },
    { label: 'compact', value: 'compact' },
    { label: 'card', value: 'card' },
  ];

  const { playlistViewMode, setPlaylistViewMode } = useSettingsStore();

  const handleSelect = (value: PlaylistViewMode) => {
    setPlaylistViewMode(value);
  };

  return (
    <div>
      <SettingsCard title='Set Playlist View' selectedValue={playlistViewMode}>
        <Dropdown
          options={playlistViewOptions}
          onSelect={handleSelect}
          selectedValue={playlistViewMode}
        />
      </SettingsCard>
    </div>
  );
};

export default PlaylistViewSection;
