import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service';
import { WebtoonsModule } from '../webtoons/webtoons.module';
import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';

describe('GenresResolver', () => {
  let resolver: GenresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => WebtoonsModule)],
      providers: [GenresResolver, GenresService, PrismaService],
      exports: [GenresService],
    }).compile();

    resolver = module.get<GenresResolver>(GenresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
