import { createElement } from '@utils/dom/createElement.ts';

type LocaleKeys =
  | 'home'
  | 'search'
  | 'play'
  | 'pause'
  | 'skip-back'
  | 'enable-repeat'
  | 'enable-repeat-one'
  | 'disable-repeat'
  | 'skip-forward'
  | 'friend-activity'
  | 'whats-new'
  | 'browse'
  | 'disable-shuffle'
  | 'enable-shuffle'
  | 'disable-shuffle-specific'
  | 'enable-shuffle-specific'
  | 'disable-shuffle-generic'
  | 'enable-shuffle-generic'
  | 'enable-smart-shuffle-specific'
  | 'enable-smart-shuffle-generic';
type Locales = {
  [key in LocaleKeys]: string;
};

function getIconStyle() {
  const id = 'lucid-icon-patch';
  let iconStyle = document.getElementById(id);
  if (!iconStyle) {
    iconStyle = createElement('style', { id });
    document.head.appendChild(iconStyle);
  }
  return iconStyle;
}

export const patchIcons = () => {
  const style = getIconStyle();

  function cleanLabel(label: string): string {
    const cleanedLabel = label.replace(/[{0}{1}«»”“]/g, '').trim();
    return cleanedLabel;
  }

  const LocaleAPI = Spicetify.Locale;
  if (!LocaleAPI) return;

  const locales: Locales = {
    home: LocaleAPI.get('view.web-player-home'),
    browse: LocaleAPI.get('browse'),
    pause: LocaleAPI.get('pause'),
    play: LocaleAPI.get('play'),
    search: LocaleAPI.get('navbar.search'),
    'friend-activity': LocaleAPI.get('buddy-feed.friend-activity'),
    'whats-new': LocaleAPI.get('web-player.whats-new-feed.button-label'),
    'skip-forward': LocaleAPI.get('playback-control.skip-forward'),
    'skip-back': LocaleAPI.get('playback-control.skip-back'),
    'disable-shuffle': LocaleAPI.get('playback-control.disable-shuffle'),
    'enable-shuffle': LocaleAPI.get('playback-control.enable-shuffle'),
    'disable-shuffle-generic': LocaleAPI.get(
      'web-player.smart-shuffle.button-disable-shuffle-generic'
    ),
    'disable-shuffle-specific': cleanLabel(
      LocaleAPI.get('web-player.smart-shuffle.button-disable-shuffle-specific')
    ),
    'enable-shuffle-generic': LocaleAPI.get(
      'web-player.smart-shuffle.button-enable-shuffle-generic'
    ),
    'enable-shuffle-specific': cleanLabel(
      LocaleAPI.get('web-player.smart-shuffle.button-enable-shuffle-specific')
    ),
    'enable-smart-shuffle-specific': cleanLabel(
      LocaleAPI.get('web-player.smart-shuffle.button-enable-smart-shuffle-specific')
    ),
    'enable-smart-shuffle-generic': LocaleAPI.get(
      'web-player.smart-shuffle.button-enable-smart-shuffle-generic'
    ),
    'enable-repeat': LocaleAPI.get('playback-control.enable-repeat'),
    'enable-repeat-one': LocaleAPI.get('playback-control.enable-repeat-one'),
    'disable-repeat': LocaleAPI.get('playback-control.disable-repeat'),
  };

  style.innerText = `
.main-yourLibraryX-navLink[aria-label="${locales.home}"] path,
button[aria-label="${locales.home}"] path {
	d: var(--home-icon);
}
.main-yourLibraryX-navLink[aria-label="${locales.home}"].active path,
.main-globalNav-navLinkActive[aria-label="${locales.home}"] path {
	d: var(--home-filled-icon);
}
.main-topBar-buddyFeed[aria-label*="${locales['whats-new']}"] svg,
.main-topBar-buddyFeed[aria-label*="${locales['friend-activity']}"] svg{
	transform: scale(1.1);
}

.main-topBar-buddyFeed[aria-label*="${locales['friend-activity']}"] svg path{
	d: var(--people-icon);
}
.main-topBar-buddyFeed[aria-label*="${
    locales['friend-activity']
  }"] .Svg-img-icon-small-textBase path{
	d: var(--people-filled-icon);
}
.main-topBar-buddyFeed[aria-label*="${locales['whats-new']}"] svg path{
	d: var(--bell-icon);
}
.main-topBar-buddyFeed .Svg-img-icon-small[aria-label*="${
    locales['whats-new']
  }"] .Svg-img-icon-small-textBase path{
	d: var(--bell-filled-icon);
}
.b7r2WRiu5f9Q99qmyreh .M9l40ptEBXPm03dU3X1k,
.player-controls__left button[aria-label*="${locales['disable-shuffle']}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${
    locales['disable-shuffle-specific']
  }"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${
    locales['disable-shuffle-generic']
  }"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${locales['enable-shuffle']}"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${
    locales['enable-shuffle-specific']
  }"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${
    locales['enable-shuffle-generic']
  }"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${
    locales['enable-smart-shuffle-generic']
  }"] path:nth-of-type(n+2),
.player-controls__left button[aria-label*="${
    locales['enable-smart-shuffle-specific']
  }"] path:nth-of-type(n+2),
.Root__globalNav button[aria-label="${locales.browse}"] path:nth-of-child(n + 2) {
	display: none;
}
.Root__globalNav .main-globalNav-navLink.custom-navlink[aria-label*="Marketplace"] path {
	d: var(--appstore-icon);
	transform: translate(0px,0px) scale(3, 3) !important;
}
.Root__globalNav .main-globalNav-navLinkActive.custom-navlink[aria-label*="Marketplace"] path{
	d: var(--appstore-filled-icon);
}
.Root__globalNav .IconContainer-leading:first-child svg path,
.Root__globalNav .IconContainer-leading:has(button[aria-label*="${locales.search}"]) div > svg path {
	d: var(--search-icon);
}
.Root__globalNav button[aria-label="${locales.browse}"] path {
	d: var(--compass-icon);
}
.Root__globalNav button[aria-label="${locales.browse}"].j4xi27AJ3oy5qZ8CGhhQ path {
	d: var(--compass-filled-icon);
}
.player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"] path,
.player-controls__buttons .player-controls__left button[aria-label*="${
    locales['skip-back']
  }"] path {
  fill: var(--clr-on-surface);
  d: var(--prev-icon);
}
.player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"] path,
.player-controls__buttons .player-controls__right button[aria-label="${
    locales['skip-forward']
  }"] path {
  fill: var(--clr-on-surface);
  d: var(--next-icon);
}
.player-controls__left button[aria-label*="${locales['disable-shuffle']}"],
.player-controls__left button[aria-label*="${locales['disable-shuffle-specific']}"],
.player-controls__left button[aria-label*="${locales['disable-shuffle-generic']}"],
.player-controls__left button[aria-label*="${locales['enable-shuffle']}"],
.player-controls__left button[aria-label*="${locales['enable-shuffle-specific']}"],
.player-controls__left button[aria-label*="${locales['enable-shuffle-generic']}"],
.player-controls__left button[aria-label*="${locales['enable-smart-shuffle-generic']}"],
.player-controls__left button[aria-label*="${locales['enable-smart-shuffle-specific']}"],
.player-controls__right button[aria-label="${locales['enable-repeat']}"],
.player-controls__right button[aria-label="${locales['enable-repeat-one']}"],
.player-controls__right button[aria-label="${locales['disable-repeat']}"]{
	--encore-graphic-size-decorative-smaller: 22px;
	--encore-control-size-smaller: 22px;
}
.player-controls__right button[aria-label="${locales['enable-repeat']}"] path {
	d: var(--repeat-icon);
}
.player-controls__right button[aria-label="${locales['enable-repeat-one']}"] path {
	d: var(--repeat-one-icon);
}
.player-controls__right button[aria-label="${locales['disable-repeat']}"] path {
	d: var(--disable-repeat-icon);
}
.player-controls__left button[aria-label*="${locales['enable-shuffle']}"] path,
.player-controls__left button[aria-label*="${locales['enable-shuffle-specific']}"] path,
.player-controls__left button[aria-label*="${locales['enable-shuffle-generic']}"] path{
	d: var(--disable-shuffle-icon);
}

.player-controls__left button[aria-label*="${locales['enable-smart-shuffle-generic']}"] path,
.player-controls__left button[aria-label*="${locales['enable-smart-shuffle-specific']}"] path{
	d: var(--shuffle-icon);
}

.player-controls__left button[aria-label*="${locales['disable-shuffle']}"] path,
.player-controls__left button[aria-label*="${locales['disable-shuffle-specific']}"] path,
.player-controls__left button[aria-label*="${locales['disable-shuffle-generic']}"] path{
	d: var(--smart-shuffle-icon);
}
  
.player-controls__buttons .player-controls__right button[data-testid="control-button-skip-forward"],
.player-controls__buttons .player-controls__right button[aria-label="${locales['skip-forward']}"],
.player-controls__buttons .player-controls__left button[data-testid="control-button-skip-back"],
.player-controls__buttons .player-controls__left button[aria-label*="${locales['skip-back']}"]{
	--encore-graphic-size-decorative-smaller: 22px;
	--encore-control-size-smaller: 22px;
	color: var(--subtext-color);
}
.player-controls__buttons button[aria-label="${locales.play}"] path {
  fill: var(--clr-on-surface);
  d: var(--play-icon);
}

.player-controls__buttons button[aria-label="${locales.pause}"] path {
  fill: var(--clr-on-surface);
  d: var(--pause-icon);
}
.player-controls__buttons > button,
.player-controls__buttons button[data-testid=control-button-playpause] { --encore-graphic-size-decorative-smaller: 1.5rem; --encore-control-size-smaller: 1.5rem; }
.player-controls__buttons button[data-testid=control-button-playpause],
.player-controls__buttons button[data-testid=control-button-playpause]:hover,
.player-controls__buttons button[data-testid=control-button-playpause] span:hover,
.player-controls__buttons button[data-testid=control-button-playpause] span { background: none !important; }`;
};
