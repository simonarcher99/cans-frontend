import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { formIsVisible: false },
    reducers: {
        toggle(state) {
            state.formIsVisible = !state.formIsVisible;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
