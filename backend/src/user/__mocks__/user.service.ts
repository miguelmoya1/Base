import { userData } from './data';

export const UserService = jest.fn().mockReturnValue({
  isUniqueNickname: jest.fn().mockResolvedValue(true),
  findAll: jest.fn().mockResolvedValue([userData()]),
  findOne: jest.fn().mockResolvedValue(userData()),
  update: jest.fn().mockResolvedValue(true),
});
