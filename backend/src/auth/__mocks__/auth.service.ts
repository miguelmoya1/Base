import { User } from '../../user/entities/user.entity';
import { GoogleLogin } from '../entities/google.entity';

export const AuthService = jest.fn().mockImplementation(() => ({
  onModuleInit: jest.fn(),
  decode: jest.fn().mockImplementation((token: string) => ({ id: 1, email: '' })),
  loginGoogle: jest.fn().mockImplementation((user: GoogleLogin) => Promise.resolve({ id: 1, email: '' })),
  sign: jest.fn().mockImplementation((user: Pick<User, 'id' | 'email'>) => Promise.resolve('')),
  rehydrate: jest.fn().mockImplementation((user: User) => Promise.resolve('{ id: 1, email: ""}')),
  validate: jest.fn().mockImplementation((email: string, id: string) => true),
}));
