'use client';

/**
 * Edit Profile Client Component
 * Modern implementation with React Hook Form, Zod validation, React Query, and i18n
 */
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, InputText, Field, Card } from '@eventure/eventured';
import { useUpdateProfile } from '../_hooks/useUpdateProfile';
import { createProfileSchema, type ProfileFormData } from '../_schemas/profileSchema';
import { Styled } from './EditProfileClient.styles';

interface EditProfileClientProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function EditProfileClient({ user }: EditProfileClientProps) {
  const router = useRouter();
  const t = useTranslations('profile');

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Watch for password fields to determine if user is changing password
  // Use useWatch hook (React Compiler compatible)
  const newPassword = useWatch({ control, name: 'newPassword' });
  const currentPassword = useWatch({ control, name: 'currentPassword' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });
  const isChangingPassword = !!(newPassword || currentPassword || confirmPassword);

  // React Query mutation for profile update
  const mutation = useUpdateProfile();

  const onSubmit = (data: ProfileFormData) => {
    // Build update payload (only include changed fields)
    const updatePayload: {
      userId: string;
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
    } = {
      userId: user.id,
    };

    if (data.name !== user.name) {
      updatePayload.name = data.name;
    }

    if (data.email !== user.email) {
      updatePayload.email = data.email;
    }

    if (data.newPassword) {
      updatePayload.currentPassword = data.currentPassword;
      updatePayload.newPassword = data.newPassword;
    }

    // If no changes, show info toast and navigate back
    if (Object.keys(updatePayload).length === 1) {
      toast.info(t('errors.noChanges'));
      router.back();
      return;
    }

    mutation.mutate(updatePayload);
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>{t('editProfile')}</Styled.Title>
        <Button variant="tertiary" onClick={() => router.back()} disabled={mutation.isPending}>
          {t('actions.cancel')}
        </Button>
      </Styled.Header>

      <Styled.Content>
        <Card>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Information */}
            <Styled.Section>
              <Styled.SectionTitle>{t('basicInformation.title')}</Styled.SectionTitle>

              <Styled.InputGroup>
                <Field
                  label={t('labels.name')}
                  input={
                    <InputText
                      {...register('name')}
                      errorMessage={errors.name?.message}
                      isDisabled={mutation.isPending}
                      placeholder={t('placeholders.name')}
                    />
                  }
                />
              </Styled.InputGroup>

              <Styled.InputGroup>
                <Field
                  label={t('labels.email')}
                  input={
                    <InputText
                      type="email"
                      {...register('email')}
                      errorMessage={errors.email?.message}
                      isDisabled={mutation.isPending}
                      placeholder={t('placeholders.email')}
                    />
                  }
                />
              </Styled.InputGroup>
            </Styled.Section>

            {/* Change Password */}
            <Styled.Section>
              <Styled.SectionTitle>{t('changePassword.title')}</Styled.SectionTitle>
              <Styled.SectionDescription>
                {t('changePassword.description')}
              </Styled.SectionDescription>

              <Styled.InputGroup>
                <Field
                  label={t('labels.currentPassword')}
                  input={
                    <InputText
                      type="password"
                      {...register('currentPassword')}
                      errorMessage={errors.currentPassword?.message}
                      isDisabled={mutation.isPending}
                      placeholder={t('placeholders.currentPassword')}
                      hasPasswordToggle
                    />
                  }
                />
              </Styled.InputGroup>

              <Styled.InputGroup>
                <Field
                  label={t('labels.newPassword')}
                  input={
                    <InputText
                      type="password"
                      {...register('newPassword')}
                      errorMessage={errors.newPassword?.message}
                      isDisabled={mutation.isPending}
                      placeholder={t('placeholders.newPassword')}
                      hasPasswordToggle
                    />
                  }
                />
              </Styled.InputGroup>

              <Styled.InputGroup>
                <Field
                  label={t('labels.confirmPassword')}
                  input={
                    <InputText
                      type="password"
                      {...register('confirmPassword')}
                      errorMessage={errors.confirmPassword?.message}
                      isDisabled={mutation.isPending}
                      placeholder={t('placeholders.confirmPassword')}
                      hasPasswordToggle
                    />
                  }
                />
              </Styled.InputGroup>
            </Styled.Section>

            {/* Actions */}
            <Styled.Actions>
              <Button
                variant="tertiary"
                onClick={() => router.back()}
                disabled={mutation.isPending}
              >
                {t('actions.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={mutation.isPending || (!isDirty && !isChangingPassword)}
              >
                {mutation.isPending ? t('actions.saving') : t('actions.saveChanges')}
              </Button>
            </Styled.Actions>
          </Styled.Form>
        </Card>
      </Styled.Content>
    </Styled.Container>
  );
}
