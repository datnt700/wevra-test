import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma.js';

// Validation schemas
const createExampleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

const updateExampleSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

const paramsSchema = z.object({
  id: z.string().cuid(),
});

export default async function exampleRoutes(app: FastifyInstance) {
  // Get all examples
  app.get('/examples', async () => {
    const examples = await prisma.example.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return { data: examples };
  });

  // Get example by ID
  app.get<{ Params: { id: string } }>('/examples/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);

    const example = await prisma.example.findUnique({
      where: { id },
    });

    if (!example) {
      return reply.status(404).send({
        error: { message: 'Example not found', statusCode: 404 },
      });
    }

    return { data: example };
  });

  // Create example
  app.post<{ Body: { name: string; description?: string } }>(
    '/examples',
    async (request, reply) => {
      const data = createExampleSchema.parse(request.body);

      const example = await prisma.example.create({
        data,
      });

      return reply.status(201).send({ data: example });
    }
  );

  // Update example
  app.put<{ Params: { id: string }; Body: { name?: string; description?: string } }>(
    '/examples/:id',
    async (request, reply) => {
      const { id } = paramsSchema.parse(request.params);
      const data = updateExampleSchema.parse(request.body);

      try {
        const example = await prisma.example.update({
          where: { id },
          data,
        });

        return { data: example };
      } catch (error) {
        return reply.status(404).send({
          error: { message: 'Example not found', statusCode: 404 },
        });
      }
    }
  );

  // Delete example
  app.delete<{ Params: { id: string } }>('/examples/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params);

    try {
      await prisma.example.delete({
        where: { id },
      });

      return reply.status(204).send();
    } catch (error) {
      return reply.status(404).send({
        error: { message: 'Example not found', statusCode: 404 },
      });
    }
  });
}
