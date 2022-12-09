import { AppModule } from './app.module';

describe('AppModule', () => {
  let appModule: AppModule;
  beforeAll(async () => {
    appModule = new AppModule();
  });
  it('Should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
