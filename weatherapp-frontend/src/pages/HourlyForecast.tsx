import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import FrdGeoSearchBar from "../components/FrdGeoSearchBar";
import { GET_FORWARD_GEOCODING } from "../graphql/queries/getForwardGeocoding";
import { GET_HOURLY_FORECAST } from "../graphql/queries/getHourlyForecast";
import placeHolder from "/undraw_among-nature_2f9e.svg";

const weatherCodeToIcon = (code: number): string => {
  const map: { [key: number]: string } = {
    0: "01d",
    1: "02d",
    2: "03d",
    3: "04d",
    45: "50d",
    48: "50d",
    51: "09d",
    61: "10d",
    71: "13d",
    80: "09d",
    95: "11d",
  };

  return map[code] || "01d";
};

const HourlyForecast = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const timezone = "auto";

  const user = useSelector((state: RootState) => state.user);

  const [getCoords, { data: geoData, error: geoError }] = useLazyQuery(
    GET_FORWARD_GEOCODING
  );

  const [getHourlyForecast, { data: forecastData, loading, error }] =
    useLazyQuery(GET_HOURLY_FORECAST);

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
      getHourlyForecast({
        variables: {
          latitude: lat,
          longitude: lon,
          timezone: timezone,
        },
      });
    }
  }, [geoData, getHourlyForecast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getCoords({
      variables: {
        city: city,
        state: state,
        country: country,
      },
    });
  };

  return (
    <div className="bg-[#f3f4f6] mt-[50px] md:mt-[65px] dark:bg-[#1c1c1e] text-black dark:text-white min-h-screen p-6">
      <FrdGeoSearchBar
        text="Hourly Forecast"
        placeholder="Enter the city"
        city={city}
        state={state}
        country={country}
        setState={setState}
        setCountry={setCountry}
        loading={loading}
        inputError={geoError?.message || null}
        setCity={setCity}
        handleSubmit={handleSearch}
      />

      {forecastData ? (
        <div>
          <h2 className="text-4xl mt-15 mb-3 font-normal text-center">
            Hourly Forecast
          </h2>
          <p className="text-xl text-center mb-4">
            Timezone: {forecastData.getHourlyForecast.timezone}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastData.getHourlyForecast.hourly?.time
              ?.slice(0, 12)
              .map((date: string, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center border-1 bg-white dark:bg-[#121212] rounded-2xl shadow-xl p-6 space-y-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-1">
                    {new Date(date).toLocaleDateString()}
                  </h3>
                  <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                    {new Date(date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <div className="space-y-6 text-gray-800 dark:text-gray-300">
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-sun text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">Temperature:</span>{" "}
                        {
                          forecastData.getHourlyForecast.hourly.temperature_2m[
                            index
                          ]
                        }{" "}
                        °C
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://openweathermap.org/img/wn/${weatherCodeToIcon(
                          forecastData.getHourlyForecast.hourly.weathercode[
                            index
                          ]
                        )}@2x.png`}
                        alt={`Weather icon for code ${forecastData.getHourlyForecast.hourly.weathercode[index]}`}
                        className="my-4 w-30 h-30 mx-auto"
                        onError={(e) =>
                          (e.currentTarget.src = "/fallback-weather-icon.png")
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-wind text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">Wind Speed:</span>{" "}
                        {
                          forecastData.getHourlyForecast.hourly.wind_speed_10m[
                            index
                          ]
                        }{" "}
                        km/h
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-sun text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">UV Index:</span>{" "}
                        {forecastData.getHourlyForecast.hourly.uv_index[index]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          {renderDefaultView()}

          {geoError && (
            <p className="text-center text-red-500 mt-4">
              Location Error: {geoError.message}
            </p>
          )}

          {error && (
            <p className="text-center text-red-500 mt-4">
              Forecast Error: {error.message}
            </p>
          )}

          {loading && (
            <p className="text-center text-2xl mt-4 text-black dark:text-white">
              Loading forecast...
            </p>
          )}
        </>
      )}
    </div>
  );
};

const renderDefaultView = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16 px-6 ">
      <h3 className="text-3xl font-normal mb-4 text-black dark:text-white">
        Hourly Forecast
      </h3>
      <img
        className="w-48  h-48 mx-auto opacity-80"
        src={placeHolder}
        alt="No Forecast Data Available"
      />
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        To get the weather forecast, please enter a valid city, state, and
        country.
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
        Ensure that the details you enter are correct. You can use the search
        bar above to quickly find your city and get the forecast in real-time.
      </p>
    </div>
  );
};

export default HourlyForecast;
