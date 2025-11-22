'use client';

/**
 * Calendar styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Calendar.styles
 */
import styled from '@emotion/styled';
import type { TaviaTheme } from '../../../theme/theme';

/**
 * Styled components - MUST use this export pattern
 */
export const Styled = {
  Wrapper: styled.div`
    ${({ theme }) => {
      const taviaTheme = theme as TaviaTheme;
      return `
        padding: 1rem;
        border-radius: ${taviaTheme.radii.lg};
        background-color: ${taviaTheme.colors.surface};

        .rdp {
          --rdp-accent-color: ${taviaTheme.colors.primary};
          --rdp-background-color: ${taviaTheme.colors.gray.mainColorLight9};
          margin: 0;
        }

        /* Month navigation */
        .rdp-months {
          display: flex;
          gap: 1rem;
        }

        .rdp-month {
          flex: 1;
        }

        .rdp-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0 1rem 0;
        }

        .rdp-caption_label {
          font-size: 0.875rem;
          font-weight: 600;
          color: ${taviaTheme.colors.text.primary};
        }

        .rdp-nav {
          display: flex;
          gap: 0.25rem;
        }

        .rdp-nav_button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          padding: 0;
          border: 1px solid ${taviaTheme.colors.border.default};
          border-radius: ${taviaTheme.radii.md};
          background-color: ${taviaTheme.colors.surface};
          color: ${taviaTheme.colors.text.primary};
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover:not(:disabled) {
            background-color: ${taviaTheme.colors.surfaceHover};
            border-color: ${taviaTheme.colors.primary};
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          svg {
            width: 1rem;
            height: 1rem;
          }
        }

        /* Table */
        .rdp-table {
          width: 100%;
          border-collapse: collapse;
        }

        /* Header (weekdays) */
        .rdp-head_cell {
          padding: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: ${taviaTheme.colors.text.tertiary};
          text-align: center;
          text-transform: uppercase;
        }

        /* Cells */
        .rdp-cell {
          padding: 0.125rem;
          text-align: center;
        }

        /* Day buttons */
        .rdp-day {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          padding: 0;
          border: 1px solid transparent;
          border-radius: ${taviaTheme.radii.md};
          background-color: transparent;
          font-size: 0.875rem;
          color: ${taviaTheme.colors.text.primary};
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover:not(:disabled) {
            background-color: ${taviaTheme.colors.surfaceHover};
            border-color: ${taviaTheme.colors.gray.mainColorLight3};
          }

          &:focus-visible {
            outline: 2px solid ${taviaTheme.colors.primary};
            outline-offset: 2px;
          }

          &:disabled {
            color: ${taviaTheme.colors.text.disabled};
            cursor: not-allowed;
            opacity: 0.5;

            &:hover {
              background-color: transparent;
            }
          }
        }

        /* Selected state */
        .rdp-day_selected {
          background-color: ${taviaTheme.colors.primary} !important;
          border-color: ${taviaTheme.colors.primary} !important;
          color: ${taviaTheme.colors.text.inverse} !important;
          font-weight: 600;

          &:hover {
            background-color: ${taviaTheme.colors.primary} !important;
          }
        }

        /* Today */
        .rdp-day_today {
          border-color: ${taviaTheme.colors.primary};
          font-weight: 600;
        }

        /* Outside days (prev/next month) */
        .rdp-day_outside {
          color: ${taviaTheme.colors.text.disabled};
        }

        /* Range selection */
        .rdp-day_range_start,
        .rdp-day_range_end {
          background-color: ${taviaTheme.colors.primary} !important;
          color: ${taviaTheme.colors.text.inverse} !important;
        }

        .rdp-day_range_middle {
          background-color: ${taviaTheme.colors.gray.mainColorLight9} !important;
          color: ${taviaTheme.colors.text.primary} !important;
          border-radius: 0 !important;
        }

        /* Week numbers */
        .rdp-weeknumber {
          padding: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: ${taviaTheme.colors.text.tertiary};
          text-align: center;
        }

        /* Footer */
        .rdp-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid ${taviaTheme.colors.border.default};
          font-size: 0.875rem;
          color: ${taviaTheme.colors.text.secondary};
        }

        /* Dropdown for month/year selection (if custom implementation added) */
        .rdp-dropdown {
          padding: 0.25rem 0.5rem;
          border: 1px solid ${taviaTheme.colors.border.default};
          border-radius: ${taviaTheme.radii.md};
          background-color: ${taviaTheme.colors.surface};
          font-size: 0.875rem;
          color: ${taviaTheme.colors.text.primary};
          cursor: pointer;

          &:hover {
            border-color: ${taviaTheme.colors.primary};
          }

          &:focus {
            outline: 2px solid ${taviaTheme.colors.primary};
            outline-offset: 2px;
          }
        }
      `;
    }}
  `,
};
