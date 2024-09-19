import { useBodyClass } from '@/hooks/useBodyClass';
import { useLucidStore } from '@/store/useLucidStore';
import React from 'react';

const GlobalNavManager = () => {
  const { isGlobalNav } = useLucidStore();
  useBodyClass(isGlobalNav ? 'global-nav' : 'control-nav');

  return <></>;
};

export default GlobalNavManager;
