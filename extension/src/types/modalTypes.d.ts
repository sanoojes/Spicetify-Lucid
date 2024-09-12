type ModalContextProps = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type ModalProps = {
  isOpen?: boolean;
  title: string;
  children: ReactNode;
  headingChild?: ReactNode;
  onClose: () => void;
};

type ModalType = 'settings' | 'changelog';

interface UseModalResult {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

type UseModal = (modalName: ModalType) => UseModalResult;
