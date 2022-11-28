/* Библиотеки */
import React from 'react';
import { Avatar } from '@mui/material';

/* Ресурсы */
import company_logo from 'src/resources/images/company_logo.svg';

/* Стили */
import styles from './ProjectInfo.module.scss';

const ProjectInfo = ({
    logo = company_logo,
    company = "Имя застройщика",
    title = 'Project Name',
    description = `Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.
    Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.
    Группа Аквилон признана системообразующим предприятием России.
    География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.`}) => {

    return (
        <div className={styles["wrapper"]}>
            <div className={styles['flex-container']}>
                <div className={styles['flex-item']}>
                    <Avatar
                        sx={{
                            width: '4.688em',
                            height: '4.688em',
                            border: '1px',
                            borderColor: 'black'
                        }}
                        src={logo}
                    />
                    <div className={styles['flex-subitem']}>
                        <span className={styles['text-project-title']}>{title}</span>
                        <span className={styles['text-project-contact__header']}>{company}</span>
                    </div>
                </div>
                <div className={styles['flex-item']}>
                    <span className='span__text__black '>
                        {description}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProjectInfo);