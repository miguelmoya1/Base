import { TestBed } from '@angular/core/testing';
import { ApolloModuleTest, RouterModuleTest } from '../shared/spec/index.spec';
import { AuthService } from './auth.service';

describe('Auth Service', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModuleTest, RouterModuleTest],
    }).compileComponents();

    service = TestBed.inject(AuthService);

    // @ts-ignore
    service.initGoogleAuth = false;
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logout', () => {
    it('Should exist', () => {
      expect(service.logout).toBeTruthy();
    });
  });

  describe('setLogged', () => {
    it('Should exist', () => {
      // @ts-ignore
      expect(service.setLogged).toBeTruthy();
    });
  });

  describe('navigate', () => {
    beforeEach(() => {
      // @ts-ignore
      service.navigate('token');
    });

    it('Should exist', () => {
      // @ts-ignore
      expect(service.navigate).toBeTruthy();
    });
  });
});
