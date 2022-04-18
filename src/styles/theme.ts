import { colors } from './colors';

export interface AppTheme {
  colors: {
    accent: string;
    primary: string;
    secondary: string;
    background: string;
  };
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    s: string;
  };
  fontWeight: {
    bold: string;
  };
  size: {
    footerHeight: string;
  };
}

export const defaultTheme: AppTheme = {
  colors: {
    accent: colors.Amaranth,
    background: colors.CodGray,
    primary: colors.Alto,
    secondary: colors.Alto,
  },
  fontFamily: {
    sans: 'Helvetica',
    mono: 'monospace',
  },
  fontSize: {
    s: '13px',
  },
  fontWeight: {
    bold: '700',
  },
  size: {
    footerHeight: '50px',
  },
};
