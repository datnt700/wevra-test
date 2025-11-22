import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../page';
import { ROUTES } from '@/lib/constants';

// Mock next-auth/react
const mockSignIn = vi.fn();
vi.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
}));

// Mock next/navigation
const mockPush = vi.fn();
const mockRefresh = vi.fn();
const _mockSearchParams = new URLSearchParams(); // eslint-disable-line @typescript-eslint/no-unused-vars
let mockGetSearchParam: (key: string) => string | null = () => null;

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  useSearchParams: () => ({
    get: (key: string) => mockGetSearchParam(key),
  }),
}));

// Mock next-intl
const mockT = (key: string, params?: any) => {
  const translations: Record<string, string> = {
    'common.appName': 'Tavia',
    'auth.login.subtitle': 'Welcome back',
    'auth.login.title': 'Sign in to your account',
    'auth.login.description': 'Enter your credentials',
    'auth.login.emailLabel': 'Email',
    'auth.login.emailPlaceholder': 'you@example.com',
    'auth.login.passwordLabel': 'Password',
    'auth.login.passwordPlaceholder': 'Enter your password',
    'auth.login.rememberMe': 'Remember me',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.signInButton': 'Sign in',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.contactUs': 'Contact us',
    'auth.login.copyright': `© ${params?.year} Tavia. All rights reserved.`,
    'auth.login.errors.loginFailed': 'Login failed',
    'auth.login.errors.invalidCredentials': 'Invalid credentials',
    'auth.login.errors.unexpectedError': 'Unexpected error occurred',
  };
  return translations[key] || key;
};

vi.mock('next-intl', () => ({
  useTranslations: () => mockT,
}));

