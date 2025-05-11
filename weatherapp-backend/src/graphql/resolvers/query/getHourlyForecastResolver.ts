import getHourlyForecastService from "../../../services/hourlyForecast";
import { HourlyForecast, ForecastArgs } from "../../../types";
import { ApolloError } from "apollo-server-errors";

const getHourlyForecastResolver = {
  Query: {
    getHourlyForecast: async (
      _: unknown,
      { longitude, latitude, timezone }: ForecastArgs
    ): Promise<HourlyForecast> => {
      try {
        return await getHourlyForecastService(longitude, latitude, timezone);
      } catch (error: any) {
        console.error("Error in dailyForecastResolver:", error);
        throw new ApolloError(
          `Failed to fetch daily forecast: ${error.message}`,
          "FORECAST_ERROR"
        );
      }
    },
  },
};

export default getHourlyForecastResolver;
