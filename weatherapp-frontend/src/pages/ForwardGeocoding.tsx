import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import FrdGeoSearchBar from "../components/FrdGeoSearchBar";
import { GET_FORWARD_GEOCODING } from "../graphql/queries/getForwardGeocoding";
import ForwardGeoPlaceHolder from "/undraw_directions_oehw.svg";

interface ForwardGeocoding {
  display_name: string;
  lat: number;
  lon: number;
}

const ForwardGeocoding = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [forwardGeoData, setForwardGeoData] = useState<ForwardGeocoding[]>();
  const [inputError, setInputError] = useState<string | null>(null);

  const [hasInitialized, setHasInitialized] = useState(false);

  const [getGeocoding, { loading, error, data: queryData }] = useLazyQuery(
    GET_FORWARD_GEOCODING
  );

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user?.city && user?.state && user?.country && !hasInitialized) {
      setCity(user.city);
      setState(user.state);
      setCountry(user.country);
      getGeocoding({
        variables: {
          city: user.city,
          state: user.state,
          country: user.country,
        },
      });
      setHasInitialized(true);
    }
  }, [user, getGeocoding, hasInitialized]);

  useEffect(() => {
    if (queryData) {
      setForwardGeoData(queryData.getForwardGeocoding);
    }
  }, [queryData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim().length < 2) {
      setInputError("City name must be at least 2 characters.");
      return;
    }
    setInputError(null);
    getGeocoding({ variables: { city, state, country } });
  };

  return (
    <div className="px-4 mt-[50px] md:mt-[65px] bg-white dark:bg-[#121212]">
      <FrdGeoSearchBar
        text="Get Forward Geocoding"
        placeholder="Enter a city"
        city={city}
        state={state}
        country={country}
        loading={loading}
        inputError={inputError}
        setCity={setCity}
        setState={setState}
        setCountry={setCountry}
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2  gap-4 ">
        {forwardGeoData ? (
          forwardGeoData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-xl mb-5 mt-5 p-6 bg-[#f3f4f6] dark:bg-[#1a1a1a] shadow-md transition-shadow hover:shadow-md "
            >
              <h3 className="text-xl md:text-xl font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-gray-500"></i>
                {item.display_name}
              </h3>
              <div className="text-lg text-gray-700 dark:text-gray-300 space-y-1 pl-6">
                <p className="flex  items-center gap-2">
                  <i className="fas fa-location-arrow text-gray-500"></i>
                  Latitude: {item.lat}
                </p>
                <p className="flex items-center gap-2">
                  <i className="fas fa-location-arrow text-gray-500 rotate-180"></i>
                  Longitude: {item.lon}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-full max-w-2xl rounded-xl py-10 px-6 mb-10  bg-white dark:bg-[#121212] text-center space-y-2">
              <div className="text-4xl mb-2"></div>
              <h3 className="text-2xl font-normal text-black dark:text-white">
                Get Forward Geocoding
              </h3>

              <img
                className="w-48 h-48 mx-auto"
                src={ForwardGeoPlaceHolder}
                alt="Ready to go"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Let's find your place on the map.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter a city to begin. Optionally, you can include the state and
                country to get more accurate coordinates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForwardGeocoding;
