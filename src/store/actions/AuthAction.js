/* Libraries */
import axios from "axios";

/* Context */
import { authSlice } from "../reducers/AuthSlice";
import { messageQueueSlice } from "../reducers/MessageQueueSlice";
import messageQueueAction from "./MessageQueueAction";

/* Constants */
import MainApi from "src/constants/addresses/apis/main.api";
import AuthApi from "src/constants/addresses/apis/auth.api";

/* Function for auth user on high level */
export const authSignIn = (data) => async (dispatch) => {
    try {
        // Call action for set state about begin request
        dispatch(authSlice.actions.loadingStart());

        const response = await axios.post(
            (MainApi.main_server + AuthApi.sign_in),
            JSON.stringify({
                ...data
            }),
            {
                withCredentials: true
            }
        );

        // Handling error
        if ((response.status != 200) && (response.status != 201)) {
            dispatch(messageQueueAction.addMessage(response, "error"));
            return;
        }

        dispatch(messageQueueAction.addMessage(response, "success", "Успешная авторизация!"));

        // Call action for set state about success request (her ending)
        dispatch(authSlice.actions.signInSuccess(response.data));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(authSlice.actions.loadingEnd());
};

/* Function for register new user */
export const authSignUp = (data, profileImage) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.loadingStart());

        const response = await axios.post(
            (MainApi.main_server + AuthApi.sign_up),
            JSON.stringify({
                ...data
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );

        // Error handling
        if ((response.status != 200) && (response.status != 201)) {
            dispatch(messageQueueAction.addMessage(response, "error"));
            return;
        }

        // Upload user's image for profile
        if (profileImage) {
            const formData = new FormData();
            formData.append("file", profileImage);

            await axios.post(
                (MainApi.main_server + AuthApi.upload_profile_image),
                formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + response.data.access_token
                    }
                }
            );
        }

        dispatch(messageQueueAction.addMessage(response, "success", "Успешная регистрация нового пользователя!"));
        dispatch(authSlice.actions.signUpSuccess(response.data));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(authSlice.actions.loadingEnd());
};

export const refreshAccessToken = (data) => async (dispatch) => {
    dispatch(authSlice.actions.loadingStart());

    try {
        dispatch(authSlice.actions.signInSuccess(data));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(authSlice.actions.loadingEnd());
}

/* Function for update data user from local storage */
export const authUpdate = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.loadingStart());
        dispatch(authSlice.actions.getAuthData());
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(authSlice.actions.loadingEnd());
};

/* Function for logout user */
export const authLogout = (access_token) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.loadingStart());

        const response = await axios.post(
            (MainApi.main_server + AuthApi.logout),
            null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                withCredentials: true
            }
        );
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(authSlice.actions.logout());
    dispatch(messageQueueAction.addMessage(null, "dark", "Выход из аккаунта"));
}

/* Function for set new data auth */
export const setAuthData = (accessToken) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.loadingStart());
        dispatch(authSlice.actions.setAuthData(accessToken));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(authSlice.actions.loadingEnd());
};
