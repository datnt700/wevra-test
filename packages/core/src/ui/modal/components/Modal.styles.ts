import styled from '@emotion/styled';
import { css } from '@emotion/react';

/**
 * Styled components for the Modal.
 */
export const Styled = {
  Wrapper: styled.div<{ $position?: 'center' | 'top' | 'bottom' }>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    min-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    backdrop-filter: blur(4px);

    ${({ $position }) =>
      $position === 'center' &&
      css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}

    ${({ $position }) =>
      $position === 'top' &&
      css`
        align-items: flex-start;
        padding-top: 1rem;
      `}

    ${({ $position }) =>
      $position === 'bottom' &&
      css`
        align-items: flex-end;
        padding-bottom: 1rem;
      `}
  `,

  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    min-width: 100vw;
    min-height: 100vh;
    background-color: var(--dark);
    opacity: 0.5;
    cursor: pointer;
    backdrop-filter: blur(4px);
  `,

  Main: styled.div`
    z-index: 1041;
    outline: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 60rem; /* Limit maximum width for better responsiveness */
    margin: 0 auto;
  `,

  Container: styled.div`
    z-index: 1041;
    background: var(--light);
    position: relative;
    border-radius: 0.5rem;
    min-width: 30rem;
    max-height: 90vh; /* Prevent modal from exceeding viewport height */
    overflow-y: auto; /* Add scrollbar if content overflows */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle shadow for better visual separation */
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    padding-bottom: 1rem;
    align-items: center;
    border-bottom: 1px solid var(--neutral); /* Visual separator between header and content */
    .header {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 1.25rem;
    }
  `,

  CloseButton: styled.button`
    font-size: 1.5rem;
    line-height: 1;
    color: var(--dark);
    opacity: 0.5;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }

    &[data-dismiss='modal'] {
      aria-label: 'Close Modal';
    }
  `,

  Content: styled.div`
    padding: 1rem 2rem;
    flex: 1; /* Allow content to take up remaining space */
    overflow-y: auto; /* Handle overflowing content gracefully */
  `,

  Footer: styled.div`
    padding: 1rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid var(--neutral); /* Visual separator between footer and content */
  `
};
