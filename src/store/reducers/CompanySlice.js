import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    projects: [],
    managers: [],
    isLoading: false,
};

/* Create a new clice for company API */
export const companySlice = createSlice({
    name: "company_slice",
    initialState,
    reducers: {
        loadingStart(state) {
            state.isLoading = true;
        },

        loadingEnd(state) {
            state.isLoading = false;
        },

        clear(state) {
            state.projects = [];
            state.managers = [];
            state.isLoading = false;
        },

        // Get all projects
        getAllProjectsSuccess(state, action) {

            if (action.payload) {
                state.projects = action.payload.projects;
            }
        },

        getAllProjectsAddSuccess(state, action) {

            if (action.payload) {
                state.projects = state.projects.concat(action.payload.projects);
            }
        },

        // Get all managers
        getAllManagersSuccess(state, action) {
            if (action.payload) {
                state.managers = action.payload.managers;
            }
        },

        getAllManagersAddSuccess(state, action) {
            if (action.payload) {
                state.managers = state.managers.concat(action.payload.managers);
            }
        },

        updateProjectInfoItem(state, action) {
            const data = JSON.parse(JSON.stringify(state.projects));
            const index = data.findIndex((value) => {
                return value.uuid === action.payload.uuid
            });

            if (index >= 0) {
                data[index].data = {
                    ...data[index].data ,
                    ...action.data,
                }
            }

            state.projects = data;
        }
    },
});

export default companySlice.reducer;