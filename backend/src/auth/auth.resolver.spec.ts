import { Test } from '@nestjs/testing';
import { User } from '../user/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

jest.mock('./auth.service');

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;
  const context = {
    req: {
      user: {
        id: '',
        email: '',
      } as User,
    },
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthResolver, AuthService],
    }).compile();

    resolver = module.get(AuthResolver);
    service = module.get(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('isLogged', () => {
    it('should be defined', () => {
      expect(resolver.isLogged).toBeDefined();
    });

    describe('when is called', () => {
      let result: boolean;

      beforeEach(async () => {
        result = await resolver.isLogged(context);

        jest.clearAllMocks();
      });

      it('should return true', () => {
        expect(result).toBeTruthy();
      });

      it('should call authService.validate', () => {
        resolver.isLogged(context);
        expect(service.validate).toBeCalled();
      });
    });
  });

  describe('rehydrate', () => {
    it('should be defined', () => {
      expect(resolver.rehydrate).toBeDefined();
    });

    describe('when is called', () => {
      it('should return a Promise', () => {
        const result = resolver.rehydrate(context?.req?.user);
        expect(result).toBeInstanceOf(Promise);
      });

      it('should return a string the Promise', async () => {
        const result = await resolver.rehydrate(context?.req?.user);
        expect(typeof result).toBe('string');
      });

      it('should call authService.rehydrate', () => {
        resolver.rehydrate(context?.req?.user);
        expect(service.rehydrate).toBeCalled();
      });
    });
  });

  describe('loginGoogle', () => {
    it('should be defined', () => {
      expect(resolver.loginGoogle).toBeDefined();
    });

    describe('when is called', () => {
      it('should return a Promise', () => {
        const result = resolver.loginGoogle({} as any);
        expect(result).toBeInstanceOf(Promise);
      });

      it('should return an object the Promise', async () => {
        const result = await resolver.loginGoogle({} as any);
        expect(typeof result).toBe('object');
      });

      it('should call authService.loginGoogle', () => {
        resolver.loginGoogle({} as any);
        expect(service.loginGoogle).toBeCalled();
      });
    });
  });
});
