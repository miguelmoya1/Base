import { Test } from '@nestjs/testing';
import { GqlAuthGuard, JwtAuthGuard } from './auth.guard';
import { AuthModuleSpec } from './auth.module.spec';

describe('Auth Guard', () => {
  let gqlAuthGuard: GqlAuthGuard;
  let jwtAuthGuard: JwtAuthGuard;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModuleSpec],
    }).compile();

    gqlAuthGuard = module.get(GqlAuthGuard);
    jwtAuthGuard = module.get(JwtAuthGuard);
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
