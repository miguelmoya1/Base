import { TranslateModule } from './translate.module';

describe('TranslateModule', () => {
  let translateModule: TranslateModule;

  beforeAll(async () => {
    translateModule = new TranslateModule();
  });

  it('Should be defined', () => {
    expect(translateModule).toBeDefined();
  });
});
