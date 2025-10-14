import React from 'react';
import { Styled } from './Icon.styles';
import { IconProps } from '../types';

export const Icon = ({ source, variant, ...other }: IconProps) => {
  return (
    <Styled.Wrapper variant={variant} {...other}>
      {typeof source === 'string' ? (
        <img src={'data:image/svg+xml;utf8,' + source} alt="" />
      ) : (
        <>{source}</>
      )}
    </Styled.Wrapper>
  );
};
