import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation CreateUser($input: NewUser!) {
    createUser(input: $input)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: Login!) {
    login(input: $input)
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input)
  }
`;
