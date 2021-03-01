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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
