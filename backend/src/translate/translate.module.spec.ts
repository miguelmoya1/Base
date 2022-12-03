import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TranslateController } from './translate.controller';
import { TranslateResolver } from './translate.resolver';
import { TranslateService } from './translate.service';

@Module({
  providers: [TranslateService, TranslateResolver],
  controllers: [TranslateController],
  exports: [TranslateService],
  imports: [ConfigModule],
})
export class TranslateModuleSpec {}

describe('Translate Module', () => {
  let module: Test;

  beforeEach(async () => {
    module = Test.createTestingModule({
      imports: [TranslateModuleSpec],
    }).compile();
  });

  it('Should be defined', () => {
    expect(module).toBeDefined();
  });
});
