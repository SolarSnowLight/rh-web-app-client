import React, {useRef} from 'react'
import css from './ProjectInfoPage.module.scss'
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";
import {toast} from "react-toastify";
import Space from "src/components/Space";
import PersonListItem from "src/components/list-items/PersonListItem/PersonListItem";
import MapComponent from 'src/components/Map/MapComponent';
import { useMedia } from 'src/hooks/useMedia';
import ProjectInfo2 from 'src/components/Company/ProjectInfo2/ProjectInfo2';

import {mockData} from "./mockData";
import ObjectCardList from "src/components/ObjectCardList/ObjectCardList";





const ProjectInfoPage = () => {

    const lowWidth = useMedia('(max-width: 900px)');

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


    return <div className={css.page}>

        <Space h={32}/>

        <div className={css.projectInfoFrame}>
            <ProjectInfo2 projectInfo={mockData.projectInfo}/>
        </div>

        <Space h={!lowWidth ? 64 : 56}/>



        { !lowWidth && <>
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
        { lowWidth && <>
            <div className={css.aboveMapMobile}>
                <div className={css.title}>Объекты проекта на карте</div>
            </div>
            <Space h={8}/>
        </> }

        <div className={css.mapSlide}>
            <MapComponent className={css.map} />
        </div>

        <Space h={!lowWidth ? 24 : 16} />

        <ObjectCardList objects={mockData.objects}/>


        { lowWidth && <>
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



        <Space h={!lowWidth ? 138 : 66}/>



        <div className={css.managersSlide}>
            <div className={css.title}>Менеджеры</div>
            <Space h={24}/>
            <div className={css.list}>
                { mockData.managers.map(it=><PersonListItem key={it.id} client={it} />) }
            </div>
            <Space h={24}/>
            <div className={css.showMore} onClick={onShowMore}>Показать ещё</div>
            <Space h={24}/>
        </div>

        <Space h='4em'/>

    </div>
}
export default React.memo(ProjectInfoPage) as unknown as typeof ProjectInfoPage