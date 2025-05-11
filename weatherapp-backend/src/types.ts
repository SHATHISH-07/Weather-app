import { ObjectId, Document } from "mongoose";

// User
export interface User {
  name: string;
  username: string;
  city: string;
  state: string;
  country: string;
  password: string;
}

export interface UserDocument extends User, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// UserSavedLocationArgs
export interface AddLocationArgs {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
}

// MyContext
export interface MyContext {
  currentUser?: UserDocument | null;
  id?: string;
  username?: string;
  name?: string;
  city?: string;
  state?: string;
  country?: string;
}

// TokenPayload
export interface TokenPayload {
  id: string;
  token: string;
}

// Current Weather
export interface WeatherResponse {
  coord: Coordinates;
  weather: WeatherInfo[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

// Forecast
export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
}

export interface ForecastArgs {
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface ExtendedForecastArgs extends ForecastArgs {
  start_date: string;
  end_date: string;
}

// Daily Forecast
export interface DailyForecast extends Forecast {
  daily_units: DailyUnits;
  daily: DailyData;
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  weathercode: string;
  wind_speed_10m_max: string;
  uv_index_max: string;
}

interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weathercode: number[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
}

// Hourly Forecast
export interface HourlyForecast extends Forecast {
  hourly_units: HourlyUnits;
  hourly: HourlyData;
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  precipitation_sum: string;
  weathercode: string;
  wind_speed_10m: string;
  wind_gusts_10m: string;
  uv_index: string;
}

interface HourlyData {
  time: string[];
  temperature_2m: number[];
  precipitation_sum: number[];
  weathercode: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  uv_index: number[];
}

// Climate Forecast
export interface ClimateForecast extends Forecast {
  daily_units: ClimateDataUnits;
  daily: ClimateData;
}

interface ClimateDataUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  windspeed_10m_max: string;
}

interface ClimateData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
}

// Air Quality
export interface AirQuality {
  coord: {
    lon: number;
    lat: number;
  };
  list: AirQualityDataList[];
}

interface AirQualityDataList {
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  dt: number;
}

export interface AirQualityArgs {
  latitude: number;
  longitude: number;
}

// Uv Index
export interface UvIndex extends Forecast {
  forecast: Forecast;
  hourly_units: HourlyUnitsWithUvAndTime;
  hourly: HourlyDataWithUvAndTime;
}

type HourlyUnitsWithUvAndTime = Omit<
  HourlyUnits,
  | "temperature_2m"
  | "wind_speed_10m"
  | "wind_gusts_10m"
  | "precipitation_sum"
  | "weathercode"
>;

type HourlyDataWithUvAndTime = Omit<
  HourlyData,
  | "temperature_2m"
  | "wind_speed_10m"
  | "wind_gusts_10m"
  | "precipitation_sum"
  | "weathercode"
>;

// Solar Radiation
export interface SolarRadiation extends Forecast {
  forecast: Forecast;
  hourly_units: HourlyUnitSolar;
  hourly: HourlyDataSolar;
}

interface HourlyUnitSolar {
  time: string;
  shortwave_radiation: string;
}

interface HourlyDataSolar {
  time: string[];
  shortwave_radiation: number[];
}

// AutoComplete
export interface AutoComplete {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
  display_place: string;
  address: Address;
}

export interface Address {
  name?: string | null;
  road?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: string | null;
  country?: string | null;
  country_code?: string | null;
}

export interface AutoCompleteArgs {
  query: string;
}

// Forward Geocoding
export interface ForwardGeocoding {
  place_id: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  icon?: string;
}

export interface ForwardGeocodingArgs {
  city: string;
  state: string;
  country: string;
}

// Reverse Geocoding
export interface ReverseGeocoding {
  place_id: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: AddressReverseGeoCOde;
  boundingbox: string[];
}

interface AddressReverseGeoCOde {
  artwork: string;
  road?: string;
  quarter: string;
  suburb: string;
  city?: string;
  state_district: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

export interface ReverseGeocodingArgs {
  latitude: number;
  longitude: number;
}
