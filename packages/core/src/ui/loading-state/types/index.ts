import React from 'react';

export interface LoadingStateProps {
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  image?: React.ReactNode;
  largeImage?: string;
  fullWidth?: string;
  footerContent?: React.ReactNode;
  size?: 'sm' | 'md';
}
