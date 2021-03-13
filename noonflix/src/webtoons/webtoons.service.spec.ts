import { Test, TestingModule } from '@nestjs/testing';

import { WebtoonsService } from './webtoons.service';
import { PrismaService } from '../common/prisma/prisma.service';

describe('WebtoonsService', () => {
  let service: WebtoonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebtoonsService, PrismaService],
    }).compile();

    service = module.get<WebtoonsService>(WebtoonsService);
  });

  it.todo('Error handling');

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return array', async (done) => {
      const allWebtoon = await service.findAll({});
      expect(allWebtoon.edges).toBeInstanceOf(Array);
      done();
    });
    it.todo('pageinfo');
    it.todo('totlaCount');
  });

  describe('findOne', () => {
    it('should be return null', async (done) => {
      const result = await service.findOne('123');
      expect(result).toBeNull();
      done();
    });
  });

  describe('random', () => {
    it('should be no duplicate', () => {
      const randomArray = service.getRandom(200, 10);
      const arraySet = new Set(randomArray);
      expect(arraySet.size === randomArray.length).toBeTruthy();
    });
  });

  describe('findRandom', () => {
    it('should be return array', async (done) => {
      const result = await service.findRandomWebtoons(5);
      expect(result).toBeInstanceOf(Array);
      done();
    });
  });

  describe('findByGenre', () => {
    it('should be return array', async (done) => {
      const result = await service.findByGenre(
        {
          first: 4,
        },
        'action',
      );
      expect(result.edges).toBeInstanceOf(Array);
      done();
    });
    it('should be return null with Invalid code', async (done) => {
      const result = await service.findByGenre({ first: 4 }, 'InvalidCode');
      expect(result.edges).toEqual([]);
      done();
    });
  });
});
