import styled from '@emotion/styled';

export const Styled = {
  Sidebar: styled.div<{ isOpen: boolean }>`
    position: fixed;
    left: 0;
    top: 0;
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--light);
    padding: 1.25rem 0.7rem;
    border-right: 1px solid var(--light-4);
    flex-direction: column;
    align-items: center;
    overflow: auto;
    box-shadow:
      0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 5px 8px 0 rgba(0, 0, 0, 0.14),
      0 1px 14px 0 rgba(0, 0, 0, 0.12);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    z-index: 10;
  `,
  ClosedSideBar: styled.div`
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--light);
    padding: 1.25rem 0.7rem;
    display: none;

    @media screen and (min-width: bp.$bp-md) {
      display: flex;
    }

    svg {
      color: #f9f9f9;
    }
  `,
  OpenedSideBar: styled.div`
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--light);
    padding: 1.25rem 0.7rem;
    display: none;

    @media screen and (min-width: bp.$bp-md) {
      display: flex;
    }

    svg {
      color: #f9f9f9;
    }
  `,
  SidebarNav: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
  `,
  Logo: styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  `,
  TopSidebar: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  `,
  TooltipContent: styled.div`
    background-color: var(--light);
    transform: translateX(1rem);
    padding: 0.5rem 1rem;
  `
};
