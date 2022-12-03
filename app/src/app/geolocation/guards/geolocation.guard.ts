import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ROUTES } from '../../shared/screens';
import { GeolocationService } from '../geolocation.service';

@Injectable({
  providedIn: 'root',
})
export class GeolocationGuard implements CanActivate {
  constructor(private readonly geolocationService: GeolocationService, private readonly router: Router) {}

  async canActivate() {
    if (await this.geolocationService.hasPermissions()) {
      return true;
    }

    this.router.navigate([ROUTES.geolocation.route]);
    return false;
  }
}
