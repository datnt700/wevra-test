import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearch } from '@langchain/tavily';
import { createAgent } from 'langchain';

/**
 * POST /api/ai/search
 * AI agent that searches the web for personal finance content using Tavily and LangChain
 */
export async function POST(request: NextRequest) {
  try {
    const { query, context } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    if (!process.env.TAVILY_API_KEY) {
      return NextResponse.json({ error: 'Tavily API key not configured' }, { status: 500 });
    }

    // Initialize the LLM
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Initialize Tavily search tool
    const searchTool = new TavilySearch({
      maxResults: 5,
      tavilyApiKey: process.env.TAVILY_API_KEY,
    });

    const tools = [searchTool];

    // Create the agent using LangChain createAgent
    const agent = createAgent({
      model: llm,
      tools,
    });

    // Prepare the enhanced query with context
    const enhancedQuery = context
      ? `User context: ${context}\n\nQuestion: ${query}\n\nPlease search for relevant personal finance information and provide actionable advice.`
      : `${query}\n\nPlease search for relevant personal finance information and provide actionable advice.`;

    // Execute the agent with LangGraph
    const result = await agent.invoke({
      messages: [{ role: 'user', content: enhancedQuery }],
    });

    // Get the last message from the agent
    const messages = result.messages;
    const lastMessage = messages[messages.length - 1];
    const answer = lastMessage?.content || 'No results found';

    return NextResponse.json({
      success: true,
      data: {
        answer,
        query: query,
      },
    });
  } catch (error) {
    console.error('AI Agent Error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Failed to process AI request',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

/**
 * GET /api/ai/search
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AI Agent API is running',
    configured: {
      openai: !!process.env.OPENAI_API_KEY,
      tavily: !!process.env.TAVILY_API_KEY,
    },
  });
}
