import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';

import { defaultTheme } from './theme';

export const AppThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [theme] = useState(defaultTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
