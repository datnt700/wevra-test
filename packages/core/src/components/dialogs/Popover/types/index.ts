import { ReactNode } from 'react';
import { Popover } from 'radix-ui';

/**
 * Props for the Popover component.
 */
export interface PopoverProps extends Popover.PopoverContentProps {
  /**
   * The element that triggers the popover.
   */
  trigger: ReactNode;

  /**
   * The content to display inside the popover.
   */
  children: ReactNode;

  /**
   * Boolean indicating whether the popover should include a close button.
   * - Default: false
   */
  hasClose?: boolean;

  /**
   * Optional class name for additional styling.
   */
  className?: string;

  /**
   * The side on which the popover should appear (`top`, `right`, `bottom`, `left`).
   * - Default: 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Offset distance from the trigger element.
   * - Default: 5
   */
  sideOffset?: number;

  /**
   * Boolean indicating whether the popover should display an arrow.
   * - Default: false
   */
  showArrow?: boolean;
}
