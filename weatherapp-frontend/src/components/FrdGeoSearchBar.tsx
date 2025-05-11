import React from "react";

type Props = {
  text: string;
  placeholder: string;
  city: string;
  state: string;
  country: string;
  loading: boolean;
  inputError: string | null;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setCountry: (country: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const FrdGeoSearchBar: React.FC<Props> = ({
  text,
  placeholder,
  city,
  state,
  country,
  loading,
  inputError,
  setCity,
  setState,
  setCountry,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto flex flex-col justify-center space-y-6  px-4"
    >
      <div className="flex flex-col md:flex-row mt-10 justify-center items-center gap-4">
        <input
          id="cityInput"
          type="text"
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`w-full md:w-auto flex-1 rounded-md px-4 py-2 text-sm border ${
            inputError ? "border-red-500" : "border-black dark:border-white"
          } bg-white dark:bg-[#1c1c1e] text-gray-800 dark:text-white`}
          aria-describedby="cityError inputError"
          aria-invalid={!!inputError}
        />

        <input
          id="stateInput"
          type="text"
          placeholder="Enter a state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full md:w-auto flex-1 rounded-md px-4 py-2 text-sm border border-black dark:border-white bg-white dark:bg-[#1c1c1e] text-gray-800 dark:text-white"
        />

        <input
          id="countryInput"
          type="text"
          placeholder="Enter a country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full md:w-auto flex-1 rounded-md px-4 py-2 text-sm border border-black dark:border-white bg-white dark:bg-[#1c1c1e] text-gray-800 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 w-[250px] mx-auto rounded-md text-white bg-[#1d1d1d] dark:bg-[#131313] border-1 cursor-pointer hover:bg-[#3e3e3e] disabled:bg-gray-400"
      >
        {loading ? "Loading..." : text}
      </button>

      {inputError && (
        <p className="text-red-500 text-sm text-center mt-2" id="inputError">
          {inputError}
        </p>
      )}
    </form>
  );
};

export default FrdGeoSearchBar;
