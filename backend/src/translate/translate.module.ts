import { Global, Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateResolver } from './translate.resolver';
import { TranslateService } from './translate.service';

@Global()
@Module({
  providers: [TranslateService, TranslateResolver],
  controllers: [TranslateController],
  exports: [TranslateService],
})
export class TranslateModule {}
