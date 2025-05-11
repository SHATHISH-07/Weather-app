import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  username: string;
  city: string;
  state: string;
  country: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  username: "",
  city: "",
  state: "",
  country: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      Object.assign(state, payload);
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
