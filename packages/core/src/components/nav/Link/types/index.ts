import React from 'react';

type LinkType = 'default' | 'monochrome';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  id?: string;
  url?: string;
  children?: React.ReactNode;
  accessibilityLabel?: string;
  target?: string;
  type?: LinkType;
  className?: string;
  undelined?: boolean;
  onClick?: () => void;
}
