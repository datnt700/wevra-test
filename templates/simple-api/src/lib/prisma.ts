import { PrismaClient } from '@prisma/client';
import { envUtils } from './env.js';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: envUtils.isDevelopment() ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!envUtils.isProduction()) globalThis.prismaGlobal = prisma;
