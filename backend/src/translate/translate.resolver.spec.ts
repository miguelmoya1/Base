import { Test } from '@nestjs/testing';
import { TranslateModuleSpec } from './translate.module.spec';
import { TranslateResolver } from './translate.resolver';

describe('Translate Resolver', () => {
  let resolver: TranslateResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TranslateModuleSpec],
    }).compile();

    resolver = module.get(TranslateResolver);
  });

  it('Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
