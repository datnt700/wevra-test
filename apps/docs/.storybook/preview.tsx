import React from 'react';

import { Preview } from '@storybook/react';
import { ThemeProvider, Global } from '@emotion/react';

import { globalStyles, theme } from '@tavia/core';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Set the `data-theme` on the document element dynamically
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'light'); // Change 'dark' to 'light' as needed
      }

      return (
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
