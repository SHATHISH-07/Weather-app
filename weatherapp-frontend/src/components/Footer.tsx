import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    scrollTo(0, 0);
    navigate("/");
  };

  return (
    <footer className="bg-white border-t-1 dark:bg-[#121212] text-gray-800 dark:text-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Branding */}
        <div className="text-center md:text-left mb-5 md:mb-0">
          <h1 className="text-lg font-semibold">WeatherApp</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by OpenWeather & LocationIQ
          </p>
          <a
            href="https://shathish2004.github.io/Shathish-Portfolio/#/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-5 text-lg font-semibold  text-gray-500 dark:text-gray-400"
          >
            😊 Give FeedBack
          </a>
        </div>

        <div className="flex flex-col space-y-5 items-center">
          {/* Navigation */}
          <div className="flex  space-y-2 md:space-y-0 space-x-3 md:space-x-4">
            <p
              onClick={handleNavigateHome}
              className="cursor-pointer hover:text-gray-400 dark:hover:text-gray-600"
            >
              Home
            </p>
            <a
              href="https://shathish2004.github.io/Shathish-Portfolio/#/about"
              target="_blank"
              className="hover:text-gray-400 dark:hover:text-gray-600"
            >
              About
            </a>
            <a
              href="https://shathish2004.github.io/Shathish-Portfolio/#/contact"
              target="_blank"
              className="hover:text-gray-400 dark:hover:text-gray-600"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/SHATHISH-07"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 dark:hover:text-gray-600"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shathish-kumaran-05a298325"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="LinkedIn"
            >
              Linkedin
            </a>
            <a
              href="https://shathish2004.github.io/Shathish-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 dark:hover:text-green-400"
              aria-label="Portfolio"
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-right text-gray-500 dark:text-gray-400">
          © 2025{" "}
          <a
            href="https://www.linkedin.com/in/shathish-kumaran-05a298325"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shathish Kumaran
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
