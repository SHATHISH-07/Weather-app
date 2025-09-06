import React from "react";

interface Props {
  text: string;
  latitude: string;
  longitude: string;
  setLatitude: (latitude: string) => void;
  setLongitude: (longitude: string) => void;
  inputError: string | null;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const RevGeoSearchBar: React.FC<Props> = ({
  text,
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  inputError,
  loading,
  handleSubmit,
}) => {
  const handleChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
  };

  const handleChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto flex flex-col justify-center space-y-6  px-4"
    >
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4">
        <input
          id="cityInput"
          type="number"
          placeholder={"Enter Latitude"}
          value={latitude}
          inputMode="decimal"
          pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$"
          onChange={handleChangeLatitude}
          className={`w-full md:w-auto flex-1 rounded-md px-4 py-2 text-sm border ${
            inputError ? "border-red-500" : "border-black dark:border-white"
          } bg-white dark:bg-[#121212] text-black dark:text-white`}
          aria-describedby="cityError inputError"
          aria-invalid={!!inputError}
        />

        <input
          id="stateInput"
          type="number"
          placeholder="Enter Longitude"
          value={longitude}
          inputMode="decimal"
          pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$"
          onChange={handleChangeLongitude}
          className="w-full md:w-auto flex-1 rounded-md px-4 py-2 text-sm border border-black dark:border-white bg-white dark:bg-[#121212] text-black dark:text-white"
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

export default RevGeoSearchBar;
