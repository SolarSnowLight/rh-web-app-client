import css from './CompanyPage.module.scss';

import CompanyInfo from 'src/components/Company/CompanyInfo/CompanyInfo';
import MapComponent from 'src/components/Map/MapComponent';
import React, { useState } from 'react';
import Filter from "src/components/Filter/Filter";
import { animated, useSpring } from '@react-spring/web';
import Space from "src/components/Space";
import {mockData} from "./mockData";
import ObjectCardList from "src/components/ObjectCardList/ObjectCardList";
import {useMedia} from "src/hooks/useMedia";


const CompanyPage = () => {

    const lowWidth = useMedia('(max-width: 900px)')

    const [filterVisible, setFilterVisible] = useState(false)
    const styleSpringFilter = useSpring({
        opacity: filterVisible ? 1 : 0,
        y: filterVisible ? 0 : -24
    })


    return <div className={css.page}>

        <Space h={64.5}/>

        <div className={css.companyInfoFrame}>
            <CompanyInfo companyInfo={mockData.companyInfo} viewMode='chat'/>
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

        { !filterVisible && <Space h={32}/> }

        { filterVisible && <>
            <div className={css.filterFrame}>
                <animated.div style={styleSpringFilter}>
                    <Filter/>
                </animated.div>
            </div>
            <Space h={24}/>
        </> }

        <div className={css.mapBox}>
            <MapComponent style={{ width: '100%', height: '100%' }}/>
        </div>

        <Space h={!lowWidth ? 24 : 16} />

        <ObjectCardList objects={mockData.objects}/>

        <Space h='4em'/>

    </div>
}

export default React.memo(CompanyPage) as unknown as typeof CompanyPage