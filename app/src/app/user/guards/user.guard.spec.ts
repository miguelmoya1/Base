import { TestBed } from '@angular/core/testing';
import { ApolloModuleTest } from '../../shared/spec/index.spec';
import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModuleTest],
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
