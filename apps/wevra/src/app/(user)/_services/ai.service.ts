/**
 * AI Chat Service
 * Handles API calls to AI chat endpoints
 */

export interface SendMessageRequest {
  message: string;
  userContext?: {
    stage?: string;
    level?: number;
    financialAwareness?: number;
    habitDiscipline?: number;
  };
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Send a message to the AI chat endpoint
 */
export async function sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Search for information using AI agent
 */
export interface SearchRequest {
  query: string;
  context?: string;
}

export interface SearchResponse {
  success: boolean;
  data?: {
    answer: string;
    query: string;
  };
  error?: string;
}

export async function searchWithAI(request: SearchRequest): Promise<SearchResponse> {
  const response = await fetch('/api/ai/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
