/* Libraries */
import DatePicker from 'react-datepicker';
import { TextField } from '@mui/material';
import React from 'react';

/* Styles */
import styles from './DateSelect.module.css';

/**
 * Component for use DatePicker
 * @param {{value, changeHandler, placeholder}} props - props for components 
 * @returns {JSX.Element}
 */
const DateSelect = ({
    title = "Дата",
    value = new Date(),
    changeHandler = (e) => { },
    placeholder = "Дата сдачи",
    styleContainer = { width: '18em'},
    styleTitle = {},
    styleText = {}
}) => {

    return (
        <div
            style={{
                ...styleContainer
            }}
        >
            <span
                className='span__text__gray'
                style={styleTitle}
            >{title}</span>
            <DatePicker
                locale="ru"
                selected={value}
                onChange={changeHandler}
                customInput={
                    <TextField
                        required
                        id="outlined-required"
                        placeholder={placeholder}
                        autoComplete='off'
                        sx={{
                            marginTop: '8px',
                            borderRadius: '0px !important',
                            border: 'none',
                            width: '18em',
                            '&:hover fieldset': {
                                border: '1px solid #424041 !important',
                                borderRadius: '0px',
                                ...styleText
                            },
                            'fieldset': {
                                border: '1px solid #424041 !important',
                                borderRadius: '0px',
                                ...styleText
                            },

                            ...styleText
                        }}
                    />
                }
            />
        </div>
    )
}

export default React.memo(DateSelect);