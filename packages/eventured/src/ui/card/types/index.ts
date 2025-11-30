import React from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  variant?: CardVariant;
}
