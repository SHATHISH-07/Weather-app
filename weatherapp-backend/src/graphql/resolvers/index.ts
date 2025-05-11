import { IResolvers } from "@graphql-tools/utils";
import createUserResolver from "./mutation/createUserResolver";
import getUserResolver from "./query/getUserResolver";
import loginResolver from "./mutation/loginResolver";
import getCurrentUser from "./query/getCurrentUser";
import getCurrentWeatherResolver from "./query/getCurrentWeatherResolver";
import getDailyForecastResolver from "./query/getDailyForecastResolver";
import getHourlyForecastResolver from "./query/getHourlyForecastResolver";
import getAirQualityResolver from "./query/getAirQualityResolver";
import getForwardGeocodingResolver from "./query/getForwardGeocodingResolver";
import getReverseGeocodingResolver from "./query/getReverseGeocodingResolver";

const resolvers: IResolvers = {
  Query: {
    ...getUserResolver.Query,
    ...getCurrentUser.Query,
    ...getCurrentWeatherResolver.Query,
    ...getDailyForecastResolver.Query,
    ...getHourlyForecastResolver.Query,
    ...getAirQualityResolver.Query,
    ...getForwardGeocodingResolver.Query,
    ...getReverseGeocodingResolver.Query,
  },

  Mutation: {
    ...createUserResolver.Mutation,
    ...loginResolver.Mutation,
  },
};

export default resolvers;
