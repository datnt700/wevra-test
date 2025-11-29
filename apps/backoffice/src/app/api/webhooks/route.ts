import { withApiHandler, apiSuccess, BadRequestError } from '@/lib/api';
import { env } from '@/lib/env';
import crypto from 'crypto';
import { headers } from 'next/headers';

/**
 * Webhook payload interface
 */
interface WebhookPayload {
  event: string;
  data: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Verify webhook signature
 * In production, use a secret key stored in environment variables
 */
async function verifyWebhookSignature(
  body: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) {
    return false;
  }

  // Create HMAC SHA256 hash
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  // Compare signatures (timing-safe comparison)
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

/**
 * POST /api/webhooks
 * Generic webhook endpoint
 *
 * Example usage:
 * curl -X POST http://localhost:3000/api/webhooks \
 *   -H "Content-Type: application/json" \
 *   -H "X-Webhook-Signature: your-signature" \
 *   -d '{"event":"user.created","data":{"userId":"123","email":"user@example.com"}}'
 */
export const POST = withApiHandler(
  async (request) => {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('x-webhook-signature');

    // Verify signature (optional in development, required in production)
    if (env.NODE_ENV === 'production' && signature) {
      const isValid = await verifyWebhookSignature(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET || ''
      );

      if (!isValid) {
        throw new BadRequestError('Invalid webhook signature');
      }
    }

    // Parse webhook payload
    let payload: WebhookPayload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      throw new BadRequestError('Invalid JSON payload: ' + error);
    }

    // Validate required fields
    if (!payload.event || !payload.data) {
      throw new BadRequestError('Missing required fields: event and data');
    }

    // Log webhook event
    console.log('Webhook received:', {
      event: payload.event,
      timestamp: payload.timestamp || new Date().toISOString(),
    });

    // Handle different webhook events
    switch (payload.event) {
      case 'user.created': {
        // Example: Handle user creation event
        console.log('User created:', payload.data);
        // Add your custom logic here
        break;
      }

      case 'event.published': {
        // Example: Handle event publication
        console.log('Event published:', payload.data);
        // Add your custom logic here
        break;
      }

      case 'group.updated': {
        // Example: Handle group update
        console.log('Group updated:', payload.data);
        // Add your custom logic here
        break;
      }

      case 'notification.send': {
        // Example: Send notification
        const { userId, message } = payload.data as { userId?: string; message?: string };

        if (userId && message) {
          // Log notification (add your custom notification logic here)
          console.log(`Notification sent to user ${userId}: ${message}`);
          // Example: Send email, push notification, etc.
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${payload.event}`);
    }

    // Return success response
    return apiSuccess({
      received: true,
      event: payload.event,
      processedAt: new Date().toISOString(),
    });
  },
  { requireAuth: false } // Webhooks don't need session authentication
);

/**
 * GET /api/webhooks
 * Get webhook information (for testing)
 */
export const GET = withApiHandler(
  async () => {
    return apiSuccess({
      message: 'Webhook endpoint is active',
      supportedEvents: ['user.created', 'event.published', 'group.updated', 'notification.send'],
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': 'HMAC SHA256 signature (required in production)',
      },
      example: {
        event: 'user.created',
        data: {
          userId: '123',
          email: 'user@example.com',
        },
        timestamp: new Date().toISOString(),
      },
    });
  },
  { requireAuth: false }
);
