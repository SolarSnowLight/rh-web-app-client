export const AuthApiBase = "/auth";

/* Константы адресов, для работы с авторизацией и регистрацией */
const AuthApi = {
    // Авторизация и регистрация
    sign_in: `${AuthApiBase}/sign-in`,
    sign_up: `${AuthApiBase}/sign-up`,
    upload_profile_image: `${AuthApiBase}/sign-up/upload/image`,
    oauth: `${AuthApiBase}/sign-in/oauth2`,
    logout: `${AuthApiBase}/logout`,

    // Обновление токена
    refresh: `${AuthApiBase}/refresh`,

    // Сброс и изменение пароля
    recovery_password: `${AuthApiBase}/recovery/password`,
    reset_password: `${AuthApiBase}/reset/password`,
};

export default AuthApi;