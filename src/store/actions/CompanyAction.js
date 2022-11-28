/* Context */
import { companySlice } from "../reducers/CompanySlice";
import messageQueueAction from "./MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http.main-server";

/* Constants */
import CompanyApi from "src/constants/addresses/apis/company.api";

/**
 * Get all projects for define company
 * @param {string} uuid - uuid for company
 * @param {boolean} add - marker for add or init array
 * @param {number} count - count current array
 * @param {number} limit - limit for download data from server
 * @returns {Promise<any>}
 */
const getAllProjectsByCompany = (uuid, add = false, count = 0, limit = 10) => async (dispatch) => {
    dispatch(companySlice.actions.loadingStart());

    try {
        const response = await apiMainServer.post(
            CompanyApi.get_all_projects,
            JSON.stringify({
                uuid: uuid,
                count: count,
                limit: limit
            })
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction.addMessage(response.data.message, "error"));
            return;
        }

        if (add) {
            dispatch(companySlice.actions.getAllProjectsAddSuccess(response.data));
        } else {
            dispatch(companySlice.actions.getAllProjectsSuccess(response.data));
        }
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(companySlice.actions.loadingEnd());
}

/**
 * Get all managers for define company
 * @param {string} uuid - uuid for company
 * @param {boolean} add - marker add or init
 * @param {number} count - count elements, there is in array now
 * @param {number} limit - limit download data
 * @returns {Promise<any>}
 */
const getAllManagersByCompany = (uuid, add = false, count = 0, limit = 10) => async (dispatch) => {
    dispatch(companySlice.actions.loadingStart());

    try {
        const response = await apiMainServer.post(
            CompanyApi.get_all_managers,
            JSON.stringify({
                uuid: uuid,
                count: count,
                limit: limit
            })
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction.addMessage(response.data.message, "error"));
            return;
        }

        if (add) {
            dispatch(companySlice.actions.getAllManagersAddSuccess(response.data));
        } else {
            dispatch(companySlice.actions.getAllManagersSuccess(response.data));
        }
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(companySlice.actions.loadingEnd());
}

/**
 * Function for update information about project
 * @param {any} data - object for request
 * @param {File} logo - file logo for project
 * @returns {Promise<any>}
 */
const projectInfoUpdate = (data, logo) => async (dispatch) => {
    dispatch(companySlice.actions.loadingStart());

    try {
        let response = await apiMainServer.post(
            CompanyApi.project_update,
            JSON.stringify(data)
        );

        if ((logo) && (!(response.status != 200 && response.status != 201))) {
            const formData = new FormData();

            formData.append("uuid", data.uuid);
            formData.append("logo", logo);

            response = await apiMainServer.post(
                CompanyApi.project_update_image,
                formData
            );
        }

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        dispatch(messageQueueAction.addMessage(response, "success", "Информации о проекте успешно обновлена"));
        dispatch(companySlice.actions.updateProjectInfoItem(response.data));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(companySlice.actions.loadingEnd());
};

/**
 * Function for create project
 * @param {any} data - object for request
 * @param {File} logo - file logo for project
 * @returns {Promise<any>}
 */
 const createProject = (data, logo) => async (dispatch) => {
    dispatch(companySlice.actions.loadingStart());

    try {
        let response = await apiMainServer.post(
            CompanyApi.create_project,
            JSON.stringify(data)
        );

        if ((logo) && (!(response.status != 200 && response.status != 201))) {
            const formData = new FormData();

            formData.append("logo", logo);
            formData.append("uuid", response.data.uuid);

            response = await apiMainServer.post(
                CompanyApi.project_update_image,
                formData
            );
        }

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        dispatch(messageQueueAction.addMessage(response, "success", "Новый проект успешно создан!"));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(companySlice.actions.loadingEnd());
};

/**
 * Function for clear local information about company
 * @returns {Promise<void>}
 */
const clearCompanyInformation = () => async (dispatch) => {
    dispatch(companySlice.actions.clear());
}

const companyAction = {
    getAllProjectsByCompany,
    getAllManagersByCompany,
    createProject,
    projectInfoUpdate,
    clearCompanyInformation
};

export default companyAction;