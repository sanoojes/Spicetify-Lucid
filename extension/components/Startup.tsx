import UI from '@components/UI.tsx';
import { openModal } from '@utils/settings/addSettings.tsx';
import React from 'react';

const Startup = () => {
  return (
    <div
      className="section-card encore-text encore-text-body-small encore-internal-color-text-base"
      style={{
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        flexDirection: 'column',
      }}
    >
      <h2
        className="encore-text encore-text-title-small"
        style={{ marginBottom: '12px', textAlign: 'center' }}
      >
        🎉 Lucid Theme Updated to v3
      </h2>

      <p>
        Lucid has been upgraded to <strong>version 3</strong> with major improvements in performance
        and customization.
      </p>

      <p>
        As part of this update, your old configuration has been reset to ensure compatibility. We’re
        sorry for the inconvenience!
      </p>

      <p>
        Explore the <strong>new settings</strong> to get the most out of Lucid v3 — now faster,
        cleaner, and more flexible than ever.
      </p>

      <UI.Button
        variant="primary"
        onClick={() => {
          (
            document.querySelector('.main-trackCreditsModal-closeBtn') as HTMLButtonElement | null
          )?.click?.();
          setTimeout(openModal, 100);
        }}
      >
        Open Settings
      </UI.Button>
    </div>
  );
};

export default Startup;
