import { describe, it, expect } from 'vitest';
import { createLoginSchema } from '../loginSchema';

// Mock translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'auth.login.validation.emailRequired': 'Email is required',
    'auth.login.validation.emailInvalid': 'Invalid email format',
    'auth.login.validation.passwordRequired': 'Password is required',
    'auth.login.validation.passwordMinLength': 'Password must be at least 6 characters',
    'auth.login.validation.passwordMaxLength': 'Password must be at most 100 characters',
  };
  return translations[key] || key;
};

describe('createLoginSchema', () => {
  const schema = createLoginSchema(t);

  describe('email validation', () => {
    it('should validate correct email', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
    });

    it('should fail when email is empty', () => {
      const result = schema.safeParse({
        email: '',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Email is required');
      }
    });

    it('should fail when email format is invalid', () => {
      const result = schema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Invalid email format');
      }
    });
  });

  describe('password validation', () => {
    it('should validate correct password', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
    });

    it('should fail when password is empty', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Password is required');
      }
    });

    it('should fail when password is too short', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: '12345',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Password must be at least 6 characters');
      }
    });

    it('should fail when password is too long', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'a'.repeat(101),
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Password must be at most 100 characters');
      }
    });

    it('should validate password with exactly 6 characters', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: '123456',
      });

      expect(result.success).toBe(true);
    });

    it('should validate password with exactly 100 characters', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'a'.repeat(100),
      });

      expect(result.success).toBe(true);
    });
  });

  describe('rememberMe field', () => {
    it('should accept rememberMe as true', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.rememberMe).toBe(true);
      }
    });

    it('should accept rememberMe as false', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.rememberMe).toBe(false);
      }
    });

    it('should work without rememberMe field (optional)', () => {
      const result = schema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.rememberMe).toBeUndefined();
      }
    });
  });

  describe('complete validation', () => {
    it('should validate complete valid data', () => {
      const validData = {
        email: 'admin@tavia.com',
        password: 'securePassword123',
        rememberMe: true,
      };

      const result = schema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should fail with multiple validation errors', () => {
      const result = schema.safeParse({
        email: 'invalid-email',
        password: '123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.length).toBeGreaterThan(0);
      }
    });
  });
});
