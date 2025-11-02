import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

/**
 * Restaurant update schema
 */
const updateRestaurantSchema = z.object({
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
 * GET /api/restaurants/[id]
 * Get a specific restaurant by ID
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        tables: true,
        bookings: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookings: true,
            tables: true,
          },
        },
      },
    });

    if (!restaurant) {
      return NextResponse.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/restaurants/[id]
 * Update a restaurant
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if restaurant exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!existingRestaurant) {
      return NextResponse.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateRestaurantSchema.parse(body);

    // Generate new slug if name changed
    let slug = existingRestaurant.slug;
    if (validatedData.name !== existingRestaurant.name) {
      slug = validatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if new slug already exists
      const slugExists = await prisma.restaurant.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (slugExists) {
        // Add suffix to make slug unique
        slug = `${slug}-${id.slice(0, 8)}`;
      }
    }

    // Update restaurant
    const restaurant = await prisma.restaurant.update({
      where: { id },
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
      },
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }

    console.error('Error updating restaurant:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/restaurants/[id]
 * Delete a restaurant
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if restaurant exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!existingRestaurant) {
      return NextResponse.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    // Delete restaurant (cascade will handle related records)
    await prisma.restaurant.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
