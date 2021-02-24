import { Injectable } from '@nestjs/common';

@Injectable()
export class WebtoonsService {
  hello(): string {
    return 'Hello World';
  }
}
