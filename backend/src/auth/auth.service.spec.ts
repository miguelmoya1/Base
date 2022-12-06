import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TranslateService } from '../translate/translate.service';
import { UserService } from '../user/user.service';
import { UserModelMock } from '../user/__mocks__/user.model';
import { AuthService } from './auth.service';

const signValues = {
  id: 'id',
  email: 'email',
};

jest.mock('../translate/translate.service');
jest.mock('../user/user.service');

describe('Auth Service', () => {
  let service: AuthService;
  let translateService: TranslateService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [AuthService, TranslateService, UserService, UserModelMock],
    }).compile();

    service = module.get(AuthService);
    translateService = module.get(TranslateService);

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign function', () => {
    it('Should be a function', () => {
      expect(service.sign).toHaveProperty('name', 'sign');
      expect(typeof service.sign).toBe('function');
      expect(service.sign).toBeInstanceOf(Function);
    });

    it('sign function', async () => {
      const sign = service.sign(signValues);
      expect(sign).toBeDefined();
      expect(typeof sign).toBe('string');
    });
  });

  describe('decode function', () => {
    it('Should be a function', () => {
      expect(service.decode).toHaveProperty('name', 'decode');
      expect(typeof service.decode).toBe('function');
      expect(service.decode).toBeInstanceOf(Function);
    });

    it('should return the correct values', async () => {
      const sign = service.sign(signValues);
      const decode = service.decode(sign);
      expect(decode).toBeDefined();
      expect(typeof decode).toBe('object');
      expect(decode.id).toBe('id');
    });
  });
});
