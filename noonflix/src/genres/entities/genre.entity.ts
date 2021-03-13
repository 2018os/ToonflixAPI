import { ObjectType, Field } from '@nestjs/graphql';
import { WebtoonsConnection } from '../../webtoons/entities/webtoon-connection.entity';
import { Webtoon } from '../../webtoons/entities/webtoon.entity';

@ObjectType('Genre')
export class Genre {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => WebtoonsConnection)
  webtoons?: Webtoon[];
}
