/* Libraries */
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

/* Styles */
import styles from './TextFieldControl.module.css';
import { sxTextField } from 'src/styles';

const TextFieldControl = ({
    title = "Текст *",
    placeholder = "Описание",
    changeHandler = () => { },
    required = false,
    control,
    errors,
    defaultValue,
    name,
    multiline = false,
    rows = 1,
    rules = null,
    View = TextField,
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
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <View
                        required={required}
                        multiline={multiline}
                        rows={rows}
                        placeholder={placeholder}
                        onChange={(e) => {
                            field.onChange(e);
                            changeHandler(name, (e?.target?.value) ? e.target.value : e);
                        }}
                        value={field.value}
                        error={!!errors[name]?.message}
                        helperText={!!errors[name]?.message}

                        sx={{
                            ...sxTextField,
                            ...styleTextField
                        }}
                    />
                )}
            />
        </div>
    )
}

export default React.memo(TextFieldControl);