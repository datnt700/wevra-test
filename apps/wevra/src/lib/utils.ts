/**
 * Utility functions
 *
 * Add your helper functions here
 */

/**
 * Format a date for display
 */
export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Safe URL construction with error handling
 */
export function safeUrl(url: string): { success: boolean; url?: URL; error?: string } {
  try {
    const urlObj = new URL(url);
    return { success: true, url: urlObj };
  } catch {
    return { success: false, error: 'Invalid URL format' };
  }
}
