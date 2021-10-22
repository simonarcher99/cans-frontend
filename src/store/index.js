import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cansSlice from "./cans-slice";
import errorSlice from "./error-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cans: cansSlice.reducer,
    error: errorSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
