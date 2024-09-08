import React from 'react';
import Main from '@/components/Main';
import { logToConsole } from '@/utils/logUtils';
import { replaceIcons } from '@/utils/replaceIcons';
import { showError } from '@/components/error/ErrorBoundary';
import { manageBackgroundZIndex } from '@/utils/backgroundUtils';
import { checkForCustomControls } from './utils/windowControlUtils';

async function main() {
  try {
    while (
      !Spicetify?.showNotification ||
      !Spicetify?.Player ||
      !Spicetify?.React ||
      !Spicetify?.Platform
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const rootElement = document.createElement('div');
    rootElement.id = 'lucid-main';
    const mainElement = document.getElementById('main');
    mainElement?.prepend(rootElement);

    console.time('render');
    if (rootElement)
      Spicetify.ReactDOM.createRoot(rootElement).render(<Main />);
    console.timeEnd('render');

    // replace icons
    replaceIcons();

    // change background z-index
    manageBackgroundZIndex();

    logToConsole('Lucid ignited! 🚀', {
      styles:
        'font-weight: bold; font-size: 1.25rem; color: #2196F3; padding: 0.5rem 0;',
    });
  } catch (error) {
    if (error) showError(error);
  }
}

export default main;
