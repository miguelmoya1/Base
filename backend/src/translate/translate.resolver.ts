import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { GetGQLRequest } from '../shared/decorators/getGQLRequest.decorator';
import { Translate } from './entities/translate.entity';
import { TranslateService } from './translate.service';

@Resolver()
export class TranslateResolver {
  private logger = new Logger(TranslateResolver.name);

  constructor(private readonly translateService: TranslateService) {}

  @Query(() => Translate)
  async translate(@GetGQLRequest() request?: Request, @Args({ name: 'language', nullable: true }) language?: string) {
    this.logger.debug('Query: translate');
    return this.translateService.getTranslate(request, language);
  }
}
