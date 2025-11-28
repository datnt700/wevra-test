/**
 * Group Service
 * API client functions for group operations
 */

export interface CreateGroupData {
  name: string;
  description: string;
  category: string;
  location?: string;
  image?: string;
  isPublic: boolean;
  userId: string;
}

export interface UpdateGroupData {
  name: string;
  description: string;
  category: string;
  location?: string;
  image?: string;
  isPublic: boolean;
}

export interface ApproveMemberData {
  action: 'approve';
}

export interface GroupResponse {
  group: {
    id: string;
    name: string;
    description: string;
    category: string;
    location: string | null;
    image: string | null;
    isPublic: boolean;
    isPremium: boolean;
    ownerId: string;
    createdAt: string;
  };
}

/**
 * Create a new group
 */
export async function createGroup(data: CreateGroupData): Promise<GroupResponse> {
  const response = await fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create group');
  }

  return response.json();
}

/**
 * Update an existing group
 */
export async function updateGroup(groupId: string, data: UpdateGroupData): Promise<GroupResponse> {
  const response = await fetch(`/api/groups/${groupId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update group');
  }

  return response.json();
}

/**
 * Delete a group
 */
export async function deleteGroup(groupId: string): Promise<void> {
  const response = await fetch(`/api/groups/${groupId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete group');
  }
}

/**
 * Approve a member
 */
export async function approveMember(
  groupId: string,
  memberId: string
): Promise<{ message: string }> {
  const response = await fetch(`/api/groups/${groupId}/members/${memberId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'approve' }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to approve member');
  }

  return response.json();
}

/**
 * Reject or remove a member
 */
export async function removeMember(
  groupId: string,
  memberId: string
): Promise<{ message: string }> {
  const response = await fetch(`/api/groups/${groupId}/members/${memberId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to remove member');
  }

  return response.json();
}
