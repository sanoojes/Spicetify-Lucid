import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocalImageData = {
	dataURL: string;
	fileName?: string;
	dateAdded?: string;
};

type ImageStoreState = {
	isUseLocalImage: boolean;
	selectedLocalImage: LocalImageData | null;
};

type ImageStoreActions = {
	setUseLocalImage: (isUseLocalImage: boolean) => void;
	setSelectedLocalImage: (localImage: LocalImageData | null) => void;
	clearSelectedLocalImage: () => void;
};

type ImageStore = ImageStoreState & ImageStoreActions;

const DEFAULT_IMAGE_SETTINGS: ImageStoreState = {
	isUseLocalImage: false,
	selectedLocalImage: null,
};

export const useImageStore = create(
	persist<ImageStore>(
		(set) => ({
			...DEFAULT_IMAGE_SETTINGS,
			setUseLocalImage: (isUseLocalImage) => set(() => ({ isUseLocalImage })),
			setSelectedLocalImage: (selectedLocalImage) => set(() => ({ selectedLocalImage })),
			clearSelectedLocalImage: () => set(() => ({ ...DEFAULT_IMAGE_SETTINGS })),
		}),
		{
			name: "lucid-bg-image",
		},
	),
);
