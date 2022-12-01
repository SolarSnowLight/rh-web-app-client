/* Библиотеки */
import * as React from 'react';

/* Константы */
import { MainNavigate } from 'src/constants/addresses/navigate/main.navigate';

/* Компоненты */
import { NavList, NavElement, NavLinkElement } from './MenuList.styled';

const MenuList = () => {
    return (
        <NavList>
            {
                MainNavigate.map((element) => {
                    return (
                        <NavElement>
                            <NavLinkElement to={element.url}>{element.title}</NavLinkElement>
                        </NavElement>
                    );
                })
            }
        </NavList>
    )
}

export default React.memo(MenuList);