import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={`

      .tiptap {
        padding: 1.5rem;
        height: 100%;
      }

      .tiptap:focus-visible {
        outline: none;
      }

      .iframe-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 0.5rem;

        &:hover {
          border-color: var(--main-color-light-6);
        }
      }

      .iframe-wrapper.ProseMirror-selectednode {
        outline: 3px solid var(--main-color);
        border: none;
        border-radius: 0.5rem;
      }

      .iframe-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: inherit;
      }

      .ProseMirror {
        height: 100%;
        flex: 1;
        padding: 1.5rem;
        border: 1px solid var(--input-border-color);
        background-color: var(--input-color);
        color: var(--dark);
        font-family: inherit;
        font-size: 1rem;
        line-height: 1.6;
        min-height: 20rem;
        max-height: 30rem;
        overflow-y: auto;
        border-radius: 0.5rem;

        &:focus-within {
          border-color: var(--main-color);
          box-shadow: 0 0 0 2px rgba(var(--main-color-rgb), 0.3);
        }

        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-track {
          background: var(--light);
        }
        &::-webkit-scrollbar-thumb {
          background: var(--dark);
          border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: var(--dark-2);
        }

        scrollbar-width: thin;
        scrollbar-color: var(--dark) var(--light);
      }

      .ProseMirror p {
        margin: 0.75rem 0;
      }

      .ProseMirror h1,
      .ProseMirror h2,
      .ProseMirror h3,
      .ProseMirror h4,
      .ProseMirror h5,
      .ProseMirror h6 {
        margin: 1rem 0 0.5rem;
        line-height: 1.2;
      }

      .ProseMirror blockquote {
        padding-left: 1rem;
        border-left: 4px solid var(--neutral);
        color: var(--dark-2);
        font-style: italic;
        margin: 1rem 0;
      }

      .ProseMirror ul,
      .ProseMirror ol {
        padding-left: 1.5rem;
        margin: 0.75rem 0;
      }

      .ProseMirror li {
        margin: 0.25rem 0;
      }

      .ProseMirror img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1rem auto;
        border-radius: 0.5rem;
      }

      .ProseMirror pre {
        background-color: var(--code-bg);
        color: var(--code-text);
        font-family: 'JetBrains Mono', monospace;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        white-space: pre-wrap;

        code {
          color: inherit;
          background: none;
          padding: 0;
          font-size: 0.875rem;
        }
      }

      .ProseMirror code {
        background-color: rgba(97, 97, 97, 0.1);
        color: var(--dark-2);
        font-family: 'JetBrains Mono', monospace;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
      }

      .ProseMirror hr {
        border: none;
        border-top: 1px solid var(--neutral);
        margin: 1.5rem 0;
      }

      .ProseMirror a {
        color: var(--main-color);
        text-decoration: none;
        word-break: break-word;

        &:hover {
          text-decoration: underline;
        }
      }

      .ProseMirror.is-empty::before {
        content: attr(data-placeholder);
        color: var(--placeholder-color);
        pointer-events: none;
        display: block;
        font-style: italic;
      }

      .ProseMirror-fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background-color: var(--light);
        padding: 1.5rem;
        overflow-y: auto;
      }
    `}
  />
);

export default GlobalStyles;
