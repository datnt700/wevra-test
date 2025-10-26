import { describe, it, expect } from 'vitest';
import { formatDate, isValidEmail, truncateText } from '../utils';

describe('formatDate', () => {
  it('should format date in English', () => {
    const date = new Date('2025-01-15');
    const result = formatDate(date, 'en');
    expect(result).toContain('January');
    expect(result).toContain('2025');
  });

  it('should format date in Vietnamese', () => {
    const date = new Date('2025-01-15');
    const result = formatDate(date, 'vi');
    expect(result).toBeTruthy();
    expect(result).toContain('2025');
  });

  it('should use English as default locale', () => {
    const date = new Date('2025-12-25');
    const result = formatDate(date);
    expect(result).toContain('December');
  });
});

describe('isValidEmail', () => {
  it('should return true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('test @example.com')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('truncateText', () => {
  it('should truncate text longer than max length', () => {
    const text = 'This is a very long text that needs truncation';
    const result = truncateText(text, 20);
    expect(result).toBe('This is a very lo...');
    expect(result.length).toBe(20);
  });

  it('should not truncate text shorter than max length', () => {
    const text = 'Short text';
    const result = truncateText(text, 20);
    expect(result).toBe('Short text');
  });

  it('should handle edge case when text length equals max length', () => {
    const text = 'Exact length';
    const result = truncateText(text, 12);
    expect(result).toBe('Exact length');
  });
});
