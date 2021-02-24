import { Module } from '@nestjs/common';

import { WebtoonsResolver } from './webtoons.resolver';
import { WebtoonsService } from './webtoons.service';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [WebtoonsResolver, WebtoonsService, PrismaService],
})
export class WebtoonsModule {}
