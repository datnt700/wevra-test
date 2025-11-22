import { PrismaClient } from '@prisma/client';
import { envUtils } from './env';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!envUtils.isProduction()) globalThis.prismaGlobal = prisma;
