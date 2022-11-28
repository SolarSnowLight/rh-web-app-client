/* Libraries */
import { Select as SelectMUI, FormControl, MenuItem } from "@mui/material";
import React from 'react';

/* Styles */
import styles from './Select.module.css';

const Select = ({
    title = "",
    items = [],
    changeHandler = (e) => {}
}) => {
    return (
        <>
            <FormControl sx={{ minWidth: 120, marginBottom: "0px !important" }}>
                <span className='span__text__gray'>{title}</span>
                <SelectMUI
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={changeHandler}
                    sx={{
                        marginTop: '8px',
                        borderRadius: '0px !important',
                        border: 'none',
                        width: '18em',
                        '&:hover fieldset': {
                            border: '1px solid #424041 !important',
                            borderRadius: '0px',
                        },
                        'fieldset': {
                            border: '1px solid #424041 !important',
                            borderRadius: '0px',
                        },
                    }}
                >
                    {
                        items && items.map((item, index) => {
                            return (
                                <MenuItem value={index}>{item.value}</MenuItem>
                            );
                        })
                    }
                </SelectMUI>
            </FormControl>
        </>
    )
}

export default React.memo(Select);