import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './CircularIndeterminate.module.css';

const CircularIndeterminate = ({ center }) => {
    return (
        <Box sx={

            (center) ? {
                width: 70,
                height: 70,
                position: "fixed",
                left: "50%",
                right: "50%",
                top: "50%",
                bottom: "50%",
                zIndex: 1
            } :
                {
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center"
                }}>
            <CircularProgress />
        </Box >
    );
}

export default React.memo(CircularIndeterminate);