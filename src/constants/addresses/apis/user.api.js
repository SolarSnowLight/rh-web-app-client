export const UserBaseApi = "/user";

const UserApi = {
    get_user_company: `${UserBaseApi}/company/get`,
    get_user_roles: `${UserBaseApi}/role/get/all`
};

export default UserApi;