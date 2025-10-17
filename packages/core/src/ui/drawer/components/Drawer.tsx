/**
 * Drawer component
 * A slide-in panel component for navigation, forms, or additional content
 * @module Drawer
 */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Styled } from './Drawer.styles';
import { X } from 'lucide-react';
import { DrawerProps } from '../types';
import { Icon } from '@tavia/core';

/**
 * A reusable drawer component for slide-in panels
 *
 * Features:
 * - Position variants (right, left, top, bottom)
 * - Smooth slide animations
 * - Keyboard navigation (Escape to close)
 * - Click-outside to close
 * - Portal rendering for proper z-index layering
 * - Accessible ARIA attributes
 *
 * @example
 * ```tsx
 * // Basic drawer
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} header="Settings">
 *   <p>Drawer content here</p>
 * </Drawer>
 *
 * // Drawer with footer and custom position
 * <Drawer
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   header="Filters"
 *   footer={<Button onClick={handleApply}>Apply</Button>}
 *   position="left"
 * >
 *   <FilterForm />
 * </Drawer>
 * ```
 */
export const Drawer = ({
  header,
  isOpen,
  onClose,
  children,
  footer,
  position = 'right',
  className,
}: DrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Handle drawer close with animation
   */
  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      onClose();
    }, 300); // Match transition duration in styles
  };

  /**
   * Handle keyboard events and body scroll
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }
    };

    if (isOpen) {
      // Trigger opening animation
      setIsVisible(true);
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Styled.Wrapper $position={position} $isOpen={isVisible}>
      {/* Overlay - click to close */}
      <Styled.Overlay $isOpen={isVisible} onClick={handleClose} aria-hidden="true" />

      {/* Drawer content */}
      <Styled.Main role="dialog" aria-modal="true" aria-labelledby="drawer-header">
        <Styled.Container $position={position} $isOpen={isVisible} className={className}>
          {/* Header */}
          {header && (
            <Styled.Header>
              <div id="drawer-header" className="header">
                {header}
              </div>
              <Styled.CloseButton onClick={handleClose} aria-label="Close drawer" type="button">
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

Drawer.displayName = 'Drawer';
