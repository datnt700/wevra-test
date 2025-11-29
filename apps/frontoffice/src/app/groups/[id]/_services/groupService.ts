/**
 * Group Service
 * API client functions for group operations
 */
import {
  joinGroup as joinGroupAction,
  leaveGroup as leaveGroupAction,
} from '../_actions/groupActions';
import type { ActionResponse } from '@/types/api';

export interface JoinGroupResponse {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Join a group
 */
export async function joinGroup(groupId: string): Promise<ActionResponse> {
  return await joinGroupAction(groupId);
}

/**
 * Leave a group
 */
export async function leaveGroup(groupId: string): Promise<ActionResponse> {
  return await leaveGroupAction(groupId);
}
