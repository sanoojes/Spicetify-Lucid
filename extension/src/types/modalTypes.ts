import type { ReactNode } from "react";

export type ModalContextProps = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

export type ModalProps = {
	isOpen?: boolean;
	title: string;
	children?: ReactNode;
	headingChild?: ReactNode;
	onClose: () => void;
};

export type ModalType = "settings" | "changelog";

export type UseModalResult = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

export type UseModal = (modalName: ModalType) => UseModalResult;
