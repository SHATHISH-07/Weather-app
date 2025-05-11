import getCurrentWeatherService from "../../../services/currentWeather";

const getCurrentWeatherResolver = {
  Query: {
    getCurrentWeather: async (_: unknown, { city }: { city: string }) =>
      await getCurrentWeatherService(city),
  },
};

export default getCurrentWeatherResolver;
