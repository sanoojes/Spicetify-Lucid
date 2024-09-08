import React from 'react';
import Main from '@/components/Main';
import { logToConsole } from '@/utils/logUtils';
import { showError } from '@/components/error/ErrorBoundary';

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

    if (rootElement) {
      Spicetify.ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <Main />
        </React.StrictMode>
      );
    }

    logToConsole('Lucid ignited! 🚀', {
      styles:
        'font-weight: bold; font-size: 1.25rem; color: #2196F3; padding: 0.5rem 0;',
    });
  } catch (error) {
    showError(error);
  }
}

export default main;
