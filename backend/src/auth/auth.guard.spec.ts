import { GqlExecutionContext } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { GqlAuthGuard, JwtAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let gqlAuthGuard: GqlAuthGuard;
  let jwtAuthGuard: JwtAuthGuard;

  let user: { email: string; id: string };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [GqlAuthGuard, JwtAuthGuard],
    }).compile();

    gqlAuthGuard = module.get(GqlAuthGuard);
    jwtAuthGuard = module.get(JwtAuthGuard);

    user = { email: 'mail@mail.com', id: '123' };

    jest.clearAllMocks();
  });

  describe('GqlAuthGuard', () => {
    it('Should be defined', () => {
      expect(gqlAuthGuard).toBeDefined();
    });

    describe('canActivate', () => {
      it('Should be defined', () => {
        expect(gqlAuthGuard.canActivate).toBeDefined();
      });

      it('Should be a function', () => {
        expect(gqlAuthGuard.canActivate).toBeInstanceOf(Function);
      });
    });

    describe('handleRequest', () => {
      it('Should be defined', () => {
        expect(gqlAuthGuard.handleRequest).toBeDefined();
      });

      it('Should be a function', () => {
        expect(gqlAuthGuard.handleRequest).toBeInstanceOf(Function);
      });

      it('Should return an object', () => {
        expect(gqlAuthGuard.handleRequest(null, user, null, new GqlExecutionContext([]))).toBeInstanceOf(Object);
      });

      it('Should return the same value as user', () => {
        expect(gqlAuthGuard.handleRequest(null, user, null, new GqlExecutionContext([]))).toBe(user);
      });
    });

    describe('getRequest', () => {
      beforeAll(() => {
        jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({ getContext: () => ({ req: user }) } as any);

        jest.clearAllMocks();
      });

      it('Should be defined', () => {
        expect(gqlAuthGuard.getRequest).toBeDefined();
      });

      it('Should be a function', () => {
        expect(gqlAuthGuard.getRequest).toBeInstanceOf(Function);
      });

      it('Should return an object', () => {
        expect(gqlAuthGuard.getRequest(new GqlExecutionContext([]))).toBeInstanceOf(Object);
      });

      it('Should return the same value as user', () => {
        expect(gqlAuthGuard.getRequest(new GqlExecutionContext([]))).toBe(user);
      });
    });
  });

  describe('JwtAuthGuard', () => {
    it('Should be defined', () => {
      expect(jwtAuthGuard).toBeDefined();
    });

    describe('canActivate', () => {
      it('Should be defined', () => {
        expect(jwtAuthGuard.canActivate).toBeDefined();
      });

      it('Should be a function', () => {
        expect(jwtAuthGuard.canActivate).toBeInstanceOf(Function);
      });
    });

    describe('handleRequest', () => {
      it('Should be defined', () => {
        expect(jwtAuthGuard.handleRequest).toBeDefined();
      });

      it('Should be a function', () => {
        expect(jwtAuthGuard.handleRequest).toBeInstanceOf(Function);
      });

      it('Should return an object', () => {
        expect(jwtAuthGuard.handleRequest(null, user)).toBeInstanceOf(Object);
      });

      it('Should return the same value as user', () => {
        expect(jwtAuthGuard.handleRequest(null, user)).toBe(user);
      });
    });
  });
});
