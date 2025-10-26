'use client';

import { Global, css } from '@emotion/react';
import { cssVars } from './tokens/colors';
import { breakpoints } from './breakpoints';

export const globalStyles = css`
  /* Font imports moved to Next.js <head> to avoid hydration issues */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset and base styles */
  html,
  body {
    font-family:
      'GothamPro',
      'SVN-Gotham',
      'Gilroy',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      sans-serif;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    font-size: 10px;
    line-height: 1.6;
    color: ${cssVars.dark};
    background: ${cssVars.backgroundColor};
    overflow-x: hidden;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Responsive font sizing */
    @media screen and (min-width: ${breakpoints.xs}) {
      font-size: 12px;
    }

    @media screen and (min-width: ${breakpoints.lg}) {
      font-size: 14px;
    }

    @media screen and (min-width: ${breakpoints.xl}) {
      font-size: 16px;
    }

    @media screen and (min-width: ${breakpoints['2xl']}) {
      font-size: 16px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'GothamPro', 'SVN-Gotham', cursive, sans-serif;
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }

  ul {
    padding-left: 0;
    li {
      list-style: none;
    }
  }

  button,
  input {
    font-family: inherit;
    color: ${cssVars.dark};
  }

  .videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    overflow: hidden;
    max-width: 100%;
    height: auto;
    margin-bottom: 2rem;
    width: 100%;

    iframe,
    object,
    embed,
    .video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .uppercase {
    text-transform: uppercase;
  }

  .iframe-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    width: 100%;
    height: auto;
    background-color: black;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      position: absolute;
      width: 100%;
      border: none;
    }
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
