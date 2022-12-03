import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRouteModuleTest, ApolloModuleTest } from '../../../shared/spec/index.spec';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, ActivatedRouteModuleTest, ApolloModuleTest],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
