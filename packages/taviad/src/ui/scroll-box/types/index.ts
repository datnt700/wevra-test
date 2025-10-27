import React from 'react';

export interface ScrollBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  height?: string;
  maxHeight?: string;
}
