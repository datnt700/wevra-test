import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { redirect } from 'next/navigation';
import HomePage from '@/app/page';
import { auth } from '@/lib/auth';
import type { Session } from 'next-auth';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Mock auth
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

const mockAuth = auth as unknown as MockedFunction<() => Promise<Session | null>>;

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to dashboard when user is authenticated', async () => {
    // Mock authenticated session
    const mockSession: Session = {
      user: { id: '1', email: 'admin@tavia.io', role: 'ADMIN' },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    mockAuth.mockResolvedValue(mockSession);

    await HomePage();

    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });

  it('should redirect to login when user is not authenticated', async () => {
    // Mock no session
    mockAuth.mockResolvedValue(null);

    await HomePage();

    expect(redirect).toHaveBeenCalledWith('/login');
  });
});
