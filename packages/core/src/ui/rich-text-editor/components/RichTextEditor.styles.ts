/**
 * @fileoverview RichTextEditor component styles using Emotion
 * Provides styled components for TipTap-based rich text editor with toolbar and content area
 */

import styled from '@emotion/styled';
import { EditorContent } from '@tiptap/react';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Main wrapper for the rich text editor component
 * Contains menu bar and editor content area
 */
const Wrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/**
 * Toolbar menu bar with formatting buttons and controls
 * Flexbox layout with wrapping for responsive design
 */
const MenuBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  select {
    background-color: ${cssVars.light};
    border: 1px solid ${cssVars.light4};
  }

  button {
    background-color: ${cssVars.light};
    border: 1px solid ${cssVars.light4};
    border-radius: ${radii.md};
    padding: 0.5rem 1rem;
    color: #a0a0a0;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-active {
      background-color: ${cssVars.mainColor};
      color: white;
    }
  }
`;

/**
 * Editor content area styled with TipTap and scrollbar customization
 * Includes styles for headings, lists, code blocks, images, and embedded content
 */
const Editor = styled(EditorContent)`
  background-color: ${cssVars.light};
  border: 1px solid ${cssVars.light4};
  min-height: 20rem;
  max-height: 30rem;
  color: ${cssVars.dark};
  width: 100%;
  overflow: auto;
  border-radius: ${radii.md};
  display: flex;
  flex-direction: column;

  /* TipTap editor specific styles */
  .ProseMirror {
    height: 100%;
    flex: 1;
    padding: 1.5rem;

    &:focus-visible {
      outline: none;
    }
  }

  /* Iframe wrapper styles */
  .iframe-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* Aspect ratio (16:9) */
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid ${cssVars.dark};
      height: 100%;
      outline: 0;
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;

    &:hover {
      background: #555;
    }
  }

  /* Firefox scrollbar support */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 0.5rem 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(97, 97, 97, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: ${radii.md};

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    width: 100%;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(13, 13, 13, 0.1);
    margin: 2rem 0;
  }
`;

/**
 * Hidden file input for image uploads
 * Triggered programmatically via ref
 */
const UploadImageInput = styled.input`
  display: none;
`;

/**
 * Font size selector dropdown in toolbar
 */
const SelectFont = styled.select`
  height: 3rem;
  outline: none;
  color: #a0a0a0;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: ${radii.md};
  border: 1px solid ${cssVars.light4};
  background-color: ${cssVars.light};
`;

export const Styled = {
  Wrapper,
  MenuBar,
  Editor,
  UploadImageInput,
  SelectFont,
};
