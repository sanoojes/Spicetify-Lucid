import Section from "@/components/settings/ui/SettingSection";
import { BACKGROUND_MODE_OPTIONS } from "@/constants/dropdown";
import { addToast } from "@/services/toastService";
import { useImageStore } from "@/store/useImageStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { BackgroundMode } from "@/types/background";
import type { SettingCardMap } from "@/types/settingTypes";
import { isValidUrl } from "@/utils/fontUtils";
import { getStyleInputMap } from "@/utils/getStyleInputMap";
import { logDebug } from "@/utils/logUtils";
import { renderCards } from "@/utils/render/renderCards";
import React, { useEffect, useState } from "react";

const BackgroundSection = () => {
	const {
		backgroundSettings: { mode, styles, customBackgroundOverride },
		colorSettings: { isDynamicColor },
		setBackgroundMode,
		updateBackgroundStyle,
		setIsDynamicColor,
		setCustomBackgroundOverride,
	} = useSettingsStore();

	const { isUseLocalImage, setUseLocalImage, clearSelectedLocalImage, selectedLocalImage, setSelectedLocalImage } =
		useImageStore();

	const [selectedMode, setSelectedMode] = useState<string>(mode);

	const onBackgroundModeChange = (value: string) => {
		setSelectedMode(value);
		setBackgroundMode(value as BackgroundMode);
	};

	const BACKGROUND_SETTINGS_CARDS: SettingCardMap = [
		{
			id: "backgroundOption",
			conditionalRender: true,
			cardProps: {
				title: "Background Option",
				type: "dropdown",
				tooltip: "Select the background mode to customize your background.",
				settings: {
					placeholder: selectedMode,
					selectedValue: selectedMode,
					options: BACKGROUND_MODE_OPTIONS,
					onChange: onBackgroundModeChange,
				},
			},
		},
		...getStyleInputMap<BackgroundMode>(styles, mode, updateBackgroundStyle),
		{
			id: "backgroundCustomImage",
			sectionName: "Custom Background",
			conditionalRender: mode === "static",
			cardProps: {
				title: "Background image",
				type: "input",
				tooltip: (
					<>
						<span>Use a custom URL for the background image.</span>
						<span>Ensure the URL is a valid image link (e.g., .jpg, .png).</span>
						<span>Use "now-playing" for the now playing art image.</span>
						<span>Use "current-page" for the current page art image.</span>
					</>
				),
				settings: {
					type: "text",
					defaultValue: customBackgroundOverride?.url || "",
					label: "Url",
					validation: (value) => isValidUrl(value),
					onChange: (value) => {
						setCustomBackgroundOverride(value);
					},
				},
			},
		},
		{
			id: "backgroundCustomImage",
			conditionalRender: mode === "static",
			cardProps: {
				title: "Use Local Image",
				type: "toggle",
				tooltip: (
					<>
						<p>Import an image from your device to use as the background.</p>
						{selectedLocalImage?.dataURL ? (
							<div>
								<img
									width="20rem"
									src={selectedLocalImage.dataURL}
									alt={`${selectedLocalImage?.fileName} img`}
									style={{
										display: "block",
										width: "20rem",
										borderRadius: "0.5rem",
										border:
											"var(--border-thickness) var(--border-style, solid) var(--border-color, rgba(var(--spice-rgb-text), 0.125))",
									}}
								/>
								{selectedLocalImage?.fileName ? (
									<p>
										File name: <span>{selectedLocalImage.fileName}</span>
									</p>
								) : null}
								{selectedLocalImage?.dateAdded ? (
									<p>
										Date Added: <span>{selectedLocalImage.dateAdded}</span>
									</p>
								) : null}
							</div>
						) : null}
					</>
				),
				settings: {
					checked: isUseLocalImage,
					label: "Enable Local Image",
					onChange: (value: boolean) => {
						if (!value) {
							clearSelectedLocalImage();
						}
						setUseLocalImage(value);
					},
				},
			},
		},
		{
			id: "backgroundCustomImageInput",
			conditionalRender: mode === "static" && isUseLocalImage,
			cardProps: {
				title: "Select Background Image",
				type: "input",
				tooltip: "Choose an image file from your device.",
				settings: {
					type: "file",
					label: "Choose File",
					onChange: (value) => {
						const imgFile = value?.[0];
						if (imgFile) {
							const reader = new FileReader();

							reader.readAsDataURL(imgFile);

							reader.onload = (e) => {
								const dataURL = (e.target?.result || "") as string;
								logDebug("Local Image Data URL:", dataURL);

								addToast(
									<div style={{ display: "flex", alignItems: "center" }}>
										<span style={{ marginRight: "10px" }}>
											Successfully Added Local Image as background from File name:
										</span>
										<span style={{ fontWeight: "bold" }}>{imgFile.name}</span>
									</div>,
								);

								setSelectedLocalImage({
									dataURL: dataURL,
									fileName: imgFile.name || "",
									dateAdded: new Date().toLocaleString(),
								});
							};
						}
					},
				},
			},
		},
		{
			// TODO: add color export and import and change it to 'ColorSection'
			id: "dynamicColorToggle",
			conditionalRender: true,
			cardProps: {
				title: "Dynamic Color",
				type: "toggle",
				tooltip: "Enable dynamic color to adjust colors based on current playing album art.",
				settings: {
					checked: isDynamicColor,
					label: "Dynamic Color Toggle",
					onChange: (value: boolean) => {
						setIsDynamicColor(value);
						if (value) {
							addToast("Enabled Dynamic Color.");
						}
					},
				},
			},
		},
	];

	return (
		<Section title="Background Settings" description="Set your Spotify interface settings.">
			{renderCards(BACKGROUND_SETTINGS_CARDS)}
		</Section>
	);
};

export default BackgroundSection;
