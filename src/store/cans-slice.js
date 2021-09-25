import { createSlice } from "@reduxjs/toolkit";

const cansSlice = createSlice({
    name: "cans",
    initialState = {
        items: []
    },
    reducers: {
        addItem(state, action) {
            // Add logic
        },
        deleteItem(state, action) {
            // Add logic
        },
        increaseItem(state, action) {
            // add logic
        },
        decreaseItem(state, action) {
            // add logic
        }

    },
});

export const cansActions = cansSlice.actions;

export default cansSlice;