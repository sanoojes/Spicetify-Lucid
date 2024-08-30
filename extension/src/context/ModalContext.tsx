import React from 'react';

const ModalContext = Spicetify.React.createContext<ModalContextProps | null>(
  null
);

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): ModalContextProps => {
  const context = Spicetify.React.useContext(ModalContext);
  if (context) return context;
  throw new Error('[Lucid] Wrap Element with ModalContextProvider');
};

export { ModalContextProvider, useModal };
