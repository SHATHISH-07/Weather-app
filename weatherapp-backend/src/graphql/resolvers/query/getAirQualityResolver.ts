import getAirQualityService from "../../../services/airQuality";
import { AirQuality, AirQualityArgs } from "../../../types";

const getAirQualityResolver = {
  Query: {
    getAirQuality: async (
      _: any,
      args: AirQualityArgs
    ): Promise<AirQuality> => {
      const { latitude, longitude } = args;
      return await getAirQualityService(latitude, longitude);
    },
  },
};

export default getAirQualityResolver;
