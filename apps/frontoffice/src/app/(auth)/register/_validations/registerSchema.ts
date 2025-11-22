import { z } from 'zod';

export const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z
        .string()
        .min(2, { message: t('auth.register.errors.nameMin') })
        .max(50, { message: t('auth.register.errors.nameMax') }),
      email: z.string().email({ message: t('auth.register.errors.invalidEmail') }),
      password: z
        .string()
        .min(8, { message: t('auth.register.errors.passwordMin') })
        .regex(/[A-Z]/, { message: t('auth.register.errors.passwordUppercase') })
        .regex(/[a-z]/, { message: t('auth.register.errors.passwordLowercase') })
        .regex(/[0-9]/, { message: t('auth.register.errors.passwordNumber') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.register.errors.passwordMismatch'),
      path: ['confirmPassword'],
    });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
