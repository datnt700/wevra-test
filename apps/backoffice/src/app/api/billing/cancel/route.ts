import { withApiHandler, apiSuccess, BadRequestError } from '@/lib/api';
import { cancelSubscription } from '@/lib/stripe';
import { SUBSCRIPTION_STATUS } from '@/lib/constants';

export const POST = withApiHandler(async (request, { session }) => {
  // Check if user has an active subscription
  if (session!.user!.subscriptionStatus !== SUBSCRIPTION_STATUS.PREMIUM) {
    throw new BadRequestError('No active subscription to cancel');
  }

  await cancelSubscription(session!.user!.id);

  return apiSuccess({ success: true });
});
