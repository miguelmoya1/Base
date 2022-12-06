import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateService, ConfigService],
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

  describe('languages', () => {
    it('Should be defined', () => {
      expect(service['languages']).toBeDefined();
    });
  });

  describe('languagesDir', () => {
    it('Should be defined', () => {
      expect(service['languagesDir']).toBeDefined();
    });

    it('Should be a string', () => {
      expect(typeof service['languagesDir']).toBe('string');
    });

    it("should contain the value 'languages'", () => {
      expect(service['languagesDir']).toContain('languages');
    });
  });

  describe('onModuleInit', () => {
    it('Should be defined', () => {
      expect(service.onModuleInit).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service.onModuleInit).toHaveProperty('name', 'onModuleInit');
      expect(typeof service.onModuleInit).toBe('function');
      expect(service.onModuleInit).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      it('Should set the current language', () => {
        expect(service.current).toBeDefined();
      });

      it('Should set the languages', () => {
        expect(service['languages']).toBeDefined();
      });

      it('should call the createFiles method', () => {
        const createFilesSpy = jest.spyOn(service as any, 'createFiles');
        service.onModuleInit();
        expect(createFilesSpy).toBeCalled();

        createFilesSpy.mockRestore();

        jest.clearAllMocks();
      });
    });
  });

  describe('getTranslate', () => {
    it('Should be defined', () => {
      expect(service.getTranslate).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service.getTranslate).toHaveProperty('name', 'getTranslate');
      expect(typeof service.getTranslate).toBe('function');
      expect(service.getTranslate).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      beforeAll(async () => {
        await service.onModuleInit();

        jest.clearAllMocks();
      });

      it('Should return a object', () => {
        expect(typeof service.getTranslate(null)).toBe('object');
      });

      it('Should return the correct translation', () => {
        expect(service.getTranslate(null)).toStrictEqual(expect.any(Object));
      });

      it('should set the values in languages: en', () => {
        expect(Object.keys(service['languages'])).toContain('en');
      });

      it('should set the values in languages: es', () => {
        expect(Object.keys(service['languages'])).toContain('es');
      });
    });
  });

  describe('createFiles', () => {
    it('Should be defined', () => {
      expect(service['createFiles']).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service['createFiles']).toHaveProperty('name', 'createFiles');
      expect(typeof service['createFiles']).toBe('function');
      expect(service['createFiles']).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      beforeAll(async () => {
        await service.onModuleInit();

        jest.clearAllMocks();
      });

      it('should call the prepareTranslateFileJSON method', async () => {
        const prepareTranslateFileJSONSpy = jest.spyOn(service as any, 'prepareTranslateFileJSON');
        await service['createFiles']();
        expect(prepareTranslateFileJSONSpy).toBeCalled();

        prepareTranslateFileJSONSpy.mockRestore();

        jest.clearAllMocks();
      });

      it('should not call setGQLTranslateFile method', async () => {
        const setGQLTranslateFileSpy = jest.spyOn(service as any, 'setGQLTranslateFile');
        await service['createFiles']();
        expect(setGQLTranslateFileSpy).not.toBeCalled();

        setGQLTranslateFileSpy.mockRestore();

        jest.clearAllMocks();
      });
    });
  });

  describe('getDefaultValues', () => {
    it('Should be defined', () => {
      expect(service['getDefaultValues']).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service['getDefaultValues']).toHaveProperty('name', 'getDefaultValues');
      expect(typeof service['getDefaultValues']).toBe('function');
      expect(service['getDefaultValues']).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      beforeAll(async () => {
        await service.onModuleInit();

        jest.clearAllMocks();
      });

      it('Should return a object', () => {
        expect(typeof service['getDefaultValues']()).toBe('object');
      });

      it('Should return the correct translation', () => {
        expect(service['getDefaultValues']()).toStrictEqual(expect.any(Object));
      });
    });
  });

  describe('prepareTranslateFileJSON', () => {
    it('Should be defined', () => {
      expect(service['prepareTranslateFileJSON']).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service['prepareTranslateFileJSON']).toHaveProperty('name', 'prepareTranslateFileJSON');
      expect(typeof service['prepareTranslateFileJSON']).toBe('function');
      expect(service['prepareTranslateFileJSON']).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      beforeAll(async () => {
        await service.onModuleInit();

        jest.clearAllMocks();
      });

      it('Should return a object', () => {
        expect(typeof service['prepareTranslateFileJSON']('en', ['es.json', 'en.json'])).toBe('object');
      });

      it('should call getDefaultValues method', () => {
        const getDefaultValuesSpy = jest.spyOn(service as any, 'getDefaultValues');
        service['prepareTranslateFileJSON']('en', ['es.json', 'en.json']);
        expect(getDefaultValuesSpy).toBeCalled();

        getDefaultValuesSpy.mockRestore();

        jest.clearAllMocks();
      });

      it('should set something in the languages object', () => {
        service['prepareTranslateFileJSON']('en', ['es.json', 'en.json']);
        expect(Object.keys(service['languages'])).toContain('en');
      });
    });
  });

  describe('setGQLTranslateFile', () => {
    it('Should be defined', () => {
      expect(service['setGQLTranslateFile']).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service['setGQLTranslateFile']).toHaveProperty('name', 'setGQLTranslateFile');
      expect(typeof service['setGQLTranslateFile']).toBe('function');
      expect(service['setGQLTranslateFile']).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      it('should call the getDefaultValues method', async () => {
        const getDefaultValuesSpy = jest.spyOn(service as any, 'getDefaultValues');
        await service['setGQLTranslateFile']();
        expect(getDefaultValuesSpy).toBeCalled();

        getDefaultValuesSpy.mockRestore();

        jest.clearAllMocks();
      });
    });
  });

  describe('exists', () => {
    it('Should be defined', () => {
      expect(service['exists']).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service['exists']).toHaveProperty('name', 'exists');
      expect(typeof service['exists']).toBe('function');
      expect(service['exists']).toBeInstanceOf(Function);
    });

    describe('when called correctly', () => {
      it('Should return a Promise<boolean>', async () => {
        expect(service['exists']('en')).toBeInstanceOf(Promise);
        expect(typeof (await service['exists']('en'))).toBe('boolean');
      });
    });
  });
});
