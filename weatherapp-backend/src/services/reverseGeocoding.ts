import "dotenv/config";
import axios from "axios";
import { ReverseGeocoding } from "../types";

const API_KEY = process.env.LOCATIONIQ_API_KEY;

const reverseGeocodingService = async (
  latitude: number,
  longitude: number
): Promise<ReverseGeocoding> => {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching reverse geocoding data:",
      error.message,
      error.response?.data
    );
    throw new Error(
      `Failed to fetch reverse geocoding data: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

export default reverseGeocodingService;
