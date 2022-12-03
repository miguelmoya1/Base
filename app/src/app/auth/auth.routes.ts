import { Routes } from '@angular/router';
import { ROUTES } from '../shared/screens';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTES.auth.login.path,
    pathMatch: 'full',
  },
  {
    path: ROUTES.auth.login.path,
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '' },
];
