import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LOGIN($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
