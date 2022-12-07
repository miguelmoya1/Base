type ID = { id?: string };

const format = <T>(value: T) => {
  return {
    ...value,
    dataValues: value,
    toJSON: () => value,
    update: jest.fn().mockImplementation((value: T) => Promise.resolve(format(value))),
    save: jest.fn().mockImplementation(() => Promise.resolve(format(value))),
    updateLocation: jest.fn().mockImplementation((value: T) => Promise.resolve(format(value))),
  };
};

export const modelMock = (data: ID[]) => ({
  bulkCreate: jest.fn().mockImplementation((entities: ID[]) => Promise.resolve(entities.map(format))),
  create: jest.fn().mockImplementation((entity: ID) => Promise.resolve(format(entity))),
  count: jest.fn().mockImplementation(() => Promise.resolve(data.length)),
  destroy: jest.fn().mockImplementation((options: any) => Promise.resolve(true)),
  findByPk: jest.fn().mockImplementation((id: ID['id']) => {
    if (!id) {
      return Promise.resolve(null);
    }

    return Promise.resolve(format(data.find((item) => item.id === id)));
  }),
  findAll: jest.fn().mockImplementation(() => Promise.resolve(data.map(format))),
  findOne: jest.fn().mockImplementation((options: any) => {
    if (!options) {
      return Promise.resolve(data[0]);
    }

    return Promise.resolve(format(data.find((item) => item.id === options?.where?.id)));
  }),
  update: jest.fn().mockImplementation((entity: ID, options: any) => Promise.resolve([1, [format(entity)]])),
});
