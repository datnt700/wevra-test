'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '../../providers/ThemeContext';
import type { ColorMode } from '../../theme/theme';

export interface ThemeWrapperProps {
  children: ReactNode;
  defaultMode?: ColorMode;
  storageKey?: string;
}

export const ThemeWrapper = ({ children, defaultMode, storageKey }: ThemeWrapperProps) => {
  return (
    <ThemeProvider defaultMode={defaultMode} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
};

ThemeWrapper.displayName = 'ThemeWrapper';
