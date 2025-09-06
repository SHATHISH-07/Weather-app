import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import DarkModeToggler from "./DarkModeToggler";
import LogoutPopup from "./LogoutPopup";

interface MenuBarProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBar = ({ isOpen, setIsOpen }: MenuBarProp) => {
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleUserClick = () => {
    if (user && user.username) {
      setLogoutOpen(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative  z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-lg font-normal   hover:underline cursor-pointer ${
          isOpen ? "text-red-500" : "text-black dark:text-white"
        }`}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Slide-down Fullscreen Modal */}
      <div
        className={`fixed top-[-11px] md:top-0 left-0 w-full h-screen md:h-[calc(100%-4rem)]  bg-[#f3f4f6] dark:bg-[#1C1C1E] z-40 transition-transform duration-500 ease-in-out transform rounded-t-2xl shadow-lg  overflow-y-scroll scrollbar-hide ${
          isOpen ? "translate-y-16" : "-translate-y-full"
        }`}
      >
        <div className="px-2 md:px-6 py-2 md:py-4 mt-5 md:mt-15  space-y-5 text-gray-800 dark:text-white">
          <div className="md:hidden block pl-3 ">
            <DarkModeToggler />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 px-4 md:px-10">
            <p
              onClick={() => handleNavigate("/currentweather")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              Current Weather
            </p>
            <p
              onClick={() => handleNavigate("/dailyforecast")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              Daily Forecast
            </p>
            <p
              onClick={() => handleNavigate("/hourlyforecast")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              Hourly Forecast
            </p>
            <p
              onClick={() => handleNavigate("/airquality")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              Air Quality
            </p>
            <p
              onClick={() => handleNavigate("/forwardgeocoding")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              Forward Geocoding
            </p>
            <p
              onClick={() => handleNavigate("/reversegeocoding")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              Reverse Geocoding
            </p>
            <p
              onClick={() => handleNavigate(user.username ? "/" : "/signup")}
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              {user.username ? user.username : "Sign Up"}
            </p>
            {user.username ? (
              <p
                onClick={handleUserClick}
                className="font-medium text-lg md:text-2xl p-7 hover:text-red-500 cursor-pointer"
              >
                Logout
              </p>
            ) : (
              <p
                onClick={() => handleNavigate("/login")}
                className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
              >
                Login
              </p>
            )}
            <a
              href="https://shathish2004.github.io/Shathish-Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              About Me
            </a>
            <a
              href="https://shathish2004.github.io/Shathish-Portfolio/#/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lg md:text-2xl p-7 hover:text-gray-500 cursor-pointer"
            >
              FeedBack
            </a>
          </div>
        </div>
      </div>
      <LogoutPopup isOpen={isLogoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
};

export default MenuBar;
