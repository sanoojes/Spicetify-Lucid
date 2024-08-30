import React from 'react';
import { useModal } from '@/context/ModalContext';

const Modal = React.memo(({ title, children, headingChild }: ModalProps) => {
  const { isOpen, closeModal } = useModal();

  return isOpen ? (
    <div className='modal-container'>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className={`modal-overlay ${isOpen && 'open'}`}
        style={{ zIndex: 20 }}
        onClick={closeModal}
      />
      <div
        className={`modal-section ${isOpen && 'open'}`}
        role='dialog'
        aria-label={title}
        aria-modal='true'
      >
        <div className='main-embedWidgetGenerator-container'>
          <div className='main-trackCreditsModal-header'>
            <h1 className='main-type-alto'>{title}</h1>
            {headingChild && <div>{headingChild}</div>}

            <button
              type='button'
              aria-label='Close'
              className='main-trackCreditsModal-closeBtn'
              onClick={() => closeModal()}
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Close</title>
                <path
                  d='M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143'
                  fill='currentColor'
                  fill-rule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='modal-contents'>
            <main className='modal-wrapper'>{children}</main>
          </div>
        </div>
      </div>
    </div>
  ) : null;
});

export default Modal;
