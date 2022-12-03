/* Библиотеки */
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState, useEffect } from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChatIcon from '@mui/icons-material/Chat';
import AddModeratorIcon from '@mui/icons-material/AddModerator';

/* Контейнеры */
import SignInPage from 'src/containers/auth/SignInPage';
import SignUpPage from 'src/containers/auth/SignUpPage';
import ProfilePage from 'src/containers/client/ProfilePage';

/* Компоненты */
import DrawerButton from './components/DrawerButton';
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';

/* Хуки */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';

/* Константы */
import UserPanelValue from 'src/constants/values/user.panel.value';

/* Стили */
import RecoverPasswordPage from 'src/containers/auth/RecoverPasswordPage';
import MenuList from '../MenuList';
import DrawerOption from './components/DrawerOption';

import BuilderAdminOption from './options/BuilderAdminOption';
import BuilderManagerOption from './options/BuilderManagerOption';
import { authLogout } from 'src/store/actions/AuthAction';
import userAction from 'src/store/actions/UserAction';
import ClientOption from './options/ClientOption';
import { UserRoleValue } from 'src/constants/values/user.role.value';
import AdminOption from './options/AdminOption';
import ManagerOption from './options/ManagerOption';

/**
 * Меню навигационной системы
 * @returns {JSX.Element} React-элемент для меню навигационной системы
 */
const NavbarMenu = () => {
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const matches = useMediaQuery('(min-width: 850px)');
    const [stateCurrentPage, setStateCurrentPage] = useState({
        "value": "sign-in"
    });
    const [state, setState] = useState<boolean>(false);
    const [elements, setElements] = useState<Array<JSX.Element> | null>(null);

    useEffect(() => {
        if(authSelector.isAuthenticated){
            // @ts-ignore
            dispatch(userAction.getUserRoles());
        }
    }, [authSelector.isAuthenticated]);

    const toggleDrawer = (open: boolean) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    // Выбор элемента меню для визуализации
    const currentPageSwitcher = (state: { value: string; }) => {
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

    const executeDrawerOption = () => {
        const list: Array<JSX.Element | undefined> = [];

        const values = new Map<string, JSX.Element>([
            [UserRoleValue.admin, <AdminOption setState={setState} />],
            [UserRoleValue.builder_admin, <BuilderAdminOption setState={setState} />],
            [UserRoleValue.builder_manager, <BuilderManagerOption setState={setState} />],
            [UserRoleValue.manager, <ManagerOption setState={setState} />],
        ]);

        userSelector.roles.forEach((element: string) => {
            list.push(values.get(element));
        });

        return (
            <>
                { list.map((value) => value) }
                <ClientOption setState={setState} />
            </>
        )
    }

    return (
        <>
            {
                matches && <MenuList />
            }
            <DrawerButton
                clickHandler={toggleDrawer}
                state={state}
            >
                <Box
                    sx={{ width: "29em" }}
                    role="presentation"
                >
                    { (!authSelector.isAuthenticated) && currentPageSwitcher(stateCurrentPage) }
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        /*
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Меню
                            </ListSubheader>
                        }
                        */
                    >
                        <DrawerOption 
                            title='Профиль пользователя'
                            type={"button"}
                            Icon={PersonIcon}
                            clickHandler={() => {}}
                        />
                        <DrawerOption 
                            title='Чат'
                            type={"button"}
                            Icon={ChatIcon}
                            clickHandler={() => {}}
                        />
                        {
                            executeDrawerOption()
                        }
                        <DrawerOption 
                            title='Выход'
                            type={"button"}
                            Icon={LogoutIcon}
                            clickHandler={() => {
                                (async () => {
                                    dispatch(authLogout(authSelector.access_token));
                                })();
                            }}
                        />
                    </List>
                </Box>
            </DrawerButton>
        </>
    )
}

export default React.memo(NavbarMenu);