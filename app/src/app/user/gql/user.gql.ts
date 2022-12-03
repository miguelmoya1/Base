import { gql } from 'apollo-angular';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    imageUrl
    surname
    nickname
    averageRating
    totalRatings
    distance
  }
`;

export const GET_USERS = gql`
  ${USER_FRAGMENT}
  query users($offset: Int!, $limit: Int!) {
    data: users(offset: $offset, limit: $limit) {
      ...UserFragment
    }
  }
`;

export const GET_USER = gql`
  ${USER_FRAGMENT}
  query user($id: String!) {
    data: user(id: $id) {
      ...UserFragment
    }
  }
`;

export const GET_LOGGED_USER = gql`
  ${USER_FRAGMENT}
  query loggedUser {
    data: loggedUser {
      ...UserFragment
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUser!) {
    data: updateUser(user: $user)
  }
`;

export const IS_UNIQUE_NICKNAME = gql`
  query isUniqueNickname($nickname: String!) {
    data: isUniqueNickname(nickname: $nickname)
  }
`;
