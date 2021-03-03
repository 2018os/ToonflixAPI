import { registerEnumType } from '@nestjs/graphql';
import { Webtoon_platform as Platform } from '@prisma/client';

registerEnumType(Platform, {
  name: 'platform',
});

export default Platform;
