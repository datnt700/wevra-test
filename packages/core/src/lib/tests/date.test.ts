/**
 * Tests for date utility functions
 * Verifies date formatting, parsing, and edge case handling
 */

import { describe, it, expect } from 'vitest';
import { formatDate, formatDateObject, parseDateString } from '../date';

describe('date utilities', () => {
  describe('formatDate', () => {
    describe('Basic Functionality', () => {
      it('should format ISO date string with default format', () => {
        const result = formatDate('2025-10-16');
        expect(result).toBe('October 16, 2025');
      });

      it('should format ISO date string with custom format', () => {
        const result = formatDate('2025-10-16', 'MMM d, yyyy');
        expect(result).toBe('Oct 16, 2025');
      });

      it('should format ISO date with time', () => {
        const result = formatDate('2025-10-16T15:30:00Z');
        expect(result).toBe('October 16, 2025');
      });

      it('should format date with short month format', () => {
        const result = formatDate('2025-01-01', 'MM/dd/yyyy');
        expect(result).toBe('01/01/2025');
      });

      it('should format date with day of week', () => {
        const result = formatDate('2025-10-16', 'EEEE, MMMM d, yyyy');
        expect(result).toBe('Thursday, October 16, 2025');
      });
    });

    describe('Edge Cases', () => {
      it('should return empty string for empty input', () => {
        const result = formatDate('');
        expect(result).toBe('');
      });

      it('should return empty string for invalid date', () => {
        const result = formatDate('not-a-date');
        expect(result).toBe('');
      });

      it('should return empty string for malformed ISO string', () => {
        const result = formatDate('2025-13-45'); // Invalid month/day
        expect(result).toBe('');
      });

      it('should handle date at epoch start', () => {
        const result = formatDate('1970-01-01');
        expect(result).toBe('January 1, 1970');
      });

      it('should handle dates far in the future', () => {
        const result = formatDate('2999-12-31');
        expect(result).toBe('December 31, 2999');
      });

      it('should handle dates with milliseconds', () => {
        const result = formatDate('2025-10-16T15:30:45.123Z');
        expect(result).toBe('October 16, 2025');
      });
    });

    describe('Format Variations', () => {
      it('should format with year only', () => {
        const result = formatDate('2025-10-16', 'yyyy');
        expect(result).toBe('2025');
      });

      it('should format with month and year', () => {
        const result = formatDate('2025-10-16', 'MMMM yyyy');
        expect(result).toBe('October 2025');
      });

      it('should format with ISO 8601 format', () => {
        const result = formatDate('2025-10-16', 'yyyy-MM-dd');
        expect(result).toBe('2025-10-16');
      });

      it('should format with time included', () => {
        const result = formatDate('2025-10-16T15:30:00Z', "MMMM d, yyyy 'at' HH:mm");
        expect(result).toMatch(/October 16, 2025 at \d{2}:\d{2}/);
      });
    });
  });

  describe('formatDateObject', () => {
    describe('Basic Functionality', () => {
      it('should format Date object with default format', () => {
        const date = new Date('2025-10-16T00:00:00Z');
        const result = formatDateObject(date);
        expect(result).toBe('October 16, 2025');
      });

      it('should format Date object with custom format', () => {
        const date = new Date('2025-10-16T00:00:00Z');
        const result = formatDateObject(date, 'MM/dd/yyyy');
        expect(result).toBe('10/16/2025');
      });

      it('should format current date', () => {
        const date = new Date();
        const result = formatDateObject(date);
        expect(result).toMatch(/\w+ \d{1,2}, \d{4}/); // Matches "Month D, YYYY"
      });

      it('should format with short format', () => {
        const date = new Date('2025-01-05T00:00:00Z');
        const result = formatDateObject(date, 'MMM d, yy');
        expect(result).toBe('Jan 5, 25');
      });
    });

    describe('Edge Cases', () => {
      it('should return empty string for null date', () => {
        const result = formatDateObject(null as unknown as Date);
        expect(result).toBe('');
      });

      it('should return empty string for undefined date', () => {
        const result = formatDateObject(undefined as unknown as Date);
        expect(result).toBe('');
      });

      it('should return empty string for invalid Date object', () => {
        const invalidDate = new Date('invalid');
        const result = formatDateObject(invalidDate);
        expect(result).toBe('');
      });

      it('should handle Date at epoch', () => {
        const date = new Date(0);
        const result = formatDateObject(date);
        expect(result).toMatch(/January 1, 1970/);
      });

      it('should handle dates with timezone differences', () => {
        const date = new Date('2025-10-16T23:59:59Z');
        const result = formatDateObject(date);
        expect(result).toMatch(/October (16|17), 2025/); // Could be 16 or 17 depending on timezone
      });
    });

    describe('Format Variations', () => {
      it('should format with full date and time', () => {
        const date = new Date('2025-10-16T15:30:00Z');
        const result = formatDateObject(date, "MMMM d, yyyy 'at' HH:mm");
        expect(result).toMatch(/October 16, 2025 at \d{2}:\d{2}/);
      });

      it('should format with day of week', () => {
        const date = new Date('2025-10-16T00:00:00Z');
        const result = formatDateObject(date, 'EEEE');
        expect(result).toBe('Thursday');
      });

      it('should format with abbreviated day', () => {
        const date = new Date('2025-10-16T00:00:00Z');
        const result = formatDateObject(date, 'EEE, MMM d');
        expect(result).toBe('Thu, Oct 16');
      });
    });
  });

  describe('parseDateString', () => {
    describe('Basic Functionality', () => {
      it('should parse valid ISO date string', () => {
        const result = parseDateString('2025-10-16');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2025);
        expect(result?.getMonth()).toBe(9); // October = 9 (0-indexed)
        expect(result?.getDate()).toBe(16);
      });

      it('should parse ISO date with time', () => {
        const result = parseDateString('2025-10-16T15:30:00Z');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2025);
      });

      it('should parse date with milliseconds', () => {
        const result = parseDateString('2025-10-16T15:30:45.123Z');
        expect(result).toBeInstanceOf(Date);
      });

      it('should parse date at start of year', () => {
        const result = parseDateString('2025-01-01');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getMonth()).toBe(0); // January
      });

      it('should parse date at end of year', () => {
        const result = parseDateString('2025-12-31');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getMonth()).toBe(11); // December
      });
    });

    describe('Edge Cases', () => {
      it('should return null for empty string', () => {
        const result = parseDateString('');
        expect(result).toBeNull();
      });

      it('should return null for invalid date string', () => {
        const result = parseDateString('not-a-date');
        expect(result).toBeNull();
      });

      it('should return null for malformed ISO string', () => {
        const result = parseDateString('2025-13-45');
        expect(result).toBeNull();
      });

      it('should handle date at epoch', () => {
        const result = parseDateString('1970-01-01T00:00:00Z');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getTime()).toBe(0);
      });

      it('should handle dates far in the future', () => {
        const result = parseDateString('2999-12-31');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2999);
      });

      it('should return null for invalid date format', () => {
        const result = parseDateString('25/10/2025'); // Non-ISO format
        expect(result).toBeNull();
      });
    });

    describe('Return Values', () => {
      it('should return Date object with correct date components', () => {
        const result = parseDateString('2025-10-16T15:30:45Z');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2025);
        expect(result?.getMonth()).toBe(9); // October
        expect(result?.getDate()).toBe(16);
      });

      it('should return null for undefined input', () => {
        const result = parseDateString(undefined as unknown as string);
        expect(result).toBeNull();
      });

      it('should return null for null input', () => {
        const result = parseDateString(null as unknown as string);
        expect(result).toBeNull();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should format and parse roundtrip', () => {
      const originalDate = '2025-10-16';
      const parsed = parseDateString(originalDate);
      expect(parsed).not.toBeNull();

      const formatted = formatDateObject(parsed!, 'yyyy-MM-dd');
      expect(formatted).toBe('2025-10-16');
    });

    it('should handle format -> parse -> format chain', () => {
      const result1 = formatDate('2025-10-16', 'yyyy-MM-dd');
      const parsed = parseDateString(result1);
      const result2 = formatDateObject(parsed!, 'MMMM d, yyyy');

      expect(result2).toBe('October 16, 2025');
    });

    it('should handle different formats consistently', () => {
      const dateString = '2025-10-16';
      const parsed = parseDateString(dateString);

      const format1 = formatDateObject(parsed!, 'MMMM d, yyyy');
      const format2 = formatDate(dateString, 'MMMM d, yyyy');

      expect(format1).toBe(format2);
    });
  });
});
