import styled from "styled-components";
import {TextField} from "@mui/material";
import React from "react";


let Input2 = styled(TextField).attrs(p=>({
    variant: "outlined",
    type: 'text',
}))`
  fieldset { // рамка
    border: 1px solid #8B8B8B;
    border-radius: 0;
  }
  .MuiInputBase-root.MuiOutlinedInput-root { // input container
    width: 400px; height: 59px;
    padding-right: 0; 
    padding-left: 0;
  }
  input { // input
    padding-left: 16px;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    ::placeholder {
      color: #8B8B8B;
      opacity: 1;
    }
  }
`
export default React.memo(Input2) as unknown as typeof Input2