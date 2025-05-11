import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import RevGeoSearchBar from "../components/RevGeoSearchBar";
import { GET_REVERSE_GEOCODING } from "../graphql/queries/getReverseGeocoding";
import ReverseGeoPlaceHolder from "/undraw_map_cuix.svg";

interface ReverseGeocoding {
  state_district: string;
  state: string;
  country: string;
}

const ReverseGeocoding = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [reverseGeoData, setReverseGeoData] = useState<ReverseGeocoding[]>();
  const [inputError, setInputError] = useState<string | null>(null);

  const [getReverseGeocoding, { loading, error, data }] = useLazyQuery(
    GET_REVERSE_GEOCODING
  );

  useEffect(() => {
    if (data?.getReverseGeocoding?.address) {
      setReverseGeoData([data.getReverseGeocoding.address]);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      setInputError("Latitude and Longitude must be valid numbers.");
      return;
    }

    setInputError(null);
    getReverseGeocoding({ variables: { latitude: lat, longitude: lon } });
  };

  return (
    <div className="px-4 bg-[#f3f4f6] dark:bg-[#1c1c1e]">
      <RevGeoSearchBar
        text="Get Reverse Geocoding"
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        loading={loading}
        inputError={inputError}
        handleSubmit={handleSubmit}
      />

      {error && (
        <p className="text-red-500 text-center mt-4">Error: {error.message}</p>
      )}

      {loading && (
        <p className="text-center text-2xl mt-4 text-black dark:text-white">
          Loading geocoding data...
        </p>
      )}

      <div className="mt-6 flex flex-col items-center justify-center">
        {reverseGeoData ? (
          reverseGeoData.map((item, index) => (
            <div className="w-full max-w-2xl flex flex-col items-center">
              <h3 className="text-2xl font-medium text-black dark:text-white mt-10 mb-5">
                Reverse Geocoding
              </h3>
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-xl mb-8 p-6 bg-white dark:bg-[#121212]  shadow-lg transition-shadow hover:shadow-md w-full"
              >
                <h3 className="text-xl md:text-xl font-medium text-black dark:text-white mb-2 flex items-center gap-2">
                  <i className="fas fa-map-marker-alt "></i>
                  {item.state_district}
                </h3>
                <div className="text-lg text-black dark:text-white space-y-1 pl-6">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-city "></i>
                    State: {item.state}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-flag  "></i>
                    Country: {item.country}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <div className="w-full max-w-2xl rounded-xl py-10 px-6 mb-10  bg-[#f3f4f6] dark:bg-[#1c1c1e] text-center space-y-4">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-medium text-black dark:text-white">
                Get Reverse Geocoding
              </h3>
              <img
                className="w-48 h-48 mx-auto"
                src={ReverseGeoPlaceHolder}
                alt="Enter Location"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter the latitude and longitude values.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Example: Latitude: 40.7128, Longitude: -74.0060 to get New York
                City
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReverseGeocoding;
