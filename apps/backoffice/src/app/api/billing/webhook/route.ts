import { headers } from 'next/headers';
import { withApiHandler, apiSuccess, BadRequestError } from '@/lib/api';
import { constructWebhookEvent } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { SubscriptionStatus } from '@prisma/client';
import Stripe from 'stripe';

export const POST = withApiHandler(
  async (request) => {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      throw new BadRequestError('Missing stripe-signature header');
    }

    // Construct and verify the webhook event
    const event = constructWebhookEvent(body, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Update user with subscription info
        await prisma.user.update({
          where: { id: session.metadata?.userId },
          data: {
            subscriptionStatus: SubscriptionStatus.PREMIUM,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
          },
        });

        // Update all user's groups to premium
        await prisma.group.updateMany({
          where: { ownerId: session.metadata?.userId },
          data: { isPremium: true },
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        // Handle subscription updates (e.g., plan changes)
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (user) {
          const status =
            subscription.status === 'active'
              ? SubscriptionStatus.PREMIUM
              : subscription.status === 'trialing'
                ? SubscriptionStatus.TRIAL
                : subscription.status === 'canceled'
                  ? SubscriptionStatus.CANCELED
                  : SubscriptionStatus.FREE;

          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: status,
              stripeSubscriptionId: subscription.id,
            },
          });

          // Update groups based on subscription status
          await prisma.group.updateMany({
            where: { ownerId: user.id },
            data: { isPremium: status === SubscriptionStatus.PREMIUM },
          });
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: SubscriptionStatus.FREE,
              stripeSubscriptionId: null,
            },
          });

          // Downgrade all groups to free tier
          await prisma.group.updateMany({
            where: { ownerId: user.id },
            data: { isPremium: false },
          });
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // Log successful payment, send receipt email, etc.
        console.log('Payment succeeded:', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        // Handle failed payment, notify user, etc.
        console.error('Payment failed:', invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return apiSuccess({ received: true });
  },
  { requireAuth: false } // Webhooks don't need session auth
);
