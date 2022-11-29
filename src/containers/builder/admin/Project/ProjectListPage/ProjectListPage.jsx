/* Библиотеки */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Контекст */
import companyAction from 'src/store/actions/CompanyAction';

/* Компоненты */
import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import ListItemComponent from 'src/components/Project/ProjectCard';
import Space from "src/components/Space";

/* Хуки */
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';

/* Константы */
import MainApi from 'src/constants/addresses/apis/main.api';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';

/* Стили */
import styles from './ProjectListPage.module.scss';

const ProjectListPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const companySelector = useAppSelector((state) => state.companyReducer);
    const dispatch = useAppDispatch();
    const message = useMessageToastify();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(companyAction.getAllProjectsByCompany(userSelector.company?.uuid));
    }, []);

    const getProjectsHandler = () => {
        dispatch(companyAction.getAllProjectsByCompany(
            userSelector.company?.uuid,
            true,
            companySelector.projects.length
        ));
    };

    return (
        <>
            <div className={styles["flex-container"]}>
                <div className={styles['flex-item']}>
                    <span className={styles["text-h3"]}>Проекты</span>
                    <ButtonWhiteComponent
                        clickHandler={() => {
                            navigate(BuilderAdminRoute.builder_admin + "/" + BuilderAdminRoute.project_create);
                        }}
                        title={"Добавить проект"}
                    />
                </div>
                <div className={styles["flex-item"]}>
                    {
                        companySelector.projects && companySelector.projects?.length > 0 && companySelector.projects.map((item) => {
                            if (!item) {
                                return (<></>);
                            }
                            return (
                                <ListItemComponent
                                    column1={item.data.title}
                                    img={(item.data.logo) ? MainApi.main_server + '/' + item.data.logo.replace('\\', '/') : null}
                                    clickHandler={() => {
                                        navigate(
                                            (BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_info),
                                            {
                                                state: {
                                                    ...item
                                                }
                                            }
                                        );
                                    }}
                                />
                            )
                        })
                    }
                </div>
                <div className={styles["flex-item"]}>
                    <span
                        className={"span__text__black-h4"}
                        onClick={getProjectsHandler}
                    >Показать ещё</span>
                </div>
            </div>
            <Space h='4em'/>
        </>
    )
}

export default React.memo(ProjectListPage);