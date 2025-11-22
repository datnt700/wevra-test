import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setLocale } from '../locale';
import { locales } from '@/i18n/config';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock next/headers
const mockCookieSet = vi.fn();
const mockCookies = vi.fn(() => ({
  set: mockCookieSet,
}));

vi.mock('next/headers', () => ({
  cookies: () => mockCookies(),
}));

describe('setLocale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set locale cookie for valid locale (en)', async () => {
    await setLocale('en');

    expect(mockCookies).toHaveBeenCalledTimes(1);
    expect(mockCookieSet).toHaveBeenCalledTimes(1);
    expect(mockCookieSet).toHaveBeenCalledWith(
      'NEXT_LOCALE',
      'en',
      expect.objectContaining({
        path: '/',
        sameSite: 'lax',
      })
    );
  });

  it('should set locale cookie for valid locale (vi)', async () => {
    await setLocale('vi');

    expect(mockCookies).toHaveBeenCalledTimes(1);
    expect(mockCookieSet).toHaveBeenCalledTimes(1);
    expect(mockCookieSet).toHaveBeenCalledWith(
      'NEXT_LOCALE',
      'vi',
      expect.objectContaining({
        path: '/',
        sameSite: 'lax',
      })
    );
  });

  it('should set cookie with expiration date (1 year)', async () => {
    const beforeTime = Date.now();
    await setLocale('en');
    const afterTime = Date.now();

    const callArgs = mockCookieSet.mock.calls[0];
    const options = callArgs?.[2] as { expires: Date };
    const expirationTime = options.expires.getTime();

    // Cookie should expire approximately 1 year from now
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    const expectedMin = beforeTime + oneYearMs;
    const expectedMax = afterTime + oneYearMs;

    expect(expirationTime).toBeGreaterThanOrEqual(expectedMin);
    expect(expirationTime).toBeLessThanOrEqual(expectedMax);
  });

  it('should throw error for invalid locale', async () => {
    await expect(setLocale('fr' as any)).rejects.toThrow('Invalid locale');
    expect(mockCookieSet).not.toHaveBeenCalled();
  });

  it('should throw error for empty locale', async () => {
    await expect(setLocale('' as any)).rejects.toThrow('Invalid locale');
    expect(mockCookieSet).not.toHaveBeenCalled();
  });

  it('should only accept locales from config', async () => {
    // Test all valid locales from config
    for (const locale of locales) {
      await setLocale(locale);
      expect(mockCookieSet).toHaveBeenCalledWith('NEXT_LOCALE', locale, expect.any(Object));
      mockCookieSet.mockClear();
    }
  });

  it('should set cookie with correct sameSite policy', async () => {
    await setLocale('en');

    const callArgs = mockCookieSet.mock.calls[0];
    const options = callArgs?.[2] as { sameSite: string };

    expect(options.sameSite).toBe('lax');
  });

  it('should set cookie with root path', async () => {
    await setLocale('en');

    const callArgs = mockCookieSet.mock.calls[0];
    const options = callArgs?.[2] as { path: string };

    expect(options.path).toBe('/');
  });
});
