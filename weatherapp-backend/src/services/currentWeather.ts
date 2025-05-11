import "dotenv/config";
import axios from "axios";
import { WeatherResponse } from "../types";

const getCurrentWeatherService = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Unable to fetch weather data.");
  }
};

export default getCurrentWeatherService;
