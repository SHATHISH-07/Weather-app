import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import FrdGeoSearchBar from "../components/FrdGeoSearchBar";
import { GET_AIR_QUALITY } from "../graphql/queries/getAirQuality";
import { GET_FORWARD_GEOCODING } from "../graphql/queries/getForwardGeocoding";
import AirPlaceHolder from "/undraw_floating_hvri.svg";

const labelMap: Record<string, string> = {
  co: "Carbon Monoxide (CO)",
  no: "Nitric Oxide (NO)",
  no2: "Nitrogen Dioxide (NO₂)",
  o3: "Ozone (O₃)",
  so2: "Sulfur Dioxide (SO₂)",
  pm2_5: "Fine Particles (PM2.5)",
  pm10: "Particulate Matter (PM10)",
  nh3: "Ammonia (NH₃)",
};

const AirQuality = () => {
  const user = useSelector((state: RootState) => state.user);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const timezone = "auto";

  const [getCoords, { data: geoData, error: geoError }] = useLazyQuery(
    GET_FORWARD_GEOCODING
  );

  const [getAirQuality, { data: airData, loading, error }] =
    useLazyQuery(GET_AIR_QUALITY);

  useEffect(() => {
    if (user?.city && user?.state && user?.country) {
      setCity(user.city);
      setState(user.state);
      setCountry(user.country);
      getCoords({
        variables: {
          city: user.city,
          state: user.state,
          country: user.country,
        },
      });
    }
  }, [user, getCoords]);

  useEffect(() => {
    const lat = parseFloat(geoData?.getForwardGeocoding[0]?.lat || "");
    const lon = parseFloat(geoData?.getForwardGeocoding[0]?.lon || "");

    if (!isNaN(lat) && !isNaN(lon)) {
      getAirQuality({
        variables: {
          latitude: lat,
          longitude: lon,
          timezone,
        },
      });
    }
  }, [geoData, getAirQuality]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city || !country) return;
    getCoords({
      variables: {
        city,
        state,
        country,
      },
    });
  };

  const components = airData?.getAirQuality?.list?.[0]?.components;

  return (
    <div className="mt-[50px] md:mt-[65px] mx-auto px-4 py-6 bg-[#f3f4f6] dark:bg-[#1c1c1e]">
      <FrdGeoSearchBar
        text="Get Air Quality"
        placeholder="Enter City Name"
        city={city}
        state={state}
        country={country}
        loading={loading}
        inputError={geoError?.message || null}
        setCity={setCity}
        setState={setState}
        setCountry={setCountry}
        handleSubmit={handleSearch}
      />

      {loading && (
        <p className="mt-4  text-center text-2xl text-black dark:text-white">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-500 mt-4">Error fetching air quality data.</p>
      )}

      <div className="mt-6">
        {components ? (
          <div className="bg-white dark:bg-[#121212] shadow-lg rounded-2xl p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 dark:text-white">
              {city ? `Air Quality` : "Please enter a city to get air quality"}
            </h2>

            {/* Loading and Error States */}
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && (
              <p className="text-center text-red-500">
                Error fetching air quality data.
              </p>
            )}

            {/* Default card when no city data */}
            {!loading && !airData && !error && (
              <div className="text-center text-gray-500">
                <p>Enter a city name to see the air quality information.</p>
              </div>
            )}

            {/* Air Quality data */}
            {airData && airData.getAirQuality && (
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                {Object.entries(airData.getAirQuality.list[0].components)
                  .filter(([key]) => key !== "__typename") // Filter out unwanted __typename field
                  .map(([key, value]) => {
                    return (
                      <li
                        key={key}
                        className="flex justify-between items-center border-b py-2 sm:py-3 px-2 sm:px-4"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="capitalize text-sm sm:text-base">
                            {labelMap[key]}
                          </span>
                        </div>
                        <span className="font-semibold text-sm sm:text-base">
                          {value as string | number}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-16 px-6 ">
            <h3 className="text-3xl font-normal mb-4 text-black dark:text-white">
              Air Quality
            </h3>
            <img
              className="w-48 h-48 mx-auto opacity-80"
              src={AirPlaceHolder}
              alt="No Forecast Data Available"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Enter a valid city, state, and country to view the air quality
              data.
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
              Double-check the entered details for accuracy. Use the search bar
              above to locate your city and retrieve real-time air quality
              information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirQuality;
