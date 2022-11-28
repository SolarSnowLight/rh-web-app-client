export const AuthRouteDefault = "/auth";

/* Routes for authorization user */
const AuthRoute = {
    sign_up_page: `${AuthRouteDefault}/sign-up`,
    sign_in_page: `${AuthRouteDefault}/sign-in`,
    recovery_password_page: `${AuthRouteDefault}/recovery/password`,
    reset_password_page: `${AuthRouteDefault}/reset/password`,

    default: AuthRouteDefault
};

export default AuthRoute;