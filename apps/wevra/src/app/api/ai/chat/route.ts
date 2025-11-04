import { NextRequest } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearch } from '@langchain/tavily';
import { createAgent } from 'langchain';

/**
 * POST /api/ai/chat
 * Streaming AI chat endpoint for real-time responses
 */
export async function POST(request: NextRequest) {
  try {
    const { message, userContext } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY || !process.env.TAVILY_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI services not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize the LLM with streaming
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      streaming: true,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Initialize Tavily search tool
    const searchTool = new TavilySearch({
      maxResults: 3,
      tavilyApiKey: process.env.TAVILY_API_KEY,
    });

    const tools = [searchTool];

    // Create the agent using LangChain createAgent
    const agent = createAgent({
      model: llm,
      tools,
    });

    // Build context-aware query
    const systemContext = `You are Wevra's AI companion - a friendly, supportive partner on the user's financial journey.
Think of yourself as a knowledgeable friend who genuinely cares about helping them achieve financial wellness.

Your personality:
- Warm, approachable, and conversational (like a trusted friend, not a formal advisor)
- Encouraging and optimistic, but honest about challenges
- Use casual language and occasional emojis to feel more human
- Celebrate small wins and progress with the user

Guidelines:
- Provide practical, actionable advice in bite-sized steps
- Use simple, everyday language (avoid jargon or explain it if necessary)
- Be supportive and never judgmental about past financial decisions
- Focus on personal finance fundamentals (budgeting, saving, investing, debt management)
- When appropriate, search the web for current, reliable information
- Keep responses conversational and relatable
- Share tips like you're texting a friend, not giving a lecture`;

    const contextualMessage = userContext
      ? `${systemContext}\n\nUser Profile:\n${JSON.stringify(userContext, null, 2)}\n\nUser Question: ${message}`
      : `${systemContext}\n\nUser Question: ${message}`;

    // Execute the agent with LangGraph
    const result = await agent.invoke({
      messages: [{ role: 'user', content: contextualMessage }],
    });

    // Get the last message from the agent
    const messages = result.messages;
    const lastMessage = messages[messages.length - 1];
    const responseMessage = lastMessage?.content || 'No response generated';

    return new Response(
      JSON.stringify({
        success: true,
        message: responseMessage,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('AI Chat Error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.message
            : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
