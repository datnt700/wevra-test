import React from 'react';
import { Styled } from './ErrorState.styles';
import { ErrorStateProps } from '../types';

export const ErrorState = ({
  children,
  className,
  wrapperClassName,
  icon,
  title,
  subTitle,
  action,
  ...other
}: ErrorStateProps) => {
  return (
    <Styled.Wrapper className={wrapperClassName} {...other}>
      {children ? (
        <Styled.Body className={className}>{children}</Styled.Body>
      ) : (
        <Styled.Content>
          <div className="icon">{icon}</div>
          <h2 className="title">{title}</h2>
          <h5 className="subTitle">{subTitle}</h5>
          <h5 className="action">{action}</h5>
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};

ErrorState.displayName = 'ErrorState';
