/**
 * Unit tests for roles constants
 */
import { describe, it, expect } from 'vitest';
import { USER_ROLES, isAdmin, isRestaurantOwner, hasBackofficeAccess } from '../roles';

describe('USER_ROLES', () => {
  it('should have ADMIN role', () => {
    expect(USER_ROLES.ADMIN).toBe('ADMIN');
  });

  it('should have RESTAURANT_OWNER role', () => {
    expect(USER_ROLES.RESTAURANT_OWNER).toBe('RESTAURANT_OWNER');
  });

  it('should have USER role', () => {
    expect(USER_ROLES.USER).toBe('USER');
  });

  it('should have exactly 3 roles', () => {
    expect(Object.keys(USER_ROLES)).toHaveLength(3);
  });

  it('should have unique role values', () => {
    const values = Object.values(USER_ROLES);
    expect(new Set(values).size).toBe(values.length);
  });
});

describe('isAdmin', () => {
  it('should return true for ADMIN role', () => {
    expect(isAdmin(USER_ROLES.ADMIN)).toBe(true);
  });

  it('should return false for RESTAURANT_OWNER role', () => {
    expect(isAdmin(USER_ROLES.RESTAURANT_OWNER)).toBe(false);
  });

  it('should return false for USER role', () => {
    expect(isAdmin(USER_ROLES.USER)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isAdmin(undefined)).toBe(false);
  });

  it('should return false for invalid role', () => {
    expect(isAdmin('INVALID')).toBe(false);
  });
});

describe('isRestaurantOwner', () => {
  it('should return true for RESTAURANT_OWNER role', () => {
    expect(isRestaurantOwner(USER_ROLES.RESTAURANT_OWNER)).toBe(true);
  });

  it('should return false for ADMIN role', () => {
    expect(isRestaurantOwner(USER_ROLES.ADMIN)).toBe(false);
  });

  it('should return false for USER role', () => {
    expect(isRestaurantOwner(USER_ROLES.USER)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isRestaurantOwner(undefined)).toBe(false);
  });

  it('should return false for invalid role', () => {
    expect(isRestaurantOwner('INVALID')).toBe(false);
  });
});

describe('hasBackofficeAccess', () => {
  it('should return true for ADMIN role', () => {
    expect(hasBackofficeAccess(USER_ROLES.ADMIN)).toBe(true);
  });

  it('should return true for RESTAURANT_OWNER role', () => {
    expect(hasBackofficeAccess(USER_ROLES.RESTAURANT_OWNER)).toBe(true);
  });

  it('should return false for USER role', () => {
    expect(hasBackofficeAccess(USER_ROLES.USER)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(hasBackofficeAccess(undefined)).toBe(false);
  });

  it('should return false for invalid role', () => {
    expect(hasBackofficeAccess('INVALID')).toBe(false);
  });
});
