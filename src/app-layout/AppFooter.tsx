/** @jsxImportSource @emotion/react */
import React from 'react';

import { useAppTheme } from '../styles/useAppTheme';
import { Anchor } from './AppAnchor';

export const AppFooter = () => {
  const appTheme = useAppTheme();

  return (
    <footer css={{ display: 'flex', padding: '8px', height: appTheme.size.footerHeight }}>
      <div
        css={{
          color: appTheme.colors.secondary,
          fontFamily: appTheme.fontFamily.mono,
          fontSize: appTheme.fontSize.s,
          textAlign: 'right',
          alignSelf: 'flex-end',
          flex: 1,
        }}
      >
        made by{' '}
        <Anchor href="https://github.com/AlejandroHerr" target="_blank" rel="noopener noreferrer">
          AlejandroHerr
        </Anchor>{' '}
        between BCN and WWA // <Anchor href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</Anchor> {'//'}{' '}
        radio stream by{' '}
        <Anchor href="https://sovietwave.su" target="_blank" rel="noopener noreferrer">
          #sovietwave
        </Anchor>
      </div>
    </footer>
  );
};
