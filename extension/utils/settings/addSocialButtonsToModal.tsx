import HeaderButtons from '@components/HeaderButtons.tsx';
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';

const addSocialButtonsToModal = (() => {
  let root: Root | null = null;

  return (modalElem: Element | null = document.querySelector('generic-modal')) => {
    if (!modalElem) return;

    const header = modalElem.querySelector('.main-trackCreditsModal-header');
    const closeBtn = header?.querySelector('.main-trackCreditsModal-closeBtn');
    const alreadyMounted = header?.querySelector('.btn-wrapper');

    if (!header || !closeBtn || alreadyMounted) return;

    const container = document.createElement('div');
    container.className = 'btn-wrapper';
    const mount = document.createElement('div');
    container.appendChild(mount);

    root = createRoot(mount);
    root.render(<HeaderButtons />);

    container.appendChild(closeBtn);
    header.appendChild(container);
  };
})();

export default addSocialButtonsToModal;
