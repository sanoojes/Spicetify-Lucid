import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import type { PlaylistViewOptions } from '@/types/playlistView';
import { usePlaylistViewContext } from '@/context/PlaylistViewContext';

const PlaylistViewSection = () => {
  const playlistViewOptions: { label: string; value: PlaylistViewOptions }[] = [
    { label: 'Default', value: 'default' },
    { label: 'compact', value: 'compact' },
    { label: 'card', value: 'card' },
  ];

  const { selectedPlaylistView, setSelectedPlaylistView } =
    usePlaylistViewContext();

  const handleSelect = (value: PlaylistViewOptions) => {
    setSelectedPlaylistView(value);
  };

  return (
    <div>
      <SettingsCard
        title='Set Playlist View'
        selectedValue={selectedPlaylistView}
      >
        <Dropdown
          options={playlistViewOptions}
          onSelect={handleSelect}
          selectedValue={selectedPlaylistView}
        />
      </SettingsCard>
    </div>
  );
};

export default PlaylistViewSection;
