import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavList = React.memo(styled.div`
    grid-area: B;
    display: grid;
    position: relative;
    width: 80%;
    height: 100%;
    grid-auto-flow: column;
    place-items: center;
`);

export const NavElement = React.memo(styled.div`
    display: grid;
    width: 9em;
    height: 100%;
    align-items: center;
    justify-content: center;
`);

export const NavLinkElement = React.memo(styled(NavLink)`
    font-family: var(--font-family-text);
    font-style: normal;
    font-weight: 450;
    font-size: var(--font-size-text-header);
    line-height: 31px;

    letter-spacing: 0.05em;
    color: #000000;

    &.active {
        display: grid;
        background-color: #B4EFA6;
        width: 7em;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
`);