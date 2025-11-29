---
applyTo: 'apps/{backoffice,frontoffice}/**/_hooks/*.ts,apps/{backoffice,frontoffice}/**/_services/*.ts'
---

# React Query Patterns

## Feature Structure (\_hooks, \_services, \_schemas)

**Pattern:** Separate concerns for maintainability and reusability

```
app/{feature}/
├── _components/       # UI components
├── _hooks/           # React Query hooks
├── _services/        # API client functions
├── _schemas/         # Zod validation schemas
└── _constants/       # Feature constants
```

## Service Layer (\_services/)

**Purpose:** Abstract API communication

```typescript
// apps/{app}/src/app/{feature}/_services/{feature}Service.ts
export interface UpdateData {
  userId: string;
  name?: string;
  email?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Update resource via server action or API
 */
export async function updateResource(data: UpdateData): Promise<ApiResponse> {
  // Import server action dynamically
  const { updateAction } = await import('@/actions/{feature}.actions');
  return updateAction(data);
}
```

**Rules:**

1. ✅ Export typed interfaces for request/response
2. ✅ Use descriptive function names: `createGroup`, `updateProfile`
3. ✅ Import server actions dynamically to avoid bundling issues
4. ✅ Handle errors at service level
5. ❌ Don't put business logic in services - keep them thin

## React Query Hooks (\_hooks/)

**Purpose:** Encapsulate mutations with side effects

```typescript
// apps/{app}/src/app/{feature}/_hooks/useUpdate{Feature}.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { updateResource, type UpdateData } from '../_services/{feature}Service';

interface UseUpdateOptions {
  onSuccessCallback?: () => void;
}

/**
 * Hook for updating resource
 * Handles success/error states with toast notifications
 */
export function useUpdate{Feature}(options?: UseUpdateOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('{feature}');

  return useMutation({
    mutationFn: (data: UpdateData) => updateResource(data),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error || t('errors.updateFailed'));
        return;
      }

      toast.success(t('success.updated'));

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['{feature}'] });

      // Custom callback
      options?.onSuccessCallback?.();

      // Navigate
      router.back();
      router.refresh();
    },
    onError: (error: Error) => {
      console.error('Update error:', error);
      toast.error(t('errors.unexpectedError'));
    },
  });
}
```

**Rules:**

1. ✅ Use `useMutation` for data changes
2. ✅ Handle success/error with toast notifications
3. ✅ Invalidate queries with `useQueryClient`
4. ✅ Accept optional callbacks for custom behavior
5. ✅ Use i18n translations for messages
6. ✅ Navigate with router after success
7. ❌ Don't put validation logic in hooks - use schemas

## Validation Schemas (\_schemas/)

**Purpose:** Centralize Zod validation logic

```typescript
// apps/{app}/src/app/{feature}/_schemas/{feature}Schema.ts
import { z } from 'zod';

/**
 * Creates validation schema with i18n support
 */
export const create{Feature}Schema = (t: (key: string) => string) =>
  z
    .object({
      name: z
        .string()
        .min(1, { message: t('validation.nameRequired') })
        .min(2, { message: t('validation.nameMin') }),
      email: z
        .string()
        .email({ message: t('validation.emailInvalid') }),
    })
    .superRefine((data, ctx) => {
      // Complex validation logic
      if (data.name === data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.nameEmailMatch'),
          path: ['name'],
        });
      }
    });

/**
 * Type inferred from schema
 */
export type {Feature}FormData = z.infer<ReturnType<typeof create{Feature}Schema>>;
```

**Rules:**

1. ✅ Export schema factory function accepting translation function
2. ✅ Use i18n keys for all validation messages
3. ✅ Export inferred type for form data
4. ✅ Use `superRefine` for complex cross-field validation
5. ❌ Don't hardcode error messages

## Component Usage

```typescript
// apps/{app}/src/app/{feature}/_components/{Feature}Form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useUpdate{Feature} } from '../_hooks/useUpdate{Feature}';
import { create{Feature}Schema, type {Feature}FormData } from '../_schemas/{feature}Schema';

export function {Feature}Form({ data }) {
  const t = useTranslations('{feature}');
  const mutation = useUpdate{Feature}();

  const { register, handleSubmit, formState: { errors } } = useForm<{Feature}FormData>({
    resolver: zodResolver(create{Feature}Schema(t)),
    defaultValues: data,
  });

  const onSubmit = (formData: {Feature}FormData) => {
    // Handle no changes case
    if (noChanges(formData, data)) {
      toast.info(t('errors.noChanges'));
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Critical Rules

1. ✅ **Always** separate into `_services`, `_hooks`, `_schemas`
2. ✅ Services: Thin wrappers around API calls
3. ✅ Hooks: Handle React Query mutations with side effects
4. ✅ Schemas: Centralize validation logic with i18n
5. ✅ Components: Use hooks and schemas, minimal logic
6. ✅ Invalidate queries after mutations
7. ❌ Never put mutation logic directly in components
8. ❌ Never duplicate validation logic
