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
import {InitialPageProps, usePages} from "src/hooks/usePages/usePages";
import {ReactMemoTyped} from "src/utils/utilsReact"

// test imports
import {mockData} from "./mockData";



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


    const [initialDevelopersPagesProps] = useState({ itemsSize: mockData.developers.length })
    const [developersPages, developersActions] = usePages(initialDevelopersPagesProps)
    const [developers, setDevelopers] = useState([] as typeof mockData.developers)
    useEffect(()=>{
        setDevelopers(developers.concat(mockData.developers.slice(
            developersPages.current.firstItemIdx+developers.length,
            developersPages.current.lastItemIdx+1
        )))
    },[developersPages])
    const onShowMore = () => {
        developersActions.showMore()
    }



    const onCreateDeveloper = () => {
        toast.info('Создать застройщика')
    }



    return <div className={css.page}>

        <Space h={32.5}/>

        <div className={css.companyInfoFrame}>
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
                    { mockData.topObjects.map(it=><ListItem2 key={it.id} name={it.name} value={it.value}/>) }
                </div>
            </div>

            <div className={css.listStatisticsContainer}>
                <div className={css.listData}>
                    <div className={css.infoTitle}>Последние сделки</div>
                    <div className={css.list}>
                        { mockData.lastDeals.map(it=><ListItem2 key={it.id} name={it.name} value={it.value}/>) }
                    </div>
                </div>

                <div className={css.listData}>
                    <div className={css.infoTitle}>Статистика по менеджерам</div>
                    <div className={css.list}>
                        { mockData.managerStatistics.map(it=><ListItem2 key={it.id} name={it.name} value={it.value}/>) }
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
                        selected = selected as { id: string|null, name: string }
                        if (selected.id===null){
                            return <span data-placeholder-text>Все проекты</span>
                        }
                        return selected.name
                    }}
                >
                    <MenuItem value={{ id: null, name: ''} as any}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    { mockData.allProjects.map(it=><MenuItem key={it.id} value={it as any}>{it.name}</MenuItem>) }
                </Select1>
            </div>
        </div>

        <Space h={40} />

        <div className={css.developersListContainer}>
            <div className={css.list}>
                { developers.map(it=><ListItem key={it.id} client={it} />) }
            </div>
            <Space h={48}/>
            <div className={css.center}>
                <div className={css.showMore} onClick={onShowMore}
                     aria-disabled={developersPages.itemsSize===developersPages.current.lastItemIdx+1}
                >
                    Показать ещё
                </div>
            </div>
        </div>

        <Space h={48} />

    </div>
}
export default ReactMemoTyped(BuilderAdminMainPage)


