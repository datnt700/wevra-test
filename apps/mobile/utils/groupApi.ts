/**
 * Group API Service
 * Mobile API client for group operations
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GroupDetail, ActionResponse, MembershipStatus } from '@eventure/database';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3003';

interface GroupDetailResponse {
  group: GroupDetail;
  membershipStatus: MembershipStatus | null;
  isOwner: boolean;
}

async function getAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

/**
 * Fetch group details
 */
export async function fetchGroupDetail(groupId: string): Promise<GroupDetailResponse> {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}/api/groups/${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch group' }));
    throw new Error(errorData.error || 'Failed to fetch group');
  }

  return response.json();
}

/**
 * Join a group
 */
export async function joinGroup(groupId: string): Promise<ActionResponse> {
  const token = await getAuthToken();

  if (!token) {
    return { success: false, error: 'Authentication required' };
  }

  const response = await fetch(`${API_URL}/api/groups/${groupId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to join group' }));
    return { success: false, error: errorData.error || 'Failed to join group' };
  }

  return response.json();
}

/**
 * Leave a group
 */
export async function leaveGroup(groupId: string): Promise<ActionResponse> {
  const token = await getAuthToken();

  if (!token) {
    return { success: false, error: 'Authentication required' };
  }

  const response = await fetch(`${API_URL}/api/groups/${groupId}/leave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to leave group' }));
    return { success: false, error: errorData.error || 'Failed to leave group' };
  }

  return response.json();
}
