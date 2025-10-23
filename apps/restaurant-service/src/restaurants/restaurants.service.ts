import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new restaurant
   */
  async create(createRestaurantDto: CreateRestaurantDto) {
    const { name, email, phone, ...rest } = createRestaurantDto;

    // Generate slug from name
    const slug = this.generateSlug(name);

    // Check if slug already exists
    const existingRestaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existingRestaurant) {
      throw new ConflictException(
        `Restaurant with slug "${slug}" already exists`,
      );
    }

    try {
      const restaurant = await this.prisma.restaurant.create({
        data: {
          name,
          slug,
          email,
          phone,
          ...rest,
        },
        include: {
          _count: {
            select: {
              tables: true,
              menuItems: true,
              orders: true,
              staff: true,
            },
          },
        },
      });

      return restaurant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Restaurant with this email or phone already exists',
          );
        }
      }
      throw error;
    }
  }

  /**
   * Get all restaurants with optional filtering
   */
  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params || {};

    const [restaurants, total] = await Promise.all([
      this.prisma.restaurant.findMany({
        skip,
        take: take || 10,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              tables: true,
              menuItems: true,
              orders: true,
              staff: true,
            },
          },
        },
      }),
      this.prisma.restaurant.count({ where }),
    ]);

    return {
      data: restaurants,
      meta: {
        total,
        skip: skip || 0,
        take: take || 10,
        page: Math.floor((skip || 0) / (take || 10)) + 1,
        pageCount: Math.ceil(total / (take || 10)),
      },
    };
  }

  /**
   * Get restaurant by ID
   */
  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        tables: {
          orderBy: { number: 'asc' },
        },
        categories: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
        },
        _count: {
          select: {
            menuItems: true,
            orders: true,
            staff: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }

    return restaurant;
  }

  /**
   * Get restaurant by slug
   */
  async findBySlug(slug: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
      include: {
        tables: {
          orderBy: { number: 'asc' },
        },
        categories: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
        },
        _count: {
          select: {
            menuItems: true,
            orders: true,
            staff: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with slug "${slug}" not found`);
    }

    return restaurant;
  }

  /**
   * Update restaurant
   */
  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    // Check if restaurant exists
    await this.findOne(id);

    const { name, ...rest } = updateRestaurantDto;

    // If name is being updated, regenerate slug
    let slug: string | undefined;
    if (name) {
      slug = this.generateSlug(name);

      // Check if new slug conflicts with another restaurant
      const existingRestaurant = await this.prisma.restaurant.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (existingRestaurant) {
        throw new ConflictException(
          `Restaurant with slug "${slug}" already exists`,
        );
      }
    }

    try {
      const restaurant = await this.prisma.restaurant.update({
        where: { id },
        data: {
          ...(name && { name, slug }),
          ...rest,
        },
        include: {
          _count: {
            select: {
              tables: true,
              menuItems: true,
              orders: true,
              staff: true,
            },
          },
        },
      });

      return restaurant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Restaurant with this email or phone already exists',
          );
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(`Restaurant with ID "${id}" not found`);
        }
      }
      throw error;
    }
  }

  /**
   * Delete restaurant (soft delete by setting status to CLOSED)
   */
  async remove(id: string) {
    // Check if restaurant exists
    await this.findOne(id);

    try {
      const restaurant = await this.prisma.restaurant.update({
        where: { id },
        data: {
          status: 'CLOSED',
        },
      });

      return {
        message: 'Restaurant successfully closed',
        restaurant,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Restaurant with ID "${id}" not found`);
        }
      }
      throw error;
    }
  }

  /**
   * Hard delete restaurant (use with caution)
   */
  async hardDelete(id: string) {
    // Check if restaurant exists
    await this.findOne(id);

    try {
      await this.prisma.restaurant.delete({
        where: { id },
      });

      return {
        message: 'Restaurant permanently deleted',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Restaurant with ID "${id}" not found`);
        }
      }
      throw error;
    }
  }

  /**
   * Get restaurant statistics
   */
  async getStatistics(id: string) {
    await this.findOne(id);

    const [tablesStats, ordersStats, menuStats, staffStats] = await Promise.all(
      [
        // Tables statistics
        this.prisma.table.groupBy({
          by: ['status'],
          where: { restaurantId: id },
          _count: true,
        }),
        // Orders statistics
        this.prisma.order.groupBy({
          by: ['status'],
          where: { restaurantId: id },
          _count: true,
          _sum: { total: true },
        }),
        // Menu statistics
        this.prisma.menuItem.groupBy({
          by: ['status'],
          where: { restaurantId: id },
          _count: true,
        }),
        // Staff statistics
        this.prisma.staff.groupBy({
          by: ['role'],
          where: { restaurantId: id, isActive: true },
          _count: true,
        }),
      ],
    );

    return {
      tables: tablesStats,
      orders: ordersStats,
      menu: menuStats,
      staff: staffStats,
    };
  }

  /**
   * Generate URL-friendly slug from name
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
