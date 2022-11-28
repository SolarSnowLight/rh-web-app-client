import styles from './ProfilePage.module.css';

import { root } from 'src/styles';
import { textStyleDefault } from 'src/styles';

import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { authSlice } from 'src/store/reducers/AuthSlice';
import CircularIndeterminate from 'src/components/UI/CircularIndeterminate';
import { useEffect } from 'react';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { authLogout } from 'src/store/actions/AuthAction';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminRoute from 'src/constants/addresses/routes/admin.route';

const ProfilePage = () => {
    const navigate = useNavigate();
    const authSelector = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();

    return (
        <div>
            {
                authSelector.isLoading && <CircularIndeterminate />
            }
            <Button
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                onClick={() => {
                    (async () => {
                        dispatch(authLogout(authSelector.access_token));
                    })();
                }}
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
                Профиль пользователя
            </Button>

            <Button
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                onClick={() => {
                    (async () => {
                        dispatch(authLogout(authSelector.access_token));
                    })();
                }}
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
                Выход
            </Button>

            <Button
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                onClick={() => {
                    navigate(AdminRoute.default);
                }}
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
                Создание компании
            </Button>
        </div>
    )
}

export default ProfilePage;