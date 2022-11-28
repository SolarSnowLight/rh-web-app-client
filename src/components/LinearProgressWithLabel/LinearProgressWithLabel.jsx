/* Libraries */
import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment, IconButton, Box, Typography, LinearProgress } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { useForm, Controller, SubmitHandler, useFormState } from "react-hook-form";

/* Styles */
import styles from './LinearProgressWithLabel.module.css';
import { styleTextBlack } from './styles';
import { root, textStyleDefault } from 'src/styles';

const LinearProgressWithLabel = (props) => {
    return (
        <Box sx={{ display: 'grid' }}>
            <Box sx={{ minWidth: 35, display: 'grid', justifyContent: 'center' }}>
                <Typography
                    variant="body2" color="text.secondary"
                    sx={{
                        ...styleTextBlack
                    }}
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    {...props}
                    sx={{
                        height: "16px",
                        backgroundColor: root.colorWhite,
                        border: "1px solid #000000",
                        [`& .${linearProgressClasses.bar}`]: {
                            backgroundColor: root.colorGreen,
                        }
                    }}
                />
            </Box>
        </Box>
    );
}

export default React.memo(LinearProgressWithLabel);