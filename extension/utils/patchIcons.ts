import { createElement } from '@utils/dom/createElement.ts';
import { fetchAndCache } from '@utils/fetchAndCache.ts';
import { ICON_CSS_CACHE_KEY, ICON_CSS_STYLE_ID, ICON_CSS_URLS } from '@app/constant.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { showNotification } from '@utils/showNotification.ts';

type LocaleKeys =
  | 'home'
  | 'searchPlaylist'
  | 'search'
  | 'play'
  | 'pause'
  | 'skipBack'
  | 'enableRepeat'
  | 'enableRepeatOne'
  | 'disableRepeat'
  | 'skipForward'
  | 'friendActivity'
  | 'whatsNew'
  | 'browse'
  | 'close'
  | 'closeBtn'
  | 'download'
  | 'fullscreen'
  | 'moreContext'
  | 'copyTrackLink'
  | 'openMiniPlayer'
  | 'downloadContext'
  | 'disableShuffle'
  | 'enableShuffle'
  | 'disableShuffleSpecific'
  | 'enableShuffleSpecific'
  | 'disableShuffleGeneric'
  | 'enableShuffleGeneric'
  | 'duration'
  | 'queue'
  | 'createPlaylist'
  | 'createButton'
  | 'enableSmartShuffleSpecific'
  | 'enableSmartShuffleGeneric';
type Locales = {
  [key in LocaleKeys]: string;
};

async function mountIconVariables() {
  ICON_CSS_URLS.forEach((url) => {
    const existingLink = document.querySelector(`link[href="${url}"]`);

    if (!existingLink) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      document.head.appendChild(linkElement);
    } else {
      console.debug(`Link element with URL "${url}" already exists, skipping.`); // Optional debug log
    }
  });
}

