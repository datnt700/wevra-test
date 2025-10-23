import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
  IsUrl,
  Min,
  Max,
  IsObject,
  Length,
  IsPhoneNumber,
} from 'class-validator';
import { RestaurantStatus } from '@prisma/client';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'The Coffee Bean', description: 'Restaurant name' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiPropertyOptional({
    example: 'A cozy café serving artisan coffee and pastries',
    description: 'Restaurant description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: ['Italian', 'Mediterranean'],
    description: 'List of cuisine types',
  })
  @IsArray()
  @IsString({ each: true })
  cuisine: string[];

  @ApiProperty({ example: '+1234567890', description: 'Contact phone number' })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({
    example: 'contact@restaurant.com',
    description: 'Contact email',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: 'https://restaurant.com',
    description: 'Website URL',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: '123 Main Street', description: 'Street address' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'New York', description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'NY', description: 'State/Province' })
  @IsString()
  state: string;

  @ApiProperty({ example: '10001', description: 'ZIP/Postal code' })
  @IsString()
  zipCode: string;

  @ApiPropertyOptional({
    example: 'USA',
    description: 'Country',
    default: 'USA',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 40.7128, description: 'Latitude coordinate' })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    example: -74.006,
    description: 'Longitude coordinate',
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional({
    example: 'ACTIVE',
    enum: RestaurantStatus,
    description: 'Restaurant status',
    default: 'ACTIVE',
  })
  @IsOptional()
  @IsEnum(RestaurantStatus)
  status?: RestaurantStatus;

  @ApiPropertyOptional({ example: '$$', description: 'Price range indicator' })
  @IsOptional()
  @IsString()
  priceRange?: string;

  @ApiProperty({ example: 50, description: 'Total seating capacity' })
  @IsNumber()
  @Min(0)
  capacity: number;

  @ApiPropertyOptional({
    example: {
      monday: { open: '09:00', close: '22:00' },
      tuesday: { open: '09:00', close: '22:00' },
    },
    description: 'Operating hours by day',
  })
  @IsOptional()
  @IsObject()
  operatingHours?: Record<string, any>;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Logo image URL',
  })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @ApiPropertyOptional({
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    description: 'Gallery images',
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiPropertyOptional({
    example: 'https://example.com/cover.jpg',
    description: 'Cover image URL',
  })
  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @ApiPropertyOptional({
    example: ['vegan-friendly', 'outdoor-seating'],
    description: 'Restaurant tags',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    example: ['WiFi', 'Parking', 'Wheelchair Accessible'],
    description: 'Available features and amenities',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiPropertyOptional({
    example: { deliveryPartners: ['UberEats', 'DoorDash'] },
    description: 'Additional metadata',
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
