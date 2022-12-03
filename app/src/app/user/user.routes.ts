import { Routes } from '@angular/router';
import { ROUTES } from '../shared/screens';
import { UserGuard } from './guards/user.guard';

export const USER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [UserGuard],
    loadComponent: () => import('./pages/user/user.component').then((m) => m.UserComponent),
  },
  {
    path: ROUTES.user.set_up.path,
    loadComponent: () => import('./pages/set-up/set-up.component').then((m) => m.SetUpComponent),
  },
  {
    path: ROUTES.user.detail.path,
    canActivate: [UserGuard],
    loadComponent: () => import('./pages/user/user.component').then((m) => m.UserComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
