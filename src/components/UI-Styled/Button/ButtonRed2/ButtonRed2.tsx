import React from 'react'
import styled from "styled-components";
import {Button} from "@mui/material";
import ButtonGreen2 from "../ButtonGreen2/ButtonGreen2";




const ButtonRed2 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    background-color: #fb5f65;
    :hover {
      background-color: #fb5f65;
    }
  }
`
export default React.memo(ButtonRed2) as unknown as typeof ButtonRed2


