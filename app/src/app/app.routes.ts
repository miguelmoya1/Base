import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { GeolocationGuard } from './geolocation/guards/geolocation.guard';
import { ROUTES } from './shared/screens';
import { TranslateGuard } from './translate/guards/translate.guard';
import { UserGuard } from './user/guards/user.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTES.dashboard.path,
    pathMatch: 'full',
  },
  {
    path: ROUTES.auth.path,
    canLoad: [AuthGuard],
    canActivate: [TranslateGuard],
    loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: ROUTES.geolocation.path,
    canLoad: [AuthGuard],
    canActivate: [TranslateGuard],
    loadChildren: () => import('./geolocation/geolocation.routes').then((r) => r.GEOLOCATION_ROUTES),
  },
  {
    path: ROUTES.dashboard.path,
    canLoad: [AuthGuard],
    canActivate: [TranslateGuard, GeolocationGuard, UserGuard],
    loadChildren: () => import('./dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
  },
  {
    path: ROUTES.user.path,
    canLoad: [AuthGuard],
    canActivate: [TranslateGuard, GeolocationGuard], // UserGuard is used in user.routes.ts (only for user pages (NOT for set-up page))
    loadChildren: () => import('./user/user.routes').then((r) => r.USER_ROUTES),
  },
  {
    path: '**',
    redirectTo: ROUTES.dashboard.path,
  },
];
