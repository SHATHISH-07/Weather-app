import getDailyForecastService from "../../../services/dailyForecast";
import { DailyForecast, ForecastArgs } from "../../../types";
import { ApolloError } from "apollo-server-errors";

const getDailyForecastResolver = {
  Query: {
    getDailyForecast: async (
      _: unknown,
      { longitude, latitude, timezone }: ForecastArgs
    ): Promise<DailyForecast> => {
      try {
        return await getDailyForecastService(longitude, latitude, timezone);
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

export default getDailyForecastResolver;
