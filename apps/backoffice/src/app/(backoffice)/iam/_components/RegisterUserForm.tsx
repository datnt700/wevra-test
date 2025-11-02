'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button, InputText, Select, Field, Card, Alert, Link } from '@tavia/taviad';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { Styled } from './RegisterUserForm.styles';
import { createRegisterUserSchema, type RegisterUserFormData } from '../_validations/registerUser';
import { useRegisterUser } from '../_hooks/useRegisterUser';
import { createRoleOptions } from '../_configs/roleOptions';

export function RegisterUserForm() {
  const t = useTranslations('iam');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'MANAGER' | 'EMPLOYEE' | undefined>();

  const registerUserMutation = useRegisterUser();
  const roleOptions = createRoleOptions(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(createRegisterUserSchema(t)),
  });

  const onSubmit = async (data: RegisterUserFormData) => {
    try {
      await registerUserMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      setShowSuccess(true);
    } catch {
      // Error is handled by React Query
      setShowSuccess(false);
    }
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.BackLinkWrapper>
          <Link url={ROUTES.IAM.LIST} variant="default">
            <ArrowLeft size={18} />
            {t('actions.back')}
          </Link>
        </Styled.BackLinkWrapper>
        <Styled.TitleWrapper>
          <UserPlus size={28} />
          <Styled.Title>{t('registerNew')}</Styled.Title>
        </Styled.TitleWrapper>
        <Styled.Subtitle>{t('registerSubtitle')}</Styled.Subtitle>
      </Styled.Header>

      <Card>
        <Styled.CardContent>
          {registerUserMutation.isError && (
            <Styled.AlertWrapper>
              <Alert
                variant="danger"
                title={t('messages.registerError')}
                description={
                  registerUserMutation.error instanceof Error
                    ? registerUserMutation.error.message
                    : t('messages.registerError')
                }
              />
            </Styled.AlertWrapper>
          )}

          {showSuccess && (
            <Styled.AlertWrapper>
              <Alert
                variant="success"
                title={t('messages.registerSuccess')}
                description={t('messages.redirecting')}
              />
            </Styled.AlertWrapper>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Styled.FormFields>
              {/* Name */}
              <Field
                label={t('form.fullName.label')}
                input={
                  <InputText
                    id="name"
                    placeholder={t('form.fullName.placeholder')}
                    errorMessage={errors.name?.message}
                    isDisabled={registerUserMutation.isPending}
                    {...register('name')}
                  />
                }
              />

              {/* Email */}
              <Field
                label={t('form.email.label')}
                input={
                  <InputText
                    id="email"
                    type="email"
                    placeholder={t('form.email.placeholder')}
                    errorMessage={errors.email?.message}
                    isDisabled={registerUserMutation.isPending}
                    {...register('email')}
                  />
                }
              />

              {/* Role */}
              <Field
                label={t('form.role.label')}
                input={
                  <Select
                    placeholder={t('form.role.placeholder')}
                    options={roleOptions}
                    value={selectedRole}
                    onValueChange={(value: string) => {
                      const role = value as 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
                      setSelectedRole(role);
                      setValue('role', role);
                    }}
                    isInvalid={!!errors.role}
                    isDisabled={registerUserMutation.isPending}
                  />
                }
              />

              {/* Password */}
              <Field
                label={t('form.password.label')}
                input={
                  <InputText
                    id="password"
                    type="password"
                    placeholder={t('form.password.placeholder')}
                    errorMessage={errors.password?.message}
                    isDisabled={registerUserMutation.isPending}
                    {...register('password')}
                  />
                }
              />

              {/* Confirm Password */}
              <Field
                label={t('form.confirmPassword.label')}
                input={
                  <InputText
                    id="confirmPassword"
                    type="password"
                    placeholder={t('form.confirmPassword.placeholder')}
                    errorMessage={errors.confirmPassword?.message}
                    isDisabled={registerUserMutation.isPending}
                    {...register('confirmPassword')}
                  />
                }
              />

              {/* Submit Button */}
              <Styled.ButtonGroup>
                <Styled.LinkWrapper href={ROUTES.IAM.LIST}>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={registerUserMutation.isPending}
                  >
                    {t('actions.cancel')}
                  </Button>
                </Styled.LinkWrapper>
                <Styled.SubmitButtonWrapper>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={registerUserMutation.isPending}
                    icon={<UserPlus size={18} />}
                  >
                    {t('actions.register')}
                  </Button>
                </Styled.SubmitButtonWrapper>
              </Styled.ButtonGroup>
            </Styled.FormFields>
          </form>
        </Styled.CardContent>
      </Card>
    </Styled.Container>
  );
}
