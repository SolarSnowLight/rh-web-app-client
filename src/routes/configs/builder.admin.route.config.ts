/* Containers */
import BuilderAdminPage from "src/containers/builder/admin/BuilderAdminPage";
import CreateObjectPage from "src/containers/builder/admin/Object/CreateObjectPage";
import CreateProjectPage from "src/containers/builder/admin/Project/CreateProjectPage";
import ManagerListPage from "src/containers/builder/admin/Manager/ManagerListPage";
import ProjectEditPage from "src/containers/builder/admin/Project/ProjectEditPage";
import ProjectListPage from "src/containers/builder/admin/Project/ProjectListPage";
import CompanyEditPage from "src/containers/builder/admin/CompanyEditPage";
import ManagerInfoPage from "src/containers/builder/admin/Manager/ManagerInfoPage";
import EditObjectPage from "src/containers/builder/admin/Object/EditObjectPage";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Constants */
import BuilderAdminRoute, { BuilderAdminRouteDefault } from "src/constants/addresses/routes/builder.admin.route";


/**
 * Configuration constants for internal routing of company administrator pages
 */
const builderAdminRouteConfig: IRouteModel[] = [
    {
        // URL: /builder/admin
        path: BuilderAdminRouteDefault,
        element: BuilderAdminPage
    },

    {
        // URL: /builder/admin/company
        path: BuilderAdminRoute.company,
        element: CompanyEditPage
    },

    {
        // URL: /builder/admin/manager/list
        path: BuilderAdminRoute.manager_list,
        element: ManagerListPage
    },

    {
        // URL: /builder/admin/project/list
        path: BuilderAdminRoute.project_list,
        element: ProjectListPage
    },

    {
        // URL: /builder/admin/project/create
        path: BuilderAdminRoute.project_create,
        element: CreateProjectPage
    },

    {
        // URL: /builder/admin/project/info
        path: BuilderAdminRoute.project_info,
        element: ProjectEditPage
    },

    {
        // URL: /builder/admin/project/create/add/object
        path: BuilderAdminRoute.project_add_object,
        element: CreateObjectPage
    },

    {
        path: BuilderAdminRoute.project_edit_object,
        element: EditObjectPage
    },

    {
        // URL: /builder/admin/manager/info
        path: BuilderAdminRoute.manager_info,
        element: ManagerInfoPage
    },
];

export default builderAdminRouteConfig;