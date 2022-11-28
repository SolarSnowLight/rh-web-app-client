/* Containers */
import AdminPage from "src/containers/admin/AdminPage";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Constants */
import { AdminRouteDefault } from "src/constants/addresses/routes/admin.route";

/**
 * Configuration constants for internal routing of administrator pages
 */
const adminRouteConfig: IRouteModel[] = [
    {
        // URL: /admin
        path: AdminRouteDefault,
        element: AdminPage
    }
];

export default adminRouteConfig;