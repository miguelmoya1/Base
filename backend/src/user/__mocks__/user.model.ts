import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { modelMock } from '../../shared/testing/model.mocks';
import { UserModel } from '../user.model';
import { userData } from './data';

export const UserModelMock = {
  provide: getModelToken(UserModel),
  useValue: modelMock([userData()]),
} as Provider;
