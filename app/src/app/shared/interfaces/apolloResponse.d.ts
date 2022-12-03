import { ApolloQueryResult } from '@apollo/client/core';
import { EmptyObject } from 'apollo-angular/types';

export interface ApolloResponse<T> {
  data: T;
}

export type ApolloRefetch<T> = (variables?: EmptyObject) => Promise<ApolloQueryResult<ApolloResponse<T>>>;
