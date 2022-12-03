import { Test } from '@nestjs/testing';
import { AuthModuleSpec } from './auth.module.spec';
import { AuthResolver } from './auth.resolver';

describe('Auth Resolver', () => {
  let resolver: AuthResolver;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModuleSpec],
    }).compile();

    resolver = module.get(AuthResolver);
  });

  it('Should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
