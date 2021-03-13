import { Module, forwardRef } from '@nestjs/common';
import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';
import { WebtoonsModule } from 'src/webtoons/webtoons.module';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [forwardRef(() => WebtoonsModule)],
  providers: [GenresResolver, GenresService, PrismaService],
  exports: [GenresService],
})
export class GenresModule {}
