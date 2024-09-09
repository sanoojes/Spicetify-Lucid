import { useLucidStore } from '@/store/useLucidStore';
import React from 'react';

export const setGlobalNav = (value: boolean) => {
  const rootElement = document.querySelector('.Root');
  if (rootElement) {
    rootElement.classList.add(`${value ? 'global-nav' : 'control-nav'}`);
  }
};

export const checkForGlobalNav = () => {
  const { isGlobalNav } = useLucidStore();

  React.useEffect(() => {
    setGlobalNav(isGlobalNav);
  }, [isGlobalNav]);
};
