'use client';

/**
 * Modal component
 * A reusable dialog/modal component with accessibility support
 * @module Modal
 */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Styled } from './Modal.styles';
import { Icon } from '@tavia/core';
import { X } from 'lucide-react';
import { ModalProps } from '../types';

/**
 * A reusable modal component for displaying dialogs, forms, or overlays
 *
 * Features:
 * - Position variants (center, top, bottom)
 * - Keyboard navigation (Escape to close)
 * - Click-outside to close
 * - Portal rendering for proper z-index layering
 * - Accessible ARIA attributes
 *
 * @example
 * ```tsx
 * // Basic modal
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} header="Confirm Action">
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 *
 * // Modal with footer
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   header="Edit Profile"
 *   footer={<Button onClick={handleSave}>Save</Button>}
 * >
 *   <Form />
 * </Modal>
 * ```
 */
export const Modal = ({
  header,
  isOpen,
  onClose,
  children,
  footer,
  position = 'center',
  className,
}: ModalProps) => {
  /**
   * Handle modal close with callback
   */
  const handleClose = () => {
    onClose?.();
  };

  /**
   * Handle keyboard events (Escape to close)
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Styled.Wrapper $position={position}>
      {/* Overlay - click to close */}
      <Styled.Overlay onClick={handleClose} aria-hidden="true" />

      {/* Modal content */}
      <Styled.Main role="dialog" aria-modal="true" aria-labelledby="modal-header">
        <Styled.Container className={className}>
          {/* Header */}
          {header && (
            <Styled.Header>
              <div id="modal-header" className="header">
                {header}
              </div>
              <Styled.CloseButton onClick={handleClose} aria-label="Close modal" type="button">
                <Icon source={<X size={24} />} />
              </Styled.CloseButton>
            </Styled.Header>
          )}

          {/* Content */}
          <Styled.Content>{children}</Styled.Content>

          {/* Footer */}
          {footer && <Styled.Footer>{footer}</Styled.Footer>}
        </Styled.Container>
      </Styled.Main>
    </Styled.Wrapper>,
    document.body
  );
};

Modal.displayName = 'Modal';
