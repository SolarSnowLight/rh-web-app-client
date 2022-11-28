/* Библиотеки */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IManagerCompanyModel, IManagerProjectInfoModel } from "src/models/Manager/IManagerCompany";

/* Локальные интерфейсы */
interface IManagerInfoSlice {
    projects: IManagerProjectInfoModel[] | null | undefined,
    isLoading: boolean
}

/* Базовое состояние текущего слайса */
const initialState: IManagerInfoSlice = {
    projects: null,
    isLoading: false
};

/* Create a new clice for project API */
export const managerInfoSlice = createSlice({
    name: "manager_info_slice",
    initialState,
    reducers: {
        loadingStart(state: IManagerInfoSlice) {
            state.isLoading = true;
        },

        loadingEnd(state: IManagerInfoSlice) {
            state.isLoading = false;
        },

        clear(state: IManagerInfoSlice) {
            state.projects = null;
            state.isLoading = false;
        },

        setProjects(state: IManagerInfoSlice, action: PayloadAction<IManagerCompanyModel>) {
            state.isLoading = false;

            if (action.payload) {
                state.projects = action.payload.projects;
            }
        }
    },
});

export default managerInfoSlice.reducer;