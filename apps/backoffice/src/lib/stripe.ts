/**
 * Stripe Integration
 * Handles subscription billing and payment processing
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

/**
 * Subscription Plan Configuration
 */
export const STRIPE_PLANS = {
  MONTHLY: {
    name: 'Premium Monthly',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID || '',
    amount: 2900, // $29/month in cents
    interval: 'month' as const,
  },
  ANNUAL: {
    name: 'Premium Annual',
    priceId: process.env.STRIPE_ANNUAL_PRICE_ID || '',
    amount: 29000, // $290/year in cents (2 months free)
    interval: 'year' as const,
  },
} as const;

export type StripePlan = 'MONTHLY' | 'ANNUAL';

/**
 * Create a Stripe checkout session for subscription upgrade
 */
export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  plan: StripePlan
): Promise<string> {
  const planConfig = STRIPE_PLANS[plan];

  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    client_reference_id: userId,
    line_items: [
      {
        price: planConfig.priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing/plans`,
    metadata: {
      userId,
      plan,
    },
  });

  if (!session.url) {
    throw new Error('Failed to create checkout session');
  }

  return session.url;
}

/**
 * Create a Stripe Customer Portal session for managing subscriptions
 */
export async function createPortalSession(customerId: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/billing/subscription`,
  });

  return session.url;
}

/**
 * Cancel a subscription (sets to cancel at period end)
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return subscription;
}

/**
 * Immediately cancel a subscription
 */
export async function cancelSubscriptionImmediately(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);

  return subscription;
}

/**
 * Reactivate a canceled subscription
 */
export async function reactivateSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });

  return subscription;
}

/**
 * Retrieve subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

/**
 * Retrieve customer details
 */
export async function getCustomer(
  customerId: string
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

/**
 * List customer's invoices
 */
export async function listInvoices(
  customerId: string,
  limit: number = 10
): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });

  return invoices.data;
}

/**
 * Helper to determine subscription status from Stripe subscription
 */
export function getSubscriptionStatus(
  subscription: Stripe.Subscription
): 'PREMIUM' | 'TRIAL' | 'CANCELED' | 'FREE' {
  if (subscription.status === 'active') {
    return subscription.trial_end && subscription.trial_end > Date.now() / 1000
      ? 'TRIAL'
      : 'PREMIUM';
  }

  if (subscription.status === 'trialing') {
    return 'TRIAL';
  }

  if (
    subscription.status === 'canceled' ||
    subscription.status === 'unpaid' ||
    subscription.status === 'past_due'
  ) {
    return 'CANCELED';
  }

  return 'FREE';
}

/**
 * Verify Stripe webhook signature
 */
export function constructWebhookEvent(payload: string | Buffer, signature: string): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
