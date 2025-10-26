'use client';

/**
 * @fileoverview DataTable component styles using Emotion
 * Provides styled components for TanStack Table with custom theming
 */

import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

/**
 * Wrapper container for the data table
 * Centers the table content
 */
export const Wrapper = styled.div`
  margin: auto;
`;

/**
 * Scrollable container for the table
 * Provides fixed max-height with scrolling for large datasets
 */
export const Container = styled.div`
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid ${cssVars.light5};
`;

/**
 * Main table element with TanStack Table integration
 * Features:
 * - Striped rows (odd rows have light background)
 * - Hover effects on rows
 * - Consistent cell padding and borders
 * - Smooth transitions
 */
export const Table = styled.table`
  margin: 0;
  padding: 0;
  background-color: ${cssVars.light};
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
        background-color: ${cssVars.light4};
      }
    }
  }
  tbody tr:nth-child(odd) {
    background-color: ${cssVars.light2};
  }

  th,
  td {
    padding: 1rem;
    vertical-align: middle;
    color: ${cssVars.dark};
    border-right: 1px solid ${cssVars.light5};
  }
`;
