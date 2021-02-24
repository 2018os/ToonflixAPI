import { ObjectType, Field, ID } from '@nestjs/graphql';
import { URLResolver } from 'graphql-scalars';

@ObjectType()
export class Webtoon {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  isFinish: boolean;

  @Field()
  isAdult: boolean;

  @Field()
  isPay: boolean;

  @Field(() => URLResolver)
  thumbnail: string;

  @Field(() => URLResolver)
  url: string;
}