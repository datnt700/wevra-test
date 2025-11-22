'use client';

/**
 * @fileoverview DataTable component styles using Emotion
 * Provides styled components for TanStack Table with custom theming
 */

import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Wrapper container for the data table
 * Centers the table content
 */
export const Wrapper = styled.div`
  margin: auto;
`;

/**
 * Scrollable container for the table
 * No borders, clean design
 */
export const Container = styled.div`
  overflow-x: auto;
`;

/**
 * Main table element with TanStack Table integration
 * Features:
 * - Clean design with no borders except header separator
 * - Hover effects on rows
 * - Consistent cell padding
 * - Smooth transitions
 */
export const Table = styled.table`
  ${({ theme }) => {
    const taviaTheme = theme as TaviaTheme;
    return `
      margin: 0;
      padding: 0;
      background-color: ${taviaTheme.colors.surface};
      border-spacing: 0;
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;

      thead {
        background-color: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
      }

      th {
        padding: 0.75rem 1rem;
        text-align: left;
        font-size: 0.75rem;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      tr {
        text-align: left;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      tbody {
        tr {
          &:hover {
            background-color: #f9fafb;
          }
        }
      }

      td {
        padding: 1rem;
        vertical-align: middle;
        color: ${taviaTheme.colors.text.primary};
        font-size: 0.875rem;
      }
    `;
  }}
`;
