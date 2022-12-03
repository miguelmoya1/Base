import { TestBed } from '@angular/core/testing';
import { ApolloModuleTest } from '../../shared/spec/index.spec';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ApolloModuleTest],
      providers: [AuthInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
