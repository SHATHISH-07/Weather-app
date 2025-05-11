import getReverseGeocodingService from "../../../services/reverseGeocoding";
import { ReverseGeocoding, ReverseGeocodingArgs } from "../../../types";

const getReverseGeocodingResolver = {
  Query: {
    getReverseGeocoding: async (_: any, args: ReverseGeocodingArgs) => {
      return await getReverseGeocodingService(args.latitude, args.longitude);
    },
  },
};

export default getReverseGeocodingResolver;
