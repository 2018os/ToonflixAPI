import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field((type) => String, { nullable: true })
  startCursor?: string;
}
