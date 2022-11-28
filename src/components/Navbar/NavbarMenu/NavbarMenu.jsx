/* Libraries */
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState, useEffect } from 'react';

/* Context */
import { authSlice } from 'src/store/reducers/AuthSlice';

/* Containers */
import SignInPage from 'src/containers/auth/SignInPage';
import SignUpPage from 'src/containers/auth/SignUpPage';
import ProfilePage from 'src/containers/client/ProfilePage';

/* Hooks */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';

/* Constants */
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import BuilderAdminMenuItem from 'src/constants/menu/builder.admin.menu-item';
import UserPanelValue from 'src/constants/values/user.panel.value';

/* Styles */
import styles from './NavbarMenu.module.css';
import { textMenuBlack } from './styles';
import RecoverPasswordPage from 'src/containers/auth/RecoverPasswordPage';
import BuilderAdminList from '../BuilderAdminList';

/* Functional component content of navbar */
const NavbarMenu = () => {
    // State of functional component
    const authSelector = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const matches = useMediaQuery('(min-width: 850px)');
    const [stateCurrentPage, setStateCurrentPage] = useState({
        "value": "sign-in"
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // Selects the current page to display
    const currentPageSwitcher = (state) => {
        switch (state.value) {
            case UserPanelValue.sign_in: {
                return (<SignInPage setStateCurrentPage={setStateCurrentPage} />);
            }
            case UserPanelValue.sign_up: {
                return (<SignUpPage setStateCurrentPage={setStateCurrentPage} />)
            }
            case UserPanelValue.recover_password: {
                return (<RecoverPasswordPage setStateCurrentPage={setStateCurrentPage} />);
            }
            case UserPanelValue.profile: {
                return (<ProfilePage />);
            }
        }
    }

    const list = () => {
        return (
            <Box
                sx={{ width: "29em" }}
                role="presentation"
            >
                {
                    (!authSelector.isAuthenticated) && currentPageSwitcher(stateCurrentPage)
                }
                {
                    (authSelector.isAuthenticated) && <ProfilePage />
                }
            </Box>
        );
    };

    return (
        <>
            {
                matches && (
                    <>
                        <BuilderAdminList styles={styles} setStateCurrentPage={setStateCurrentPage} />
                        <div className={styles["nav-block__header"]}>
                            {["right"].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button
                                        onClick={toggleDrawer(anchor, true)}
                                        sx={{
                                            ...textMenuBlack
                                        }}
                                    >
                                        Меню
                                    </Button>
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                )
            }
            {
                (!matches) && (
                    <>
                        <div className={styles["nav-block__header"]}>
                            {["right"].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button
                                        onClick={toggleDrawer(anchor, true)}
                                        sx={{
                                            ...textMenuBlack
                                        }}
                                    >
                                        Меню
                                    </Button>
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default React.memo(NavbarMenu);