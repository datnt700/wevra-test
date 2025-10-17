/**
 * @fileoverview Table component styles using Emotion
 * Provides styled components for data table with sorting, filtering, and pagination
 */

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Wrapper for the entire table component
 * Contains search, table, and pagination sections
 */
const TableWrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: ${cssVars.light};
  border: 1px solid transparent;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
  border-radius: ${radii.md};
`;

/**
 * Header section for table controls (e.g., search)
 */
const Header = styled.div`
  padding: 1rem;
  background-color: ${cssVars.light};
  border-bottom: 1px solid ${cssVars.light};
`;

/**
 * Main HTML table element
 */
const TableElement = styled.table`
  width: 100%;
  border-spacing: 0;
`;

/**
 * Table header cell (th element)
 * Includes sorting functionality
 */
const TableHeader = styled.th`
  padding: 1rem;
  vertical-align: middle;
  color: ${cssVars.dark};
  cursor: pointer;

  .headerContent {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

/**
 * Table row (tr element)
 * Supports hover and selection states
 */
const TableRow = styled.tr`
  text-align: left;
  cursor: pointer;
  transition: all 0.5s ease-out;

  &:hover {
    background-color: ${cssVars.light4};
  }

  &.selectedRow {
    background-color: ${cssVars.mainColorLight};
  }
`;

/**
 * Table data cell (td element)
 */
const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
  color: ${cssVars.dark};
`;

/**
 * Footer section for pagination controls
 */
const Footer = styled.div`
  padding: 1rem;
`;

/**
 * Wrapper for search input component
 */
const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Styled = {
  TableWrapper,
  Header,
  TableElement,
  TableHeader,
  TableRow,
  TableCell,
  Footer,
  SearchWrapper,
};
