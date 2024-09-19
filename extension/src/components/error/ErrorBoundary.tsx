import React, { type FC } from 'react';
import { logError } from '@/utils/logUtils';

const githubRepoUrl = 'https://github.com/sanoojes/Spicetify-Lucid/issues';

const ErrorNotification: FC<{ error: unknown }> = ({ error }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const errorDetailsRef = React.useRef<HTMLPreElement>(null);

  let formattedError = '';
  if (error instanceof Error) formattedError = error.message;
  else formattedError = JSON.stringify(error, null, 2);

  const handleCopyError = () => {
    if (errorDetailsRef.current) {
      navigator.clipboard.writeText(errorDetailsRef.current.textContent || '');
      Spicetify.showNotification('Error details copied!', false, 2000);
    }
  };

  return (
    <div style={{ width: '50vw' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ margin: 'auto 0' }}>
          <p>
            Oops! Lucid theme encountered an error. Please{' '}
            <a href={githubRepoUrl} target='_blank' rel='noopener noreferrer'>
              report an issue here
            </a>
          </p>
        </span>
        <div>
          <button
            type='button'
            onClick={() => setShowDetails(!showDetails)}
            className='lucid-error-button'
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          <button
            type='button'
            onClick={handleCopyError}
            className='lucid-copy-button'
            style={{ marginLeft: '8px' }}
          >
            Copy Error
          </button>
        </div>
      </div>
      {showDetails && (
        <pre style={{ whiteSpace: 'pre-wrap' }} ref={errorDetailsRef}>
          {formattedError}
        </pre>
      )}
    </div>
  );
};

export const showError = (error: unknown) => {
  logError('Error:', error);
  Spicetify.showNotification(<ErrorNotification error={e} />, true);
};
