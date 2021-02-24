import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Module } from '@nestjs/common';

import { WebtoonsModule } from './webtoons/webtoons.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
    WebtoonsModule,
  ],
})
export class AppModule {}
