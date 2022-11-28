/* Libraries */
import { TextField as TextFieldMUI } from '@mui/material';
import React from 'react';

/* Styles */
import styles from './TextField.module.css';
import { sxTextField } from 'src/styles';

const TextField = ({
    title = "Текст *",
    value = "",
    placeholder = "Описание",
    autocomplete = 'on',
    changeHandler = (e) => { },
    clickHandler = (e) => { },
    required = false,
    multiline = false,
    rows = 1,
    styleContainer = {},
    styleTitle = {},
    styleTextField = {}
}) => {
    return (
        <div
            className={styles["wrapper"]}
            style={styleContainer}
        >
            <span
                className='span__text__gray'
                style={styleTitle}
            >{title}</span>
            <TextFieldMUI
                rows={rows}
                multiline={multiline}
                required={required}
                id="outlined-required"
                placeholder={placeholder}
                autoComplete={autocomplete}
                value={value}
                onClick={clickHandler}
                onChange={changeHandler}
                sx={{
                    ...sxTextField,
                    ...styleTextField
                }}
            />
        </div>
    )
}

export default React.memo(TextField);