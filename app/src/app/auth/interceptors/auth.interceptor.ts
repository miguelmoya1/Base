import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ROUTES } from '../../shared/screens';
import { AuthService } from '../auth.service';

type Request = HttpRequest<{ query: string; operationName: string; variables: { [key: string]: string }[] }>;

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: Request, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.router.navigate([ROUTES.auth.login.route]);
          this.authService.logout();
        }

        throw error;
      }),
    );
  }
}
