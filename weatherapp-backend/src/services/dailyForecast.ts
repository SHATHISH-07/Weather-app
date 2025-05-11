import axios from "axios";
import { DailyForecast } from "../types";

const parameters = [
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_sum",
  "weathercode",
  "wind_speed_10m_max",
  "uv_index_max",
].join(",");

const getDailyForecastService = async (
  longitude: number,
  latitude: number,
  timezone: string
): Promise<DailyForecast> => {
  if (latitude < -90 || latitude > 90) {
    throw new Error("Latitude must be between -90 and 90");
  }
  if (longitude < -180 || longitude > 180) {
    throw new Error("Longitude must be between -180 and 180");
  }

  if (!/^[A-Za-z_\/-]+$/u.test(timezone)) {
    throw new Error("Invalid timezone format");
  }

  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=${parameters}`
    );

    return response.data;
  } catch (err: any) {
    console.error("Error fetching forecast:", err.message, err.response?.data);
    throw new Error(
      `Failed to fetch forecast: ${err.response?.data?.reason || err.message}`
    );
  }
};

export default getDailyForecastService;