export const patchIcons = () => {
  try {
    mountIconVariables();

    const g = (value: string, clean = false) =>
      clean
        ? LocaleAPI.get(value)
            .replace(/[{0}{1}«»”“]/g, '')
            .trim()
        : LocaleAPI.get(value);

    const LocaleAPI = Spicetify.Locale;
    if (!LocaleAPI) return;

    const locales: Locales = {
      home: g('view.web-player-home'),
      browse: g('browse'),
      pause: g('pause'),
      play: g('play'),
      close: g('close'),
      openMiniPlayer: g('miniplayer.open'),
      createPlaylist: g('contextmenu.create-playlist'),
      createButton: g('web-player.your-library-x.create.button-label'),
      fullscreen: g('npv.full-screen'),
      closeBtn: g('close_button_action'),
      duration: g('sort.duration'),
      search: g('navbar.search'),
      queue: g('playback-control.queue'),
      searchPlaylist: g('playlist.search_in_playlist'),
      download: g('download.download'),
      copyTrackLink: g('context-menu.copy-track-link'),
      moreContext: g('more.label.context', true),
      downloadContext: g('contextmenu.download'),
      friendActivity: g('buddy-feed.friend-activity'),
      whatsNew: g('web-player.whats-new-feed.button-label'),
      skipForward: g('playback-control.skip-forward'),
      skipBack: g('playback-control.skip-back'),
      disableShuffle: g('playback-control.disable-shuffle'),
      enableShuffle: g('playback-control.enable-shuffle'),
      disableShuffleGeneric: g('web-player.smart-shuffle.button-disable-shuffle-generic'),
      disableShuffleSpecific: g('web-player.smart-shuffle.button-disable-shuffle-specific', true),
      enableShuffleGeneric: g('web-player.smart-shuffle.button-enable-shuffle-generic'),
      enableShuffleSpecific: g('web-player.smart-shuffle.button-enable-shuffle-specific', true),
      enableSmartShuffleSpecific: g(
        'web-player.smart-shuffle.button-enable-smart-shuffle-specific',
        true
      ),
      enableSmartShuffleGeneric: g('web-player.smart-shuffle.button-enable-smart-shuffle-generic'),
      enableRepeat: g('playback-control.enable-repeat'),
      enableRepeatOne: g('playback-control.enable-repeat-one'),
      disableRepeat: g('playback-control.disable-repeat'),
    };

    lazyLoadStyleById('lucid-icon-patch').innerHTML = `
 .main-yourLibraryX-navLink[aria-label="${locales.home}"] path,
 button[aria-label="${locales.home}"] path {
 	d: var(--home-icon-24);
 }
 .main-yourLibraryX-navLink[aria-label="${locales.home}"].active path,
 .main-globalNav-navLinkActive[aria-label="${locales.home}"] path {
 	d: var(--home-filled-icon-24);
 }
 .main-topBar-buddyFeed[aria-label*="${locales.whatsNew}"] svg,
 .main-topBar-buddyFeed[aria-label*="${locales.friendActivity}"] svg {
 	transform: scale(1.1);
 }
 
 .main-topBar-buddyFeed[aria-label*="${locales.friendActivity}"] svg path {
 	d: var(--people-icon);
 }
 .main-topBar-buddyFeed[aria-label*="${locales.friendActivity}"] .Svg-img-icon-small-textBase path {
 	d: var(--people-filled-icon);
 }
 .main-topBar-buddyFeed[aria-label*="${locales.whatsNew}"] svg path {
 	d: var(--bell-icon);
 }
 .main-topBar-buddyFeed .Svg-img-icon-small[aria-label*="${locales.whatsNew}"] .Svg-img-icon-small-textBase path {
 	d: var(--bell-filled-icon);
 }
 .b7r2WRiu5f9Q99qmyreh .M9l40ptEBXPm03dU3X1k,
 .player-controls__left button[aria-label*="${locales.disableShuffle}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.disableShuffleGeneric}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableShuffle}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableShuffleSpecific}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableShuffleGeneric}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleGeneric}"] path:nth-of-type(n+2),
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleSpecific}"] path:nth-of-type(n+2),
 .Root__globalNav button[aria-label="${locales.browse}"] path:nth-of-type(n + 2) {
 	display: none;
 }
 .Root__globalNav .main-globalNav-navLink.custom-navlink[aria-label*="Marketplace"] path {
 	d: var(--appstore-icon-24);
 	transform: scale(3) !important;
 }
 .Root__globalNav .main-globalNav-navLinkActive.custom-navlink[aria-label*="Marketplace"] path {
 	d: var(--appstore-filled-icon-24);
 }
 .Root__globalNav .IconContainer-leading:first-child svg path,
 .Root__globalNav .IconContainer-leading:has(button[aria-label*="${locales.search}"]) div > svg path {
 	d: var(--search-icon-24);
 }
 .Root__globalNav button[aria-label="${locales.browse}"] path {
 	d: var(--compass-icon-24);
 }
 .Root__globalNav button[aria-label="${locales.browse}"].j4xi27AJ3oy5qZ8CGhhQ path {
 	d: var(--compass-filled-icon-24);
 }
 .player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"] path,
 .player-controls__buttons .player-controls__left button[aria-label*="${locales.skipBack}"] path {
   fill: var(--clr-on-surface);
   d: var(--prev-icon)}
 
 .player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"] path,
 .player-controls__buttons .player-controls__right button[aria-label="${locales.skipForward}"] path {
   fill: var(--clr-on-surface);
   d: var(--next-icon)}
 
 .player-controls__left button[aria-label*="${locales.disableShuffle}"],
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"],
 .player-controls__left button[aria-label*="${locales.disableShuffleGeneric}"],
 .player-controls__left button[aria-label*="${locales.enableShuffle}"],
 .player-controls__left button[aria-label*="${locales.enableShuffleSpecific}"],
 .player-controls__left button[aria-label*="${locales.enableShuffleGeneric}"],
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleGeneric}"],
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleSpecific}"],
 .player-controls__right button[aria-label="${locales.enableRepeat}"],
 .player-controls__right button[aria-label="${locales.enableRepeatOne}"],
 .player-controls__right button[aria-label="${locales.disableRepeat}"] {
 	--encore-graphic-size-decorative-smaller: 22px;
 	--encore-control-size-smaller: 22px}
 
 .player-controls__right button[aria-label="${locales.enableRepeat}"] path {
 	d: var(--disable-repeat-icon)}
 .player-controls__right button[aria-label="${locales.enableRepeatOne}"] path {
   d: var(--repeat-icon)}
 
 .player-controls__right button[aria-label="${locales.disableRepeat}"] path {
   d: var(--repeat-one-icon)}
 
 .player-controls__left button[aria-label*="${locales.enableShuffle}"] path,
 .player-controls__left button[aria-label*="${locales.enableShuffleSpecific}"] path,
 .player-controls__left button[aria-label*="${locales.enableShuffleGeneric}"] path {
 	d: var(--disable-shuffle-icon)}
 
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .player-controls__left button[aria-label*="${locales.disableShuffle}"] path,
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleGeneric}"] path,
 .player-controls__left button[aria-label*="${locales.enableSmartShuffleSpecific}"] path {
 	d: var(--shuffle-icon)}
 
 .player-controls__left button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .player-controls__left button[aria-label*="${locales.disableShuffleGeneric}"] path {
 	d: var(--smart-shuffle-icon)}
 
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableShuffle}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableShuffleSpecific}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableShuffleGeneric}"] path {
   d: var(--disable-shuffle-icon-24, var(--disable-shuffle-icon))}
 
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffle}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableSmartShuffleGeneric}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.enableSmartShuffleSpecific}"] path {
   d: var(--shuffle-icon-24, var(--shuffle-icon))}
 
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffleSpecific}"] path,
 .main-actionBar-ActionBarRow button[aria-label*="${locales.disableShuffleGeneric}"] path {
   d: var(--smart-shuffle-icon-24, var(--smart-shuffle-icon))}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.play}"] svg[viewBox="0 0 24 24"] path {
   d: var(--play-icon-24, var(--play-icon))}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.pause}"] svg[viewBox="0 0 24 24"] path {
   d: var(--pause-icon-24, var(--pause-icon))}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.play}"] svg[viewBox="0 0 16 16"] path {
   d: var(--play-icon)}
 
 .ix_8kg3iUb9VS5SmTnBY button[aria-label*="${locales.pause}"] svg[viewBox="0 0 16 16"] path {
   d: var(--pause-icon)}
 
 .player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"],
 .player-controls__buttons .player-controls__right button[aria-label="${locales.skipForward}"],
 .player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"],
 .player-controls__buttons .player-controls__left button[aria-label*="${locales.skipBack}"] {
 	--encore-graphic-size-decorative-smaller: 22px;
 	--encore-control-size-smaller: 22px;
 	color: var(--subtext-color)}
 
 .player-controls__buttons button[aria-label="${locales.play}"] path {
   fill: var(--clr-on-surface);
   d: var(--play-icon)}
 
 
 .player-controls__buttons button[aria-label="${locales.pause}"] path {
   fill: var(--clr-on-surface);
   d: var(--pause-icon)}
 
 .player-controls__buttons > button,
 .player-controls__buttons button[data-testid=control-button-playpause] { --encore-graphic-size-decorative-smaller: 1.5rem; --encore-control-size-smaller: 1.5rem; }
 .player-controls__buttons button[data-testid=control-button-playpause],
 .player-controls__buttons button[data-testid=control-button-playpause]:hover,
 .player-controls__buttons button[data-testid=control-button-playpause] span:hover,
 .player-controls__buttons button[data-testid=control-button-playpause] span { background: none !important; }
 
 .x-downloadButton-DownloadButton button[aria-label="${locales.download}"] path,
 .x-downloadButton-DownloadButton button[aria-label="${locales.downloadContext}"] path {
   d: var(--download-icon-24)}
   
 svg path[d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"],
 .Root__right-sidebar button[aria-label*="${locales.moreContext}"] path{
   d: var(--more-horizontal-icon)}
 
 .main-actionBar-ActionBar button[aria-label*="${locales.moreContext}"] path {
   d: var(--more-horizontal-icon-24)}
 
 x-filterBox-expandButton[aria-label*="${locales.search}"] path,
 x-filterBox-expandButton[aria-label*="${locales.searchPlaylist}"] path,
 .x-filterBox-searchIcon path {
   d: var(--search-icon)}
 
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 16 16"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 16 16"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 16 16"] path{
   d: var(--share-icon)}
 
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 24 24"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 24 24"] path,
 button[aria-label="${locales.copyTrackLink}"] svg[viewBox="0 0 24 24"] path{
   d: var(--share-icon-24)}
 
 svg path[d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"],
 button[aria-controls="sort-and-view-picker"] path,
 .x-sortBox-sortDropdown path {
   d: var(--text-bullet-list-icon)}
 
 svg path[d="M15.5 13.5H.5V12h15v1.5zm0-4.75H.5v-1.5h15v1.5zm0-4.75H.5V2.5h15V4z"]{
   d: var(--list-icon)}
 
 div[data-testid="PanelHeader_CloseButton"] button path,
 .Root__right-sidebar button[aria-label="${locales.closeBtn}"] path,
 .Root__right-sidebar button[aria-label="${locales.close}"] path{
   d: var(--dismiss-icon)}
 
 .main-trackList-trackListRowGrid button[aria-label="${locales.duration}"] path{
   d: var(--clock-icon)}
 
 button[aria-label="${locales.createPlaylist}"] path,
 button[aria-label="${locales.createButton}"] path,
 svg path[d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"]{
   d: var(--add-icon)}
 
 svg path[d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"],
 button[data-testid="fullscreen-mode-button"] path,
 button[aria-label="${locales.fullscreen}"] path{
   d: var(--arrow-maximize-icon);
 }
 
 svg path[d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"],
 button[data-testid="control-button-queue"] path,
 button[aria-label="${locales.queue}"] path{
   /* d: var(--queue-icon); */ /* TODO: add new queue icon */
 }
 
 
 button[aria-label="${locales.openMiniPlayer}"] path,
 button[data-testid="pip-toggle-button"] path{
   d: var(--pip-icon);
 }
 `;
  } catch (error) {
    console.error('Error patching icons.', error);
    showNotification('Error patching icons.', true, 5000);
  }
};
