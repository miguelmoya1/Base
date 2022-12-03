import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { from, switchMap } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private readonly globalService: GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return from(Storage.get({ key: this.globalService.TOKEN_NAME })).pipe(
      switchMap(({ value: token }) => {
        const authToken = `Bearer ${token}`;

        const authReq = request.clone({
          url: this.globalService.SERVER_URL + request.url,
          headers: request.headers.set('Authorization', authToken),
        });

        return next.handle(authReq);
      }),
    );
  }
}
