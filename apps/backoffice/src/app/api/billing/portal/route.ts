import { withApiHandler, apiSuccess } from '@/lib/api';
import { createPortalSession } from '@/lib/stripe';

export const POST = withApiHandler(async (request, { session }) => {
  const portalUrl = await createPortalSession(session!.user!.id);

  return apiSuccess({ url: portalUrl });
});
