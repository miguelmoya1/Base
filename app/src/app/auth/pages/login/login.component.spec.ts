import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModuleTest, RouterModuleTest } from '../../../shared/spec/index.spec';
import { LoginComponent } from './login.component';

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModuleTest, RouterModuleTest],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loading', () => {
    it('loading should be false at start', () => {
      expect(component.loading).toBeFalsy();
    });
  });
});
