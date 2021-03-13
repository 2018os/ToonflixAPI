import { ObjectType, Field, ID } from '@nestjs/graphql';
import { URLResolver } from 'graphql-scalars';
import Platform from './platform.entity';
import { Genre } from '../../genres/entities/genre.entity';

@ObjectType('Webtoon')
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

  @Field(() => Platform)
  platform: Platform;

  @Field(() => [Genre])
  genres: Genre[];
}
