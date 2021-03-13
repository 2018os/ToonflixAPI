import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { WebtoonsModule } from './webtoons/webtoons.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
    WebtoonsModule,
    GenresModule,
  ],
})
export class AppModule {}
