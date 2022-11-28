/* Libraries */
import { Routes, Route, Navigate } from "react-router-dom";
import { useCallback } from "react";

/* HOC */
import WithToastify from "src/hoc-helpers/WithToastify";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Configs */
import builderAdminRouteConfig from "./configs/builder.admin.route.config";
import builderManagerRouteConfig from "./configs/builder.manager.route.config";
import baseRouteConfig from "./configs/base.route.config";
import adminRouteConfig from "./configs/admin.route.config";
import managerRouteConfig from "./configs/manager.route.config";

/* Constants */
import MainRoute from "src/constants/addresses/routes/main.route";
import { ManagerRouteDefault } from "src/constants/addresses/routes/manager.route";
import { BuilderAdminRouteDefault } from "src/constants/addresses/routes/builder.admin.route";
import { AdminRouteDefault } from "src/constants/addresses/routes/admin.route";
import { BuilderManagerRoutes } from "src/constants/addresses/routes/builder.manager.routes";


/* Hook for all routes */
const useRoutes = (isAuthenticated: boolean) => {
    const createRoutes = useCallback((routes: IRouteModel[]) => {
        return (
            routes && routes.map((value) => (<Route key={value.path} path={value.path} element={<value.element />}/>) )
        )
    }, []);

    return (
        <Routes>
            { /* Admin routes */}
            <Route path={AdminRouteDefault}> 
                { createRoutes(adminRouteConfig) }
            </Route>

            { /* Manager routes */}
            <Route path={ManagerRouteDefault}>
                { createRoutes(managerRouteConfig) }
            </Route>
            
            { /* Builder admin routes */}
            <Route path={BuilderAdminRouteDefault}>
                { createRoutes(builderAdminRouteConfig) }
            </Route>

            { /* Builder manager routes */}
            <Route path={BuilderManagerRoutes.common}>
                { createRoutes(builderManagerRouteConfig) }
            </Route>
            
            { /* Base routes */}
            { createRoutes(baseRouteConfig) }

            <Route path='*' element={<Navigate to={MainRoute.home_page} />} />
        </Routes>
    );
};

export default WithToastify(useRoutes);