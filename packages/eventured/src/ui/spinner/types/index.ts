import React from 'react';
import { sizes } from '../components/Spinner.styles';

type Size = keyof typeof sizes;

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}
