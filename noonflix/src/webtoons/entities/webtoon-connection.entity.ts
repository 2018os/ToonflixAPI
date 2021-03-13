import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Webtoon } from './webtoon.entity';
import { PageInfo } from '../../common/pagination/entities/page-info.entity';

@ObjectType()
class WebtoonEdge {
  @Field((type) => String)
  cursor: string;

  @Field((type) => Webtoon)
  node: Webtoon;
}

@ObjectType()
export class WebtoonsConnection {
  @Field((type) => [WebtoonEdge], { nullable: true })
  edges: Array<WebtoonEdge>;

  @Field((type) => PageInfo)
  pageInfo: PageInfo;

  @Field((type) => Int)
  totalCount: number;
}
