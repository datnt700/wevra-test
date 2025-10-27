'use client';

import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { theme } from '@tavia/taviad';

export interface ThemeWrapperProps {
  children: ReactNode;
}

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeWrapper.displayName = 'ThemeWrapper';
