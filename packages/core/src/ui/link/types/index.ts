import React from 'react';

type LinkVariant = 'default' | 'monochrome';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Unique identifier for the link */
  id?: string;
  /** URL to navigate to */
  url?: string;
  /** Link content */
  children?: React.ReactNode;
  /** Accessible label for screen readers */
  accessibilityLabel?: string;
  /** Target attribute (_blank, _self, etc.) */
  target?: string;
  /** Visual variant of the link */
  variant?: LinkVariant;
  /** Additional CSS class */
  className?: string;
  /** Whether to underline the link */
  underlined?: boolean;
  /** Click handler (prevents default navigation) */
  onClick?: () => void;
}
