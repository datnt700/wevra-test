import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/analytics
 * Endpoint to receive analytics events from @eventure/analytics SDK
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { events } = body;

    // Validate events array
    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: events array required' },
        { status: 400 }
      );
    }

    // Validate API key if configured
    const apiKey = request.headers.get('authorization')?.replace('Bearer ', '');
    const expectedApiKey = process.env.ANALYTICS_API_KEY;

    if (expectedApiKey && apiKey !== expectedApiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Log events to console for debugging
    console.log('\n🔵 [Analytics API] Received batch:', {
      count: events.length,
      timestamp: new Date().toISOString(),
    });

    // Transform and save events to database
    const dbEvents = events.map((event: Record<string, unknown>) => {
      const eventType = typeof event.type === 'string' ? event.type : 'custom';
      const eventTimestamp = event.timestamp ? new Date(event.timestamp as string) : new Date();
      const screen = event.screen as { width?: number; height?: number } | undefined;
      const viewport = event.viewport as { width?: number; height?: number } | undefined;

      const baseEvent = {
        type: eventType.toUpperCase() as 'CLICK' | 'PAGEVIEW' | 'CUSTOM',
        timestamp: eventTimestamp,
        url: (event.url as string) || '',
        referrer: (event.referrer as string) || null,
        userAgent: (event.userAgent as string) || '',
        screenWidth: screen?.width,
        screenHeight: screen?.height,
        viewportWidth: viewport?.width,
        viewportHeight: viewport?.height,
        metadata: (event.metadata as object) || null,
      };

      // Add type-specific fields
      if (eventType === 'click') {
        return {
          ...baseEvent,
          elementType: event.elementType as string,
          elementText: event.elementText as string | undefined,
          elementId: event.elementId as string | undefined,
          elementClasses: (event.elementClasses as string[]) || [],
          clickX: event.clickX as number | undefined,
          clickY: event.clickY as number | undefined,
          eventName: event.eventName as string | undefined,
        };
      } else if (eventType === 'pageview') {
        return {
          ...baseEvent,
          pageTitle: event.title as string | undefined,
          pagePath: event.path as string | undefined,
        };
      } else if (eventType === 'custom') {
        return {
          ...baseEvent,
          customName: event.name as string | undefined,
          customProperties: (event.properties as object) || null,
        };
      }

      return baseEvent;
    });

    // Save to database
    await prisma.analyticsEvent.createMany({
      data: dbEvents,
    });

    console.log(`✅ [Analytics API] Saved ${dbEvents.length} events to database`);

    return NextResponse.json(
      {
        success: true,
        received: events.length,
        saved: dbEvents.length,
        message: 'Events saved successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ [Analytics API] Error processing events:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Analytics API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}
