// stockOptionsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stock: {
        name: "",
        symbol: "",
        price: 0,
        change: 0,
        quantity: 0,
        isMinus: false,
        total: 0,
    },
};

const stockOptionsSlice = createSlice({
    name: "stockOptions",
    initialState,
    reducers: {
        setStockOption: (state, action) => {
            state.stock = action.payload;
        },
        clearStockOption: (state) => {
            state.stock = initialState.stock;
        },
    },
});

export const { setStockOption, clearStockOption } = stockOptionsSlice.actions;
export default stockOptionsSlice.reducer;