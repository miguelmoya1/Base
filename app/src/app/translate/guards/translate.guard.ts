import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslateService } from '../translate.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateGuard implements CanActivate {
  constructor(private translateService: TranslateService) {}

  canActivate() {
    if (this.translateService.loading) {
      return this.translateService.loaded$;
    }

    if (this.translateService.local) {
      return true;
    }

    return this.translateService.loaded$;
  }
}
