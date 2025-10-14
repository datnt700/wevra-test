import React from 'react';
import { Styled } from './LoadingState.styles';
import clsx from 'clsx';
import { Spinner } from '@tavia/core';
import { LoadingStateProps } from '../types';

export const LoadingState = ({
  children,
  className,
  wrapperClassName,
  title,
  subTitle,
  ...other
}: LoadingStateProps) => {
  return (
    <Styled.Wrapper className={clsx(wrapperClassName)} {...other}>
      {children ? (
        <Styled.Body className={clsx(className)}>{children}</Styled.Body>
      ) : (
        <Styled.Content>
          <div className="icon">
            <Spinner size="lg" />
          </div>
          <h2 className="title">{title}</h2>
          <h5 className="subTitle">{subTitle}</h5>
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};

LoadingState.displayName = 'LoadingState';
