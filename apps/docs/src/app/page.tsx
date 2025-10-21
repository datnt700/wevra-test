'use client';
import { Global, ThemeProvider, css } from '@emotion/react';
import { cssVars, GlobalStyles, theme } from '@tavia/core';
import { ThemeProvider as LocalThemeProvider } from '@/context/ThemeContext';

export default function Home() {
  return (
    <LocalThemeProvider>
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            :root {
              ${Object.entries(cssVars)
                .map(
                  ([key, value]) =>
                    `--${key.replace(/[A-Z0-9]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`
                )
                .join('\n')}
            }
          `}
        />
        {GlobalStyles()}
        <div>
          <h1>Tavia Component Library</h1>
          <p>View components in Storybook</p>
        </div>
      </ThemeProvider>
    </LocalThemeProvider>
  );
}
