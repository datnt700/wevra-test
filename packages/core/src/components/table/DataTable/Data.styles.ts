import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
`;

export const Container = styled.div`
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid var(--light-5);
`;

export const Table = styled.table`
  margin: 0;
  padding: 0;
  background-color: var(--light);
  border: 1px solid transparent;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;

  tr {
    text-align: left;
    cursor: pointer;
    transition: all 0.5s ease-out;
  }

  tbody {
    tr {
      &:hover {
        background-color: var(--light-4);
      }
    }
  }
  tbody tr:nth-child(odd) {
    background-color: var(--light-2);
  }

  th,
  td {
    padding: 1rem;
    vertical-align: middle;
    color: var(--dark);
    border-right: 1px solid var(--light-5);
  }
`;
