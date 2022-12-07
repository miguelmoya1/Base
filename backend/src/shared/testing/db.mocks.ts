import { ModelCtor, Sequelize } from 'sequelize-typescript';

export const DBMock = async (models: ModelCtor[]) => {
  const memDb = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  memDb.addModels(models);

  try {
    // Creates the database structure
    await memDb.sync();
  } catch {}

  return memDb;
};
