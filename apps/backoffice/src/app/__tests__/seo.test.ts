import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import robots from '../robots';
import sitemap from '../sitemap';

describe('SEO Metadata', () => {
  let originalAppUrl: string | undefined;

  beforeEach(() => {
    originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
  });

  describe('robots.txt', () => {
    it('should return robots configuration', () => {
      const result = robots();

      expect(result).toBeDefined();
      expect(result.rules).toBeDefined();
      expect(result.sitemap).toBeDefined();
    });

    it('should allow all user agents', () => {
      const result = robots();

      expect(result.rules).toHaveLength(1);
      if (Array.isArray(result.rules) && result.rules[0]) {
        expect(result.rules[0].userAgent).toBe('*');
      }
    });

    it('should allow root path', () => {
      const result = robots();

      if (Array.isArray(result.rules) && result.rules[0]) {
        expect(result.rules[0].allow).toBe('/');
      }
    });

    it('should disallow api and admin paths', () => {
      const result = robots();

      if (Array.isArray(result.rules) && result.rules[0]) {
        expect(result.rules[0].disallow).toEqual(['/api/', '/admin/']);
      }
    });

    it('should use production URL when NEXT_PUBLIC_APP_URL is set', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
      const result = robots();

      expect(result.sitemap).toBe('https://example.com/sitemap.xml');
    });

    it('should use localhost when NEXT_PUBLIC_APP_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_APP_URL;
      const result = robots();

      expect(result.sitemap).toBe('http://localhost:3000/sitemap.xml');
    });

    it('should include sitemap.xml path', () => {
      const result = robots();

      expect(result.sitemap).toContain('/sitemap.xml');
    });

    it('should handle custom domain', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://tavia.io';
      const result = robots();

      expect(result.sitemap).toBe('https://tavia.io/sitemap.xml');
    });
  });

  describe('sitemap.xml', () => {
    it('should return sitemap array', () => {
      const result = sitemap();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should include root URL', () => {
      const result = sitemap();
      const rootEntry = result.find(
        (entry) => entry.url.endsWith('/') || !entry.url.includes('/', 8)
      );

      expect(rootEntry).toBeDefined();
    });

    it('should include about page', () => {
      const result = sitemap();
      const aboutEntry = result.find((entry) => entry.url.includes('/about'));

      expect(aboutEntry).toBeDefined();
    });

    it('should include contact page', () => {
      const result = sitemap();
      const contactEntry = result.find((entry) => entry.url.includes('/contact'));

      expect(contactEntry).toBeDefined();
    });

    it('should have 3 entries', () => {
      const result = sitemap();

      expect(result).toHaveLength(3);
    });

    it('should use production URL when NEXT_PUBLIC_APP_URL is set', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
      const result = sitemap();

      result.forEach((entry) => {
        expect(entry.url).toContain('https://example.com');
      });
    });

    it('should use localhost when NEXT_PUBLIC_APP_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_APP_URL;
      const result = sitemap();

      result.forEach((entry) => {
        expect(entry.url).toContain('http://localhost:3000');
      });
    });

    it('should have lastModified dates', () => {
      const result = sitemap();

      result.forEach((entry) => {
        expect(entry.lastModified).toBeDefined();
        expect(entry.lastModified).toBeInstanceOf(Date);
      });
    });

    it('should have changeFrequency for all entries', () => {
      const result = sitemap();

      result.forEach((entry) => {
        expect(entry.changeFrequency).toBeDefined();
        expect(['daily', 'monthly']).toContain(entry.changeFrequency);
      });
    });

    it('should have priority for all entries', () => {
      const result = sitemap();

      result.forEach((entry) => {
        expect(entry.priority).toBeDefined();
        expect(typeof entry.priority).toBe('number');
        expect(entry.priority).toBeGreaterThan(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      });
    });

    it('should have highest priority for root', () => {
      const result = sitemap();
      const rootEntry = result[0];

      if (rootEntry) {
        expect(rootEntry.priority).toBe(1);
      }
    });

    it('should have daily change frequency for root', () => {
      const result = sitemap();
      const rootEntry = result[0];

      if (rootEntry) {
        expect(rootEntry.changeFrequency).toBe('daily');
      }
    });

    it('should have monthly change frequency for about', () => {
      const result = sitemap();
      const aboutEntry = result[1];

      if (aboutEntry) {
        expect(aboutEntry.changeFrequency).toBe('monthly');
        expect(aboutEntry.priority).toBe(0.8);
      }
    });

    it('should have monthly change frequency for contact', () => {
      const result = sitemap();
      const contactEntry = result[2];

      if (contactEntry) {
        expect(contactEntry.changeFrequency).toBe('monthly');
        expect(contactEntry.priority).toBe(0.5);
      }
    });

    it('should handle custom domain for sitemap', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://tavia.io';
      const result = sitemap();

      if (result[0] && result[1] && result[2]) {
        expect(result[0].url).toBe('https://tavia.io');
        expect(result[1].url).toBe('https://tavia.io/about');
        expect(result[2].url).toBe('https://tavia.io/contact');
      }
    });
  });
});
