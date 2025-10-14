import React from 'react';
import { Styled } from './EmptyState.styles';
import { EmptyStateProps } from '../types';

export const EmptyState = ({
  children,
  className,
  wrapperClassName,
  icon,
  title,
  subTitle,
  action,
  ...other
}: EmptyStateProps) => {
  return (
    <Styled.Wrapper>
      {children ? (
        <Styled.Body>{children}</Styled.Body>
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

EmptyState.displayName = 'EmptyState';
