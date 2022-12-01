/* Библиотеки */
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState, useEffect } from 'react';

/* Контейнеры */
import SignInPage from 'src/containers/auth/SignInPage';
import SignUpPage from 'src/containers/auth/SignUpPage';
import ProfilePage from 'src/containers/client/ProfilePage';

/* Компоненты */
import DrawerButton from './components/DrawerButton';

/* Хуки */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';

/* Константы */
import UserPanelValue from 'src/constants/values/user.panel.value';

/* Стили */
import RecoverPasswordPage from 'src/containers/auth/RecoverPasswordPage';
import MenuList from '../MenuList';

/**
 * Меню навигационной системы
 * @returns {JSX.Element} React-элемент для меню навигационной системы
 */
const NavbarMenu = () => {
    const authSelector = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const matches = useMediaQuery('(min-width: 850px)');
    const [stateCurrentPage, setStateCurrentPage] = useState({
        "value": "sign-in"
    });
    const [state, setState] = useState(false);

    const toggleDrawer = (open: boolean) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    // Выбор элемента меню для визуализации
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
                matches && <MenuList />
            }
            <DrawerButton
                clickHandler={toggleDrawer}
                state={state}
            >
                { list() }
            </DrawerButton>
        </>
    )
}

export default React.memo(NavbarMenu);