import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Webtoon } from './entities/webtoon.entity';

@Injectable()
export class WebtoonsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findAll(): Promise<Webtoon[] | null> {
    return this.prismaService.webtoon.findMany();
  }
}
