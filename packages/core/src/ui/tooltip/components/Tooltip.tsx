import { Tooltip as RadixTooltip } from 'radix-ui';
import { Styled } from './Tooltip.styles';
import { TooltipProps } from '..';

/**
 * A reusable Tooltip component built with Radix UI primitives.
 *
 * Features:
 * - Displays content in a tooltip triggered by a specified element.
 * - Supports dynamic positioning (`top`, `right`, `bottom`, `left`) with optional offsets.
 * - Includes an optional arrow for better visual alignment.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 *
 * Props:
 * - `trigger`: The element that triggers the tooltip.
 * - `children`: The content to display inside the tooltip.
 * - `side`: The side on which the tooltip should appear (`top`, `right`, `bottom`, `left`).
 * - `sideOffset`: Offset distance from the trigger element.
 * - `showArrow`: Boolean indicating whether the tooltip should display an arrow.
 */
export const Tooltip = ({
  trigger,
  children,
  side = 'top',
  sideOffset = 5,
  showArrow = false,
  ...other
}: TooltipProps) => {
  return (
    <Radix
      children={children}
      trigger={trigger}
      side={side}
      sideOffset={sideOffset}
      showArrow={showArrow}
      {...other}
    />
  );
};

const Radix = ({ trigger, children, side, sideOffset, showArrow }: TooltipProps) => (
  <Styled.Provider>
    <Styled.Root>
      <Styled.Trigger>{trigger}</Styled.Trigger>
      <RadixTooltip.Portal>
        <Styled.Content sideOffset={sideOffset} side={side}>
          {children}
          {showArrow ? <Styled.Arrow /> : null}
        </Styled.Content>
      </RadixTooltip.Portal>
    </Styled.Root>
  </Styled.Provider>
);
