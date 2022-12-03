import { Test, TestingModule } from '@nestjs/testing';
import { TranslateModuleSpec } from './translate.module.spec';
import { TranslateService } from './translate.service';

describe('Translate Service', () => {
  let service: TranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TranslateModuleSpec],
    }).compile();

    service = module.get(TranslateService);

    await service.onModuleInit();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('current', () => {
    it('Should be defined', () => {
      expect(service.current).toBeDefined();
    });
  });

  describe('getTranslate', () => {
    it('Should be a function', () => {
      expect(service.getTranslate).toHaveProperty('name', 'getTranslate');
      expect(typeof service.getTranslate).toBe('function');
      expect(service.getTranslate).toBeInstanceOf(Function);
    });
  });
});
