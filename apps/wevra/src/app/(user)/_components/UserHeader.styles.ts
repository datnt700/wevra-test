import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: ${(props) => (props.theme as EventureTheme).colors.background};
  border: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
  border-radius: 2rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.theme as EventureTheme).colors.gray.gray100};
    border-color: ${(props) => (props.theme as EventureTheme).colors.primary};
  }
`;

export const Styled = {
  HeaderContainer: styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    background-color: ${(props) => (props.theme as EventureTheme).colors.surface};
    border-bottom: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
  `,

  CoinBadge: styled(StatBadge)`
    color: ${(props) => (props.theme as EventureTheme).colors.warning};

    svg {
      width: 20px;
      height: 20px;
      color: ${(props) => (props.theme as EventureTheme).colors.warningLight};
    }
  `,

  XPBadge: styled(StatBadge)`
    color: ${(props) => (props.theme as EventureTheme).colors.primary};

    svg {
      width: 20px;
      height: 20px;
      color: ${(props) => (props.theme as EventureTheme).colors.primaryHover};
    }
  `,

  StatValue: styled.span`
    font-size: 1rem;
    font-weight: 600;
  `,
};
