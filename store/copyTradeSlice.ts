// stockOptionsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    copy: {
        title: "",
        trade_min: 0,
        trade_max: 0,
        trade_roi_min: 0,
        trade_roi_max: 0,
        trade_risk: "",
        trade_duration: 0,
    },
};

const copyTradeSlice = createSlice({
    name: "copyTrade",
    initialState,
    reducers: {
        setCopyTrade: (state, action) => {
            state.copy = action.payload;
        },
        clearCopyTrade: (state) => {
            state.copy = initialState.copy;
        },
    },
});

export const { setCopyTrade, clearCopyTrade } = copyTradeSlice.actions;
export default copyTradeSlice.reducer;