import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';
import { PaginatorInput, User } from 'core/interfaces';
import { firstValueFrom, map } from 'rxjs';
import { ApolloResponse } from '../shared/interfaces/apolloResponse';
import { GET_LOGGED_USER, GET_USER, GET_USERS, IS_UNIQUE_NICKNAME, UPDATE_USER } from './gql/user.gql';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private declare watchLogged: QueryRef<ApolloResponse<User>, EmptyObject>;
  private declare watchUsers: QueryRef<ApolloResponse<User[]>, PaginatorInput>;

  private currentPaginator: PaginatorInput = {
    offset: 0,
    limit: 10,
  };

  constructor(private apollo: Apollo) {
    this.watchLogged = this.apollo.watchQuery<ApolloResponse<User>>({
      query: GET_LOGGED_USER,
    });

    this.watchUsers = this.apollo.watchQuery<ApolloResponse<User[]>, PaginatorInput>({
      query: GET_USERS,
      variables: {
        offset: this.currentPaginator.offset,
        limit: this.currentPaginator.limit,
      },
    });
  }

  getAll() {
    return this.watchUsers.valueChanges.pipe(map((res) => res?.data.data));
  }

  async fetchMore() {
    this.currentPaginator.offset += this.currentPaginator.limit;
    await this.watchUsers.fetchMore({
      variables: {
        offset: this.currentPaginator.offset,
        limit: this.currentPaginator.limit,
      },
    });
  }

  async getByID(id: string) {
    return firstValueFrom(
      this.apollo
        .query<{ data: User }>({
          query: GET_USER,
          variables: {
            id,
          },
        })
        .pipe(map((res) => res?.data.data)),
    );
  }

  getLogged() {
    return this.watchLogged.valueChanges.pipe(map((res) => res?.data.data));
  }

  async isUniqueNickname(nickname: string) {
    return await firstValueFrom(
      this.apollo
        .query<{ data: boolean }>({
          query: IS_UNIQUE_NICKNAME,
          variables: {
            nickname,
          },
        })
        .pipe(map((res) => res?.data.data)),
    );
  }

  async updateUser(user: Partial<User>) {
    const updated = await firstValueFrom(
      this.apollo
        .mutate<boolean>({
          mutation: UPDATE_USER,
          variables: {
            user,
          },
        })
        .pipe(map((res) => res?.data)),
    );

    if (updated) {
      await this.watchLogged.refetch();
    }

    return updated;
  }
}
