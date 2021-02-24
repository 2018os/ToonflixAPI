import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'noonflix/src/schema.graphql'),
    }),
  ],
})
export class AppModule {}
