export type Release = {
	tag_name: string;
	html_url: string;
	body: string;
};

export type ReleaseData = {
	isLoading: boolean;
	error: Error | null;
	releases: Release[] | null;
};

export type ChangeLogProps = {
	releases: Release[] | null;
	isLoading: boolean;
	error: Error | null;
	currentVersion?: string;
};
