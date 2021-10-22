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
      const url = TOKEN_URL;
      const email = action.payload.email;
      const password = action.payload.password;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        state.isLoggedIn = true;
        state.token = res.data.token;
      });
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
