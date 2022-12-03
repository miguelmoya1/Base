import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';

describe('Translate Pipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslatePipe],
      providers: [TranslatePipe],
    });

    pipe = TestBed.inject(TranslatePipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the value if the key is not found', () => {
    const value = 'falseKey';
    expect(pipe.transform(value)).toBe(value);
  });
});
