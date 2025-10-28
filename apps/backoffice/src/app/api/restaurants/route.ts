import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

/**
 * Restaurant creation schema
 */
const createRestaurantSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).optional(),
  address: z.string().min(5),
  phone: z.string().min(8),
  email: z.string().email(),
  cuisine: z.array(z.string()).min(1),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']),
  image: z.string().url().optional(),
});

/**
 * POST /api/restaurants
 * Create a new restaurant
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createRestaurantSchema.parse(body);

    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existingRestaurant) {
      return NextResponse.json(
        { message: 'A restaurant with this name already exists' },
        { status: 400 }
      );
    }

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name: validatedData.name,
        slug,
        description: validatedData.description,
        address: validatedData.address,
        phone: validatedData.phone,
        email: validatedData.email,
        cuisine: validatedData.cuisine,
        priceRange: validatedData.priceRange,
        image: validatedData.image,
        isActive: true,
      },
    });

    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }

    console.error('Error creating restaurant:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/restaurants
 * Get all restaurants
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              bookings: true,
              tables: true,
            },
          },
        },
      }),
      prisma.restaurant.count(),
    ]);

    return NextResponse.json({
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
