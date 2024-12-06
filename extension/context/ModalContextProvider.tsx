import type { ModalType, UseModal } from "@/types/modalTypes";
import React, { createContext, useCallback, useContext, useMemo, useState, type FC, type ReactNode } from "react";

const INITIAL_MODAL_STATES: { [key in ModalType]: boolean } = {
	settings: false,
	changelog: false,
};

const createModalContext = () => {
	const ModalContext = createContext<UseModal | null>(null);

	const ModalContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
		const [modalStates, setModalStates] =
			useState<{
				[key in ModalType]: boolean;
			}>(INITIAL_MODAL_STATES);

		const useModal: UseModal = useCallback(
			(modalName: ModalType) => {
				const isOpen = modalStates[modalName];

				const openModal = useCallback(() => {
					setModalStates((prevStates) => ({
						...prevStates,
						[modalName]: true,
					}));
				}, [modalName]);

				const closeModal = useCallback(() => {
					setModalStates((prevStates) => ({
						...prevStates,
						[modalName]: false,
					}));
				}, [modalName]);

				return { isOpen, openModal, closeModal };
			},
			[modalStates],
		);

		const value = useMemo(() => useModal, [useModal]);

		return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
	};

	const useModalFromContext: UseModal = (modalName) => {
		const contextUseModal = useContext(ModalContext);
		if (contextUseModal) {
			return contextUseModal(modalName);
		}
		throw new Error("Wrap Element with ModalContextProvider");
	};

	return { ModalContextProvider, useModal: useModalFromContext };
};

export const { ModalContextProvider, useModal } = createModalContext();
