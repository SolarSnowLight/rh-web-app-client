import styled from "styled-components";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIc from "src/components/icons/SearchIc";
import React from "react";


let SearchInput1 = styled(TextField).attrs(p=>({
    variant: "outlined",
    type: 'text',
    placeholder: "Поиск",
    InputProps: {
        ...p.InputProps
    },
}))`
  fieldset { // рамка
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiInputBase-root.MuiOutlinedInput-root { // input container
    width: 100%; height: 44px;
    padding: 0;
  }
  .MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input  { // input
    padding: 0 16px;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    &input::placeholder {
      color: #8B8B8B;
    }
  }
`
SearchInput1 = React.memo(SearchInput1) as unknown as typeof SearchInput1
export default SearchInput1
