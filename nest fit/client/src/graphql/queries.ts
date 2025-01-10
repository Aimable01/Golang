import { gql } from "@apollo/client";

export const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    user(username: $username) {
      id
      name
      username
      email
      profilePicture
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    user(username: "") {
      id
      name
      username
      email
      profilePicture
    }
  }
`;
