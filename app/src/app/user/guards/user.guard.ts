import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES } from '../../shared/screens';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly router: Router) {}

  canActivate() {
    return this.userService.getLogged().pipe(
      map((user) => {
        if (user?.nickname) {
          return true;
        }
        this.router.navigate([ROUTES.user.set_up.route]);
        return false;
      }),
    );
  }
}
