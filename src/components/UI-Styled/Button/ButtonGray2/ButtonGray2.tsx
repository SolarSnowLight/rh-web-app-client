import React from 'react'
import styled from "styled-components";
import {Button} from "@mui/material";
import ButtonGreen2 from '../ButtonGreen2/ButtonGreen2';




const ButtonGray2 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    background: #DCDCDC;
    :hover {
      background: #DCDCDC;
    }
  }
`
export default React.memo(ButtonGray2) as unknown as typeof ButtonGray2


