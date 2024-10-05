import type { ModalType, UseModal } from "@/types/modalTypes";
import React from "react";

const INITIAL_MODAL_STATES: { [key in ModalType]: boolean } = {
	settings: false,
	changelog: false,
};

const createModalContext = () => {
	const ModalContext = React.createContext<UseModal | null>(null);

	const ModalContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
		const [modalStates, setModalStates] =
			React.useState<{
				[key in ModalType]: boolean;
			}>(INITIAL_MODAL_STATES);

		const useModal: UseModal = React.useCallback(
			(modalName: ModalType) => {
				const isOpen = modalStates[modalName];

				const openModal = React.useCallback(() => {
					setModalStates((prevStates) => ({
						...prevStates,
						[modalName]: true,
					}));
				}, [modalName]);

				const closeModal = React.useCallback(() => {
					setModalStates((prevStates) => ({
						...prevStates,
						[modalName]: false,
					}));
				}, [modalName]);

				return { isOpen, openModal, closeModal };
			},
			[modalStates],
		);

		const value = React.useMemo(() => useModal, [useModal]);

		return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
	};

	const useModalFromContext: UseModal = (modalName) => {
		const contextUseModal = React.useContext(ModalContext);
		if (contextUseModal) {
			return contextUseModal(modalName);
		}
		throw new Error("Wrap Element with ModalContextProvider");
	};

	return { ModalContextProvider, useModal: useModalFromContext };
};

export const { ModalContextProvider, useModal } = createModalContext();
