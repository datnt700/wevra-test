import React from 'react';
import { sizes } from '@tavia/core/components/misc/Spinner/components/Spinner.styles';

type Size = keyof typeof sizes;

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}
