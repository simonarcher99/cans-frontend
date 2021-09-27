import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: { httpError: null },
  reducers: {},
});

export const errorActions = errorSlice.actions;

export default errorSlice;
