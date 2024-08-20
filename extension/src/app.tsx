import React from 'react';
import Main from '@/components/Main';
import { showError } from '@/components/error/ErrorBoundary';
import { checkForCustomControls } from '@/utils/windowControls';

async function main() {
  try {
    while (
      !Spicetify?.showNotification ||
      !Spicetify?.Player ||
      !Spicetify?.React
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const rootElement = document.createElement('div');
    rootElement.id = 'lucid-main';
    const mainElement = document.getElementById('main');
    mainElement?.prepend(rootElement);

    if (rootElement)
      Spicetify.ReactDOM.createRoot(rootElement).render(<Main />);

    // initialize global variables
    window.rootStyle = document.documentElement.style;
    window.isCustomControls = false;
    window.isLightMode = Spicetify?.Config.color_scheme === 'light' || false;
    window.isWindows =
      (Spicetify?.Platform?.operatingSystem as string).toLowerCase() ===
        'windows' ||
      (Spicetify?.Platform.PlatformData.os_name as string)
        .toLowerCase()
        .includes('win');

    window.isGlobalNav = !!(
      document.querySelector('.globalNav') ||
      document.querySelector('.Root__globalNav')
    );

    // check for custom controls
    checkForCustomControls();
  } catch (error) {
    if (error) showError(error);
  }
}

export default main;
