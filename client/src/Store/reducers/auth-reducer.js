import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { email: null, login: false },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.login = true;
    },

    logout(state, action) {
      state.email = null;
      state.login = false;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
