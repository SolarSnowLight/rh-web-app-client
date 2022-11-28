import css from './CompanyPage.module.scss';

import CompanyInfo from 'src/components/Company/CompanyInfo/CompanyInfo';
import MapComponent from 'src/components/Map/MapComponent';
import React, { useState } from 'react';
import Filter from "src/components/Filter/Filter";
import { animated, useSpring } from '@react-spring/web';
import Space from "src/components/Space";
import ObjectCard from "src/components/ObjectCard/ObjectCard";

import logoDefault from 'src/resources/images/logo-default.png'
import buildingExample1 from 'src/resources/images/examples/building-example-1.webp'
import buildingExample2 from 'src/resources/images/examples/building-example-2.webp'
import buildingExample3 from 'src/resources/images/examples/building-example-3.jpg'

import companyLogo from 'src/resources/images/company-logo-default.png';



const companyInfo = {
    logo: companyLogo,
    title: 'Company Name',
    email: 'mail@mail.ru',
    link: 'website.www.com',
    phone: '+7129856192857',
    description:
        `Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.
        Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.
        Группа Аквилон признана системообразующим предприятием России.
        География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.`,
}
const buildings = [
    {
        id: 1,
        developerCompanyLogo: logoDefault,
        images: [buildingExample1,buildingExample2,buildingExample3],
        projectName: 'Проект 1',
        year: 2025,
        developer: 'Застройщик 1',
        address: 'ул. Мира 15, 76',
        square: 50,
        price: 10,
    },
    {
        id: 2,
        developerCompanyLogo: logoDefault,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 3,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 4,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 5,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 6,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
]


const CompanyPage = () => {

    const [filterVisible, setFilterVisible] = useState(false)
    const styleSpringFilter = useSpring({
        opacity: filterVisible ? 1 : 0,
        y: filterVisible ? 0 : -24
    })


    return <div className={css.page}>

        <Space h={64.5}/>

        <div className={css.companyInfoFrame}>
            { /* Информация о компании + кнопка чата */}
            <CompanyInfo companyInfo={companyInfo}/>
        </div>

        <Space h={32}/>

        <div className={css.filterTitle}>
            <div
                className={css.title}
                onClick={()=>setFilterVisible(!filterVisible)}
            >
                { filterVisible ? "Скрыть фильтр" : "Фильтр" }
            </div>
        </div>

        <Space h={32}/>

        { filterVisible && <div className={css.filterFrame}>
            <animated.div style={styleSpringFilter}>
                <Filter/>
            </animated.div>
        </div> }

        <Space h={24}/>

        <div className={css.mapBox}>
            <MapComponent style={{ width: '100%', height: '100%' }}/>
        </div>

        <div className={css.objectCardFrame}>
            <div className={css.container}>
                <div className={css.list}>
                    { buildings.map(it=><ObjectCard key={it.id} building={it} />) }
                </div>
            </div>
        </div>

    </div>
}

export default React.memo(CompanyPage) as unknown as typeof CompanyPage