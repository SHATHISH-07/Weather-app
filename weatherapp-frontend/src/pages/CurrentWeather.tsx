import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { GET_CURRENT_WEATHER } from "../graphql/queries/getCurrentWeather";
import CitySearchBar from "../components/CitySearchBar";
import currentWeatherPlaceholder from "/weather-placeholder.svg";

const CurrentWeather = () => {
  const user = useSelector((state: RootState) => state.user);

  const [city, setCity] = useState<string>(user?.city || "");
  const [inputError, setInputError] = useState<string | null>(null);

  const [fetchWeather, { data, loading, error }] = useLazyQuery(
    GET_CURRENT_WEATHER,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const weather = data?.getCurrentWeather;
  const hasValidData =
    weather && weather.weather?.[0] && weather.main && weather.sys;

  useEffect(() => {
    if (user?.city) {
      setCity(user.city);
      fetchWeather({ variables: { city: user.city } });
    }
  }, [user, fetchWeather]);

  useEffect(() => {
    if (error) {
      setInputError(
        error.message.includes("not found")
          ? "City not found. Please try another city."
          : "Could not fetch weather data. Please try again."
      );
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim().length < 2) {
      setInputError("City name must be at least 2 characters.");
      return;
    }
    setInputError(null);
    fetchWeather({ variables: { city } });
  };

  const renderWeatherCard = () => (
    <div className="w-full sm:max-w-6xl h-[100%] flex flex-col justify-center items-center">
      <h3 className="text-3xl font-normal text-black dark:text-white my-5">
        Current Weather
      </h3>
      <div className="w-full h-auto rounded-xl shadow-lg bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-100 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-4xl font-semibold">
              {weather.name}, {weather.sys.country || "N/A"}
            </h3>
            <p className="capitalize text-xl mt-4 text-gray-600 dark:text-gray-400">
              {weather.weather[0].description || "No description"}
            </p>

            <img
              src={`http://openweathermap.org/img/wn/${
                weather.weather[0].icon || "01d"
              }@2x.png`}
              alt={weather.weather[0].description || "Weather icon"}
              className="my-4 w-40 h-40"
              onError={(e) =>
                (e.currentTarget.src = "/fallback-weather-icon.png")
              }
            />

            <div className="text-center md:text-left">
              <p className="text-2xl font-semibold">
                Temperature: {weather.main.temp ?? "N/A"}°C
              </p>
              <p className="text-xl mt-3 text-gray-600 dark:text-gray-400">
                Feels Like: {weather.main.feels_like ?? "N/A"}°C
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col items-center justify-center p-7 text-2xl rounded-lg bg-gray-50 dark:bg-[#1a1a1a] shadow-sm">
              <p className="font-normal">
                <i className="fas fa-droplet pr-2"></i>Humidity
              </p>
              <span className="font-semibold">
                {weather.main.humidity ?? "N/A"}%
              </span>
            </div>

            <div className="flex flex-col items-center p-7 text-2xl rounded-lg bg-gray-50 dark:bg-[#1a1a1a] shadow-sm">
              <p className="font-normal">
                <i className="fas fa-wind pr-2"></i>Wind
              </p>
              <span className="font-semibold">
                {weather.wind.speed ?? "N/A"} m/s
              </span>
            </div>

            <div className="flex flex-col items-center p-7 text-2xl rounded-lg bg-gray-50 dark:bg-[#1a1a1a] shadow-sm">
              <p className="font-normal">Sunrise</p>
              <span className="font-semibold">
                {weather.sys.sunrise
                  ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex flex-col items-center p-7 text-2xl rounded-lg bg-gray-50 dark:bg-[#1a1a1a] shadow-sm">
              <p className="font-normal">Sunset</p>
              <span className="font-semibold">
                {weather.sys.sunset
                  ? new Date(weather.sys.sunset * 1000).toLocaleTimeString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultView = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-8">
      <h3 className="text-2xl font-normal text-black dark:text-white">
        Current Weather
      </h3>
      <img
        src={currentWeatherPlaceholder}
        alt="Weather Illustration"
        className="w-48 h-48 "
      />
      <h3 className="text-xl font-semibold text-black dark:text-white">
        Welcome to the Weather App!
      </h3>
      <p className="max-w-xl text-black dark:text-white">
        Enter a city name to get the latest weather updates. Get temperature,
        humidity, wind speed, sunrise, and sunset for any city.
      </p>
    </div>
  );

  return (
    <div className="pb-20 sm:pb-30 mt-[50px] md:mt-[65px] bg-gray-100 dark:bg-[#1c1c1e] flex flex-col items-center justify-start p-4">
      <CitySearchBar
        text={"Get Weather"}
        placeholder={"Enter city name"}
        city={city}
        loading={loading}
        inputError={inputError}
        setCity={(value) => {
          setCity(value);
          setInputError(null);
        }}
        handleSubmit={handleSubmit}
      />

      {error && (
        <p className="text-red-500 mb-3 text-center text-sm" id="cityError">
          {error.message}
        </p>
      )}

      {loading && (
        <p className="text-center text-sm text-black dark:text-white mt-2">
          Loading weather data...
          {renderDefaultView()}
        </p>
      )}

      {!loading && hasValidData && renderWeatherCard()}

      {!loading && !hasValidData && !error && renderDefaultView()}
    </div>
  );
};

export default CurrentWeather;
