import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Injectable()
export class ExamplesService {
  constructor(private prisma: PrismaService) {}

  async create(createExampleDto: CreateExampleDto) {
    return this.prisma.example.create({
      data: createExampleDto,
    });
  }

  async findAll() {
    return this.prisma.example.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const example = await this.prisma.example.findUnique({
      where: { id },
    });

    if (!example) {
      throw new NotFoundException(`Example with ID ${id} not found`);
    }

    return example;
  }

  async update(id: string, updateExampleDto: UpdateExampleDto) {
    try {
      return await this.prisma.example.update({
        where: { id },
        data: updateExampleDto,
      });
    } catch (error) {
      throw new NotFoundException(`Example with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.example.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Example with ID ${id} not found`);
    }
  }
}
