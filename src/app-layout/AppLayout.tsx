/** @jsxImportSource @emotion/react */
import React from 'react';

import { useAppTheme } from '../styles/useAppTheme';
import { AppFooter } from './AppFooter';

export const AppLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const appTheme = useAppTheme();

  return (
    <div
      css={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: appTheme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
      <AppFooter />
    </div>
  );
};
