/* Библиотеки */
import React from 'react';
import styled from 'styled-components';

/* Компоненты */
import NavbarMenu from '../NavbarMenu';
import { Logo as NavigateLogo, Navigate} from './NavbarMain.styled';

/* Изображения */
import logo from 'src/resources/images/logo.svg';

const NavbarMain = () => {
    return (
        <Navigate>
            <NavigateLogo>
                <img src={logo} />
            </NavigateLogo>
            <NavbarMenu />
        </Navigate>
    )
}

export default React.memo(NavbarMain);