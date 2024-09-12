type Release = {
  tag_name: string;
  html_url: string;
  body: string;
};

type ReleaseData = {
  isLoading: boolean;
  error: Error | null;
  releases: Release[] | null;
};

type ChangeLogProps = {
  releases: Release[] | null;
  isLoading: boolean;
  error: Error | null;
  currentVersion?: string;
};
