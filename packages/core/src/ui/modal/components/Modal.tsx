import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Styled } from './Modal.styles';
import { Icon } from '@tavia/core';
import { X } from 'lucide-react';
import { ModalProps } from '../types';

/**
 * A reusable Modal component designed for displaying dialogs or panels.
 *
 * Features:
 * - Supports multiple positions (`center`, `top`, `bottom`) for flexible placement.
 * - Provides smooth animations and overlays for better user experience.
 * - Includes accessible close functionality and keyboard navigation.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 *
 * Props:
 * - `header`: Optional header content (e.g., title or actions).
 * - `isOpen`: Boolean indicating whether the modal is open.
 * - `onClose`: Callback function triggered when the modal closes.
 * - `children`: The main content of the modal.
 * - `footer`: Optional footer content (e.g., buttons or actions).
 * - `position`: The position of the modal (`center`, `top`, `bottom`).
 * - `className`: Optional class name for additional styling.
 */
export const Modal = ({
  header,
  isOpen,
  onClose,
  children,
  footer,
  position = 'center',
  className
}: ModalProps): JSX.Element | null => {
  /**
   * Handles closing the modal with a delay for smooth animation.
   */
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  /**
   * Handles keyboard events to close the modal on `Escape` key press.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
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
    <Styled.Wrapper $position={position}>
      {/* Overlay for clicking outside */}
      <Styled.Overlay onClick={handleClose} />

      {/* Main Modal Content */}
      <Styled.Main role="dialog" aria-modal="true" tabIndex={-1}>
        <Styled.Container className={className}>
          {/* Header Section */}
          {header && (
            <Styled.Header>
              <div className="header">{header}</div>
              <Styled.CloseButton data-dismiss="modal" onClick={handleClose}>
                <Icon source={<X size={24} />} />
              </Styled.CloseButton>
            </Styled.Header>
          )}

          {/* Content Section */}
          <Styled.Content>{children}</Styled.Content>

          {/* Footer Section */}
          {footer && <Styled.Footer>{footer}</Styled.Footer>}
        </Styled.Container>
      </Styled.Main>
    </Styled.Wrapper>,
    document.body
  );
};
