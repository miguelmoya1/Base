import { TestBed } from '@angular/core/testing';
import { ApolloModuleTest } from '../spec/index.spec';
import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  let service: ValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModuleTest],
    });
    service = TestBed.inject(ValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
