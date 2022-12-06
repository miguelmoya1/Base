import { Test } from '@nestjs/testing';
import { GqlAuthGuard, JwtAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let gqlAuthGuard: GqlAuthGuard;
  let jwtAuthGuard: JwtAuthGuard;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [GqlAuthGuard, JwtAuthGuard],
    }).compile();

    gqlAuthGuard = module.get(GqlAuthGuard);
    jwtAuthGuard = module.get(JwtAuthGuard);

    jest.clearAllMocks();
  });

  describe('GqlAuthGuard', () => {
    it('Should be defined', () => {
      expect(gqlAuthGuard).toBeDefined();
    });
  });

  describe('JwtAuthGuard', () => {
    it('Should be defined', () => {
      expect(jwtAuthGuard).toBeDefined();
    });
  });
});
