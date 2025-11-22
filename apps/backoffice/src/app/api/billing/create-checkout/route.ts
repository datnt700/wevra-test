import { withApiHandler, apiSuccess, BadRequestError, ConflictError } from '@/lib/api';
import { createCheckoutSession } from '@/lib/stripe';
import { SUBSCRIPTION_STATUS } from '@/lib/constants';

export const POST = withApiHandler(async (request, { session }) => {
  // Check if user is already premium
  if (session!.user!.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM) {
    throw new ConflictError('You already have an active premium subscription');
  }

  const body = await request.json();
  const { plan } = body;

  if (!plan || !['MONTHLY', 'ANNUAL'].includes(plan)) {
    throw new BadRequestError('Invalid plan. Choose MONTHLY or ANNUAL');
  }

  const checkoutUrl = await createCheckoutSession(session!.user!.id, plan as 'MONTHLY' | 'ANNUAL');

  return apiSuccess({ url: checkoutUrl });
});
