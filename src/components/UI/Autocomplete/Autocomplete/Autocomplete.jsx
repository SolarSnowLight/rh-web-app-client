/* Libraries */
import React from 'react';
import { Autocomplete as AutocompleteMUI } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

/* Styles */
import styles from './AutocompleteControl.module.css';
import { sxTextField } from 'src/styles';

const Autocomplete = ({
    title = "Текст *",
    placeholder = "Описание",
    changeHandler = () => { },
    readOnly = false,
    control,
    errors,
    defaultValue,
    name,
    optionName,
    options,
    loading,
    open,
    onClose,
    onOpen,
    isOptionEqualToValue,
    getOptionLabel,
    multiple = false,
    styleTextField = {}
}) => {
    return (
        <div
            className={styles["wrapper"]}
        >
            <span className='span__text__gray'>{title}</span>
            <AutocompleteMUI
                multiple={multiple}
                readOnly={readOnly}
                id="tags-outlined"
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                defaultValue={defaultValue}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                options={options}
                loading={loading}
                onChange={(e, value) => {
                    if (multiple) {
                        field.value = value;
                        changeHandler(name, value);
                    } else {
                        field.value = value[optionName];
                        changeHandler(name, value[optionName]);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{
                            ...sxTextField,
                            ...styleTextField
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}

export default React.memo(Autocomplete);