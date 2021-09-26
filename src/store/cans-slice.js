import { createSlice } from "@reduxjs/toolkit";

const cansSlice = createSlice({
    name: "cans",
    initialState: {
        items: []
    },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload
            state.items.push({
                id: newItem.id,
                quantity: newItem.quantity,
                item: newItem.item
            })
        },
        deleteItem(state, action) {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        increaseItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            existingItem.quantity++;
        },
        decreaseItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            existingItem.quantity++;
        }

    },
});

export const cansActions = cansSlice.actions;

export default cansSlice;