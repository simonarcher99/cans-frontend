import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cansSlice from "./cans-slice";
import errorSlice from "./error-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cans: cansSlice.reducer,
    error: errorSlice.reducer,
  },
});

export default store;
