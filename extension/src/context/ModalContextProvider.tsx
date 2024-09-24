import React from 'react';

const INITIAL_MODAL_STATES: { [key in ModalType]: boolean } = {
  settings: false,
  changelog: false,
};

const createModalContext = () => {
  const context = React.createContext<UseModal | null>(null);

  const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [modalStates, setModalStates] = React.useState<{
      [key in ModalType]: boolean;
    }>(INITIAL_MODAL_STATES);

    const useModal: UseModal = React.useCallback(
      (modalName: ModalType) => {
        const isOpen = modalStates[modalName];

        const openModal = () => {
          setModalStates((prevStates) => ({
            ...prevStates,
            [modalName]: true,
          }));
        };

        const closeModal = () => {
          setModalStates((prevStates) => ({
            ...prevStates,
            [modalName]: false,
          }));
        };

        return { isOpen, openModal, closeModal };
      },
      [modalStates]
    );

    const value = React.useMemo(() => useModal, [useModal]);

    return <context.Provider value={value}>{children}</context.Provider>;
  };

  const useModalFromContext: UseModal = (modalName) => {
    const contextUseModal = React.useContext(context);
    if (contextUseModal) {
      return contextUseModal(modalName);
    }
    throw new Error('Wrap Element with ModalContextProvider');
  };

  return { ModalContextProvider, useModal: useModalFromContext };
};

export const { ModalContextProvider, useModal } = createModalContext();
