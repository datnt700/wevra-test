/**
 * Date utilities for formatting and parsing dates
 * Uses date-fns for consistent date handling across the application
 * @module date
 */

import { format, parseISO, isValid } from 'date-fns';

/**
 * Formats an ISO date string to a human-readable format
 * @param date - ISO date string (e.g., "2025-10-16T00:00:00Z")
 * @param formatString - date-fns format string (defaults to "MMMM d, yyyy")
 * @returns Formatted date string or empty string if invalid
 * @example
 * formatDate("2025-10-16") // "October 16, 2025"
 * formatDate("2025-10-16", "MMM d, yyyy") // "Oct 16, 2025"
 */
export const formatDate = (date: string, formatString = 'MMMM d, yyyy'): string => {
  if (!date) return '';

  try {
    const parsedDate = parseISO(date);
    if (!isValid(parsedDate)) return '';
    return format(parsedDate, formatString);
  } catch {
    return '';
  }
};

/**
 * Formats a Date object to a human-readable format
 * @param date - JavaScript Date object
 * @param formatString - date-fns format string (defaults to "MMMM d, yyyy")
 * @returns Formatted date string or empty string if invalid
 * @example
 * formatDateObject(new Date()) // "October 16, 2025"
 */
export const formatDateObject = (date: Date, formatString = 'MMMM d, yyyy'): string => {
  if (!date || !isValid(date)) return '';

  try {
    return format(date, formatString);
  } catch {
    return '';
  }
};

/**
 * Parses an ISO date string to a Date object
 * @param date - ISO date string
 * @returns Date object or null if invalid
 * @example
 * parseDateString("2025-10-16") // Date object
 */
export const parseDateString = (date: string): Date | null => {
  if (!date) return null;

  try {
    const parsedDate = parseISO(date);
    return isValid(parsedDate) ? parsedDate : null;
  } catch {
    return null;
  }
};
