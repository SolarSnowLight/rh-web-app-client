/* Libraries */
import React from 'react';
import { Button } from '@mui/material';

/* Styles */
import { root, textStyleDefault } from 'src/styles';
import { sxButton } from 'src/styles';


const ButtonGreenComponent = ({
    title,
    style = { width: '16em', height: '3em' },
    clickHandler = (e) => { },
    type = "button",
    variant = "container",
    disabled = false
}) => {
    return (
        <>
            <Button
                disabled={disabled}
                type={type}
                variant={variant}
                onClick={(e) => {
                    clickHandler(e);
                }}
                sx={{
                    backgroundColor: root.colorGreen,
                    fontSize: '14px !important',
                    borderRadius: '0px !important',
                    border: '1px solid #424041 !important',
                    ...style,
                    ...textStyleDefault,
                    ":hover": {
                        backgroundColor: root.colorGreen,
                        fontSize: '14px !important',
                        borderRadius: '0px !important',
                        border: '1px solid #424041 !important',
                        ...style,
                        ...textStyleDefault,
                    }
                }}>{title}</Button>
        </>
    )
}

export default React.memo(ButtonGreenComponent);