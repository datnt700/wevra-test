'use client';

import React from 'react';
import { SpinnerStyled } from './Spinner.styles';
import { SpinnerProps } from '../types';

export const Spinner = ({ size = 'sm', ...other }: SpinnerProps) => {
  return (
    <SpinnerStyled size={size} {...other}>
      <div className="wrapper">
        <div className="circle"></div>
      </div>
    </SpinnerStyled>
  );
};
