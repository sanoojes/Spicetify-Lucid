type ModalContextProps = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type ModalProps = {
  title: string;
  children: ReactNode;
  headingChild?: ReactNode;
};
