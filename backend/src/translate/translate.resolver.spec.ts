import { Test } from '@nestjs/testing';
import { TranslateResolver } from './translate.resolver';
import { TranslateService } from './translate.service';

jest.mock('./translate.service');

describe('TranslateResolver', () => {
  let resolver: TranslateResolver;
  let service: TranslateService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TranslateResolver, TranslateService],
    }).compile();

    resolver = module.get(TranslateResolver);
    service = module.get(TranslateService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('translate', () => {
    it('should be defined', () => {
      expect(resolver.translate).toBeDefined();
    });

    it('should be a function', () => {
      expect(resolver.translate).toHaveProperty('name', 'translate');
      expect(typeof resolver.translate).toBe('function');
      expect(resolver.translate).toBeInstanceOf(Function);
    });

    it('should return a Promise', () => {
      const result = resolver.translate();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return a Promise that resolves to an object', async () => {
      const result = await resolver.translate();
      expect(result).toBeInstanceOf(Object);
    });

    it('should call the method getTranslate from the service', async () => {
      await resolver.translate();
      expect(service.getTranslate).toHaveBeenCalledTimes(1);
    });
  });
});
