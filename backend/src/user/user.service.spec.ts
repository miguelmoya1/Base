import { Test, TestingModule } from '@nestjs/testing';
import { TranslateService } from '../translate/translate.service';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { userData } from './__mocks__/data';
import { UserModelMock } from './__mocks__/user.model';

jest.mock('../translate/translate.service');

describe('UserService', () => {
  let service: UserService;
  let translateService: TranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateService, UserService, UserModelMock],
    }).compile();

    service = module.get<UserService>(UserService);
    translateService = module.get<TranslateService>(TranslateService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should be defined', () => {
      expect(service.onModuleInit).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    describe('when called correctly', () => {
      let users: UserModel[];

      beforeEach(async () => {
        users = await service.findAll(null, userData().id);
      });

      it('should return an instance of array', () => {
        expect(users).toBeInstanceOf(Array);
      });

      it('should have more than 0 items', () => {
        expect(users.length).toBeGreaterThan(0);
      });

      it('should return a User', () => {
        expect(users[0]).toBeInstanceOf(Object);
      });
    });

    describe('when called incorrectly', () => {
      it('should throw an error when the request user not found', async () => {
        await expect(service.findAll(null, null)).rejects.toThrowError(translateService.current.userNotFound);
      });
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    describe('when called correctly', () => {
      let user: UserModel;

      beforeEach(async () => {
        user = await service.findOne(userData().id, userData().id);
      });

      it('should return an instance of object', () => {
        expect(user).toBeInstanceOf(Object);
      });

      it('should return a User', () => {
        expect(user).toBeInstanceOf(Object);
      });
    });

    describe('when called incorrectly', () => {
      it('should throw an error when the request user not found', async () => {
        await expect(service.findOne(null, null)).rejects.toThrowError(translateService.current.userNotFound);
      });

      it('should throw an error when the requested user not found', async () => {
        await expect(service.findOne(userData().id, null)).rejects.toThrowError(translateService.current.userNotFound);
      });
    });
  });

  describe('isUniqueNickname', () => {
    it('should be defined', () => {
      expect(service.isUniqueNickname).toBeDefined();
    });

    describe('when called correctly', () => {
      let isUnique: boolean;

      beforeEach(async () => {
        isUnique = await service.isUniqueNickname(userData().nickname);
      });

      it('should return false', () => {
        expect(isUnique).toBeFalsy();
      });
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    describe('when called correctly', () => {
      let isUpdated: boolean;

      beforeEach(async () => {
        isUpdated = await service.update(userData().id, { ...userData() });
      });

      it('should return true', () => {
        expect(isUpdated).toBeTruthy();
      });
    });

    describe('when called incorrectly', () => {
      it('should throw an error when the request user not found', async () => {
        await expect(service.update(null, userData())).rejects.toThrowError(translateService.current.userNotFound);
      });
    });
  });
});
