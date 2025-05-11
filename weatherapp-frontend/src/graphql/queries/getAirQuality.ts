import { gql } from "@apollo/client";

export const GET_AIR_QUALITY = gql`
  query GET_AIR_QUALITY($latitude: Float!, $longitude: Float!) {
    getAirQuality(latitude: $latitude, longitude: $longitude) {
      list {
        main {
          aqi
        }
        components {
          co
          no
          no2
          o3
          so2
          pm2_5
          pm10
          nh3
        }
      }
    }
  }
`;
