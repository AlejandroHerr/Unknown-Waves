/** @jsxImportSource @emotion/react */
import React from 'react';

import { useAppTheme } from '../styles/useAppTheme';

interface AppAnchor extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export const Anchor = ({ children, ...props }: AppAnchor) => {
  const appTheme = useAppTheme();

  return (
    <a
      {...props}
      css={{
        color: appTheme.colors.accent,
      }}
    >
      {children}
    </a>
  );
};
