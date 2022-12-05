import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { TranslateModuleSpec } from '../translate/translate.module.spec';
import { UserService } from '../user/user.service';
import { UserModelMock } from '../user/__mocks__/user.model';
import { GqlAuthGuard, JwtAuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

jest.mock('../user/user.service');

@Module({
  imports: [TranslateModuleSpec, JwtModule.register({ secret: 'secret' })],
  providers: [AuthService, AuthResolver, GqlAuthGuard, JwtAuthGuard, UserService, UserModelMock],
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
