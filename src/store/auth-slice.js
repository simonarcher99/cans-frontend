import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_URL } from "../utilities/constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    token: "",
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
