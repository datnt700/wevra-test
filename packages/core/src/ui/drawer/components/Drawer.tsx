import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Styled } from './Drawer.styles';
import { X } from 'lucide-react';
import { DrawerProps } from '../types';
import { Icon } from '@tavia/core';

/**
 * A reusable Drawer component designed for side or bottom panels.
 *
 * Features:
 * - Supports multiple positions (`right`, `left`, `top`, `bottom`).
 * - Provides smooth animations for opening and closing.
 * - Includes accessible close functionality and keyboard navigation.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 *
 * Props:
 * - `header`: Optional header content (e.g., title or actions).
 * - `isOpen`: Boolean indicating whether the drawer is open.
 * - `onClose`: Callback function triggered when the drawer closes.
 * - `children`: The main content of the drawer.
 * - `footer`: Optional footer content (e.g., buttons or actions).
 * - `position`: The position of the drawer (`right`, `left`, `top`, `bottom`).
 * - `className`: Optional class name for additional styling.
 */
export const Drawer = ({
  header,
  isOpen,
  onClose,
  children,
  footer,
  position = 'right',
  className,
}: DrawerProps): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Handles closing the drawer with a delay for smooth animation.
   */
  const handleClose = () => {
    setIsVisible(false);

    // Add a timeout to ensure the animation completes before calling `onClose`
    setTimeout(() => {
      onClose();
    }, 500);
  };

  /**
   * Handles keyboard events to close the drawer on `Escape` key press.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.addEventListener('keydown', handleKeyDown); // Add global event listener for Escape key
    } else {
      document.removeEventListener('keydown', handleKeyDown); // Clean up event listener
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Ensure cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Styled.Wrapper $position={position} $isOpen={isVisible}>
      {/* Overlay for clicking outside */}
      <Styled.Overlay $isOpen={isVisible} onClick={handleClose} />

      {/* Main Drawer Content */}
      <Styled.Main role="dialog" aria-modal="true" tabIndex={-1}>
        <Styled.Container $position={position} $isOpen={isVisible} className={className}>
          {/* Header Section */}
          {header && (
            <Styled.Header>
              <div className="header">{header}</div>
              <Styled.CloseButton data-dismiss="drawer" onClick={handleClose}>
                <Icon source={<X size={24} />} />
              </Styled.CloseButton>
            </Styled.Header>
          )}

          {/* Content Section */}
          <Styled.Content>
            <div className="content">{children}</div>
          </Styled.Content>

          {/* Footer Section */}
          {footer && <Styled.Footer>{footer}</Styled.Footer>}
        </Styled.Container>
      </Styled.Main>
    </Styled.Wrapper>,
    document.body
  );
};
