import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateGuard } from './translate.guard';

describe('TranslateGuard', () => {
  let guard: TranslateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(TranslateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
