import { gql } from "@apollo/client";

export const GET_REVERSE_GEOCODING = gql`
  query GET_REVERSE_GEOCODING($latitude: Float!, $longitude: Float!) {
    getReverseGeocoding(latitude: $latitude, longitude: $longitude) {
      address {
        state_district
        state
        country
      }
    }
  }
`;
