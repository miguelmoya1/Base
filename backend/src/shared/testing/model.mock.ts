type ID = { id?: string };

export const modelMock = (data: ID[]) => ({
  bulkCreate: jest.fn().mockImplementation((entities: ID[]) => Promise.resolve(entities)),
  create: jest.fn().mockImplementation((entity: ID) => Promise.resolve(entity)),
  count: jest.fn().mockImplementation(() => Promise.resolve(data.length)),
  destroy: jest.fn().mockImplementation((options: ID) => Promise.resolve(options)),
  findByPk: jest.fn().mockImplementation((id: ID['id']) => Promise.resolve(data.find((item) => item.id === id))),
  findAll: jest.fn().mockImplementation(() => Promise.resolve(data)),
  findOne: jest.fn().mockImplementation((options: ID) => Promise.resolve(data.find((item) => item.id === options.id))),
  update: jest.fn().mockImplementation((entity: ID, options: ID) => Promise.resolve([entity, [options]])),
});
