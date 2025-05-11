import { gql } from "@apollo/client";

export const GET_HOURLY_FORECAST = gql`
  query GET_HOURLY_FORECAST(
    $latitude: Float!
    $longitude: Float!
    $timezone: String!
  ) {
    getHourlyForecast(
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
    ) {
      latitude
      longitude
      timezone
      hourly_units {
        time
        temperature_2m
        weathercode
        wind_speed_10m
        uv_index
      }
      hourly {
        time
        temperature_2m
        weathercode
        wind_speed_10m
        uv_index
      }
    }
  }
`;
