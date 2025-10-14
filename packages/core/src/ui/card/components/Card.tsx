import React from 'react';
import { Styled } from './Card.styles';
import { CardProps } from '../types';

export const Card = ({ children, className, header, wrapperClassName, ...other }: CardProps) => {
  return (
    <Styled.Wrapper className={wrapperClassName} {...other}>
      {header && <Styled.Header>{header}</Styled.Header>}
      <Styled.Body className={className}>{children}</Styled.Body>
    </Styled.Wrapper>
  );
};
