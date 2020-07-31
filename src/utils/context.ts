import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface Context {
  req: any;
  res: any;
  prisma: PrismaClient;
}
