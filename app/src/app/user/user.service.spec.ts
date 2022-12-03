import { TestBed } from '@angular/core/testing';
import { ApolloModuleTest } from '../shared/spec/index.spec';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModuleTest],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
