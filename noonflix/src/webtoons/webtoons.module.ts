import { Module, forwardRef } from '@nestjs/common';

import { WebtoonsResolver } from './webtoons.resolver';
import { WebtoonsService } from './webtoons.service';

import { PrismaService } from '../common/prisma/prisma.service';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [forwardRef(() => GenresModule)],
  providers: [WebtoonsResolver, WebtoonsService, PrismaService],
  exports: [WebtoonsService],
})
export class WebtoonsModule {}
