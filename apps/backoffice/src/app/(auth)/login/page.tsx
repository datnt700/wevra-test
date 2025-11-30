/**
 * Login Page for Eventure Backoffice
 * Admin and Restaurant Owner authentication
 */
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  Button,
  InputText,
  Card,
  Alert,
  Link,
  Field,
  GoogleIcon,
  AppleIcon,
  FacebookIcon,
} from '@eventure/eventured';
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
        {/* Header */}
        <Styled.Header>
          <Styled.Title>{t('auth.login.title')}</Styled.Title>
          <Styled.Subtitle>{t('auth.login.description')}</Styled.Subtitle>
        </Styled.Header>

        {/* Login Card */}
        <Card variant="elevated">
          {/* Error Alert */}
          {/* OAuth Buttons */}
          <Styled.OAuthButtons>
            <Button
              variant="tertiary"
              onClick={() => signIn('google', { callbackUrl })}
              disabled={isLoading}
              icon={<GoogleIcon />}
            >
              {t('auth.login.continueWithGoogle')}
            </Button>

            <Button
              variant="tertiary"
              onClick={() => signIn('apple', { callbackUrl })}
              disabled={isLoading}
              icon={<AppleIcon />}
            >
              {t('auth.login.continueWithApple')}
            </Button>

            <Button
              variant="tertiary"
              onClick={() => signIn('facebook', { callbackUrl })}
              disabled={isLoading}
              icon={<FacebookIcon />}
            >
              {t('auth.login.continueWithFacebook')}
            </Button>
          </Styled.OAuthButtons>

          {/* Divider */}
          <Styled.Divider>
            <Styled.DividerText>{t('auth.login.orContinueWith')}</Styled.DividerText>
          </Styled.Divider>

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
                    hasPasswordToggle
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
