import styled from '@emotion/styled';

/**
 * Styled components for the Drawer.
 */
export const Styled = {
  Wrapper: styled.div<{ $position: 'right' | 'left' | 'top' | 'bottom'; $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    min-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    backdrop-filter: blur(4px);
    display: flex;
    align-items: stretch;
    justify-content: ${({ $position }) =>
      ({
        right: 'flex-end',
        left: 'flex-start',
        top: 'stretch',
        bottom: 'flex-end',
      })[$position]};
  `,

  Overlay: styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    min-width: 100vw;
    min-height: 100vh;
    background-color: var(--dark);
    backdrop-filter: blur(4px);
    overflow-x: hidden;
    opacity: ${({ $isOpen }) => ($isOpen ? 0.5 : 0)};
    transition: opacity ease-out 0.3s;

    /* Accessibility: Allow clicking outside to close */
    cursor: pointer;
  `,

  Main: styled.div`
    z-index: 1041;
    outline: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  `,

  Container: styled.div<{ $position: 'right' | 'left' | 'top' | 'bottom'; $isOpen: boolean }>`
    z-index: 1041;
    background: var(--light);
    position: relative;
    width: ${({ $position }) =>
      $position === 'top' || $position === 'bottom' ? '30rem' : '30rem'};
    height: ${({ $position }) => ($position === 'left' || $position === 'right' ? '100%' : '100%')};
    transform: ${({ $position, $isOpen }) =>
      $isOpen
        ? {
            right: 'translateX(0%)',
            left: 'translateX(0%)',
            top: 'translateY(0%)',
            bottom: 'translateY(0%)',
          }[$position]
        : {
            right: 'translateX(100%)',
            left: 'translateX(-100%)',
            top: 'translateY(-100%)',
            bottom: 'translateY(100%)',
          }[$position]};
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    transition: transform ease-out 0.5s;

    /* Focus management for accessibility */
    &:focus-within {
      outline: none;
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--neutral);

    .header {
      display: flex;
      align-items: center;
      font-weight: bold;
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

    &[data-dismiss='drawer'] {
      aria-label: 'Close Drawer';
    }
  `,

  Content: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem 2rem;

    /* Smooth scrolling */
    scrollbar-width: thin;
    scrollbar-color: var(--dark) var(--light);

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--dark);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--light);
    }
  `,

  Footer: styled.div`
    padding: 1rem 2rem;
    border-top: 1px solid var(--neutral);
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
};
