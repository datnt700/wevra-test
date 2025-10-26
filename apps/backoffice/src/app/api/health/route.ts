import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/health
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    },
    { status: 200 }
  );
}

/**
 * Example of handling errors in API routes
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Example validation
    if (!body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Process the request
    return NextResponse.json(
      {
        success: true,
        data: body,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
