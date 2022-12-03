import { TestBed } from '@angular/core/testing';

import { GeolocationGuard } from './geolocation.guard';

describe('GeolocationGuard', () => {
  let guard: GeolocationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeolocationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
