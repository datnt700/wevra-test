import { Popover as RadixPopover } from 'radix-ui';
import { Icon } from '@tavia/core';
import { Styled } from './Popover.styles';
import { X } from 'lucide-react';
import { PopoverProps } from '../types';

/**
 * A reusable Popover component built with Radix UI primitives.
 *
 * Features:
 * - Displays content in a popover triggered by a specified element.
 * - Supports dynamic positioning (`top`, `right`, `bottom`, `left`) with optional offsets.
 * - Includes an optional close button for dismissing the popover.
 * - Provides an optional arrow for better visual alignment.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 *
 * Props:
 * - `trigger`: The element that triggers the popover.
 * - `children`: The content to display inside the popover.
 * - `hasClose`: Boolean indicating whether the popover should include a close button.
 * - `className`: Optional class name for additional styling.
 * - `side`: The side on which the popover should appear (`top`, `right`, `bottom`, `left`).
 * - `sideOffset`: Offset distance from the trigger element.
 * - `showArrow`: Boolean indicating whether the popover should display an arrow.
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
    <Radix
      trigger={trigger}
      hasClose={hasClose}
      className={className}
      side={side}
      sideOffset={sideOffset}
      showArrow={showArrow}
      {...other}
    >
      {children}
    </Radix>
  );
};

const Radix = ({
  trigger,
  children,
  hasClose,
  className,
  side,
  sideOffset,
  showArrow
}: PopoverProps) => {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <Styled.Content className={className} sideOffset={sideOffset} side={side}>
          {children}
          {hasClose ? (
            <Styled.Close aria-label="Close">
              <Icon source={<X size={24} />} />
            </Styled.Close>
          ) : null}
          {showArrow ? <Styled.Arrow /> : null}
        </Styled.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
