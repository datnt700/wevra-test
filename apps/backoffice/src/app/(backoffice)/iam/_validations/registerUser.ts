import { z } from 'zod';

/**
 * Register User Validation Schema Factory
 * Creates a schema with i18n validation messages
 */
export const createRegisterUserSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t('validation.nameMin')),
      email: z.string().email(t('validation.emailInvalid')),
      password: z.string().min(8, t('validation.passwordMin')),
      confirmPassword: z.string(),
      role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE'], {
        required_error: t('validation.roleRequired'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordMismatch'),
      path: ['confirmPassword'],
    });

export type RegisterUserFormData = z.infer<ReturnType<typeof createRegisterUserSchema>>;
