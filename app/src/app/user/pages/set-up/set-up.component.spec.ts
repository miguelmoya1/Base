import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModuleTest } from '../../../shared/spec/index.spec';
import { SetUpComponent } from './set-up.component';

describe('SetUpComponent', () => {
  let component: SetUpComponent;
  let fixture: ComponentFixture<SetUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetUpComponent, ApolloModuleTest],
    }).compileComponents();

    fixture = TestBed.createComponent(SetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
