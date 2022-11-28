import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    response: null,
    isLoading: false
};

/* Create a new clice for admin API */
export const adminSlice = createSlice({
    name: "admin_slice",
    initialState,
    reducers: {
        loadingStart(state) {
            state.isLoading = true;
        },

        loadingEnd(state) {
            state.isLoading = false;
        },

        clear(state) {
            state.isLoading = false;
            state.error = "";
            state.response = null;
        },

        createCompanySuccess(state, action) {
            state.isLoading = false;
            state.error = "";
            state.response = action.payload;
        }
    },
});

export default adminSlice.reducer;