import React from 'react'
import styled from "styled-components";
import ButtonGreen2 from "../ButtonGreen2/ButtonGreen2";





const ButtonWhite2 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    background-color: #F8F8F8;
    :hover {
      background-color: #F8F8F8;
    }
  }
`
export default React.memo(ButtonWhite2) as unknown as typeof ButtonWhite2