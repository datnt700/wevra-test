/**
 * Carousel component types
 * Image/content slider with navigation controls
 */

export interface CarouselProps {
  /** Array of items to display in the carousel */
  children: React.ReactNode[];
  /** Show navigation arrows (default: true) */
  showArrows?: boolean;
  /** Show dot indicators (default: true) */
  showDots?: boolean;
  /** Enable auto-play (default: false) */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds (default: 3000) */
  interval?: number;
  /** Enable infinite loop (default: true) */
  loop?: boolean;
  /** Number of items to show at once (default: 1) */
  slidesToShow?: number;
  /** Number of items to scroll at once (default: 1) */
  slidesToScroll?: number;
  /** Gap between slides in pixels (default: 16) */
  gap?: number;
  /** Custom className for styling */
  className?: string;
  /** Callback when slide changes */
  onChange?: (index: number) => void;
  /** Arrow size: 'sm' | 'md' | 'lg' (default: 'md') */
  arrowSize?: 'sm' | 'md' | 'lg';
  /** Arrow position: 'inside' | 'outside' (default: 'inside') */
  arrowPosition?: 'inside' | 'outside';
  /** Enable touch/swipe gestures (default: true) */
  swipeable?: boolean;
}
