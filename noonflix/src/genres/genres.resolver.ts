import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';
import { WebtoonsService } from 'src/webtoons/webtoons.service';
import { PaginationArgs } from 'src/common/pagination/dto/pagination.input';
import { WebtoonsConnection } from 'src/webtoons/entities/webtoon-connection.entity';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(
    private readonly genresService: GenresService,
    private readonly webtoonsService: WebtoonsService,
  ) {}

  @Query(() => [Genre], { name: 'genres' })
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @ResolveField(() => WebtoonsConnection)
  webtoons(
    @Parent() genre: Genre,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<WebtoonsConnection> {
    const { code } = genre;
    return this.webtoonsService.findByGenre(paginationArgs, code);
  }
}
