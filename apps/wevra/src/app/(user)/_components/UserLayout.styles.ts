import styled from '@emotion/styled';
import type { EventureTheme } from '@eventure/eventured';

export const Styled = {
  Container: styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    background-color: ${(props) => (props.theme as EventureTheme).colors.background};
  `,

  Sidebar: styled.aside`
    width: 280px;
    height: 100vh;
    background-color: ${(props) => (props.theme as EventureTheme).colors.surface};
    border-right: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: auto;
  `,

  Logo: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => (props.theme as EventureTheme).colors.primary};
    padding: 0 0.75rem;
    margin-bottom: 1rem;
  `,

  Nav: styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  `,

  NavItem: styled.button<{ $isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: 0.75rem;
    background-color: ${(props) =>
      props.$isActive
        ? (props.theme as EventureTheme).colors.gray.mainColorLight + '20'
        : 'transparent'};
    color: ${(props) =>
      props.$isActive
        ? (props.theme as EventureTheme).colors.primary
        : (props.theme as EventureTheme).colors.text.secondary};
    font-size: 1rem;
    font-weight: ${(props) => (props.$isActive ? 600 : 500)};
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: ${(props) => (props.theme as EventureTheme).colors.gray.gray100};
      color: ${(props) => (props.theme as EventureTheme).colors.primary};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `,

  MainContent: styled.main`
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  `,

  ContentWrapper: styled.div`
    flex: 1;
    overflow-y: auto;
  `,

  SidebarFooter: styled.div`
    border-top: 1px solid ${(props) => (props.theme as EventureTheme).colors.border.default};
    padding-top: 1.5rem;
  `,

  LogoutButton: styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: 0.75rem;
    background-color: transparent;
    color: ${(props) => (props.theme as EventureTheme).colors.text.secondary};
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;

    &:hover {
      background-color: ${(props) => (props.theme as EventureTheme).colors.gray.gray100};
      color: ${(props) => (props.theme as EventureTheme).colors.danger};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  `,
};
