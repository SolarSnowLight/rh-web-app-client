/* Библиотеки */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemModel } from "src/models/Array/IItemModel";

/* Модели */
import { IObjectModel } from "src/models/Object/IObjectModel";
import { IUserEmailModel } from "src/models/User/IUserModel";

/* Локальные интерфейсы */
interface IProjectSlice {
    logo: string[],
    title: string,
    description: string,
    managers: IUserEmailModel[],
    objects: IObjectModel[],
    isLoading: boolean
}

/* Базовое состояние слайса */
const initialState: IProjectSlice = {
    logo: [],
    title: '',
    description: '',
    managers: [],
    objects: [],
    isLoading: false
};

/**
 * Описание слайса для работы с ъранилищем проектов
 */
export const projectSlice = createSlice({
    name: "project_slice",
    initialState,
    reducers: {
        loadingStart(state: IProjectSlice) {
            state.isLoading = true;
        },

        loadingEnd(state: IProjectSlice) {
            state.isLoading = false;
        },

        clear(state: IProjectSlice) {
            state.logo = [];
            state.title = '';
            state.description = '';
            state.managers = [];
            state.objects = [];
            state.isLoading = false;
        },

        setItemProjectInfo(state: IProjectSlice, action: PayloadAction<IItemModel<any>>) {
            state.isLoading = false;

            if (action.payload) {
                state[action.payload.item] = action.payload.value;
            }
        },

        updateObjectInfo(state: IProjectSlice, action: PayloadAction<IObjectModel>) {
            state.isLoading = false;

            const index = state.objects.findIndex((element) => element.uuid === action.payload.uuid);

            if (index >= 0) {
                state.objects[index] = action.payload;
            }
        },

        addObjectInfo(state: IProjectSlice, action: PayloadAction<IObjectModel>) {
            state.isLoading = false;

            if (action.payload) {
                state.objects = state.objects.concat(action.payload);
            }
        },

        deleteObjectInfo(state: IProjectSlice, action: PayloadAction<IObjectModel>) {
            state.isLoading = false;

            const index = state.objects.findIndex((element) => element.uuid === action.payload.uuid);

            if (index >= 0) {
                state.objects.splice(index, 1);
            }
        },

        deleteAllObject(state: IProjectSlice){
            state.objects = [];
        }
    },
});

export default projectSlice.reducer;