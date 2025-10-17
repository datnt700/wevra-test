import styled from '@emotion/styled';
import { cssVars } from '../../theme/tokens/colors';
import { radii } from '../../theme/tokens/radii';

interface WrapperProps {
  $canClick?: boolean;
  $withUrl?: boolean;
}

const StyledWrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  max-width: 100%;
  align-items: center;
  padding: 0.125rem 0.375rem;
  background-color: ${cssVars.gray100};
  border-radius: ${radii.md};
  color: ${cssVars.gray900};
  width: max-content;
  transition: background-color 0.3s ease;

  ${({ $canClick, $withUrl }) =>
    ($canClick || $withUrl) &&
    `
    cursor: pointer;

    &:hover {
      background-color: ${cssVars.gray200};
    }
  `}

  ${({ $withUrl }) =>
    $withUrl &&
    `
    .body {
      color: inherit;
    }

    &:hover .body {
      text-decoration: underline;
    }
  `}
`;

const StyledBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledCloseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${cssVars.gray600};
  }
`;

export const Styled = {
  Wrapper: StyledWrapper,
  Body: StyledBody,
  CloseIcon: StyledCloseIcon,
};
