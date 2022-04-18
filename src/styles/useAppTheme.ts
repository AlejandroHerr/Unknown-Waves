import { useTheme } from '@emotion/react';
import { AppTheme } from './theme';

export const useAppTheme = (): AppTheme => {
  return useTheme() as AppTheme;
};
