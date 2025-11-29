/**
 * API Key Middleware and Rate Limiting
 * Protects API routes with API key authentication and rate limiting
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// In-memory rate limit cache (use Redis in production)
const rateLimitCache = new Map<string, { count: number; resetTime: number; requests: number[] }>();

// Response cache (use Redis in production)
interface CachedResponse {
  data: unknown;
  timestamp: number;
}

const responseCache = new Map<string, CachedResponse>();

const CACHE_TTL = 60 * 1000; // 1 minute
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

interface ApiKeyValidationResult {
  isValid: boolean;
  error?: string;
  apiKey?: {
    id: string;
    userId: string;
    rateLimit: number;
  };
}

/**
 * Validate API key from request headers
 */
export async function validateApiKey(req: NextRequest): Promise<ApiKeyValidationResult> {
  const apiKeyHeader =
    req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!apiKeyHeader) {
    return { isValid: false, error: 'API key is required' };
  }

  // Extract prefix
  if (!apiKeyHeader.startsWith('tav_')) {
    return { isValid: false, error: 'Invalid API key format' };
  }

  const prefix = apiKeyHeader.substring(4, 12); // Get 8 chars after 'tav_'

  try {
    // Find API key by prefix first (faster lookup)
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        keyPrefix: prefix,
        status: 'ACTIVE',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    // Verify hash for matching keys
    for (const key of apiKeys) {
      const isMatch = await bcrypt.compare(apiKeyHeader, key.keyHash);

      if (isMatch) {
        // Check if expired
        if (key.expiresAt && key.expiresAt < new Date()) {
          await prisma.apiKey.update({
            where: { id: key.id },
            data: { status: 'EXPIRED' },
          });
          return { isValid: false, error: 'API key has expired' };
        }

        // Update last used timestamp (async, don't wait)
        prisma.apiKey
          .update({
            where: { id: key.id },
            data: { lastUsedAt: new Date() },
          })
          .catch(console.error);

        return {
          isValid: true,
          apiKey: {
            id: key.id,
            userId: key.userId,
            rateLimit: key.rateLimit,
          },
        };
      }
    }

    return { isValid: false, error: 'Invalid API key' };
  } catch (error) {
    console.error('API key validation error:', error);
    return { isValid: false, error: 'Internal server error' };
  }
}

/**
 * Check rate limit for API key
 */
export function checkRateLimit(apiKeyId: string, rateLimit: number): boolean {
  const now = Date.now();
  const cacheKey = apiKeyId;

  let cache = rateLimitCache.get(cacheKey);

  if (!cache || now > cache.resetTime) {
    // Reset window
    cache = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
      requests: [],
    };
    rateLimitCache.set(cacheKey, cache);
  }

  // Clean old requests outside window
  cache.requests = cache.requests.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (cache.requests.length >= rateLimit) {
    return false; // Rate limit exceeded
  }

  // Add current request
  cache.requests.push(now);
  cache.count = cache.requests.length;

  return true;
}

/**
 * Get cached response if available
 */
export function getCachedResponse(cacheKey: string): unknown | null {
  const cached = responseCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Remove stale cache
  if (cached) {
    responseCache.delete(cacheKey);
  }

  return null;
}

/**
 * Set cached response
 */
export function setCachedResponse(cacheKey: string, data: unknown): void {
  responseCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  // Cleanup old cache entries (simple LRU)
  if (responseCache.size > 1000) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) {
      responseCache.delete(oldestKey);
    }
  }
}

/**
 * Log API key usage
 */
export async function logApiKeyUsage(
  apiKeyId: string,
  req: NextRequest,
  statusCode: number,
  responseTimeMs: number
): Promise<void> {
  try {
    await prisma.apiKeyUsage.create({
      data: {
        apiKeyId,
        endpoint: req.nextUrl.pathname,
        method: req.method,
        statusCode,
        responseTimeMs,
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || undefined,
      },
    });
  } catch (_error) {
    console.error('Failed to log API key usage:', _error);
  }
}

/**
 * API Key middleware wrapper for route handlers
 */
export function withApiKey(
  handler: (
    req: NextRequest,
    context: { apiKey: { id: string; userId: string; rateLimit: number } }
  ) => Promise<Response>
) {
  return async (req: NextRequest): Promise<Response> => {
    const startTime = Date.now();

    // Validate API key
    const validation = await validateApiKey(req);

    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 401 });
    }

    const { apiKey } = validation;

    // Check rate limit
    const withinLimit = checkRateLimit(apiKey!.id, apiKey!.rateLimit);

    if (!withinLimit) {
      const cache = rateLimitCache.get(apiKey!.id);
      const resetTime = cache ? new Date(cache.resetTime) : new Date();

      logApiKeyUsage(apiKey!.id, req, 429, Date.now() - startTime);

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          rateLimit: apiKey!.rateLimit,
          resetAt: resetTime.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': apiKey!.rateLimit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toISOString(),
          },
        }
      );
    }

    // Check cache
    const cacheKey = `${apiKey!.id}:${req.method}:${req.nextUrl.pathname}`;
    const cachedResponse = getCachedResponse(cacheKey);

    if (cachedResponse && req.method === 'GET') {
      return NextResponse.json(cachedResponse, {
        headers: {
          'X-Cache': 'HIT',
          'X-RateLimit-Limit': apiKey!.rateLimit.toString(),
          'X-RateLimit-Remaining': (
            apiKey!.rateLimit - (rateLimitCache.get(apiKey!.id)?.count || 0)
          ).toString(),
        },
      });
    }

    // Execute handler
    try {
      const response = await handler(req, { apiKey: apiKey! });
      const responseTime = Date.now() - startTime;

      // Log usage (async)
      logApiKeyUsage(apiKey!.id, req, response.status, responseTime);

      // Cache GET responses
      if (req.method === 'GET' && response.status === 200) {
        const data = await response.clone().json();
        setCachedResponse(cacheKey, data);
      }

      // Add rate limit headers
      const cache = rateLimitCache.get(apiKey!.id);
      const remaining = apiKey!.rateLimit - (cache?.count || 0);

      return new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          'X-Cache': 'MISS',
          'X-RateLimit-Limit': apiKey!.rateLimit.toString(),
          'X-RateLimit-Remaining': Math.max(0, remaining).toString(),
          'X-Response-Time': `${responseTime}ms`,
        },
      });
    } catch {
      const responseTime = Date.now() - startTime;
      logApiKeyUsage(apiKey!.id, req, 500, responseTime);

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}
