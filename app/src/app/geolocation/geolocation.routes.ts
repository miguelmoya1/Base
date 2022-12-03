import { Routes } from '@angular/router';

export const GEOLOCATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/geolocation/geolocation.component').then((m) => m.GeolocationComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
