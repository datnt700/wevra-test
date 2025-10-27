/**
 * Popover component
 * A floating content container built with Radix UI primitives
 * @module Popover
 */
import { Popover as RadixPopover } from 'radix-ui';
import { Icon } from '@tavia/taviad';
import { Styled } from './Popover.styles';
import { X } from 'lucide-react';
import { PopoverProps } from '../types';

/**
 * A reusable popover component for displaying floating content
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Positioning support (top, right, bottom, left)
 * - Optional arrow pointing to trigger
 * - Optional close button
 * - Keyboard navigation (Escape to close)
 *
 * @example
 * ```tsx
 * // Basic popover
 * <Popover trigger={<button>Open</button>}>
 *   <p>Popover content</p>
 * </Popover>
 *
 * // With close button and arrow
 * <Popover
 *   trigger={<button>Info</button>}
 *   hasClose
 *   showArrow
 *   side="bottom"
 *   sideOffset={10}
 * >
 *   <div>Detailed information here</div>
 * </Popover>
 * ```
 */
export const Popover = ({
  trigger,
  children,
  hasClose = false,
  className,
  side = 'top',
  sideOffset = 5,
  showArrow = false,
  ...other
}: PopoverProps) => {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <Styled.Content className={className} sideOffset={sideOffset} side={side} {...other}>
          {children}
          {hasClose && (
            <Styled.Close aria-label="Close popover">
              <Icon source={<X size={16} />} />
            </Styled.Close>
          )}
          {showArrow && <Styled.Arrow />}
        </Styled.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

Popover.displayName = 'Popover';
