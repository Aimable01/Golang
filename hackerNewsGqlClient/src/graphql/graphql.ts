import { gql } from "@apollo/client";

export const GET_LINKS = gql`
  query {
    links {
      title
      address
      id
    }
  }
`;

export const CREATE_LINK = gql`
  mutation CreateLink($input: LinkInput!) {
    createLink(input: $input) {
      user {
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input)
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;
