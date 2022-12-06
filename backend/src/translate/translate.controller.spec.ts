import { Test } from '@nestjs/testing';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';

jest.mock('./translate.service');

describe('TranslateController', () => {
  let controller: TranslateController;
  let service: TranslateService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TranslateController],
      providers: [TranslateService],
    }).compile();

    controller = module.get<TranslateController>(TranslateController);
    service = module.get<TranslateService>(TranslateService);

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('translate', () => {
    it('Should be defined', () => {
      expect(controller.translate).toBeDefined();
    });

    it('Should be a function', () => {
      expect(controller.translate).toHaveProperty('name', 'translate');
      expect(typeof controller.translate).toBe('function');
      expect(controller.translate).toBeInstanceOf(Function);
    });

    it('Should return a Promise', () => {
      const result = controller.translate();
      expect(result).toBeInstanceOf(Promise);
    });

    it('Should return a Promise that resolves to an object', async () => {
      const result = await controller.translate();
      expect(result).toBeInstanceOf(Object);
    });

    it('should call the method getTranslate from the service', async () => {
      await controller.translate();
      expect(service.getTranslate).toHaveBeenCalledTimes(1);
    });
  });
});
