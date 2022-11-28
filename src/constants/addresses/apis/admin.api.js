// /admin/user/get/all
export const AdminApiBase = "/admin";

/* Константы API для работы с сервером (общие константы) */
const AdminApi = {
    get_all_users: `${AdminApiBase}/user/get/all`,
    create_company: `${AdminApiBase}/company/create`
};

export default AdminApi;