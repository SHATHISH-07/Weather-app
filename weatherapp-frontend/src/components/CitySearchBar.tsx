import React from "react";

type Props = {
  text: string;
  placeholder: string;
  city: string;
  loading: boolean;
  inputError: string | null;
  setCity: (city: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const CitySearchBar: React.FC<Props> = ({
  text,
  placeholder,
  city,
  loading,
  inputError,
  setCity,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[400px] space-y-3 mb-6"
    >
      <div className="flex sm:flex-row flex-col gap-2 mt-10">
        <input
          id="cityInput"
          type="text"
          placeholder={placeholder}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className={`flex-1 rounded-md px-4 py-2 text-sm border ${
            inputError ? "border-red-500" : "border-black dark:border-white"
          } bg-white dark:bg-[#121212] text-gray-800 dark:text-white`}
          aria-describedby="cityError inputError"
          aria-invalid={!!inputError}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md text-white bg-[#1d1d1d] dark:bg-[#131313] border-1 cursor-pointer hover:bg-[#3e3e3e] disabled:bg-gray-400"
        >
          {loading ? "Loading..." : text}
        </button>
      </div>
      {inputError && (
        <p className="text-red-500 text-sm mt-1" id="inputError">
          {inputError}
        </p>
      )}
    </form>
  );
};

export default CitySearchBar;
