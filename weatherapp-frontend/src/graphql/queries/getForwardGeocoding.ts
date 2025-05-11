import { gql } from "@apollo/client";

export const GET_FORWARD_GEOCODING = gql`
  query GET_FORWARD_GEOCODING(
    $city: String!
    $state: String!
    $country: String!
  ) {
    getForwardGeocoding(city: $city, state: $state, country: $country) {
      display_name
      lat
      lon
    }
  }
`;
