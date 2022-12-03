import { Route } from '@angular/router';
import { TranslateGuard } from '../translate/guards/translate.guard';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [TranslateGuard],
    loadComponent: () => import('./pages/dashboard.component').then((m) => m.DashboardComponent),
  },
];
