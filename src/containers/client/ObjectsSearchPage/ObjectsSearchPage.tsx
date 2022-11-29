import css from './ObjectsSearchPage.module.scss';
import Space from "src/components/Space/Space";
import React, { useState } from "react";
import RowSelect from "src/components/RowSelect";
import {toast} from "react-toastify";
import {Select, MenuItem, TextField, IconButton, InputAdornment, Autocomplete} from "@mui/material";
import styled from "styled-components";
import { Arrow1DownIc } from 'src/components/icons';
import {SearchIc} from "src/components/icons";
import MapComponent from 'src/components/Map/MapComponent';
import {mockData} from "./mockData";
import ProjectCardList from "src/components/ProjectCardList/ProjectCardList";
import {useMedia} from "src/hooks/useMedia";



const ObjectsSearchPage = () => {

    const lowWidth = useMedia('(max-width: 900px)')

    const [selectedRooms, setSelectedRooms] = useState(['1'])
    const onRoomSelect = (item, isSelected, index) => {
        if (!isSelected) setSelectedRooms([...selectedRooms, item])
        else setSelectedRooms(selectedRooms.filter(it=>it!==item))
    }

    const [sort, setSort] = useState("")
    const onSort = (ev) => {
        setSort(ev.target.value)
    }

    const [costFrom, setCostFrom] = useState(mockData.allCostsFrom.find(it=>it.value===2000000)!)
    const onCostFrom = (ev) => {
        setCostFrom(ev.target.value)
    }

    const [costTo, setCostTo] = useState(mockData.allCostsTo.find(it=>it.value===100000000)!)
    const onCostTo = (ev) => {
        setCostTo(ev.target.value)
    }

    const onFilterApply = () => {
        toast.info('Эта функция ещё не реализована')
    }

    return <div className={css.page}>

        <Space h={33}/>

        <div className={css.mainTitle}>Поиск объекта</div>

        <Space h={88}/>

        <div className={css.fieldsContainer}>

            <div className={css.widgetBox}>
                <div className={css.title}/>
                <Space h={8}/>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={mockData.searchVariants.map(it=>it.value)}
                    renderInput={(params)=><SearchInput1
                        {...params}
                        // @ts-ignore
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />}
                />
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}>Количество комнат</div>
                <Space h={8}/>
                <RowSelect items={mockData.allRooms} selected={selectedRooms} onSelect={onRoomSelect}/>
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}>Стоимость</div>
                <Space h={8}/>
                <div className={css.row}>
                    <Select1
                        sx={{ width: '169px' }}
                        value={costFrom}
                        onChange={onCostFrom}
                    >
                        {
                            // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                            // @ts-ignore
                            mockData.allCostsFrom.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                        }
                    </Select1>
                    <Select1
                        sx={{ width: '194px', marginLeft: '-1px' }}
                        value={costTo}
                        onChange={onCostTo}
                    >
                        {
                            // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                            // @ts-ignore
                            mockData.allCostsTo.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                        }
                    </Select1>
                </div>
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}/>
                <Space h={8}/>
                <Select1
                    displayEmpty
                    value={sort}
                    onChange={onSort}
                    renderValue={(selected: any)=>{
                        if (selected.length===0){
                            return <span data-placeholder-text>Сортировать по</span>
                        }
                        return selected
                    }}
                >
                    <MenuItem value=""><em>По умолчанию</em></MenuItem>
                    { mockData.allSorts.map(it=><MenuItem key={it} value={it}>{it}</MenuItem>) }
                </Select1>
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}/>
                <Space h={8}/>
                <button className={css.apply} onClick={onFilterApply}>Применить фильтр</button>
            </div>


        </div>

        <Space h={56}/>

        <div className={css.mapBox}>
            <MapComponent style={{ width: '100%', height: '100%' }}/>
        </div>

        <Space h={!lowWidth ? 24 : 16} />

        <ProjectCardList projects={mockData.projects}/>

        <Space h={85}/>

    </div>
}
export default React.memo(ObjectsSearchPage) as unknown as typeof ObjectsSearchPage




let Arrow1DownIc1 = styled(Arrow1DownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 11px;
  &.MuiSelect-icon {
    right: 32px; // offset from right
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
  width: 235px; height: 59px;
  background: #F8F8F8;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiSelect-select {
    padding-left: 32px;
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


let SearchInput1 = styled(TextField).attrs(p=>({
    variant: "outlined",
    type: 'text',
    placeholder: "Введите название ЖК или адрес",
    InputProps: {
        ...p.InputProps,
        endAdornment: <InputAdornment position="end">
            <IconButton
                onClick={()=>console.log('search clicked!')}
            >
                <SearchIc mainColor='black' size={24}/>
            </IconButton>
        </InputAdornment>
    },
}))`
  fieldset { // рамка
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiInputBase-root.MuiOutlinedInput-root { // input container
    width: 381px; height: 59px;
    padding-right: 0;
    padding-left: 0;
  }
  .MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input  { // input
    padding-left: 32px;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    &input::placeholder {
      color: #8B8B8B;
    }
  }
  .MuiInputAdornment-root {
    width: fit-content; height: fit-content;
    .MuiButtonBase-root {
      width: fit-content; height: fit-content;
      margin-right: calc(32px - 8px);
    }
  }
`
SearchInput1 = React.memo(SearchInput1) as unknown as typeof SearchInput1
