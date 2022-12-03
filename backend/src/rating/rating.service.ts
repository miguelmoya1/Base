import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RatingService implements OnModuleInit {
  private logger = new Logger(RatingService.name);

  onModuleInit() {
    this.logger.debug('Init');
  }
}
