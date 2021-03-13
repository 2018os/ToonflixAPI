import {
  Resolver,
  Query,
  Args,
  ID,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { WebtoonsService } from './webtoons.service';

import { Webtoon } from './entities/webtoon.entity';
import { WebtoonsConnection } from './entities/webtoon-connection.entity';
import { PaginationArgs } from '../common/pagination/dto/pagination.input';
import { Genre } from '../genres/entities/genre.entity';
import { GenresService } from '../genres/genres.service';

@Resolver(() => Webtoon)
export class WebtoonsResolver {
  constructor(
    private readonly webtoonsService: WebtoonsService,
    private readonly genresService: GenresService,
  ) {}

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

  @ResolveField(() => [Genre])
  genres(@Parent() webtoon: Webtoon): Promise<Genre[]> {
    const { id } = webtoon;
    return this.genresService.findByWebtoon(id);
  }
}
