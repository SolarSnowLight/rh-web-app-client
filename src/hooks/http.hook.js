import { useState, useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { authUpdate } from "src/store/actions/AuthAction";
import AuthApi from "../constants/addresses/apis/auth.api";
import MainApi from "../constants/addresses/apis/main.api";
import { authSlice } from "../store/reducers/AuthSlice";
import storeConfig from "../configs/store.config.json";
import { useAppDispatch } from "./redux.hook";

const useHttp = (baseUrl = MainApi.main_server) => {
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const originalRequest = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);

        try {
            const response = await fetch(
                (baseUrl + url),
                {
                    method,
                    body,
                    headers
                }
            );

            const data = await response.json();
            setLoading(false);

            return {
                response,
                data
            };
        } catch (e) {
            setLoading(false);
            setError(e.message);
        }

        return {
            response: null,
            data: null
        };
    }, []);

    const refreshToken = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(
                (baseUrl + AuthApi.refresh),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                dispatch(authActions.setAuthData({
                    access_token: data.access_token
                }));
            } else if (response?.status === 401) {
                throw new Error("Пользователь не авторизован!");
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const request = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = { 'Content-Type': 'application/json' },
        multipart = false
    ) => {
        setLoading(true);
        try {
            if (body && (!headers['Content-Type']) && (!multipart)) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const mainStore = JSON.parse(localStorage.getItem('persist:' + storeConfig["main-store"]));
            let accessToken = null;

            if (mainStore) {
                accessToken = JSON.parse(mainStore.authReducer)?.access_token;
            }

            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            let { response, data } = await originalRequest(url, method, body, headers);

            // Status Code 401 - Unauthorized
            if (response?.status === 401) {
                const localResponse = await refreshToken(accessToken);
                headers['Authorization'] = `Bearer ${localResponse.access_token}`;

                dispatch(authActions.setAuthData({
                    access_token: localResponse.access_token
                }));

                const updateResponse = await originalRequest(url, method, body, headers);

                response = updateResponse.response;
                data = updateResponse.data;
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

export default useHttp;