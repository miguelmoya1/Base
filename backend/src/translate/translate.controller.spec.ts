import { Test } from '@nestjs/testing';
import { TranslateController } from './translate.controller';
import { TranslateModuleSpec } from './translate.module.spec';

describe('Translate Controller', () => {
  let controller: TranslateController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TranslateModuleSpec],
    }).compile();

    controller = module.get<TranslateController>(TranslateController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
});
