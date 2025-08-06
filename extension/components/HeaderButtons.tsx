import UI from '@components/UI.tsx';
import { Dismiss16Filled } from '@fluentui/react-icons';
import DiscordIcon from '@icons/discord-16.svg';
import GithubIcon from '@icons/github-16.svg';
import React, { type FC } from 'react';

const HeaderButtons: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const openLink = (url: string) => open(url, '_blank', 'noopener,noreferrer');

  return (
    <>
      <UI.Button
        variant="icon"
        className="discord"
        onClick={() => openLink('https://discord.gg/PWEyKduwJh')}
        aria-label="Join Discord"
      >
        <DiscordIcon />
      </UI.Button>
      <UI.Button
        variant="icon"
        className="github"
        onClick={() => openLink('https://github.com/sanoojes/spicetify-lucid')}
        aria-label="View on GitHub"
      >
        <GithubIcon />
      </UI.Button>
      <UI.Button variant="icon" onClick={closeModal} aria-label="Close Modal">
        <Dismiss16Filled />
      </UI.Button>
    </>
  );
};

export default HeaderButtons;
