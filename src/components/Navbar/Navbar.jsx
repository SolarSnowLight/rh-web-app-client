/* Libraries */
import cs from 'classnames';
import React from 'react';

/* Context */
import { authSlice } from 'src/store/reducers/AuthSlice';

/* Components */
import NavbarMenu from './NavbarMenu';

/* Images */
import logo from 'src/resources/images/logo.svg';

/* Hooks */
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';

/* Styles */
import styles from './Navbar.module.css';
import { useEffect } from 'react';

const Navbar = () => {
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);

    return (
        <nav className={cs(styles["nav__header"], styles["nav-menu__header"])}>
            <div className={styles['nav-logo__header']}>
                <img src={logo} />
            </div>
            <NavbarMenu />
        </nav>
    )
}

export default React.memo(Navbar);