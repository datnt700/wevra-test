import styled from '@emotion/styled';

export const TableWrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: var(--light);
  border: 1px solid transparent;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
  border-radius: var(--border-radius-medium);
`;

export const Header = styled.div`
  padding: 1rem;
  background-color: var(--light);
  border-bottom: 1px solid var(--light);
`;

export const TableElement = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const TableHeader = styled.th`
  padding: 1rem;
  vertical-align: middle;
  color: var(--dark);
  cursor: pointer;

  .headerContent {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const TableRow = styled.tr`
  text-align: left;
  cursor: pointer;
  transition: all 0.5s ease-out;

  &:hover {
    background-color: var(--light-4);
  }

  &.selectedRow {
    background-color: var(--primary-light);
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
  color: var(--dark);
`;

export const Footer = styled.div`
  padding: 1rem;
`;

export const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`;
