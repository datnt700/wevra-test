/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import { cssVars, darkThemeCssVars } from '../tokens/colors';
import { theme } from './theme';
import { styleVars } from '../tokens/variables';

export const globalStyles = css`
  @import url('https://diverse-public.s3.eu-west-3.amazonaws.com/fonts/fonts.css');
  @import url('https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css');

  :root {
    ${Object.entries(cssVars)
      .map(
        ([key, value]) =>
          `--${key.replace(/[A-Z0-9]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`
      )
      .join('\n')}

    ${Object.entries(styleVars)
      .map(
        ([key, value]) =>
          `--${key.replace(/[A-Z0-9]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`
      )
      .join('\n')}
  }

  [data-theme='dark'] {
    ${Object.entries(darkThemeCssVars)
      .map(
        ([key, value]) =>
          `--${key.replace(/[A-Z0-9]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`
      )
      .join('\n')}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Set global font styles */
  html,
  body {
    font-family: 'GothamPro', 'SVN-Gotham', cursive, sans-serif;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    font-size: 10px;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
    margin: 0;
    padding: 0;
    color: var(--dark);
    background: var(--background-color);
    overflow-x: hidden;
    min-height: 100vh;

    @media screen and (min-width: ${theme.breakpoints.xs}) {
      font-size: 12px;
    }

    @media screen and (min-width: ${theme.breakpoints.lg}) {
      font-size: 14px;
    }

    @media screen and (min-width: ${theme.breakpoints.xl}) {
      font-size: 16px;
    }

    @media screen and (min-width: ${theme.breakpoints['2xl']}) {
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
    color: var(--dark);
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
