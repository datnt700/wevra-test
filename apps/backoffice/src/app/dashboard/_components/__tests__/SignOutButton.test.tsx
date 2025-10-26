import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignOutButton } from '../SignOutButton';
import { ROUTES } from '@/lib/constants';

// Mock next-auth
const mockSignOut = vi.fn();
vi.mock('next-auth/react', () => ({
  signOut: (options?: { callbackUrl?: string }) => mockSignOut(options),
}));

// Mock @tavia/core Button
vi.mock('@tavia/core', () => ({
  Button: ({
    children,
    onClick,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
  }) => (
    <button data-variant={variant} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('SignOutButton', () => {
  it('should render sign out button', () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it('should have secondary variant', () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
  });

  it('should call signOut when clicked', async () => {
    const user = userEvent.setup();
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    await user.click(button);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it('should call signOut with login route as callback', async () => {
    const user = userEvent.setup();
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    await user.click(button);

    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: ROUTES.AUTH.LOGIN,
    });
  });

  it('should display correct text', () => {
    render(<SignOutButton />);

    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
});
