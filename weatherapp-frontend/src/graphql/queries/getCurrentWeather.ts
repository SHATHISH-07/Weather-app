import { gql } from "@apollo/client";

export const GET_CURRENT_WEATHER = gql`
  query GET_CURRENT_WEATHER($city: String!) {
    getCurrentWeather(city: $city) {
      name
      timezone
      weather {
        main
        description
        icon
      }
      main {
        temp
        feels_like
        temp_min
        temp_max
        pressure
        humidity
      }
      wind {
        speed
        deg
        gust
      }
      clouds {
        all
      }
      sys {
        country
        sunrise
        sunset
      }
      coord {
        lon
        lat
      }
    }
  }
`;
