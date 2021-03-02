import { Resolver, Query, Args, ID, Int } from '@nestjs/graphql';

import { WebtoonsService } from './webtoons.service';

import { Webtoon } from './entities/webtoon.entity';
import { WebtoonsConnection } from './entities/webtoon-connection.entity';
import { PaginationArgs } from 'src/common/pagination/dto/pagination.input';

@Resolver()
export class WebtoonsResolver {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Query(() => WebtoonsConnection, { name: 'webtoons' })
  findAll(@Args() paginationArgs: PaginationArgs): Promise<WebtoonsConnection> {
    return this.webtoonsService.findAll(paginationArgs);
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
