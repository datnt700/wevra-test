/**
 * IAM API Service
 * Handles all IAM-related API calls
 */

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
};

export type RegisterUserResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

/**
 * Register a new user
 */
export async function registerUser(payload: RegisterUserPayload): Promise<RegisterUserResponse> {
  const response = await fetch('/api/iam/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to register user');
  }

  return result;
}