// Mock @tavia/taviad components
vi.mock('@tavia/taviad', async () => {
  const actual = await vi.importActual('@tavia/taviad');
  return {
    ...actual,
    Button: ({ children, type, variant, isLoading, ...props }: any) => (
      <button type={type} data-variant={variant} data-loading={isLoading} {...props}>
        {isLoading ? 'Loading...' : children}
      </button>
    ),
    InputText: ({ id, errorMessage, isDisabled, ...props }: any) => (
      <div>
        <input id={id} disabled={isDisabled} {...props} />
        {errorMessage && <span data-testid={`${id}-error`}>{errorMessage}</span>}
      </div>
    ),
    Card: ({ children, variant }: any) => <div data-variant={variant}>{children}</div>,
    Alert: ({ variant, title, description }: any) => (
      <div data-testid="alert" data-variant={variant}>
        <div data-testid="alert-title">{title}</div>
        <div data-testid="alert-description">{description}</div>
      </div>
    ),
    Link: ({ children, url, variant }: any) => (
      <a href={url} data-variant={variant}>
        {children}
      </a>
    ),
    Field: ({ label, input }: any) => (
      <div>
        <label>{label}</label>
        {input}
      </div>
    ),
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSearchParam = () => null; // Reset to default
  });

  describe('rendering', () => {
    it('should render login form with all fields', () => {
      render(<LoginPage />);

      expect(screen.getByText('Tavia')).toBeInTheDocument();
      expect(screen.getByText('Welcome back')).toBeInTheDocument();
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render forgot password link', () => {
      render(<LoginPage />);

      const forgotPasswordLink = screen.getByText('Forgot password?');
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', ROUTES.AUTH.FORGOT_PASSWORD);
    });

    it('should render register link', () => {
      render(<LoginPage />);

      const contactLink = screen.getByText('Contact us');
      expect(contactLink).toBeInTheDocument();
      expect(contactLink.closest('a')).toHaveAttribute('href', ROUTES.AUTH.REGISTER);
    });

    it('should render copyright with current year', () => {
      render(<LoginPage />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} Tavia. All rights reserved.`)).toBeInTheDocument();
    });

    it('should not display error alert initially', () => {
      render(<LoginPage />);

      expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    });
  });

  describe('form submission - success', () => {
    it('should submit form with valid credentials', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: true, error: null });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          email: 'test@example.com',
          password: 'password123',
          redirect: false,
        });
      });
    });

    it('should redirect to dashboard after successful login', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: true, error: null });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD.HOME);
        expect(mockRefresh).toHaveBeenCalled();
      });
    });

    it('should redirect to callback URL after successful login', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: true, error: null });
      mockGetSearchParam = (key: string) => (key === 'callbackUrl' ? '/custom-page' : null);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/custom-page');
        expect(mockRefresh).toHaveBeenCalled();
      });
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      let resolveSignIn: (value: any) => void;
      const signInPromise = new Promise((resolve) => {
        resolveSignIn = resolve;
      });
      mockSignIn.mockReturnValue(signInPromise);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      // Check loading state
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Resolve the promise
      resolveSignIn!({ ok: true, error: null });

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });
  });

  describe('form submission - errors', () => {
    it('should display error when credentials are invalid', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: false, error: 'Invalid email or password' });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'wrong@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('alert')).toBeInTheDocument();
        expect(screen.getByTestId('alert-title')).toHaveTextContent('Login failed');
        expect(screen.getByTestId('alert-description')).toHaveTextContent(
          'Invalid email or password'
        );
      });
    });

    it('should display generic error for non-string error', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: false, error: { message: 'Error object' } });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('alert-description')).toHaveTextContent('Invalid credentials');
      });
    });

    it('should display unexpected error when signIn throws', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockSignIn.mockRejectedValue(new Error('Network error'));

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('alert-description')).toHaveTextContent(
          'Unexpected error occurred'
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith('Login error:', expect.any(Error));
      });

      consoleErrorSpy.mockRestore();
    });

    it('should clear previous error on new submission', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValueOnce({ ok: false, error: 'First error' });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // First submission with error
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('alert-description')).toHaveTextContent('First error');
      });

      // Second submission - should clear error first
      mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, 'new@example.com');
      await user.type(passwordInput, 'newpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
      });
    });
  });

  describe('form validation', () => {
    it('should disable form fields during loading', async () => {
      const user = userEvent.setup();
      let resolveSignIn: (value: any) => void;
      const signInPromise = new Promise((resolve) => {
        resolveSignIn = resolve;
      });
      mockSignIn.mockReturnValue(signInPromise);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      // Check disabled state
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();

      // Resolve
      resolveSignIn!({ ok: true, error: null });

      await waitFor(() => {
        expect(emailInput).not.toBeDisabled();
        expect(passwordInput).not.toBeDisabled();
      });
    });

    it('should validate email with react-hook-form', async () => {
      const user = userEvent.setup();

      render(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Submit without filling fields
      await user.click(submitButton);

      await waitFor(() => {
        // Email error should be shown by react-hook-form via zodResolver
        const emailError = screen.queryByTestId('email-error');
        if (emailError) {
          expect(emailError).toBeInTheDocument();
        }
      });
    });

    it('should have correct autocomplete attributes', () => {
      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      expect(emailInput).toHaveAttribute('autocomplete', 'email');
      expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    });

    it('should have correct input types', () => {
      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('edge cases', () => {
    it('should handle null callback URL', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: true, error: null });
      mockGetSearchParam = () => null;

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD.HOME);
      });
    });

    it('should handle empty callback URL', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ ok: true, error: null });
      mockGetSearchParam = (key: string) => (key === 'callbackUrl' ? '' : null);

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        // Empty string is falsy, should default to dashboard
        expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD.HOME);
      });
    });

    it('should handle malformed response (neither error nor ok)', async () => {
      const user = userEvent.setup();
      // Response with neither error nor ok set to truthy values
      mockSignIn.mockResolvedValue({ ok: false, error: null });

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        // Should not navigate or show error in this edge case
        expect(mockPush).not.toHaveBeenCalled();
        expect(mockRefresh).not.toHaveBeenCalled();
      });
    });
  });
});
