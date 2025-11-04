/**
 * AI Chat Hooks
 * React Query hooks for AI chat functionality
 */

import { useMutation } from '@tanstack/react-query';
import { sendMessage, searchWithAI } from '../_services/ai.service';
import type { SendMessageRequest, SearchRequest } from '../_services/ai.service';

/**
 * Hook to send a message to the AI chat
 */
export function useSendMessage() {
  return useMutation({
    mutationFn: (request: SendMessageRequest) => sendMessage(request),
    onError: (error) => {
      console.error('Error sending message to AI:', error);
    },
  });
}

/**
 * Hook to search with AI agent
 */
export function useAISearch() {
  return useMutation({
    mutationFn: (request: SearchRequest) => searchWithAI(request),
    onError: (error) => {
      console.error('Error searching with AI:', error);
    },
  });
}
