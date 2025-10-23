import { type ReactNode } from 'react';
import { useTrackClick } from '../provider.js';

/**
 * TrackClick component props
 */
export interface TrackClickProps {
  /**
   * Event name to track
   */
  eventName: string;

  /**
   * Custom metadata to attach to the event
   */
  metadata?: Record<string, unknown>;

  /**
   * Element to render
   */
  children: ReactNode;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Additional onClick handler
   */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Component to track click events
 *
 * @example
 * ```tsx
 * <TrackClick eventName="cta_clicked" metadata={{ campaign: 'summer' }}>
 *   <button>Click me</button>
 * </TrackClick>
 * ```
 */
export function TrackClick({ eventName, metadata, children, className, onClick }: TrackClickProps) {
  const trackClick = useTrackClick();

  const handleClick = (event: React.MouseEvent) => {
    trackClick(eventName, metadata)(event);
    onClick?.(event);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
}
