import { Test, TestingModule } from '@nestjs/testing';

import { WebtoonsResolver } from './webtoons.resolver';
import { WebtoonsService } from './webtoons.service';
import { PrismaService } from '../common/prisma/prisma.service';

describe('WebtoonsResolver', () => {
  let resolver: WebtoonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebtoonsResolver, WebtoonsService, PrismaService],
    }).compile();

    resolver = module.get<WebtoonsResolver>(WebtoonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
