import { z } from 'zod';

/**
 * Login form validation schema
 * Uses Zod for runtime type validation
 */
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('auth.login.errors.emailRequired') })
      .email({ message: t('auth.login.errors.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('auth.login.errors.passwordRequired') })
      .min(6, { message: t('auth.login.errors.passwordMin') }),
    rememberMe: z.boolean().optional(),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
