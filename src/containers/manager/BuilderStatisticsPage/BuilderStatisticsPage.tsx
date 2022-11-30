import React, {useEffect, useState} from "react";
import css from './BuilderStatisticsPage.module.scss'
import Space from "src/components/Space";
import {MenuItem, Select} from "@mui/material";
import styled from "styled-components";
import {Arrow1DownIc} from "src/components/icons";
import { toast } from "react-toastify";
import ListItem from "src/components/list-items/PersonListItem/PersonListItem";

import avaDefault from 'src/resources/images/ava-default.jpg'
import PieDiagram, {FullData} from "./components/PieDiagram/PieDiagram";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";
import {mockData} from "./mockData";
import {useTileSelect} from "src/components/TileSelect1/useTileSelect";
import TileSelect1 from "src/components/TileSelect1/TileSelect1";
import {usePages} from "../../../hooks/usePages/usePages";







const BuilderStatisticsPage = () => {
    const [developer, setDeveloper] = useState({ id: null, name: ''})
    const onDeveloper = (ev) => {
        setDeveloper(ev.target.value)
    }

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


    const onCreateDeveloper = () => {
        toast.info('Создать застройщика')
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



    return <div className={css.page}>

        <Space h={22.5} />

        <div className={css.titleFrame}>
            <div className={css.title}>Статистика застройщиков</div>
            <div className={css.selectBox}>
                <Select1
                    displayEmpty
                    value={developer}
                    onChange={onDeveloper}
                    renderValue={(selected: any)=>{
                        selected = selected as { id: string|null, name: string }
                        if (selected.id===null){
                            return <span data-placeholder-text>Застройщик</span>
                        }
                        return selected.name
                    }}
                >
                    <MenuItem value={{ id: null, name: ''} as any}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    { mockData.developersToSelect.map(it=><MenuItem key={it.id} value={it as any}>{it.name}</MenuItem>) }
                </Select1>
            </div>
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
                    { mockData.apartmentTypes.map(it=><ListItem2 key={it.id} name={it.name} value={it.value}/>) }
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

        <div className={css.developersTitleContainer}>
            <div className={css.title}>Застройщики</div>
            <Button1White onClick={onCreateDeveloper}>Создать застройщика</Button1White>
        </div>

        <Space h={40} />

        <div className={css.developersListContainer}>
            <div className={css.list}>
                { developers.map(it=><ListItem key={it.id} client={it} />) }
            </div>
            <Space h={24}/>
            <div className={css.center}>
                <div className={css.showMore} onClick={onShowMore}
                     aria-disabled={developersPages.itemsSize===developersPages.current.lastItemIdx+1}
                >
                    Показать ещё
                </div>
            </div>
        </div>

        <Space h={64} />

    </div>
}
export default React.memo(BuilderStatisticsPage) as unknown as typeof BuilderStatisticsPage




let Arrow1DownIc1 = styled(Arrow1DownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 11px;
  &.MuiSelect-icon {
    right: 16px; // offset from right
  }
  &.MuiSelect-iconOpen { // icon state when menu is open
    transform: rotate(180deg);
  }
`
Arrow1DownIc1 = React.memo(Arrow1DownIc1) as unknown as typeof Arrow1DownIc1

let Select1 = styled(Select).attrs({
    variant: 'outlined',
    IconComponent: Arrow1DownIc1,
})`
  width: 100%; height: 100%;
  background: #F8F8F8;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiSelect-select {
    padding-left: 16px;
    height: 27px;
    font: 500 18px var(--font-family-text);
    letter-spacing: 0.05em;
    color: black;
    [data-placeholder-text] {
      color: #8B8B8B;
    }
  }
`
Select1 = React.memo(Select1) as unknown as typeof Select1




let Button1 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    width: 280px; height: 59px;
  }
`
Button1 = React.memo(Button1) as unknown as typeof Button1

let Button1White = styled(ButtonWhite2)`
  &.MuiButtonBase-root {
    width: 245px;
  }
`
Button1White = React.memo(Button1White) as unknown as typeof Button1White






type ListItem2Props = { name: string, value: string }
let ListItem2 = ({ name, value }: ListItem2Props)=>{
    return <div className={css.listItemFrame}>
        <div className={css.text}>{name}</div>
        <div className={css.text}>{value}</div>
    </div>
}
ListItem2 = React.memo(ListItem2) as unknown as typeof ListItem2


type LegendElementProps = { color: string, title: string }
let LegendElement = ({ color, title }: LegendElementProps)=>{
    return <div className={css.legendElement}>
        <div className={css.indicator} style={{ background: color }}/>
        <div className={css.title}>{title}</div>
    </div>
}
LegendElement = React.memo(LegendElement) as unknown as typeof LegendElement