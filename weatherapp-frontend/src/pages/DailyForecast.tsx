import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import FrdGeoSearchBar from "../components/FrdGeoSearchBar";
import { GET_DAILY_FORECAST } from "../graphql/queries/getDailyForecast";
import { GET_FORWARD_GEOCODING } from "../graphql/queries/getForwardGeocoding";
import { RootState } from "../app/store";
import placeHolder from "/undraw_nature_yf30.svg";

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

const DailyForecast = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const timezone = "auto";

  const user = useSelector((state: RootState) => state.user);

  const [getCoords, { data: geoData, error: geoError }] = useLazyQuery(
    GET_FORWARD_GEOCODING
  );

  const [getDailyForecast, { data: forecastData, loading, error }] =
    useLazyQuery(GET_DAILY_FORECAST);

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
      getDailyForecast({
        variables: {
          latitude: lat,
          longitude: lon,
          timezone: timezone,
        },
      });
    }
  }, [geoData, getDailyForecast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getCoords({
      variables: {
        city,
        state,
        country,
      },
    });
  };

  return (
    <div className="bg-[#f3f4f6] mt-[50px] md:mt-[65px] dark:bg-[#1c1c1e] text-black dark:text-white sm:min-h-screen p-6">
      <FrdGeoSearchBar
        text="Daily Forecast"
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

      {!forecastData && renderDefaultView()}

      {loading && (
        <p className="text-center text-2xl mt-4 text-black dark:text-white">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-2">Error: {error.message}</p>
      )}

      {!loading && forecastData && (
        <div>
          <h2 className="text-4xl mt-15 mb-3 font-normal text-center">
            Daily Forecast
          </h2>
          <p className="text-xl text-center mb-4">
            Timezone: {forecastData.getDailyForecast.timezone}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastData.getDailyForecast.daily.time.map(
              (date: string, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center border-1 bg-white dark:bg-[#121212] rounded-2xl shadow-xl p-6 space-y-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-4">
                    {new Date(date).toLocaleDateString()}
                  </h3>
                  <div className="space-y-6 text-gray-800 dark:text-gray-300">
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-sun text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">Max Temp:</span>{" "}
                        {
                          forecastData.getDailyForecast.daily
                            .temperature_2m_max[index]
                        }{" "}
                        °C
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-cloud-sun text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">Min Temp:</span>{" "}
                        {
                          forecastData.getDailyForecast.daily
                            .temperature_2m_min[index]
                        }{" "}
                        °C
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://openweathermap.org/img/wn/${weatherCodeToIcon(
                          forecastData.getDailyForecast.daily.weathercode[index]
                        )}@2x.png`}
                        alt={`Weather icon for code ${forecastData.getDailyForecast.daily.weathercode[index]}`}
                        className="my-4 w-30 h-30 mx-auto"
                        onError={(e) =>
                          (e.currentTarget.src = "/fallback-weather-icon.png")
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-tint text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">Precipitation:</span>{" "}
                        {
                          forecastData.getDailyForecast.daily.precipitation_sum[
                            index
                          ]
                        }{" "}
                        mm
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-wind text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">Wind Speed:</span>{" "}
                        {
                          forecastData.getDailyForecast.daily
                            .wind_speed_10m_max[index]
                        }{" "}
                        km/h
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-sun text-2xl"></i>
                      <p className="text-lg">
                        <span className="font-semibold">UV Index:</span>{" "}
                        {
                          forecastData.getDailyForecast.daily.uv_index_max[
                            index
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const renderDefaultView = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16 px-6 ">
      <h3 className="text-3xl font-normal mb-4 text-black dark:text-white">
        Daily Forecast
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

export default DailyForecast;
