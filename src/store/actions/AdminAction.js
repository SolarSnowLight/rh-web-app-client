/* Context */
import { adminSlice } from "src/store/reducers/AdminSlice";

/* HTTP */
import apiMainServer from "src/http/http.main-server";

/* Constants */
import MainApi from "src/constants/addresses/apis/main.api";
import AdminApi from "src/constants/addresses/apis/admin.api";
import messageQueueAction from "./MessageQueueAction";

/**
 * Function for getting a list of all users
 * @returns {Promise<void>}
 */
export const adminGetAllUser = () => async (dispatch) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
        const response = await apiMainServer.post(
            AdminApi.get_all_users
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction.addMessage(response.data.message, "error"));
            return;
        }

        dispatch(adminSlice.actions.getAllUserSuccess(response.data))
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
}

/**
 * Function for create new company
 * @param {any} data - data in format javascript object for making request
 * @returns {Promise<void>}
 */
export const adminCreateCompany = (data) => async (dispatch) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
        const formData = new FormData();
        formData.append("logo", data.logo);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("email_company", data.email_company);
        formData.append("email_admin", data.email_admin);
        formData.append("phone", data.phone);
        formData.append("link", data.link);

        const response = await apiMainServer.post(
            (MainApi.main_server + AdminApi.create_company),
            formData
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction.addMessage(response.data.message, "error"));
            return;
        }

        dispatch(messageQueueAction.addMessage(response.data.message, "success"));
        dispatch(adminSlice.actions.createCompanySuccess(response.data))
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
}


