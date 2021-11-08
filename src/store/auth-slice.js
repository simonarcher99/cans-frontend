import { createSlice } from "@reduxjs/toolkit";
import { cansActions } from "./cans-slice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: "",
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      sessionStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
      sessionStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
