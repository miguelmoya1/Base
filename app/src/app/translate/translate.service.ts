import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translate } from 'core/graphql';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  local!: Translate;
  loading = true;
  loaded$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.setTranslate();
  }

  async setTranslate() {
    if (!this.local) {
      this.local = await firstValueFrom(this.http.get<Translate>('/translate'));
      this.loading = false;
      this.loaded$.next(true);
    }
  }
}
