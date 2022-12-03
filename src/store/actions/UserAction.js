/* Context */
import { userSlice } from "src/store/reducers/UserSlice";
import messageQueueAction from "./MessageQueueAction";

/* Http */
import apiMainServer from "src/http/http.main-server";

/* Constants */
import MainApi from "src/constants/addresses/apis/main.api";
import UserApi from "src/constants/addresses/apis/user.api";
import CompanyApi from "src/constants/addresses/apis/company.api";

/**
 * Функция для получения информации о компании пользователя
 * @returns {Promise<void>}
 */
export const getUserCompany = () => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    try {
        const response = await apiMainServer.post(
            UserApi.get_user_company
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        if (response.data) {
            response.data.data.logo = [{
                data_url: `${MainApi.main_server}/${response.data.data.logo.replace('\\', '/')}`
            }];

            dispatch(userSlice.actions.getUserCompanySuccess({
                ...response.data,
            }));
        }
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(userSlice.actions.loadingEnd());
};

/**
 * Функция обновления информации о компании
 * @param {*} data Данные для обновления
 * @param {*} logo Логотип компании
 * @returns {Promise<any>}
 */
const companyInfoUpdate = (data, logo) => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    try {
        let response = await apiMainServer.post(
            CompanyApi.update,
            JSON.stringify(data)
        );

        if ((logo) && (!(response.status != 200 && response.status != 201))) {
            const formData = new FormData();

            formData.append("uuid", data.uuid);
            formData.append("logo", logo);

            response = await apiMainServer.post(
                CompanyApi.update_image,
                formData
            );
        }

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        dispatch(messageQueueAction.addMessage(response, "success", "Информации о компании успешно обновлена"));
        dispatch(userSlice.actions.updateCompanySuccess(response.data));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(userSlice.actions.loadingEnd());
};

/**
 * Функция для получения информации о пользовательских ролях
 * @returns {Promise<any>}
 */
const getUserRoles = () => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    try{
        const response = await apiMainServer.post(
            UserApi.get_user_roles
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        if(response.data) {
            dispatch(userSlice.actions.getUserRolesSuccess(response.data.roles));
        }
    }catch(e) {
        dispatch(messageQueueAction.errorMessage(e));
    }


    dispatch(userSlice.actions.loadingEnd());
}

/**
 * Функция обновления элемента информации о компании
 * @param {*} item Ключ элемента
 * @param {*} value Значение элемента
 * @returns {Promise<any>}
 */
const setItemCompanyInfo = (item, value) => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    try {
        dispatch(userSlice.actions.setItemCompanyInfo({ item, value }));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(userSlice.actions.loadingEnd());
};

const userAction = {
    getUserCompany,
    companyInfoUpdate,
    setItemCompanyInfo,
    getUserRoles
};

export default userAction;
