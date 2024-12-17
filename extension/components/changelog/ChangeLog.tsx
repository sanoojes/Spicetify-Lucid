import type { ChangeLogProps } from "@/types/changelog";
import React, { type FC } from "react";

const ChangeLog: FC<ChangeLogProps> = ({ releases, isLoading, error }) => {
	if (isLoading) {
		return <div>Loading release data...</div>;
	}

	if (error) {
		return <div>Error fetching release data: {error.message}</div>;
	}

	if (!releases) {
		return <div>No release data found.</div>;
	}

	return (
		<div className="lucid-changelog" id="lucid-changelog">
			{releases.map((release) => (
				<div key={release.tag_name} className="release">
					<button className="release-button" type="button" onClick={() => window.open(release.html_url, "_blank")}>
						View on GitHub
					</button>
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
					{release.body && <div className="release-content" dangerouslySetInnerHTML={{ __html: release.body }} />}
				</div>
			))}
		</div>
	);
};

export default ChangeLog;
