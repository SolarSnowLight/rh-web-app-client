import React, {useState} from "react";
import css from './Filter.module.scss'
import {Autocomplete, IconButton, InputAdornment, MenuItem, Select, TextField} from "@mui/material";
import {toast} from "react-toastify";
import styled from "styled-components";
import { Arrow1DownIc, SearchIc } from "src/components/icons";
import Space from "../Space";
import RowSelect from "../RowSelect";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";





const searchVariants = [{value: 'Иркутск'}, {value: 'Анграск'}]
const allRooms = ['1','2','3','4+']
const allCostsFrom = [{ name: 'от 2млн', value: 2000000 }, { name: 'от 4млн', value: 4000000 }]
const allCostsTo = [{ name: 'до 10млн', value: 10000000 }, { name: 'до 100млн', value: 100000000 }]
const allSorts = ['Стоимость', 'Дата']




const Filter = () => {


    const [selectedRooms, setSelectedRooms] = useState(['1'])
    const onRoomSelect = (item, isSelected, index) => {
        if (!isSelected) setSelectedRooms([...selectedRooms, item])
        else setSelectedRooms(selectedRooms.filter(it=>it!==item))
    }

    const [sort, setSort] = useState("")
    const onSort = (ev) => {
        setSort(ev.target.value)
    }

    const [costFrom, setCostFrom] = useState(allCostsFrom.find(it=>it.value===2000000)!)
    const onCostFrom = (ev) => {
        setCostFrom(ev.target.value)
    }

    const [costTo, setCostTo] = useState(allCostsTo.find(it=>it.value===100000000)!)
    const onCostTo = (ev) => {
        setCostTo(ev.target.value)
    }


    const onFilterApply = () => {
        toast.info('Применить фильтр')
    }
    const onShowAll = () => {
        toast.info('Показать всё')
    }



    return <div className={css.mapFilters}>

        <Autocomplete
            freeSolo
            disableClearable
            options={searchVariants.map(it=>it.value)}
            renderInput={(params)=><SearchInput1
                {...params}
                // @ts-ignore
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
            />}
        />

        <div className={css.widgetBox}>
            <div className={css.title}>Количество комнат</div>
            <Space h={8}/>
            <RowSelect items={allRooms} selected={selectedRooms} onSelect={onRoomSelect}/>
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
                        allCostsFrom.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                    }
                </Select1>
                <Select1
                    sx={{ width: '193px', marginLeft: '-1px' }}
                    value={costTo}
                    onChange={onCostTo}
                >
                    {
                        // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                        // @ts-ignore
                        allCostsTo.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
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
                { allSorts.map(it=><MenuItem key={it} value={it}>{it}</MenuItem>) }
            </Select1>
        </div>

        <Button1 onClick={onFilterApply}>Применить фильтр</Button1>

        <Button1White onClick={onShowAll}>Показать всё</Button1White>

    </div>
}
export default React.memo(Filter) as unknown as typeof Filter





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


let ArrowDownIc1 = styled(Arrow1DownIc).attrs({
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
ArrowDownIc1 = React.memo(ArrowDownIc1) as unknown as typeof ArrowDownIc1

let Select1 = styled(Select).attrs({
    variant: 'outlined',
    IconComponent: ArrowDownIc1,
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



let Button1 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    width: 280px; height: 59px;
  }
`
Button1 = React.memo(Button1) as unknown as typeof Button1

let Button1White = styled(ButtonWhite2)`
  &.MuiButtonBase-root {
    width: 177px; height: 59px;
  }
`
Button1White = React.memo(Button1White) as unknown as typeof Button1White