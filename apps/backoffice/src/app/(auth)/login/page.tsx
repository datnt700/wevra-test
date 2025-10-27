/**
 * Login Page for Tavia Backoffice
 * Admin and Restaurant Owner authentication
 */
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button, InputText, Card, Alert, Link, Field } from '@tavia/taviad';
import { Styled } from './LoginPage.styles';
import { createLoginSchema, type LoginFormData } from './_validations/loginSchema';
import { ROUTES } from '@/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || ROUTES.DASHBOARD.HOME;
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        // Auth.js returns error as a string
        const errorMessage =
          typeof response.error === 'string'
            ? response.error
            : t('auth.login.errors.invalidCredentials');
        setLoginError(errorMessage);
      } else if (response?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      setLoginError(t('auth.login.errors.unexpectedError'));
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Container>
      <Styled.Wrapper>
        {/* Logo and Header */}
        <Styled.Header>
          <Styled.Logo>{t('common.appName')}</Styled.Logo>
          <Styled.Subtitle>{t('auth.login.subtitle')}</Styled.Subtitle>
        </Styled.Header>

        {/* Login Card */}
        <Card variant="elevated">
          <Styled.CardHeader>
            <Styled.Title>{t('auth.login.title')}</Styled.Title>
            <Styled.Description>{t('auth.login.description')}</Styled.Description>
          </Styled.CardHeader>

          {/* Error Alert */}
          {loginError && (
            <Styled.AlertWrapper>
              <Alert
                variant="danger"
                title={t('auth.login.errors.loginFailed')}
                description={loginError}
              />
            </Styled.AlertWrapper>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Styled.FormFields>
              {/* Email Field */}
              <Field
                label={t('auth.login.emailLabel')}
                input={
                  <InputText
                    id="email"
                    type="email"
                    placeholder={t('auth.login.emailPlaceholder')}
                    errorMessage={errors.email?.message}
                    isDisabled={isLoading}
                    autoComplete="email"
                    {...register('email')}
                  />
                }
              />

              {/* Password Field */}
              <Field
                label={t('auth.login.passwordLabel')}
                input={
                  <InputText
                    id="password"
                    type="password"
                    placeholder={t('auth.login.passwordPlaceholder')}
                    errorMessage={errors.password?.message}
                    isDisabled={isLoading}
                    autoComplete="current-password"
                    {...register('password')}
                  />
                }
              />

              {/* Remember Me & Forgot Password */}
              <Styled.RememberRow>
                {/* TODO: Re-enable when Checkbox Emotion issue is fixed */}
                {/* <Checkbox
                  id="rememberMe"
                  label={t('auth.login.rememberMe')}
                  checked={rememberMe}
                  onCheckedChange={(checked) => setValue('rememberMe', !!checked)}
                  isDisabled={isLoading}
                /> */}
                <div></div>
                <Link url={ROUTES.AUTH.FORGOT_PASSWORD} variant="monochrome">
                  {t('auth.login.forgotPassword')}
                </Link>
              </Styled.RememberRow>

              {/* Submit Button */}
              <Button type="submit" variant="primary" isLoading={isLoading}>
                {t('auth.login.signInButton')}
              </Button>
            </Styled.FormFields>
          </form>

          {/* Divider */}
          <Styled.Divider />

          {/* Footer */}
          <Styled.CardFooter>
            {t('auth.login.noAccount')}{' '}
            <Link url={ROUTES.AUTH.REGISTER} variant="monochrome">
              {t('auth.login.contactUs')}
            </Link>
          </Styled.CardFooter>
        </Card>

        {/* Copyright */}
        <Styled.Copyright>
          {t('auth.login.copyright', { year: new Date().getFullYear() })}
        </Styled.Copyright>
      </Styled.Wrapper>
    </Styled.Container>
  );
}
