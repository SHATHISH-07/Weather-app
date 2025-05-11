import forwardGeocodingService from "../../../services/forwardGeocoding";
import { ForwardGeocoding, ForwardGeocodingArgs } from "../../../types";

const getForwardGeocodingResolver = {
  Query: {
    getForwardGeocoding: async (
      _: any,
      args: ForwardGeocodingArgs
    ): Promise<ForwardGeocoding[]> => {
      return forwardGeocodingService(args.city, args.state, args.country);
    },
  },
};

export default getForwardGeocodingResolver;
