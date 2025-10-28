'use client';

/**
 * Calendar styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Calendar.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

/**
 * Styled components - MUST use this export pattern
 */
export const Styled = {
  Wrapper: styled.div`
    padding: 1rem;
    border-radius: ${radii.lg};
    background-color: ${cssVars.light};

    .rdp {
      --rdp-accent-color: ${cssVars.mainColor};
      --rdp-background-color: ${cssVars.mainColorLight9};
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
      color: ${cssVars.dark};
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
      border: 1px solid ${cssVars.light4};
      border-radius: ${radii.md};
      background-color: ${cssVars.light};
      color: ${cssVars.dark};
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: ${cssVars.light3};
        border-color: ${cssVars.mainColor};
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
      color: ${cssVars.gray500};
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
      border-radius: ${radii.md};
      background-color: transparent;
      font-size: 0.875rem;
      color: ${cssVars.dark};
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: ${cssVars.light3};
        border-color: ${cssVars.mainColorLight3};
      }

      &:focus-visible {
        outline: 2px solid ${cssVars.mainColor};
        outline-offset: 2px;
      }

      &:disabled {
        color: ${cssVars.gray400};
        cursor: not-allowed;
        opacity: 0.5;

        &:hover {
          background-color: transparent;
        }
      }
    }

    /* Selected state */
    .rdp-day_selected {
      background-color: ${cssVars.mainColor} !important;
      border-color: ${cssVars.mainColor} !important;
      color: ${cssVars.light} !important;
      font-weight: 600;

      &:hover {
        background-color: ${cssVars.mainColor} !important;
      }
    }

    /* Today */
    .rdp-day_today {
      border-color: ${cssVars.mainColor};
      font-weight: 600;
    }

    /* Outside days (prev/next month) */
    .rdp-day_outside {
      color: ${cssVars.gray400};
    }

    /* Range selection */
    .rdp-day_range_start,
    .rdp-day_range_end {
      background-color: ${cssVars.mainColor} !important;
      color: ${cssVars.light} !important;
    }

    .rdp-day_range_middle {
      background-color: ${cssVars.mainColorLight9} !important;
      color: ${cssVars.dark} !important;
      border-radius: 0 !important;
    }

    /* Week numbers */
    .rdp-weeknumber {
      padding: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: ${cssVars.gray500};
      text-align: center;
    }

    /* Footer */
    .rdp-footer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid ${cssVars.light4};
      font-size: 0.875rem;
      color: ${cssVars.gray600};
    }

    /* Dropdown for month/year selection (if custom implementation added) */
    .rdp-dropdown {
      padding: 0.25rem 0.5rem;
      border: 1px solid ${cssVars.light4};
      border-radius: ${radii.md};
      background-color: ${cssVars.light};
      font-size: 0.875rem;
      color: ${cssVars.dark};
      cursor: pointer;

      &:hover {
        border-color: ${cssVars.mainColor};
      }

      &:focus {
        outline: 2px solid ${cssVars.mainColor};
        outline-offset: 2px;
      }
    }
  `,
};
