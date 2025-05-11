import "dotenv/config";
import axios from "axios";
import { AirQuality } from "../types";

const API_KEY = process.env.OPENWEATHER_API_KEY;

const getAirQualityService = async (
  latitude: number,
  longitude: number
): Promise<AirQuality> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (err: any) {
    console.error(
      "Error fetching air quality data:",
      err.message,
      err.response?.data
    );
    throw new Error(
      `Failed to fetch air quality data: ${
        err.response?.data?.message || err.message
      }`
    );
  }
};

export default getAirQualityService;
