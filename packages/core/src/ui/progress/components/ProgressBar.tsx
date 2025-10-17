/**
 * ProgressBar component
 * Displays determinate or indeterminate progress with variant support
 * @module ProgressBar
 */
import { Styled } from './ProgressBar.styles';
import { ProgressBarProps } from '../types';

/**
 * A progress bar component that visualizes task completion
 * Supports both determinate (with percentage) and indeterminate (loading) modes
 *
 * @example
 * ```tsx
 * // Determinate progress
 * <ProgressBar progress={75} hasLabel variant="success" />
 *
 * // Indeterminate loading
 * <ProgressBar isIndeterminate variant="default" />
 *
 * // Error state
 * <ProgressBar progress={50} variant="error" />
 * ```
 */
export const ProgressBar = ({
  progress = 0,
  hasLabel = false,
  variant = 'default',
  isIndeterminate = false,
}: ProgressBarProps) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <Styled.Wrapper
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isIndeterminate ? undefined : clampedProgress}
      aria-valuetext={isIndeterminate ? 'Loading...' : `${clampedProgress}%`}
      aria-label={isIndeterminate ? 'Loading' : `${clampedProgress}% complete`}
    >
      <Styled.Track>
        <Styled.Fill
          $variant={variant}
          $isIndeterminate={isIndeterminate}
          style={{
            transform: isIndeterminate ? undefined : `translateX(${clampedProgress - 100}%)`,
          }}
        />
      </Styled.Track>
      {hasLabel && <Styled.Label>{clampedProgress}% Complete</Styled.Label>}
    </Styled.Wrapper>
  );
};

ProgressBar.displayName = 'ProgressBar';
