/* Libraries */
import React, { useState, useEffect, createRef } from "react";
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller, useFormState } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { borderRadius } from '@mui/system';

/* Context */
import { authSignIn } from 'src/store/actions/AuthAction';
import { authSlice } from 'src/store/reducers/AuthSlice';

/* Components */
import CircularIndeterminate from 'src/components/UI/CircularIndeterminate';

/* Hooks */
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';

/* Validators */
import { emailValidation, passwordValidation } from 'src/validation-schemes/validation';

/* Constants */
import UserPanelValue from "src/constants/values/user.panel.value";

/* Styles */
import { root, textStyleDefault } from 'src/styles';
import styles from './RecoverPasswordPage.module.css';

/* Functional component for recover password user */
const RecoverPasswordPage = ({ setStateCurrentPage }) => {
    const authSelector = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    dispatch(authActions.authClearError());
    const message = useMessageToastify();
    const recaptchaRef = createRef();

    const [isVerified, setVerified] = useState(false);
    const [showIcon, setShowIcon] = useState({
        showPassword: false,
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onReCaptchaChange = (e) => {
        setVerified(true);
    };

    // For form
    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    const onSubmit = (data) => {
        dispatch(authSignIn(data));
    };

    return (
        <div className={styles["auth-block__main"]}>
            {
                authSelector.isLoading && <CircularIndeterminate />
            }

            <div className={styles["auth-block__content"]}>
                <div>
                    <span className={styles["auth-block-text__header"]} >Восстановление пароля</span>
                </div>
                <div>
                    <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles["auth-form-input__form"]} style={{ marginTop: '5em' }}>
                            <Controller
                                control={control}
                                name="email"
                                rules={emailValidation}
                                defaultValue={''}
                                render={({ field }) => (
                                    <TextField
                                        required
                                        label="Email"
                                        placeholder="Введите email адрес"
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value}
                                        error={!!errors.email?.message}
                                        helperText={errors.email?.message}
                                        sx={{
                                            borderRadius: '0px !important',
                                            border: 'none',
                                            width: '100%',
                                            '&:hover fieldset': {
                                                border: '1px solid #424041 !important',
                                                borderRadius: '0px'
                                            },
                                            'fieldset': {
                                                border: '1px solid #424041 !important',
                                                borderRadius: '0px'
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles["auth-form-recover__form"]}>
                            <span
                                className={styles["auth-form-recover-link__form"]}
                                onClick={() => {
                                    setStateCurrentPage({
                                        "value": UserPanelValue.sign_in
                                    });
                                }}
                            >
                                Назад
                            </span>
                        </div>
                        <div className={styles["auth-form-btn__form"]}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LfLNUEiAAAAAPHCy0REuWc3908HFrJwocmmb0Fs"
                                onChange={(e) => onReCaptchaChange(e)}
                            />
                        </div>
                        <div className={styles["auth-form-btn__form"]}>
                            <Button
                                /*disabled={isVerified ? false : true}*/
                                type="submit"
                                variant="contained"
                                fullWidth={true}
                                disableElevation={true}
                                sx={{
                                    backgroundColor: root.colorGreen,
                                    fontSize: '14px !important',
                                    borderRadius: '0px !important',
                                    border: '1px solid #424041 !important',
                                    width: '100%',
                                    height: '3em',
                                    ...textStyleDefault,
                                    ":hover": {
                                        backgroundColor: root.colorGreen,
                                        fontSize: '14px !important',
                                        borderRadius: '0px !important',
                                        border: '1px solid #424041 !important',
                                        width: '100%',
                                        height: '3em',
                                        ...textStyleDefault,
                                    }
                                }}
                            >
                                Далее
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default React.memo(RecoverPasswordPage);