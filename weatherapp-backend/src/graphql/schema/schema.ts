const { graphql } = require("@apollo/server");

// Current Weather Schema
const typeDefs = `#graphql

type Mutation {
  createUser(name: String!, username: String!,city: String!, state: String!, country: String!, password: String!): User!
  login(username: String!, password: String!): LoginUser!
}

type Query {
  getUser(username: String!): UserWithoutPassword
  getUsers: [UserWithoutPassword]
  getCurrentUser: UserWithoutPassword
  getCurrentWeather(city: String!): WeatherResponse
  getDailyForecast(latitude: Float!, longitude: Float!, timezone: String!): DailyForecast
  getHourlyForecast(latitude: Float!, longitude: Float!, timezone: String!): HourlyForecast
  getAirQuality(latitude: Float!, longitude: Float!): AirQuality
  getForwardGeocoding(city: String!, state: String!, country: String!): [ForwardGeocoding]
  getReverseGeocoding(latitude: Float!, longitude: Float!): ReverseGeocoding
}

# Create User
type User {
  id: ID!
  name: String!
  username: String!
  city: String!
  state: String
  country: String
  password: String!
}

type UserWithoutPassword {
  id: ID!
  name: String!
  username: String!
  city: String!
  state: String
  country: String
}

# Login User
type LoginUser {
  id: ID!
  username: String!
  token: String!
}

# Current Weather
type WeatherResponse {
  coord: Coordinates
  weather: [WeatherInfo]
  base: String
  main: MainWeather
  visibility: Int
  wind: Wind
  clouds: Clouds
  dt: Int
  sys: Sys
  timezone: Int
  id: Int
  name: String
  cod: Int
}

type Coordinates {
  lat: Float
  lon: Float
}

type WeatherInfo {
  id: Int
  main: String
  description: String
  icon: String
}

type MainWeather {
  temp: Float
  feels_like: Float
  temp_min: Float
  temp_max: Float
  pressure: Int
  humidity: Int
}

type Wind {
  speed: Float
  deg: Int
  gust: Float
}

type Clouds {
  all: Int
}

type Sys {
  type: Int
  id: Int
  country: String
  sunrise: Int
  sunset: Int
}

# Forecast
type Forecast {
  latitude: Float!
  longitude: Float!
  generationtime_ms: Float!
  utc_offset_seconds: Int!
  timezone: String!
  timezone_abbreviation: String!
  elevation: Int!
  
}

# Daily Forecasts
type DailyForecast {
  latitude: Float!
  longitude: Float!
  timezone: String!
  timezone_abbreviation: String!
  daily_units: DailyUnits!
  daily: DailyData!
}

type DailyUnits {
  time: String!
  temperature_2m_max: String!
  temperature_2m_min: String!
  precipitation_sum: String!
  weathercode: String!
  wind_speed_10m_max: String!
  uv_index_max: String!
}

type DailyData {
  time: [String!]!
  temperature_2m_max: [Float!]!
  temperature_2m_min: [Float!]!
  precipitation_sum: [Float!]!
  weathercode: [Int!]!
  wind_speed_10m_max: [Float!]!
  uv_index_max: [Float!]!
}

# Hourly Forecasts
type HourlyForecast {
  latitude: Float!
  longitude: Float!
  timezone: String!
  hourly_units: HourlyUnits!
  hourly: HourlyData!
}

type HourlyUnits {
  time: String!
  temperature_2m: String!
  precipitation_sum: String!
  weathercode: String!
  wind_speed_10m: String!
  wind_gusts_10m: String!
  uv_index: String!
}

type HourlyData {
  time: [String!]!
  temperature_2m: [Float!]!
  precipitation_sum: [Float!]!
  weathercode: [Int!]!
  wind_speed_10m: [Float!]!
  wind_gusts_10m: [Float!]!
  uv_index: [Float!]!
}

# Air Quality
type AirQuality {
  coord: Coord!
  list: [AirQualityDataList!]!
}

type Coord {
  lon: Float!
  lat: Float!
}

type AirQualityDataList {
  main: AirQualityMain!
  components: AirQualityComponents!
  dt: Int!
}

type AirQualityMain {
  aqi: Int!
}

type AirQualityComponents {
  co: Float!
  no: Float!
  no2: Float!
  o3: Float!
  so2: Float!
  pm2_5: Float!
  pm10: Float!
  nh3: Float!
}

# Forward Geocoding
type ForwardGeocoding {
  place_id: String!
  osm_type: String!
  osm_id: String!
  lat: String!
  lon: String!
  display_name: String!
  class: String!
  type: String!
  icon: String
}

# Reverse Geocoding
type ReverseGeocoding{
  place_id: String!
  osm_type: String!
  osm_id: String!
  lat: String!
  lon: String!
  display_name: String!
  address: Address!
  boundingbox: [String!]!
}

type Address{
  artwork: String!
  road: String!
  quarter: String!
  suburb: String!
  city: String
  state_district: String
  state: String!
  postcode: String!
  country: String!
  country_code: String!
}

`;

export default typeDefs;
