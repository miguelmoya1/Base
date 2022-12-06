import { Body, Controller, Get, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController {
  private logger = new Logger('TranslateController');
  constructor(private readonly translateService: TranslateService) {}

  @Get()
  async translate(@Req() request?: Request, @Body('language') language?: string) {
    this.logger.debug('getTranslate');
    return this.translateService.getTranslate(request, language);
  }
}
