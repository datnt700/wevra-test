import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const registerUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z
    .nativeEnum(UserRole)
    .refine((role) => role !== UserRole.USER && role !== UserRole.RESTAURANT_OWNER, {
      message: 'Only ADMIN, MANAGER, or EMPLOYEE roles can be assigned via IAM',
    }),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Only admins can register users
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = registerUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register user error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An error occurred while registering the user' },
      { status: 500 }
    );
  }
}
