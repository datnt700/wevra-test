import styled from '@emotion/styled';
import { cssVars } from '../../theme/tokens/colors';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const StyledCode = styled.code`
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875em;
  padding: 0.2em 0.4em;
  background-color: ${cssVars.gray100};
  border: 1px solid ${cssVars.gray300};
  border-radius: 4px;
  color: ${cssVars.gray900};
`;

/**
 * Code component - Displays inline code snippets
 *
 * @example
 * // Basic usage
 * <Code>console.log('Hello')</Code>
 *
 * @example
 * // In a sentence
 * <p>Use <Code>npm install</Code> to install packages</p>
 */
export const Code = ({ children, className, ...other }: CodeProps) => {
  return (
    <StyledCode className={className} {...other}>
      {children}
    </StyledCode>
  );
};
