import "dotenv/config";
import axios from "axios";
import { ForwardGeocoding } from "../types";

const API_KEY = process.env.LOCATIONIQ_API_KEY;

const forwardGeocodingService = async (
  city: string,
  state: string,
  country: string
): Promise<ForwardGeocoding[]> => {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${city},${state},${country}&format=json`
    );

    return response.data;
  } catch (err: any) {
    console.error(
      "Error fetching forward geocoding data:",
      err.message,
      err.response?.data
    );
    throw new Error(
      `Failed to fetch forward geocoding data: ${
        err.response?.data?.message || err.message
      }`
    );
  }
};

export default forwardGeocodingService;
