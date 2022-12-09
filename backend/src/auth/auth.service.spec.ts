import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TranslateService } from '../translate/translate.service';
import { UserService } from '../user/user.service';
import { UserModelMock } from '../user/__mocks__/user.model';
import { AuthService } from './auth.service';

const signValues = {
  id: 'id',
  email: 'email',
};

const googleSignValues = {
  id: 'id',
  accessToken: 'accessToken',
  email: 'email',
  givenName: 'givenName',
  familyName: 'familyName',
  idToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQ3NDc3MDE5MTg4LTluaDNkcm9saHBxZm50b2Jlb3NnZDQxdmdvZjN1dXU2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQ3NDc3MDE5MTg4LTluaDNkcm9saHBxZm50b2Jlb3NnZDQxdmdvZjN1dXU2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyMDMyMDM4ODE4NDI4MjQyMjM5IiwiZW1haWwiOiJtaWd1ZWxtb3lhb3J0ZWdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMXFuS0tqbDB0ZUtmaVV2bjFqUEM0dyIsIm5hbWUiOiJNaWd1ZWwgTW95YSBPcnRlZ2EiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN204aDRvOTNMT0hqbnNwNFI5N0o2M0ZsMkJDNGoxLThVQkZxY1RLQT1zOTYtYyIsImdpdmVuX25hbWUiOiJNaWd1ZWwiLCJmYW1pbHlfbmFtZSI6Ik1veWEgT3J0ZWdhIiwibG9jYWxlIjoiZXMiLCJpYXQiOjE2NzA1Nzc3MzUsImV4cCI6MTY3MDU4MTMzNSwianRpIjoiNjg4MWRkZWY0MDEyN2M0ZmY2YWRkODdjMTYyYjJlMTYxZDBiZTc2MyJ9.JrxOdTgeWOI_tKRgLo5MlyB8LsR6FtuG7S0EnJnkHtJFjERa6kC86n-6iZN3zhstjJ_eEdG5oxQvOsAz12aZmLxLx__46mtoIqNYrF4zIWHXJaSO_h967ErdzPRZyGDnozh0feWOZnd85bFHgu71uslRRiOPZ5LaGfBdd2AocPCShwSxrS4AQNCkJDO1JzC1Pqo8eqe3_NlC3mySaLSb8H2o1l6fF1CC4KV18gtd7_dS_wuR0IiqbrzNOe-Cthdqp9b3EEeuGeGue4-yPU3oVQm95jfnQ2Q8ouMMgKK7NuOmrfbJG2VIh5_4yfM35U2ETa8BtdiqUx-d60GoyQdRkw',
  imageUrl: 'imageUrl',
};

jest.mock('../translate/translate.service');
jest.mock('../user/user.service');

const jwtMock = jest.fn().mockImplementation(() => ({
  sign: jest.fn().mockImplementation((token: string | object) => {
    if (token === 'throw') throw 'error';
    return 'token';
  }),
  verify: jest.fn().mockReturnValue(signValues),
  decode: jest.fn().mockImplementation((token: string | object) => {
    if (token === 'throw') throw 'error';
    return signValues;
  }),
}));

describe('AuthService', () => {
  let service: AuthService;
  let translate: TranslateService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [AuthService, TranslateService, UserService, UserModelMock, { provide: JwtService, useClass: jwtMock }],
    }).compile();

    service = module.get(AuthService);
    translate = module.get(TranslateService);

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('Should be a function', () => {
      expect(service.onModuleInit).toHaveProperty('name', 'onModuleInit');
      expect(typeof service.onModuleInit).toBe('function');
      expect(service.onModuleInit).toBeInstanceOf(Function);
    });

    it('onModuleInit function', async () => {
      const onModuleInit = service.onModuleInit();
      expect(onModuleInit).toBeDefined();
    });
  });

  describe('decode', () => {
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

    it('should throw an error', async () => {
      expect(() => service.decode('throw')).toThrowError();
    });

    it('should throw an error with the corresponding message from translateService.current', async () => {
      expect(() => service.decode('throw')).toThrowError(translate.current.invalidToken);
    });
  });

  describe('loginGoogle', () => {
    it('Should be a function', () => {
      expect(service.loginGoogle).toHaveProperty('name', 'loginGoogle');
      expect(typeof service.loginGoogle).toBe('function');
      expect(service.loginGoogle).toBeInstanceOf(Function);
    });

    it('loginGoogle function', async () => {
      const loginGoogle = await service.loginGoogle(googleSignValues);
      expect(loginGoogle).toBeDefined();
      expect(typeof loginGoogle).toBe('string');
    });
  });

  describe('sign', () => {
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
});
