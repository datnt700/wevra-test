import React from 'react';

type Variant =
  | 'base'
  | 'inherit'
  | 'primary'
  | 'info'
  | 'success'
  | 'caution'
  | 'warning'
  | 'danger';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  source: string | React.ReactNode;
  variant?: Variant;
}
