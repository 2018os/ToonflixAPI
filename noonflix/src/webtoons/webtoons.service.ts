import { Injectable, Inject } from '@nestjs/common';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { PrismaService } from '../common/prisma/prisma.service';
import { Webtoon } from './entities/webtoon.entity';
import { WebtoonsConnection } from './entities/webtoon-connection.entity';
import { PaginationArgs } from 'src/common/pagination/dto/pagination.input';

@Injectable()
export class WebtoonsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findAll(paginationArgs: PaginationArgs): Promise<WebtoonsConnection> {
    return findManyCursorConnection(
      (args) => this.prismaService.webtoon.findMany({ ...args }),
      () => this.prismaService.webtoon.count(),
      paginationArgs,
    );
  }

  findOne(id: string): Promise<Webtoon> {
    return this.prismaService.webtoon.findUnique({
      where: {
        id,
      },
    });
  }

  getRandom(max: number, count: number): number[] {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const random = Math.floor(Math.random() * max);
      arr.includes(random) ? (i -= 1) : arr.push(random);
    }
    return arr;
  }

  async findRandomWebtoons(take: number): Promise<Webtoon[]> {
    const allWebtoon = await this.prismaService.webtoon.findMany();
    const randomIndexes = this.getRandom(allWebtoon.length, take);
    const webtoons = randomIndexes.map((index) => allWebtoon[index]);
    return webtoons;
  }
}
