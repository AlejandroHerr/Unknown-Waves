/** @jsxImportSource @emotion/react */
import React from 'react';

import { useAppTheme } from './styles/useAppTheme';

interface TapToPlayButtonProps {
  playing: boolean;
  play: React.MouseEventHandler<HTMLButtonElement>;
}

export const TapToPlayButton = ({ playing, play }: TapToPlayButtonProps) => {
  const appTheme = useAppTheme();

  if (playing) {
    return null;
  }

  return (
    <div
      css={{
        color: appTheme.colors.primary,
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        zIndex: 99999,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <div
        css={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          fontSize: '50px',
          color: 'white',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <button
          css={{
            color: appTheme.colors.primary,
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'none',
            fontFamily: appTheme.fontFamily.mono,
            fontSize: '36px',
            fontWeight: appTheme.fontWeight.bold,
          }}
          onClick={play}
        >
          TAP TO PLAY
        </button>
      </div>
    </div>
  );
};
