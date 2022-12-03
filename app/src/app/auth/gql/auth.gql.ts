import { gql } from 'apollo-angular';

export const IS_LOGGED = gql`
  query isLogged {
    data: isLogged
  }
`;

export const REHYDRATE = gql`
  mutation rehydrate {
    data: rehydrate
  }
`;

export const LOGIN_GOOGLE = gql`
  mutation loginGoogle($user: GoogleLogin!) {
    data: loginGoogle(user: $user) {
      token
    }
  }
`;
