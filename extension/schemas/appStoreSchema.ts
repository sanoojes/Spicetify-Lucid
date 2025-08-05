import CSSFilterSchema from '@schemas/cssFilterSchema.ts';
import { boundedNumber } from '@utils/schema.ts';
import z from 'zod';

export const ColorStateSchema = z.object({
  mode: z.enum(['default', 'dynamic', 'custom']),
  accentColor: z.string(),
  isTinted: z.boolean(),
  isDark: z.boolean(),
});

export const BodyClassStateSchema = z.object({
  hideHomeHeader: z.boolean(),
  newHome: z.boolean(),
  flexyHome: z.boolean(),
});

export const BackgroundStateSchema = z.object({
  mode: z.enum(['solid', 'static', 'animated']),
  options: z.object({
    filter: CSSFilterSchema,
    imageMode: z.enum(['custom', 'player', 'page']),
    imageSrc: z.string().nullable(),
    color: z.string(),
    autoStopAnimation: z.boolean(),
  }),
});

export const FontStateSchema = z.object({
  family: z.string(),
  variants: z.array(z.string()),
});

export const BorderStateSchema = z.object({
  color: z.string(),
  hoverColor: z.string(),
  thickness: boundedNumber({ name: 'Thickness', min: 0, max: 10 }),
  style: z.enum([
    'none',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
  ]),
});

export const UIPreferencesSchema = z.object({
  titleFont: FontStateSchema,
  bodyFont: FontStateSchema,
  border: BorderStateSchema,
  windowControlHeight: boundedNumber({
    name: 'Window Control Height',
    min: 0,
    max: 512,
  }),
});

export const UnderMainViewStateSchema = z.object({
  type: z.enum(['default', 'playing', 'custom-img', 'custom-color', 'none']),
  isScrolling: z.boolean(),
  isScaling: z.boolean(),
  filter: CSSFilterSchema,
  customUrl: z.string(),
  customColor: z.string(),
});

export const SettingModalSchema = z.object({
  accessPoint: z.enum(['menu', 'nav']),
  isFloating: z.boolean(),
  floatingPosition: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export const PlayerStyleSchema = z.object({
  height: boundedNumber({ name: 'Player height', min: 0, max: 512 }),
  width: boundedNumber({ name: 'Player width', min: 0, max: 100 }),
  bgColor: z.string().nullable(),
  bgOpacity: boundedNumber({ name: 'Background opacity', min: 0, max: 100 }),
  paddingX: boundedNumber({ name: 'Horizontal padding', min: 0, max: 256 }),
  borderRadius: boundedNumber({ name: 'Border radius', min: 0, max: 256 }),
  coverArtRadius: boundedNumber({ name: 'Cover art radius', min: 0, max: 256 }),
  backdropFilter: CSSFilterSchema,
});

export const NextSongCardStateSchema = z.object({
  show: z.boolean(),
  removeNextUp: z.boolean(),
  isFloating: z.boolean(),
  height: boundedNumber({ name: 'Next Song Card Height', min: 0, max: 512 }),
  coverArtSize: boundedNumber({ name: 'Next Song Card Cover Art Size', min: 0, max: 512 }),
  paddingX: boundedNumber({ name: 'Next Song Card Padding X', min: 0, max: 256 }),
  paddingY: boundedNumber({ name: 'Next Song Card Padding Y', min: 0, max: 256 }),
  position: z.enum(['left', 'right']),
});

export const PlayerStateSchema = z.object({
  mode: z.enum(['compact', 'default']),
  isFloating: z.boolean(),
  autoHide: z.boolean(),
  hideExtraIcon: z.boolean(),
  defaultStyle: PlayerStyleSchema,
  compactStyle: PlayerStyleSchema,
  nextSongCard: NextSongCardStateSchema,
});

export const PageStateSchema = z.object({
  mode: z.enum(['card', 'compact-card', 'compact', 'default']),
  coverMode: z.enum(['hidden', 'as-bg', 'default']),
  homeCardGap: z.number(),
  panelGap: z.number(),
});

const AutoHideBaseStateSchema = z.object({
  autoHide: z.boolean(),
  hoverTargetWidth: boundedNumber({ name: 'Hover Width', min: 4, max: 512 }),
});

export const LibraryStateSchema = AutoHideBaseStateSchema.extend({});
export const GlobalNavStateSchema = AutoHideBaseStateSchema.extend({
  floating: z.boolean(),
});
export const RightSidebarStateSchema = AutoHideBaseStateSchema.extend({
  mode: z.enum(['compact', 'default']),
  positionX: z.enum(['right', 'left']),
  positionY: z.enum(['bottom', 'top']),
});

export const AppStateSchema = z.object({
  color: ColorStateSchema,
  bg: BackgroundStateSchema,
  umv: UnderMainViewStateSchema,
  page: PageStateSchema,
  bodyClass: BodyClassStateSchema,
  settingModal: SettingModalSchema,
  uiPreferences: UIPreferencesSchema,
  player: PlayerStateSchema,
  library: LibraryStateSchema,
  globalNav: GlobalNavStateSchema,
  rightSidebar: RightSidebarStateSchema,
});
