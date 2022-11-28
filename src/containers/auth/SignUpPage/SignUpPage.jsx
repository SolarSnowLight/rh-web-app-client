/* Libraries */
import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment, IconButton, Box, Typography, LinearProgress } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { useForm, Controller, SubmitHandler, useFormState } from "react-hook-form";

/* Context */
import { authSignIn, authSignUp } from 'src/store/actions/AuthAction';

/* Components */
import ImageUpload from "src/components/UI/ImageUpload";
import CircularIndeterminate from "src/components/UI/CircularIndeterminate";
import LinearProgressWithLabel from "src/components/LinearProgressWithLabel";

/* Validators */
import { emailValidation, passwordValidation, retryPasswordValidation } from 'src/validation-schemes/validation';

/* Hooks */
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';

/* Models */
import AuthSignUpDto from 'src/dtos/auth.sign-up.dto';

/* Styles */
import styles from './SignUpPage.module.css';
import { styleTextBlack } from './styles';
import { root, textStyleDefault } from 'src/styles';

const SignUpPage = ({ setStateCurrentPage }) => {
    const authSelector = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const [progress, setProgress] = useState(0);
    const [showIcon, setShowIcon] = useState({
        showPassword: false,
    });
    const [part, setPart] = useState(false);
    const [profileImage, setProfileImage] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        patronymic: '',
        nickname: ''
    });

    const [retryPassword, setRetryPassword] = useState('');

    useEffect(() => {
        if (profileImage.length <= 0) {
            setProgress(progress - 50);
        }

        if (profileImage.length > 0 && (progress < 50)) {
            setProgress((prev) => prev + 50);
        }
    }, [profileImage]);

    useEffect(() => {
        let countExists = 0;

        for (var key of Object.keys(formData)) {
            if (formData[key].length > 0) {
                countExists++;
            }
        }

        if (profileImage.length > 0) {
            setProgress(40 + countExists * 10);
        } else {
            setProgress(countExists * 10);
        }

    }, [formData]);

    const onChangeImage = (imageList, addUpdateIndex) => {
        setProfileImage(imageList);
    };

    const handleClickShowPassword = () => {
        setShowIcon({
            showPassword: !showIcon.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // For form
    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    const onSubmit = (data) => {
        if (part) {
            dispatch(authSignUp({
                email: data.email,
                password: data.password,
                data: {
                    ...(new AuthSignUpDto(data))
                }
            },
                (profileImage.length > 0) ? profileImage[0].file : null
            ));
        } else {
            setPart(true);
        }
    };

    return (
        <div className={styles["auth-block__main"]}>
            {
                authSelector.isLoading && <CircularIndeterminate />
            }

            <div className={styles["auth-block__content"]}>
                <div>
                    <span className={styles["auth-block-text__header"]} >Регистрация</span>
                </div>
                <div style={{ marginTop: '3em' }}>
                    <LinearProgressWithLabel
                        value={progress}
                    />
                </div>
                {
                    (!part) && <div className={styles["auth-block-img__header"]}>
                        <ImageUpload
                            title={"Фото профиля"}
                            subtitle={"Добавить фото профиля"}
                            value={profileImage}
                            onChange={onChangeImage}
                        />
                    </div>
                }
                <div>
                    <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
                        {
                            (!part) && <>
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="name"
                                        defaultValue={undefined}
                                        render={({ field }) => (
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Имя"
                                                placeholder="Введите имя"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value
                                                    });
                                                }}
                                                value={field.value}
                                                error={!!errors.name?.message}
                                                helperText={errors.name?.message}
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
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="surname"
                                        defaultValue={undefined}
                                        render={({ field }) => (
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Фамилия"
                                                placeholder="Введите фамилию"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        surname: e.target.value
                                                    });
                                                }}
                                                value={field.value}
                                                error={!!errors.surname?.message}
                                                helperText={errors.surname?.message}
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
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="patronimyc"
                                        render={({ field }) => (
                                            <TextField
                                                id="outlined-required"
                                                label="Отчество"
                                                placeholder="Введите отчество"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        patronimyc: e.target.value
                                                    });
                                                }}
                                                value={field.value}
                                                error={!!errors.patronimyc?.message}
                                                helperText={errors.patronimyc?.message}
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
                            </>
                        }
                        {
                            (part) && <>
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="nickname"
                                        defaultValue={undefined}
                                        render={({ field }) => (
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Никнейм"
                                                placeholder="Введите никнейм"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        nickname: e.target.value
                                                    });
                                                }}
                                                value={field.value}
                                                error={!!errors.nickname?.message}
                                                helperText={errors.nickname?.message}
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
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="email"
                                        rules={emailValidation}
                                        render={({ field }) => (
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Email"
                                                placeholder="Введите email"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    });
                                                }}
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
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={passwordValidation}
                                        render={({ field }) => (
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Пароль"
                                                placeholder="Введите пароль"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData({
                                                        ...formData,
                                                        password: e.target.value
                                                    });
                                                }}
                                                value={field.value}
                                                error={!!errors.password?.message}
                                                helperText={errors.password?.message}
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
                                <div className={styles["auth-form-input__form"]}>
                                    <Controller
                                        control={control}
                                        name="retry_password"
                                        rules={retryPasswordValidation(formData.password)}
                                        render={({ field }) => (
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Повтор пароля"
                                                placeholder="Введите пароль ещё раз"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setRetryPassword(e.target.value);
                                                }}
                                                value={field.value}
                                                error={!!errors.retry_password?.message}
                                                helperText={errors.retry_password?.message}
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
                            </>
                        }
                        <div className={styles["auth-form-btn__form"]}>
                            {
                                part && <Button
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
                                    Зарегистрироваться
                                </Button>
                            }

                            {
                                (!part) && <Button
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
                                    Продолжить регистрацию
                                </Button>
                            }
                        </div>
                    </form>
                </div>
                <div className={styles["auth-form-register__form"]}>
                    <div>
                        <span className={styles["auth-form-text-gray__form"]} >Есть аккаунт?</span>
                        <span
                            className={styles["auth-form-text-black__form"]}
                            onClick={() => {
                                setStateCurrentPage({
                                    "value": "sign-in"
                                });
                            }}
                        > Авторизоваться</span>
                    </div>
                </div>
                <div className={styles["auth-form-register__form"]}></div>
            </div>
        </div>
    );
}

export default React.memo(SignUpPage);