/**
 * Theme System Example
 * Demonstrates dark/light mode with Emotion theming
 */

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ThemeProvider, useTheme } from '@tavia/core';

// Component using theme with Emotion
function ThemedButton() {
  const { theme } = useTheme();

  return (
    <button
      css={css`
        background: ${theme.colors.primary};
        color: ${theme.colors.text.inverse};
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        border-radius: ${theme.radii.md};
        border: none;
        font-size: ${theme.typography.body1.fontSize};
        font-weight: ${theme.typography.body1.fontWeight};
        cursor: pointer;
        transition: ${theme.transitions.fast};

        &:hover {
          background: ${theme.colors.primaryHover};
          transform: scale(1.02);
        }

        &:active {
          background: ${theme.colors.primaryActive};
        }
      `}
    >
      Themed Button
    </button>
  );
}

// Theme toggle component
function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return <button onClick={toggleMode}>Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode</button>;
}

// App wrapper
export function App() {
  return (
    <ThemeProvider defaultMode="light">
      <div>
        <h1>Tavia Theme System</h1>
        <ThemeToggle />
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

// Styled component example
import styled from '@emotion/styled';

const Card = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border.default};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: ${(props) => props.theme.transitions.base};

  &:hover {
    border-color: ${(props) => props.theme.colors.border.hover};
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.typography.h3.fontSize};
  font-weight: ${(props) => props.theme.typography.h3.fontWeight};
  line-height: ${(props) => props.theme.typography.h3.lineHeight};
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  line-height: ${(props) => props.theme.typography.body1.lineHeight};
  margin: 0;
`;

export function ThemedCard() {
  return (
    <Card>
      <Title>Card Title</Title>
      <Description>
        This card automatically adapts to light and dark mode using the Emotion theme system.
      </Description>
    </Card>
  );
}
