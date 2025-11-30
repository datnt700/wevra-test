import type { CSSProperties } from 'react';

export type StackDirection = 'row' | 'column';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface StackProps {
  /** Child elements to render */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Layout direction */
  direction?: StackDirection;
  /** Spacing between items (uses SPACING_VALUES) */
  spacing?: StackSpacing;
  /** Align items (align-items) */
  align?: StackAlign;
  /** Justify content (justify-content) */
  justify?: StackJustify;
  /** Whether to wrap items */
  wrap?: boolean;
  /** Additional inline styles */
  style?: CSSProperties;
}
