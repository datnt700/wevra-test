/**
 * Unit tests for routes constants
 */
import { describe, it, expect } from 'vitest';
import { ROUTES } from '../routes';

describe('ROUTES', () => {
  describe('AUTH routes', () => {
    it('should have LOGIN route', () => {
      expect(ROUTES.AUTH.LOGIN).toBe('/login');
    });

    it('should have REGISTER route', () => {
      expect(ROUTES.AUTH.REGISTER).toBe('/register');
    });

    it('should have FORGOT_PASSWORD route', () => {
      expect(ROUTES.AUTH.FORGOT_PASSWORD).toBe('/forgot-password');
    });
  });

  describe('DASHBOARD routes', () => {
    it('should have HOME route', () => {
      expect(ROUTES.DASHBOARD.HOME).toBe('/dashboard');
    });
  });

  describe('RESTAURANT routes', () => {
    it('should have LIST route', () => {
      expect(ROUTES.RESTAURANT.LIST).toBe('/restaurants');
    });

    it('should have NEW route', () => {
      expect(ROUTES.RESTAURANT.NEW).toBe('/restaurants/new');
    });

    it('should generate DETAIL route with ID', () => {
      expect(ROUTES.RESTAURANT.DETAIL('123')).toBe('/restaurants/123');
    });

    it('should generate EDIT route with ID', () => {
      expect(ROUTES.RESTAURANT.EDIT('456')).toBe('/restaurants/456/edit');
    });
  });

  describe('BOOKING routes', () => {
    it('should have LIST route', () => {
      expect(ROUTES.BOOKING.LIST).toBe('/bookings');
    });

    it('should generate DETAIL route with ID', () => {
      expect(ROUTES.BOOKING.DETAIL('789')).toBe('/bookings/789');
    });
  });

  describe('TABLE routes', () => {
    it('should have LIST route', () => {
      expect(ROUTES.TABLE.LIST).toBe('/tables');
    });

    it('should generate DETAIL route with ID', () => {
      expect(ROUTES.TABLE.DETAIL('abc')).toBe('/tables/abc');
    });
  });

  describe('SETTINGS routes', () => {
    it('should have HOME route', () => {
      expect(ROUTES.SETTINGS.HOME).toBe('/settings');
    });
  });

  describe('Route functions with special characters', () => {
    it('should handle IDs with special characters', () => {
      expect(ROUTES.RESTAURANT.DETAIL('test-123')).toBe('/restaurants/test-123');
      expect(ROUTES.BOOKING.DETAIL('booking_456')).toBe('/bookings/booking_456');
    });

    it('should handle empty string IDs', () => {
      expect(ROUTES.RESTAURANT.DETAIL('')).toBe('/restaurants/');
      expect(ROUTES.RESTAURANT.EDIT('')).toBe('/restaurants//edit');
    });
  });
});
