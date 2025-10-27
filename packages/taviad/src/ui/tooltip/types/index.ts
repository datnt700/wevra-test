import React from 'react';

/**
 * Props for the Tooltip component.
 */
export interface TooltipProps {
  /**
   * The element that triggers the tooltip.
   */
  trigger: React.ReactElement;

  /**
   * The content to display inside the tooltip.
   */
  children: React.ReactElement;

  /**
   * The side on which the tooltip should appear (`top`, `right`, `bottom`, `left`).
   * - Default: 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Offset distance from the trigger element.
   * - Default: 5
   */
  sideOffset?: number;

  /**
   * Boolean indicating whether the tooltip should display an arrow.
   * - Default: false
   */
  showArrow?: boolean;
}
