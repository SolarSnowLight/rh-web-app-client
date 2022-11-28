/* Библиотеки */
import axios from "axios";

/* Контекст */
import store from "src/store/store";
import { refreshAccessToken } from "src/store/actions/AuthAction";

/* Константы */
import AuthApi from "src/constants/addresses/apis/auth.api";
import MainApi from "src/constants/addresses/apis/main.api";

/**
 * Создание объекта AxiosInstance, с базовым URL и credentials
 */
const apiMainServer = axios.create({
    withCredentials: true,
    baseURL: MainApi.main_server
});

/**
 * Добавление интерцептора для обработки отправки запроса на сервер
 */
apiMainServer.interceptors.request.use((config) => {
    // Добавление заголовка Authorization
    config.headers.Authorization = `Bearer ${store.getState().authReducer.access_token}`;
    return config;
});

/**
 * Добавление интерцептора при обработки результата запроса
 */
apiMainServer.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if ((error.response) 
        && (error.response.status == 401)
        && (error.config)
        && (!error.config._isRetry)) {
        originalRequest._isRetry = true;

        try {
            const response = await apiMainServer.post(`${AuthApi.refresh}`, null, { withCredentials: true });

            store.dispatch(refreshAccessToken(response.data));
            return apiMainServer.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }

    throw error;
});

export default apiMainServer;