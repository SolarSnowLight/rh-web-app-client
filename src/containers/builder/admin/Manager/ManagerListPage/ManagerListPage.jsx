/* Libraries */
import React from "react";

import styles from './ManagerListPage.module.scss';

import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import ListItemComponent from 'src/components/Project/ProjectCard';
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { useNavigate } from 'react-router-dom';
import companyAction from 'src/store/actions/CompanyAction';
import { useEffect } from "react";
import MainApi from 'src/constants/addresses/apis/main.api';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';

const ManagerListPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const companySelector = useAppSelector((state) => state.companyReducer);
    const dispatch = useAppDispatch();
    const message = useMessageToastify();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(companyAction.getAllManagersByCompany(userSelector.company?.uuid));
    }, []);

    const getProjectsHandler = () => {
        dispatch(companyAction.getAllManagersByCompany(
            userSelector.company?.uuid,
            true,
            companySelector.managers.length
        ));
    };

    const navigateToManager = (item) => {
        navigate(
            (BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.manager_info),
            {
                state: {
                    ...item
                }
            }
        );
    }

    return (
        <div className={styles["flex-container"]}>
            <div className={styles["flex-item"]}>
                <span className={styles["text-h3"]}>Менеджеры</span>
                <ButtonWhiteComponent
                    title={"Добавить менеджера"}
                />
            </div>
            <div className={styles["flex-item"]}>
                {
                    companySelector.managers && companySelector.managers?.length > 0 && companySelector.managers.map((item) => {
                        if (!item) {
                            return (<></>);
                        }
                        return (
                            <ListItemComponent
                                column1={item.data.name}
                                img={(item.data.avatar) ? MainApi.main_server + '/' + item.data.avatar.replace('\\', '/') : null}
                                clickHandler={() => {
                                    navigateToManager(item);
                                }}
                            />
                        )
                    })
                }
            </div>
            <div className={styles["flex-item"]}>
                <span className={"span__text__black-h4"}>Показать ещё</span>
            </div>
        </div>
    )
}

export default React.memo(ManagerListPage);