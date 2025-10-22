import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';

/**
 * GET /api/example
 * Example API route with i18n support
 */
export async function GET(request: NextRequest) {
  // Get current locale from request
  const locale = await getLocale();

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  return NextResponse.json({
    message: 'Example API response',
    locale,
    query,
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST /api/example
 * Example POST endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const locale = await getLocale();

    // Example: Validate input
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: 'Name is required and must be a string' }, { status: 400 });
    }

    // Example: Process data
    const result = {
      id: Math.random().toString(36).substr(2, 9),
      name: body.name,
      locale,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

/**
 * DELETE /api/example
 * Example DELETE endpoint
 */
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  // Example: Delete logic here
  return NextResponse.json({
    success: true,
    message: `Deleted item with ID: ${id}`,
  });
}
