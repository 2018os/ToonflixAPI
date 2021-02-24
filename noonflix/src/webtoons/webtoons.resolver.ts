import { Resolver, Query } from '@nestjs/graphql';

import { WebtoonsService } from './webtoons.service';

import { Webtoon } from './entities/webtoon.entity';

@Resolver()
export class WebtoonsResolver {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Query(() => [Webtoon], { name: 'webtoons', nullable: true })
  findAll(): Promise<Webtoon[] | null> {
    return this.webtoonsService.findAll();
  }
}
