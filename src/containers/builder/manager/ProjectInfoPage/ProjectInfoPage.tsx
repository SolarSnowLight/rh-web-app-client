import React, {useRef} from 'react'
import css from './ProjectInfoPage.module.scss'
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";
import {toast} from "react-toastify";
import Space from "src/components/Space";
import {useMediaQuery} from "@mui/material";
import PersonListItem from "src/components/list-items/PersonListItem/PersonListItem";
import MapComponent from 'src/components/Map/MapComponent';
import ObjectCard2 from 'src/components/ObjectCard2/ObjectCard2';
import HorizontalScrollbar from "src/components/HorizontalScrollbar/HorizontalScrollbar";
import {useScrollbar} from "src/hooks/useScrollbar/useScrollbar";


import avaDefault from 'src/resources/images/ava-default.jpg'
import logoDefault from 'src/resources/images/company-logo-default.png'

import buildingExample1 from 'src/resources/images/examples/building-example-1.webp';
import buildingExample2 from 'src/resources/images/examples/building-example-2.webp';
import buildingExample3 from 'src/resources/images/examples/building-example-3.jpg';
import homePage from 'src/resources/images/home_page.jpg';
import imagePlaceholder from 'src/resources/images/image-placeholder.png'
import mainPageBgc from 'src/resources/images/main-page-bgc.jpg'
import neonSunrise from 'src/resources/images/examples/neon-sunrise-web.jpg'
import retrowave1 from 'src/resources/images/examples/retrowave-1.png';
import hotlineMiami2 from 'src/resources/images/examples/wallpaper-Hotline-Miami-2---Wrong-Number2560x1440.jpg';
import needMoreAcidMarkII from 'src/resources/images/examples/need_more_acid_mark_ii.jpg';
import retrowave2 from 'src/resources/images/examples/Retrowave_(2).jpg';
import { useMedia } from 'src/hooks/useMedia';


const projectInfo = {
    logo: logoDefault,
    name: 'Название проекта',
    builder: {
        name: 'Имя застройщика'
    },
    description: 'Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.\n' +
        'Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.\n' +
        'Группа Аквилон признана системообразующим предприятием России. \n' +
        'География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.'
}

const managers = [...Array(7).keys()].map(i=>({
    id: i+'',
    ava: avaDefault,
    fio: 'Иванов Иван Иванович',
    projectsCnt: 2,
    objectCnt: 12,
}))

const objects = [...Array(6).keys()].map(i=>({
    id: i+'',
    builderLogo: logoDefault,
    images: [buildingExample1,buildingExample2,buildingExample3],
    name: 'Название объекта',
    year: 2025,
    objectsCnt: i+1,
}))
objects[0].images = [buildingExample1, buildingExample2, buildingExample3, homePage, imagePlaceholder, mainPageBgc, neonSunrise, retrowave1, hotlineMiami2, needMoreAcidMarkII, retrowave2]
objects[1].images = [buildingExample2]


const ProjectInfoPage = () => {

    const media = useMedia('(max-width: 900px)');

    const onEditProjectInfo = () => {
        toast.info('Редактировать информацию')
    }
    const onShowMore = () => {
        toast.info('Показать ещё')
    }
    const onAddObject = () => {
        toast.info('Добавить объект')
    }
    const onEditObject = () => {
        toast.info('Редактировать объект')
    }

    const objectsContainerRef = useRef<HTMLDivElement>(null)
    const objectsContentRef = useRef<HTMLDivElement>(null)
    const [scrollProps, onContainerScroll, setContainerScroll] = useScrollbar(objectsContainerRef, objectsContentRef)

    return <div className={css.page}>

        <div className={css.mainInfo}>
            <div className={css.container}>
                <div className={css.nameLogoContainer}>
                    <img className={css.logo} src={projectInfo.logo} alt='Project logo'/>
                    <div className={css.name}>{projectInfo.name}</div>
                    <div className={css.builderName}>{projectInfo.builder.name}</div>
                </div>
                <div className={css.projectDescription}>{projectInfo.description}</div>
                <Space h={32}/>
                <ButtonWhite2 style={{ width: '100%' }} onClick={onEditProjectInfo}>
                    Редактировать информацию
                </ButtonWhite2>
            </div>
        </div>

        <Space h={!media ? 64 : 56}/>



        { !media && <>
            <div className={css.aboveMap}>
                <div className={css.title}>Объекты проекта на карте</div>
                <ButtonWhite2 className={css.add} onClick={onAddObject}>
                    Добавить объект
                </ButtonWhite2>
                {/*<ButtonWhite2 className={css.edit} onClick={onEditObject}>
                    Редактировать объект
                </ButtonWhite2>*/}
            </div>
            <Space h={24}/>
        </> }
        { media && <>
            <div className={css.aboveMapMobile}>
                <div className={css.title}>Объекты проекта на карте</div>
            </div>
            <Space h={8}/>
        </> }

        <div className={css.mapSlide}>
            <MapComponent className={css.map} />
        </div>

        <div ref={objectsContainerRef} className={css.objectsListSlide} onScroll={onContainerScroll}>
            <div ref={objectsContentRef} className={css.contentContainer}>
                { objects.map(it=><ObjectCard2 key={it.id} object={it}/>) }
            </div>
        </div>

        <Space h={8}/>

        <div className={css.scrollbarContainer}>
            <HorizontalScrollbar className={css.scroll} scrollProps={scrollProps} setContainerScroll={setContainerScroll} />
        </div>



        { media && <>
            <Space h={18}/>
            <div className={css.belowMapMobile}>
                <ButtonWhite2 className={css.add} onClick={onAddObject}>
                    Добавить объект
                </ButtonWhite2>
                {/*<ButtonWhite2 className={css.edit} onClick={onEditObject}>
                    Редактировать объект
                </ButtonWhite2>*/}
            </div>
        </> }



        <Space h={!media ? 225 : 66}/>



        <div className={css.managersSlide}>
            <div className={css.title}>Менеджеры</div>
            <Space h={24}/>
            <div className={css.list}>
                { managers.map(it=><PersonListItem key={it.id} client={it} />) }
            </div>
            <Space h={24}/>
            <div className={css.showMore} onClick={onShowMore}>Показать ещё</div>
        </div>

    </div>
}
export default React.memo(ProjectInfoPage) as unknown as typeof ProjectInfoPage