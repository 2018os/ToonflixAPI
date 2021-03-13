import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { WebtoonsResolver } from './webtoons.resolver';
import { WebtoonsService } from './webtoons.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { GenresModule } from '../genres/genres.module';

describe('WebtoonsResolver', () => {
  let resolver: WebtoonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => GenresModule)],
      providers: [WebtoonsResolver, WebtoonsService, PrismaService],
      exports: [WebtoonsService],
    }).compile();

    resolver = module.get<WebtoonsResolver>(WebtoonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Query webtoons', () => {
    it('should be return array', async (done) => {
      const result = await resolver.findAll({});
      expect(result.edges).toBeInstanceOf(Array);
      done();
    });
    it.todo('pageinfo');
    it.todo('totalCount');
  });

  describe('Query webtoon', () => {
    it('should be return null', async (done) => {
      const result = await resolver.findOne('123');
      expect(result).toBeNull();
      done();
    });
  });

  describe('Query findRandomWebtoons', () => {
    it('should be return array', async (done) => {
      const result = await resolver.findRandomWebtoons(5);
      expect(result).toBeInstanceOf(Array);
      done();
    });

    it('should be no duplicate', async (done) => {
      const result = await resolver.findRandomWebtoons(5);
      expect(result.length).toEqual(5);
      expect(result.length).toBe(new Set(result).size);
      done();
    });
  });
});
