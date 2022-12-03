import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Apollo } from 'apollo-angular';
import { AuthResponse, GoogleLogin } from 'core/graphql';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloResponse } from '../shared/interfaces/apolloResponse';
import { ROUTES } from '../shared/screens';
import { GlobalService } from '../shared/services/global.service';
import { IS_LOGGED, LOGIN_GOOGLE, REHYDRATE } from './gql/auth.gql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private initGoogleAuth = true;
  loginChanged$ = new EventEmitter<boolean>();

  constructor(
    private readonly apollo: Apollo,
    private readonly router: Router,
    private readonly globalService: GlobalService,
  ) {
    if (this.initGoogleAuth) {
      GoogleAuth.initialize({
        clientId: '247477019188-9nh3drolhpqfntobeosgd41vgof3uuu6.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    }
  }

  async isLogged() {
    return Storage.get({ key: this.globalService.TOKEN_NAME }).then(({ value }) => !!value);
  }

  async googleLogin() {
    try {
      const user = await GoogleAuth.signIn();
      const token = await firstValueFrom(
        this.apollo
          .mutate<ApolloResponse<AuthResponse>, { user: GoogleLogin }>({
            mutation: LOGIN_GOOGLE,
            variables: {
              user: {
                email: user.email,
                id: user.id,
                givenName: user.givenName,
                familyName: user.familyName,
                imageUrl: user.imageUrl,
                accessToken: user.authentication.accessToken,
                idToken: user.authentication.idToken,
              },
            },
          })
          .pipe(map(({ data }) => data?.data.token)),
      );

      if (token) {
        await this.navigate(token);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  async logout() {
    await Storage.remove({ key: this.globalService.TOKEN_NAME });
    this.setLogged();
    if (this.initGoogleAuth) {
      try {
        await GoogleAuth.signOut();
      } catch {}
    }

    this.apollo.client.refetchQueries({ include: [IS_LOGGED] });
    await this.router.navigate([ROUTES.auth.route]);
  }

  rehydrate() {
    return firstValueFrom(
      this.apollo.mutate<ApolloResponse<string>>({
        mutation: REHYDRATE,
      }),
    );
  }
  private async resetStore() {
    await this.apollo.client.resetStore();
  }

  private async setLogged(token = '') {
    if (token) {
      await Storage.set({ key: this.globalService.TOKEN_NAME, value: token });
    } else {
      await Storage.remove({ key: this.globalService.TOKEN_NAME });
    }

    this.loginChanged$.emit(!!token);
  }

  private async navigate(token: string) {
    await this.resetStore();
    await this.setLogged(token);
    await this.router.navigate([ROUTES.dashboard.route]);
  }
}
