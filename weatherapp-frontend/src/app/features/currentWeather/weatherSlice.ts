import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  city: string;
}

const initialState: WeatherState = {
  city: "",
};

const WeatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
});

export const { setCity } = WeatherSlice.actions;
export default WeatherSlice.reducer;
