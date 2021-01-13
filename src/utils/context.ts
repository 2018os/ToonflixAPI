import express from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer, { Transporter } from 'nodemailer';

export const prisma = new PrismaClient();

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    refreshToken: process.env.REFRESHTOKEN,
    accessToken: process.env.ACCESSTOKEN
  }
});

export interface Context {
  req: express.Request;
  res: express.Response;
  prisma: PrismaClient;
  transporter: Transporter;
}
