/**
 * Register Page for Tavia Frontoffice
 * Attendee registration with credentials
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
} from '@tavia/taviad';
import { Styled } from './RegisterPage.styles';
import { createRegisterSchema, type RegisterFormData } from './_validations/registerSchema';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError('');
    setIsLoading(true);

    try {
      // Register new user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setRegisterError(error.message || t('auth.register.errors.registrationFailed'));
        setIsLoading(false);
        return;
      }

      // Auto sign in after registration
      const signInResponse = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        setRegisterError(t('auth.register.errors.autoSignInFailed'));
        // Redirect to login page on auto sign-in failure
        setTimeout(() => router.push('/login'), 2000);
      } else if (signInResponse?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setRegisterError(t('auth.register.errors.unexpectedError'));
      console.error('Registration error:', error);
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
        </Styled.Header>

        {/* Register Card */}
        <Card variant="elevated">
          <Styled.CardHeader>
            <Styled.Title>{t('auth.register.title')}</Styled.Title>
            <Styled.Description>{t('auth.register.description')}</Styled.Description>
          </Styled.CardHeader>

          {/* OAuth Buttons */}
          <Styled.OAuthButtons>
            <Button
              variant="tertiary"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              disabled={isLoading}
              icon={<GoogleIcon />}
            >
              {t('auth.register.continueWithGoogle')}
            </Button>

            <Button
              variant="tertiary"
              onClick={() => signIn('apple', { callbackUrl: '/' })}
              disabled={isLoading}
              icon={<AppleIcon />}
            >
              {t('auth.register.continueWithApple')}
            </Button>

            <Button
              variant="tertiary"
              onClick={() => signIn('facebook', { callbackUrl: '/' })}
              disabled={isLoading}
              icon={<FacebookIcon />}
            >
              {t('auth.register.continueWithFacebook')}
            </Button>
          </Styled.OAuthButtons>

          {/* Divider */}
          <Styled.Divider>
            <Styled.DividerText>{t('auth.register.orRegisterWith')}</Styled.DividerText>
          </Styled.Divider>

          {/* Error Alert */}
          {registerError && (
            <Styled.AlertWrapper>
              <Alert
                variant="danger"
                title={t('auth.register.errors.registrationFailed')}
                description={registerError}
              />
            </Styled.AlertWrapper>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Styled.FormFields>
              {/* Name Field */}
              <Field
                label={t('auth.register.nameLabel')}
                input={
                  <InputText
                    id="name"
                    type="text"
                    placeholder={t('auth.register.namePlaceholder')}
                    errorMessage={errors.name?.message}
                    isDisabled={isLoading}
                    autoComplete="name"
                    {...register('name')}
                  />
                }
              />

              {/* Email Field */}
              <Field
                label={t('auth.register.emailLabel')}
                input={
                  <InputText
                    id="email"
                    type="email"
                    placeholder={t('auth.register.emailPlaceholder')}
                    errorMessage={errors.email?.message}
                    isDisabled={isLoading}
                    autoComplete="email"
                    {...register('email')}
                  />
                }
              />

              {/* Password Field */}
              <Field
                label={t('auth.register.passwordLabel')}
                input={
                  <InputText
                    id="password"
                    type="password"
                    placeholder={t('auth.register.passwordPlaceholder')}
                    errorMessage={errors.password?.message}
                    isDisabled={isLoading}
                    autoComplete="new-password"
                    {...register('password')}
                  />
                }
              />

              {/* Confirm Password Field */}
              <Field
                label={t('auth.register.confirmPasswordLabel')}
                input={
                  <InputText
                    id="confirmPassword"
                    type="password"
                    placeholder={t('auth.register.confirmPasswordPlaceholder')}
                    errorMessage={errors.confirmPassword?.message}
                    isDisabled={isLoading}
                    autoComplete="new-password"
                    {...register('confirmPassword')}
                  />
                }
              />

              {/* Submit Button */}
              <Button type="submit" variant="primary" isLoading={isLoading}>
                {t('auth.register.createAccountButton')}
              </Button>
            </Styled.FormFields>
          </form>

          {/* Footer */}
          <Styled.CardFooter>
            {t('auth.register.haveAccount')}{' '}
            <Link url="/login" variant="monochrome">
              {t('auth.register.signIn')}
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
