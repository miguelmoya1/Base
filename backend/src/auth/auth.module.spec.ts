import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { TranslateModuleSpec } from '../translate/translate.module.spec';
import { UserModuleSpec } from '../user/user.module.spec';
import { GqlAuthGuard, JwtAuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [TranslateModuleSpec, UserModuleSpec, JwtModule.register({ secret: 'secret' })],
  providers: [AuthService, AuthResolver, GqlAuthGuard, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModuleSpec {}

describe('Auth Module', () => {
  let module: TestingModuleBuilder;

  beforeAll(async () => {
    module = Test.createTestingModule({
      imports: [AuthModuleSpec],
    });
  });

  it('Should be defined', () => {
    expect(module).toBeDefined();
  });
});
