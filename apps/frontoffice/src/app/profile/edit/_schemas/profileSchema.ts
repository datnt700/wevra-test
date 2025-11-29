/**
 * Profile form validation schema
 */

import { z } from 'zod';

/**
 * Creates a Zod validation schema for profile form with i18n support
 * @param t - Translation function from useTranslations
 */
export const createProfileSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z
        .string()
        .min(1, { message: t('validation.nameRequired') })
        .min(2, { message: t('validation.nameMin') }),
      email: z
        .string()
        .min(1, { message: t('validation.emailRequired') })
        .email({ message: t('validation.emailInvalid') }),
      currentPassword: z.string().optional(),
      newPassword: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      // If any password field is filled, validate password change flow
      const hasPasswordFields = data.currentPassword || data.newPassword || data.confirmPassword;

      if (hasPasswordFields) {
        // Current password is required
        if (!data.currentPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.currentPasswordRequired'),
            path: ['currentPassword'],
          });
        }

        // New password is required
        if (!data.newPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.newPasswordRequired'),
            path: ['newPassword'],
          });
        }

        // Validate new password strength
        if (data.newPassword && data.newPassword.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.passwordMin'),
            path: ['newPassword'],
          });
        }

        if (data.newPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.passwordStrength'),
            path: ['newPassword'],
          });
        }

        // Confirm password must match
        if (data.newPassword !== data.confirmPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.passwordMatch'),
            path: ['confirmPassword'],
          });
        }
      }
    });

/**
 * Profile form data type inferred from the schema
 */
export type ProfileFormData = z.infer<ReturnType<typeof createProfileSchema>>;
