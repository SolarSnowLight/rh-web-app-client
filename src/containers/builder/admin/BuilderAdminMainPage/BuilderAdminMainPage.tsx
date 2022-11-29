import React, {useEffect, useState} from "react";
import css from './BuilderAdminMainPage.module.scss'
import Space from "src/components/Space";
import {MenuItem} from "@mui/material";
import { toast } from "react-toastify";
import ListItem from "src/components/list-items/PersonListItem/PersonListItem";

import PieDiagram from "./components/PieDiagram/PieDiagram";
import CompanyInfo from "src/components/Company/CompanyInfo/CompanyInfo";

import TileSelect1, {DataElement} from "src/components/TileSelect1/TileSelect1";
import {useTileSelect} from "src/components/TileSelect1/useTileSelect";
import {LegendElement, ListItem2, Select1} from "./components";

// test imports
import {mockData} from "./mockData";
import {usePages} from "../../../../hooks/usePages/usePages";




const BuilderAdminMainPage = () => {

    const { tileData, onSelect } = useTileSelect(mockData.projectsTileSelect)


    const [pieData, setPieData] = useState(mockData.diagramFullData)
    useEffect(()=>{
        let first = true
        const intervalId = setInterval(()=>{
            setPieData(first ? mockData.diagramFullData2 : mockData.diagramFullData)
            first = !first
        }, 3000)
        return ()=>clearInterval(intervalId)
    },[])


    const [project, setProject] = useState({ id: null, name: ''})
    const onProject = (ev) => {
        setProject(ev.target.value)
    }


    const onCreateDeveloper = () => {
        toast.info('Создать застройщика')
    }
    const onShowMore = () => {
        toast.info('Показать ещё')
    }



    return <div className={css.page}>

        <Space h={32.5}/>

        <div className={css.companyInfoFrame}>
            { /* Информация о компании + кнопка чата */}
            <CompanyInfo companyInfo={mockData.companyInfo} viewMode='edit'/>
        </div>

        <Space h={32}/>

        <div className={css.titleFrame}>
            <div className={css.title}>Статистика сделок</div>
        </div>

        <Space h={26} />

        <div className={css.statisticsFrame}>

            <div className={css.listData}>
                <div className={css.infoTitle}>Проекты</div>
                <TileSelect1 dataElements={tileData} onSelect={onSelect}/>
                <div className={css.diagramFrame}>
                    <div className={css.diagramLayout}>
                        <div className={css.diagramContainer}>
                            <div className={css.diagramBox}>
                                <PieDiagram fullData={pieData}/>
                            </div>
                        </div>
                        <div className={css.legendBox}>
                            { pieData.data.map(it=><LegendElement key={it.id} color={it.color} title={it.label}/>) }
                        </div>
                    </div>
                </div>
                <div className={css.list}>
                    { Array(3).fill({ name: 'Тип квартиры', value: 'кол-во сделок' })
                        .map(it=><ListItem2 key={it.name} name={it.name} value={it.value}/>)
                    }
                </div>
            </div>

            <div className={css.listStatisticsContainer}>
                <div className={css.listData}>
                    <div className={css.infoTitle}>Последние сделки</div>
                    <div className={css.list}>
                        { Array(3).fill({ name: 'Менеджер, клиент, тип сделки', value: 'название проекта' })
                            .map(it=><ListItem2 key={it.name} name={it.name} value={it.value}/>)
                        }
                    </div>
                </div>

                <div className={css.listData}>
                    <div className={css.infoTitle}>Статистика по менеджерам</div>
                    <div className={css.list}>
                        { Array(3).fill({ name: 'Менеджер ФИО', value: 'кол-во сделок' })
                            .map(it=><ListItem2 key={it.name} name={it.name} value={it.value}/>)
                        }
                    </div>
                </div>
            </div>

        </div>

        <Space h={64} />



        <div className={css.titleFrame}>
            <div className={css.title}>Статистика сделок</div>
            <div className={css.selectBox}>
                <Select1
                    displayEmpty
                    value={project}
                    onChange={onProject}
                    renderValue={(selected: any)=>{
                        if (selected.id===null){
                            return <span data-placeholder-text>Все проекты</span>
                        }
                        return selected.name
                    }}
                >
                    {/*@ts-ignore*/}
                    <MenuItem value={{ id: null, name: ''}}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    {/*@ts-ignore*/}
                    { mockData.allProjects.map(it=><MenuItem key={it.id} value={it}>{it.name}</MenuItem>) }
                </Select1>
            </div>
        </div>

        <Space h={40} />

        <div className={css.developersListContainer}>
            <div className={css.list}>
                { mockData.developers.map(it=><ListItem key={it.id} client={it} />) }
            </div>
            <Space h={48}/>
            <div className={css.center}>
                <div className={css.showMore} onClick={onShowMore}>Показать ещё</div>
            </div>
        </div>

        <Space h={48} />

    </div>
}
export default React.memo(BuilderAdminMainPage) as unknown as typeof BuilderAdminMainPage

