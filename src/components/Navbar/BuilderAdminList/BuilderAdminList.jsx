/* Libraries */
import * as React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState } from 'react';

/* Constants */
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import BuilderAdminMenuItem from 'src/constants/menu/builder.admin.menu-item';

const BuilderAdminList = ({ styles, setStateCurrentPage }) => {
    const [currentPoint, setCurrentPoint] = useState(BuilderAdminMenuItem.company);

    const navigate = useNavigate();

    const toCompany = () => {
        setCurrentPoint(BuilderAdminMenuItem.company);
        navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.company);
    }

    const toManagerList = () => {
        setCurrentPoint(BuilderAdminMenuItem.managers);
        navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.manager_list);
    }

    const toProjectList = () => {
        setCurrentPoint(BuilderAdminMenuItem.projects);
        navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_list);
    }

    return (
        <div className={styles["nav-menu-center__header"]}>
            <div
                className={styles["nav-menu__element"]}
            >
                <NavLink
                    className={styles["text-menu--black"]}
                    to={BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.company}
                >{BuilderAdminMenuItem.company}</NavLink>
            </div>
            <div
                className={styles["nav-menu__element"]}
            >
                <NavLink
                    className={styles["text-menu--black"]}
                    to={BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_list}
                >{BuilderAdminMenuItem.projects}</NavLink>
            </div>
            <div
                className={styles["nav-menu__element"]}
            >
                <NavLink
                    className={styles["text-menu--black"]}
                    to={BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.manager_list}
                >{BuilderAdminMenuItem.managers}</NavLink>
            </div>
            <div
                className={styles["nav-menu__element"]}
            >
                <NavLink
                    className={styles["text-menu--black"]}
                    to={BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.messenger}
                >{BuilderAdminMenuItem.messenger}</NavLink>
            </div>
        </div>
    )
}

export default React.memo(BuilderAdminList);