import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: { httpError: null },
  reducers: {
    addHttpError(state, action) {
      state.httpError = action.payload.message;
    },
    clearHttpError(state) {
      state.httpError = null;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice;
