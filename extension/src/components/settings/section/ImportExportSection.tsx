import Card from "@/components/settings/ui/Card";
import CardWrapper from "@/components/settings/ui/CardWrapper";
import Section from "@/components/settings/ui/SettingSection";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { addToast } from "@/services/toastService";
import { useSettingsStore } from "@/store/useSettingsStore";
import { logError } from "@/utils/logUtils";
import React, { useRef, useState } from "react";

const ImportExportSection = () => {
	const { exportSettings, importSettings } = useSettingsStore();
	const [isImportVisible, setIsImportVisible] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleImportToggle = () => {
		setIsImportVisible((prev) => !prev);
		if (isImportVisible) {
			if (inputRef.current) inputRef.current.value = "";
		}
	};

	const handleImport = () => {
		const jsonString = inputRef.current?.value.trim() || "{}";
		if (jsonString === "{}") {
			addToast("Please enter valid JSON settings.", true);
			return;
		}

		importSettings(jsonString);
	};

	const handleExport = () => {
		const settings = exportSettings();
		navigator.clipboard
			.writeText(settings)
			.then(() => {
				addToast("Settings exported to clipboard!");
			})
			.catch((err) => {
				logError("Failed to copy: ", err);
				addToast("Failed to copy settings to clipboard.", true);
			});
	};

	const handlePaste = async () => {
		try {
			const clipboardText = await navigator.clipboard.readText();
			if (inputRef.current) {
				inputRef.current.value = clipboardText;
				handleImport();
			}

			addToast("Clipboard content pasted successfully!");
		} catch (err) {
			logError("Failed to read clipboard: ", err);
			addToast("Failed to read clipboard content.", true);
		}
	};

	return (
		<Section title="Settings Import/Export" description="Manage your settings easily.">
			<CardWrapper>
				<Card
					title="Import and Export Settings"
					type="normal"
					tooltip="Use these buttons to import settings from a JSON file or export your current theme settings to your clipboard."
					style={{ display: "flex", gap: "0.5rem" }}>
					<Button onClick={handleExport}>Export</Button>
					<Button onClick={handleImportToggle} variant={isImportVisible ? "danger" : "primary"}>
						{isImportVisible ? "Cancel Import" : "Import"}
					</Button>
				</Card>
				{isImportVisible && (
					<Card
						title="Import Settings JSON"
						type="normal"
						tooltip="Paste your JSON settings here to import them. Ensure the JSON is correctly formatted."
						style={{ display: "flex", gap: "0.5rem" }}>
						<Button onClick={handlePaste}>Paste And Import</Button>
						<Input ref={inputRef} type="text" label="Paste JSON here" placeholder="Paste JSON here" />
						<Button onClick={handleImport}>Import</Button>
					</Card>
				)}
			</CardWrapper>
		</Section>
	);
};

export default ImportExportSection;
