import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { setUser, clearUser } from "./app/features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import { GET_CURRENT_USER } from "./graphql/queries/getCurrentUser";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CurrentWeather from "./pages/CurrentWeather";
import ForwardGeocoding from "./pages/ForwardGeocoding";
import ReverseGeocoding from "./pages/ReverseGeocoding";
import DailyForecast from "./pages/DailyForecast";
import HourlyForecast from "./pages/HourlyForecast";
import AirQuality from "./pages/AirQuality";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await client.query({
            query: GET_CURRENT_USER,
            fetchPolicy: "network-only",
          });

          if (data?.getCurrentUser) {
            dispatch(setUser(data.getCurrentUser));
          } else {
            dispatch(clearUser());
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Failed to fetch user on load:", error);
          dispatch(clearUser());
          localStorage.removeItem("token");
        }
      }
    };

    initializeUser();
  }, [client, dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/currentweather" element={<CurrentWeather />} />
        <Route path="/forwardgeocoding" element={<ForwardGeocoding />} />
        <Route path="/reversegeocoding" element={<ReverseGeocoding />} />
        <Route path="/dailyforecast" element={<DailyForecast />} />
        <Route path="/hourlyforecast" element={<HourlyForecast />} />
        <Route path="/airquality" element={<AirQuality />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
