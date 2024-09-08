import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import type { PlaylistImageMode, PlaylistViewMode } from '@/types/settingTypes';
import { useSettingsStore } from '@/store/useSettingsStore';
import SliderSwitch from '@/components/ui/SliderSwitch';

const PlaylistViewSettingsSection = () => {
  const playlistViewOptions: { label: string; value: PlaylistViewMode }[] = [
    { label: 'Default', value: 'default' },
    { label: 'compact', value: 'compact' },
    { label: 'card', value: 'card' },
  ];

  const playlistImageOptions: { label: string; value: PlaylistImageMode }[] = [
    { label: 'none', value: 'none' },
    { label: 'Playlist Art Image', value: 'inherit' },
    { label: 'Now Playing', value: 'now-playing' },
  ];

  const {
    playlistViewMode,
    playlistImageMode,
    setPlaylistViewMode,
    setPlaylistImageMode,
    isScrollMode,
    setIsScrollMode,
  } = useSettingsStore();

  const handlePlaylistViewSelect = (value: PlaylistViewMode) => {
    setPlaylistViewMode(value);
  };

  const handlePlaylistImageModeSelect = (value: PlaylistImageMode) => {
    setPlaylistImageMode(value);
  };

  return (
    <>
      <SettingsCard title='Set View Mode' selectedValue={playlistViewMode}>
        <Dropdown
          options={playlistViewOptions}
          onSelect={handlePlaylistViewSelect}
          selectedValue={playlistViewMode}
        />
      </SettingsCard>
      <SettingsCard
        title='Set Background Image'
        selectedValue={playlistImageMode}
      >
        <Dropdown
          options={playlistImageOptions}
          onSelect={handlePlaylistImageModeSelect}
          selectedValue={playlistImageMode}
        />
      </SettingsCard>
      <SettingsCard title='Scroll Background Image'>
        <SliderSwitch
          currentValue={isScrollMode}
          onChange={(value) => setIsScrollMode(value)}
        />
      </SettingsCard>
    </>
  );
};

export default PlaylistViewSettingsSection;
