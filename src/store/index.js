import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cansSlice from "./cans-slice";

const store = configureStore({
    reducer: { ui: uiSlice.reducer, cans: cansSlice.reducer },
});

export default store;
