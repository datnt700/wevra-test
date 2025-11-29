/**
 * Example protected API route using API key authentication
 * Path: apps/backoffice/src/app/api/v1/groups/route.ts
 */

import { NextRequest } from 'next/server';
import { withApiKey } from '@/lib/api/apiKeyMiddleware';
import { prisma } from '@/lib/prisma';

export const GET = withApiKey(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const groups = await prisma.group.findMany({
    where: {
      isActive: true,
      isPublic: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      category: true,
      memberCount: true,
      location: true,
      createdAt: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const total = await prisma.group.count({
    where: {
      isActive: true,
      isPublic: true,
    },
  });

  return Response.json({
    data: groups,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
