import { gql } from "@apollo/client";

export const GET_DAILY_FORECAST = gql`
  query GET_DAILY_FORECAST(
    $latitude: Float!
    $longitude: Float!
    $timezone: String!
  ) {
    getDailyForecast(
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
    ) {
      latitude
      longitude
      timezone
      timezone_abbreviation
      daily_units {
        time
        temperature_2m_max
        temperature_2m_min
        precipitation_sum
        weathercode
        wind_speed_10m_max
        uv_index_max
      }
      daily {
        time
        temperature_2m_max
        temperature_2m_min
        precipitation_sum
        weathercode
        wind_speed_10m_max
        uv_index_max
      }
    }
  }
`;
