import { Module } from '@nestjs/common';

import { WebtoonsResolver } from './webtoons.resolver';
import { WebtoonsService } from './webtoons.service';

@Module({
  providers: [WebtoonsResolver, WebtoonsService],
})
export class WebtoonsModule {}
