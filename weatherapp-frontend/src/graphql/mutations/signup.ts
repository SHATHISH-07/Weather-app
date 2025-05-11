import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation SIGNUP(
    $username: String!
    $password: String!
    $name: String!
    $city: String!
    $state: String!
    $country: String!
  ) {
    createUser(
      username: $username
      password: $password
      name: $name
      city: $city
      state: $state
      country: $country
    ) {
      id
      name
      username
      city
      state
      country
    }
  }
`;
