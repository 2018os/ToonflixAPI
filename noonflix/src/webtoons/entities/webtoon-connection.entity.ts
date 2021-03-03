import { ObjectType } from '@nestjs/graphql';
import { Webtoon } from './webtoon.entity';
import Paginated from '../../common/pagination/pagination';

@ObjectType()
export class WebtoonsConnection extends Paginated(Webtoon) {}
