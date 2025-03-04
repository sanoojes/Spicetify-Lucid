import Store from '@utils/state/store.ts';

type ModalState = {
  isFloating: boolean;
  position: {
    top: number;
    left: number;
  };
};

const modalState = new Store<ModalState>(
  {
    isFloating: false,
    position: {
      top: 16,
      left: 16,
    },
  },
  { persist: true, localStorageKey: 'lucid-modal-position' }
);

export { modalState };
