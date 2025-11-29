/**
 * Profile Service
 * API client functions for profile operations
 */

export interface UpdateProfileData {
  userId: string;
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ProfileResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
}

/**
 * Update user profile
 * Supports updating name, email, and/or password
 */
export async function updateProfile(data: UpdateProfileData): Promise<ProfileResponse> {
  // Import the server action dynamically to avoid bundling issues
  const { updateProfileAction } = await import('@/actions/profile.actions');

  return updateProfileAction(data);
}
