import { z } from 'zod';

/**
 * Login form validation schema factory
 * Accepts translation function for i18n error messages
 */
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t('auth.login.validation.emailRequired'))
      .email(t('auth.login.validation.emailInvalid')),
    password: z
      .string()
      .min(1, t('auth.login.validation.passwordRequired'))
      .min(6, t('auth.login.validation.passwordMinLength'))
      .max(100, t('auth.login.validation.passwordMaxLength')),
    rememberMe: z.boolean().optional(),
  });

/**
 * Type inference from schema
 */
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
