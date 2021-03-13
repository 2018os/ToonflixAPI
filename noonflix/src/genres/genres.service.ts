import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findAll(): Promise<Genre[]> {
    return this.prismaService.genre.findMany();
  }

  findByWebtoon(id: string): Promise<Genre[]> {
    return this.prismaService.genre.findMany({
      where: {
        webtoons: {
          some: {
            id,
          },
        },
      },
    });
  }
}
