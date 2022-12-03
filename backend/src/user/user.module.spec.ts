import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import { GeometryModuleSpec } from '../geometry/geometry.module.spec';
import { RatingModuleSpec } from '../rating/rating.module.spec';
import { ModelMock } from '../shared/testing/model.mock';
import { TranslateModuleSpec } from '../translate/translate.module.spec';
import { UserModel } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const UserMock = {
  provide: getModelToken(UserModel),
  useFactory: () => new ModelMock([{ id: '1', name: 'Test' }]),
};

@Module({
  imports: [TranslateModuleSpec, RatingModuleSpec, GeometryModuleSpec],
  providers: [UserService, UserResolver, UserMock],
  exports: [UserMock],
})
export class UserModuleSpec {}

describe('User Module', () => {
  let module: Test;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserModuleSpec],
    }).compile();
  });

  it('Module should be defined', () => {
    expect(module).toBeDefined();
  });
});
