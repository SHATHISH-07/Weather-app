import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import MenuBar from "./MenuBar";
import DarkModeToggler from "./DarkModeToggler";
import LogoutPopup from "./LogoutPopup";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const [isOpen, setIsOpenMenu] = useState(false);

  const handleUserClick = () => {
    if (user && user.username) {
      setLogoutOpen(true);
    } else {
      navigate("/login");
    }
  };

  const closeMenu = () => setIsOpenMenu(false);

  return (
    <>
      <nav className="w-full fixed  px-4 py-3 bg-white dark:bg-[#121212] shadow-md">
        <div className=" mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <i className="fa-solid fa-cloud-sun-rain text-2xl text-black dark:text-white"></i>
            <p className="text-xl font-semibold text-black dark:text-white">
              Weather App
            </p>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex items-center">
            {/* Hidden on small screens, visible on md+ */}
            <div className="hidden md:flex items-center space-x-15">
              <button
                onClick={() => {
                  handleUserClick();
                  closeMenu();
                }}
                className="text-lg font-normal cursor-pointer  text-black dark:text-white"
              >
                {user?.username || "Login"}
              </button>

              <MenuBar isOpen={isOpen} setIsOpen={setIsOpenMenu} />
              <DarkModeToggler />
            </div>

            {/* Visible only on small screens */}
            <div className="md:hidden">
              <MenuBar isOpen={isOpen} setIsOpen={setIsOpenMenu} />
            </div>
          </div>
        </div>
      </nav>

      <LogoutPopup isOpen={isLogoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  );
};

export default NavBar;
