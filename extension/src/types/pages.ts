export type PlaylistBackgroundImageMode = "now-playing" | "inherit" | "none";
export type PlaylistViewMode = "default" | "compact" | "card" | "compact-card";

export type PagesSettings = {
	isScrollMode: boolean;
	backgroundImageMode: PlaylistBackgroundImageMode;
	playlistViewMode: PlaylistViewMode;
};
