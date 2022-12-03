import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './translate.service';

describe('Translate Service', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslatePipe],
      providers: [TranslatePipe],
    });

    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loading', () => {
    it('should be a boolean', () => {
      expect(service.loading).toBeInstanceOf(Boolean);
    });
  });
});
