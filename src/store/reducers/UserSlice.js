import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    company: null,
    isLoading: false
};

/* Create a new clice for user API */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadingStart(state) {
            state.isLoading = true;
        },

        loadingEnd(state) {
            state.isLoading = false;
        },

        clear(state) {
            state.company = null;
            state.isLoading = false;
        },

        getUserCompanySuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            if (action.payload) {
                state.company = action.payload;
            }
        },

        updateCompanySuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            if (action.payload) {
                state.company = {
                    ...state.company,
                    ...action.payload
                };
            }
        },

        setItemCompanyInfo(state, action) {
            state.isLoading = false;
            state.error = "";

            if (action.payload) {
                state.company.data[action.payload.item] = action.payload.value;
            }
        },
    },
});

export default userSlice.reducer;