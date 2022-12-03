import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { ROUTES } from '../../shared/screens';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  async canLoad(route: Route) {
    let logged = false;

    try {
      logged = await this.authService.isLogged();
    } catch (error) {
      logged = false;
    }

    if (route.path?.startsWith(ROUTES.auth.path)) {
      if (logged) {
        this.router.navigate([ROUTES.dashboard.route]);
        return false;
      }

      return true;
    }

    if (!logged) {
      this.router.navigate([ROUTES.auth.login.route]);
      return false;
    }

    return logged;
  }
}
