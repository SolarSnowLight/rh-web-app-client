/* Libraries */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState } from 'react';

/* Constants */
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import BuilderAdminMenuItem from 'src/constants/menu/builder.admin.menu-item';

const ClientList = ({ styles, setStateCurrentPage }) => {
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
                className={(currentPoint === BuilderAdminMenuItem.company ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
            >
                <span
                    className={styles["text-menu--black"]}
                    onClick={toCompany}
                >{BuilderAdminMenuItem.company}</span>
            </div>
            <div
                className={(currentPoint === BuilderAdminMenuItem.projects ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
            >
                <span
                    className={styles["text-menu--black"]}
                    onClick={toProjectList}
                >{BuilderAdminMenuItem.projects}</span>
            </div>
            <div
                className={(currentPoint === BuilderAdminMenuItem.managers ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
            >
                <span
                    className={styles["text-menu--black"]}
                    onClick={toManagerList}
                >{BuilderAdminMenuItem.managers}</span>
            </div>
            <div
                className={(currentPoint === BuilderAdminMenuItem.messenger ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
            >
                <span
                    className={styles["text-menu--black"]}
                    onClick={toManagerList}
                >{BuilderAdminMenuItem.messenger}</span>
            </div>
        </div>
    )
}

export default React.memo(ClientList);