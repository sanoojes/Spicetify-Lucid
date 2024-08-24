export const replaceIcons = () => {
  const { Locale } = Spicetify;
  function cleanLabel(label: string): string {
    const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, '').trim();
    return cleanedLabel;
  }
  if (!Locale) return;
  let playlistPlayLabel = (Locale.get('playlist.a11y.play') || '') as string;
  playlistPlayLabel = cleanLabel(playlistPlayLabel);
  let playlistPauseLabel = (Locale.get('playlist.a11y.pause') || '') as string;
  playlistPauseLabel = cleanLabel(playlistPauseLabel);

  const playLabel = Locale.get('play');
  const pauseLabel = Locale.get('pause');

  const browseLabel = Locale.get('browse');

  const addToLikedLabel = Locale.get(
    'web-player.aligned-curation.tooltips.add-to-liked-songs'
  );
  const addToPlaylistLabel = Locale.get(
    'web-player.aligned-curation.tooltips.add-to-playlist'
  );

  const skipForwardLabel = Locale.get('playback-control.skip-forward');
  const skipBackLabel = Locale.get('playback-control.skip-back');

  const friendsActivityLabel = Locale.get('buddy-feed.friend-activity');
  const tracklistPlayLabel = (Locale.get('tracklist.a11y.play') ||
    '') as string;

  const homeBtnLabelOne = Locale.get('view.web-player-home');

  let tracklistPlayLabelOne: string;
  let tracklistPlayLabelTwo: string;
  if (['zh-CN', 'zh-TW', 'am', 'fi'].includes(Locale.getLocale())) {
    [tracklistPlayLabelOne, tracklistPlayLabelTwo] =
      tracklistPlayLabel.split('{1}');
  } else {
    [tracklistPlayLabelOne, tracklistPlayLabelTwo] =
      tracklistPlayLabel.split('{0}');
  }
  tracklistPlayLabelOne = cleanLabel(tracklistPlayLabelOne);
  tracklistPlayLabelTwo = cleanLabel(tracklistPlayLabelTwo);

  const enableRepeatLabel = Locale.get('playback-control.enable-repeat');
  const enableOneRepeatLabel = Locale.get('playback-control.enable-repeat-one');
  const disableRepeatLabel = Locale.get('playback-control.disable-repeat');

  const ButtonStyles = document.createElement('style');
  ButtonStyles.innerHTML = `
.main-repeatButton-button[aria-checked="false"],
.player-controls__right button[aria-label*="${enableRepeatLabel}"]  span{
  -webkit-mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  background-color: var(--spice-subtext);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="mixed"],
.player-controls__right button[aria-label*="${disableRepeatLabel}"] span {
  -webkit-mask-image: var(--repeat-mixed-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-mixed.svg"));
  mask-image: var(--repeat-mixed-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-mixed.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="true"],
.player-controls__right button[aria-label*="${enableOneRepeatLabel}"] span {
  -webkit-mask-image: var(--repeat-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat.svg"));
  mask-image: var(--repeat-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.player-controls__right button[aria-label*="${disableRepeatLabel}"] svg,
.player-controls__right button[aria-label*="${enableRepeatLabel}"] svg {
  transform: scale(1.15);
}

.player-controls__right button[aria-label*="${disableRepeatLabel}"] svg,
.player-controls__right button[aria-label*="${enableRepeatLabel}"] svg {
  visibility: hidden;
  opacity: 0;
}

.main-repeatButton-button {
  transform: scale(0.65) !important;
}

.player-controls__buttons button[aria-label*="${playLabel}"] span,
.main-playButton-button[aria-label*="${playLabel}"],
.main-playButton-PlayButton>button[aria-label*="${playLabel}"],
.main-playPauseButton-button[aria-label="${playLabel}"],
.main-trackList-rowPlayPauseButton[aria-label*="${playLabel}"],
.main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelOne}"][aria-label*="${tracklistPlayLabelTwo}"],
.main-playButton-PlayButton>button[aria-label*="${playlistPlayLabel}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
  mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
}

.main-playButton-button[aria-label*="${pauseLabel}"],
.main-playButton-PlayButton>button[aria-label*="${pauseLabel}"],
.main-playPauseButton-button[aria-label*="${pauseLabel}"],
.player-controls__buttons button[aria-label*="${pauseLabel}"] span,
.main-trackList-rowPlayPauseButton[aria-label*="${pauseLabel}"],
.main-trackList-rowImagePlayButton[aria-label*="${pauseLabel}"],
.main-playButton-PlayButton>button[aria-label*="${playlistPauseLabel}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
  mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
}

.Root__globalNav button:is([aria-label="Clear search field"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${browseLabel}"] path {
  display: none !important;
}

button[aria-label="${browseLabel}"] svg {
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}

.main-repeatButton-button[aria-label="${enableRepeatLabel}"],
.main-repeatButton-button[aria-label="${disableRepeatLabel}"],
.main-repeatButton-button[aria-label="${enableOneRepeatLabel}"],
{
scale: 0.75 !important;
background-color: var(--spice-subtext) !important;
color: var(--spice-subtext);

svg {
  display: none;
}
}

.player-controls__buttons button[aria-label*="${playLabel}"] span,
.player-controls__buttons button[aria-label*="${pauseLabel}"] span{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  aspect-ratio: 1/1;
}

.main-playPauseButton-button,
button[aria-label="${addToLikedLabel}"],
button[aria-label="${addToPlaylistLabel}"],
.player-controls button[aria-label="${skipBackLabel}"],
.player-controls button[aria-label="${skipForwardLabel}"]
{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  min-height: 1rem;
  min-width: 1rem;
  aspect-ratio: 1/1;
  border-radius: 0 !important;
  border: none !important;
  height: var(--button-size, 24px);
  width: var(--button-size, 24px);
  
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}

.player-controls__buttons button[aria-label*="${playLabel}"] span svg,
.player-controls__buttons button[aria-label*="${pauseLabel}"] span svg {
  display: none;
  visibility: hidden;
}

.player-controls button[aria-label="${skipBackLabel}"] span,
.player-controls button[aria-label="${skipForwardLabel}"] span {
  opacity: 0;
}

.player-controls button[aria-label="${skipBackLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--prev-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg"));
  mask-image: var(--prev-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg"));
}

.player-controls button[aria-label="${skipForwardLabel}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--next-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg"));
  mask-image: var(--next-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg"));
}

button[aria-label="${friendsActivityLabel}"]>path {
  display: none;
}

.main-actionButtons>div>button[aria-label="${friendsActivityLabel}"] svg,
.main-actionButtons>button[aria-label="${friendsActivityLabel}"] svg {
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: var(--people-team-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg"));
  mask-image: var(--people-team-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg"));
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"] svg,
button[aria-label="${homeBtnLabelOne}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg"));
  -webkit-mask-image: var(--home-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg"));
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg,
.main-globalNav-navLinkActive[aria-label="${homeBtnLabelOne}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-filled-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg"));
  -webkit-mask-image: var(--home-filled-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg"));
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${homeBtnLabelOne}"].active svg {
  path {
display: none !important;
  }

  background-color: var(--spice-accent) !important;
}

#context-menu ul[aria-label*="Add to playlist menu"] {
  p {
max-width: 10rem;
  }
}
`;
  document.head.appendChild(ButtonStyles);
};
