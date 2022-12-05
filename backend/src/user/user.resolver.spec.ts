import { Test } from '@nestjs/testing';
import { UserModel } from './user.model';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { userData } from './__mocks__/data';

jest.mock('./user.service');

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile();

    userResolver = moduleRef.get<UserResolver>(UserResolver);
    userService = moduleRef.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(userResolver.findAll).toBeDefined();
    });

    describe('when called correctly', () => {
      let users: UserModel[];

      beforeEach(async () => {
        users = await userResolver.findAll({ id: userData().id }, null);
      });

      it('should call userService.findAll', () => {
        expect(userService.findAll).toHaveBeenCalled();
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

      it('should return an array of users', async () => {
        expect(users).toEqual([userData()]);
      });
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(userResolver.findOne).toBeDefined();
    });

    describe('when called correctly', () => {
      let user: UserModel;

      beforeEach(async () => {
        user = await userResolver.findOne({ id: userData().id }, userData().id);
      });

      it('should call userService.findOne', () => {
        expect(userService.findOne).toHaveBeenCalled();
      });

      it('should return a User', () => {
        expect(user).toBeInstanceOf(Object);
      });

      it('should return a single user', async () => {
        expect(user).toEqual(userData());
      });
    });
  });

  describe('getLogged', () => {
    it('should be defined', () => {
      expect(userResolver.getLogged).toBeDefined();
    });

    describe('when called correctly', () => {
      let user: UserModel;

      beforeEach(async () => {
        user = await userResolver.getLogged(userData());
      });

      it('should call userService.findOne', () => {
        expect(userService.findOne).toHaveBeenCalled();
      });

      it('should return a User', () => {
        expect(user).toBeInstanceOf(Object);
      });

      it('should return a single user', async () => {
        expect(user).toEqual(userData());
      });
    });
  });

  describe('isUniqueNickname', () => {
    it('should be defined', () => {
      expect(userResolver.isUniqueNickname).toBeDefined();
    });

    describe('when called correctly', () => {
      let isUnique: boolean;

      beforeEach(async () => {
        isUnique = await userResolver.isUniqueNickname(userData().nickname);
      });

      it('should call userService.isUniqueNickname', () => {
        expect(userService.isUniqueNickname).toHaveBeenCalled();
      });

      it('should return a boolean', async () => {
        expect(isUnique).toBe(true);
      });
    });
  });

  describe('updateUser', () => {
    it('should be defined', () => {
      expect(userResolver.updateUser).toBeDefined();
    });

    describe('when called correctly', () => {
      let isUpdated: boolean;

      beforeEach(async () => {
        isUpdated = await userResolver.updateUser(userData(), userData());
      });

      it('should call userService.update', () => {
        expect(userService.update).toHaveBeenCalled();
      });

      it('should return a boolean', async () => {
        expect(isUpdated).toBe(true);
      });
    });
  });
});
