import express from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface Context {
  req: express.Request;
  res: express.Response;
  prisma: PrismaClient;
}
