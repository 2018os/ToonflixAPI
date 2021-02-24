import { Test, TestingModule } from '@nestjs/testing';
import { WebtoonsResolver } from './webtoons.resolver';

describe('WebtoonsResolver', () => {
  let resolver: WebtoonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebtoonsResolver],
    }).compile();

    resolver = module.get<WebtoonsResolver>(WebtoonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
