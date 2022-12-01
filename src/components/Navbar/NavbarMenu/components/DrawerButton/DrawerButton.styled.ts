import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const WrapperMenu = React.memo(styled.div`
    box-sizing: border-box;
    grid-area: C;
    display: grid;
    position: relative;
    width: 100%;
    height: 100%;
    place-items: center;
    border-left: 1px solid #000000;
`);

export const MenuButton = React.memo(styled(Button)`
    &.MuiButtonBase-root {
        font-family: var(--font-family-text);
        font-style: normal;
        font-weight: 450;
        font-size: var(--font-size-text-header);
        line-height: 31px;
        text-transform: none;
        letter-spacing: 0.05em;
        color: #000000;
    }
`);
