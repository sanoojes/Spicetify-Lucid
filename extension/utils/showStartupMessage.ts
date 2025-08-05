import { createElement } from 'react';
import waitForGlobal from './dom/waitForGlobal.ts';
import Startup from '@components/Startup.tsx';

const STARTUP_SHOWN_KEY = 'lucid-startup-shown';

export default function showStartupMessage() {
  try {
    if (localStorage.getItem(STARTUP_SHOWN_KEY)) return;

    waitForGlobal(() => Spicetify?.PopupModal).then((modal) => {
      modal.display({
        title: 'Lucid v3 Is Here!',
        content: createElement(Startup),
        isLarge: true,
      });

      localStorage.setItem(STARTUP_SHOWN_KEY, 'true');
    });
  } catch {}
}
