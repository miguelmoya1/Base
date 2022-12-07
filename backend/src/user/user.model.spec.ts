import { Sequelize } from 'sequelize-typescript';
import { DBMock } from '../shared/testing/db.mocks';
import { UserModel } from './user.model';

describe('UserModel', () => {
  let DB: Sequelize;

  beforeAll(async () => {
    DB = await DBMock([UserModel]);
  });

  afterAll(async () => {
    await DB.close();
  });

  it('should be defined', () => {
    expect(UserModel).toBeDefined();
  });

  it('should have a static createDefault method', () => {
    expect(UserModel.createDefault).toBeDefined();
  });

  it('should have a updateLocation method', () => {
    expect(UserModel.prototype.updateLocation).toBeDefined();
  });

  it('should have the correct fields', () => {
    expect(UserModel.getAttributes().id).toBeDefined();
    expect(UserModel.getAttributes().name).toBeDefined();
    expect(UserModel.getAttributes().email).toBeDefined();
    expect(UserModel.getAttributes().location).toBeDefined();
    expect(UserModel.getAttributes().imageUrl).toBeDefined();
    expect(UserModel.getAttributes().surname).toBeDefined();
    expect(UserModel.getAttributes().nickname).toBeDefined();
    expect(UserModel.getAttributes().googleToken).toBeDefined();
  });
});
