'use client';

import styled from '@emotion/styled';
import { theme } from '@eventure/eventured';

interface FieldErrorProps {
  message?: string;
}

const ErrorText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${theme.colors.danger};
`;

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;

  return <ErrorText>{message}</ErrorText>;
}
