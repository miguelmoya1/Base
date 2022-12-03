import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, RouterModule } from '@angular/router';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ReplaySubject } from 'rxjs';

export const eventSubjectRouter = new ReplaySubject<RouterEvent>(1);

@NgModule({
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: {
            get: jasmine.createSpy('get'),
          },
          params: {
            id: 'id',
          },
        },
      },
    },
  ],
})
export class ActivatedRouteModuleTest {}

@NgModule({
  imports: [RouterModule, ActivatedRouteModuleTest],
  exports: [RouterModule],
  providers: [
    {
      provide: Router,
      useValue: {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubjectRouter.asObservable(),
        url: '/',
        createUrlTree: jasmine.createSpy('createUrlTree'),
        navigateByUrl: jasmine.createSpy('navigateByUrl'),
        serializeUrl: jasmine.createSpy('serializeUrl').and.returnValue('/'),
      },
    },
  ],
})
export class RouterModuleTest {}

@NgModule({
  imports: [ApolloTestingModule, HttpClientTestingModule],
})
export class ApolloModuleTest {}
