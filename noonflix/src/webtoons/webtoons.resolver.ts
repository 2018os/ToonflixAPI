import { Resolver, Query } from '@nestjs/graphql';

import { WebtoonsService } from './webtoons.service';

@Resolver()
export class WebtoonsResolver {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Query(() => String)
  hello(): string {
    return this.webtoonsService.hello();
  }
}
