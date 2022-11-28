/* Containers */
import ClientListPage from "src/containers/builder/manager/ClientListPage";
import ObjectInfoPage from "src/containers/builder/manager/ObjectInfoPage";
import ProjectInfoPage from "src/containers/builder/manager/ProjectInfoPage";
import BuilderManagerPage from "src/containers/builder/manager/ManagerPage/BuilderManagerPage";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Constants */
import { BuilderManagerRoutes } from "src/constants/addresses/routes/builder.manager.routes";


/**
 * Configuration constants for internal routing of company manager pages
 */
const builderManagerRouteConfig: IRouteModel[] = [
    {
        // URL: /builder/manager/clients
        path: BuilderManagerRoutes.clients,
        element: ClientListPage
    },

    {
        // URL: /builder/manager/object/info
        path: BuilderManagerRoutes.objectInfo,
        element: ObjectInfoPage
    },

    {
        // URL: /builder/manager/project/info
        path: BuilderManagerRoutes.projectInfo,
        element: ProjectInfoPage
    },

    {
        // URL: /builder/manager
        path: '',
        element: BuilderManagerPage
    }
];

export default builderManagerRouteConfig;