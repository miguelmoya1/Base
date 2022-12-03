import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  get TOKEN_NAME() {
    return 'token_name';
  }

  get SERVER_URL() {
    return isDevMode() ? 'http://localhost:3000' : 'https://api.example.com';
  }
}
