import React from 'react'
import styled from "styled-components";
import {Button} from "@mui/material";
import { root } from 'src/styles';




const ButtonGreen2 = styled(Button)`
  &.MuiButtonBase-root {
    width: 400px; height: 59px;

    background-color: ${root.colorGreen};
    border: 1px solid #424041;
    border-radius: 0;

    text-transform: none;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;

    :hover {
      background-color: ${root.colorGreen};
    }
  }
`
export default React.memo(ButtonGreen2) as unknown as typeof ButtonGreen2


