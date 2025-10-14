import React from 'react';

export interface EmptyStateProps {
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  image?: React.ReactNode;
  icon?: React.ReactNode;
  largeImage?: string;
  fullWidth?: string;
  action?: React.ReactNode;
  footerContent?: React.ReactNode;
  size?: 'sm' | 'md';
}
