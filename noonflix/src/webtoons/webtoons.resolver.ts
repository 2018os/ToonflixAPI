import { Resolver, Query, Args, ID, Int } from '@nestjs/graphql';

import { WebtoonsService } from './webtoons.service';

import { Webtoon } from './entities/webtoon.entity';

@Resolver()
export class WebtoonsResolver {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Query(() => [Webtoon], { name: 'webtoons' })
  findAll(): Promise<Webtoon[]> {
    return this.webtoonsService.findAll();
  }

  @Query(() => Webtoon, { name: 'webtoon' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Webtoon> {
    return this.webtoonsService.findOne(id);
  }

  @Query(() => [Webtoon], { name: 'randomWebtoons' })
  findRandomWebtoons(
    @Args('take', { type: () => Int }) take: number,
  ): Promise<Webtoon[]> {
    return this.webtoonsService.findRandomWebtoons(take);
  }
}
