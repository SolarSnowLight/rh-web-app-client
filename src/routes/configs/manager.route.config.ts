/* Containers */
import BuilderEditPage from "src/containers/manager/BuilderEditPage";
import BuilderStatisticsPage from "src/containers/manager/BuilderStatisticsPage";
import ManagerPage from "src/containers/manager/ManagerPage";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Constants */
import ManagerRoute from "src/constants/addresses/routes/manager.route";

/**
 * Configuration constants for internal routing of manager pages
 */
const managerRouteConfig: IRouteModel[] = [
    {
        // URL: /manager/builder/edit
        path: ManagerRoute.builderEdit,
        element: BuilderEditPage
    },

    {
        // URL: /manager/builder/statistics
        path: ManagerRoute.builderStatistics,
        element: BuilderStatisticsPage
    },

    {
        // URL: /manager/builder
        path: '',
        element: ManagerPage
    }
];

export default managerRouteConfig;