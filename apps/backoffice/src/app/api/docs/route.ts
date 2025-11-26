import { NextResponse } from 'next/server';
import { openApiSchema } from '@/lib/openapi/schema';

/**
 * GET /api/docs
 * Returns OpenAPI JSON schema
 * Used by Swagger UI and Redoc
 */
export async function GET() {
  return NextResponse.json(openApiSchema, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
