import {DataAdapter, DataElement, Tile, TileSelect} from "src/components/TileSelect/TileSelect";
import React, {useMemo, useState } from "react";




let tileSelectData = Array(10).fill(undefined)
    .map((_,i)=>({ id: `project${i}`, name: `Проект ${i}` }))
let tileSelectDataFull = tileSelectData.map(data=>({ data, state: { isSelected: false } }))
tileSelectDataFull = [
    { data: { id: 'all', name: 'Все' }, state: { isSelected: true } },
    { data: { id: 'nothing', name: 'Ничего' }, state: { isSelected: false } },
    ...tileSelectDataFull
]

type Data = typeof tileSelectData[0]


const dataAdapter: DataAdapter<Data> = {
    getKey: data=>data.id,
    getValue: data=>data.name,
}


const modify = (data: DataElement<Data>, isSelected: boolean) => ({
    ...data, state: { ...data.state, isSelected }
})


const ProjectsSelect = () => {

    const [tileData, setTileData] = useState(tileSelectDataFull)

    const [prev, setPrev] = useState(['project1'] as React.Key[]) // previously selected ids
    const setPrevWrap = () => {
        anySelected && setPrev(tileData.filter(it=>it.state.isSelected).map(it=>key(it.data)))
    }

    const anySelected = useMemo(()=>tileData.some(it=>it.state.isSelected),[tileData])
    const key = useMemo(()=>dataAdapter.getKey,[dataAdapter.getKey])


    const onSelect = (data: DataElement<Data>)=>{
        const id = dataAdapter.getKey(data.data)
        const sel = data.state.isSelected
        if (id==='all' && !sel) {
            setPrevWrap()
            setTileData(tileData.map(it=>{
                if (it.data.id==='nothing') return it
                if (it.data.id==='all') return modify(it,true)
                return modify(it,false)
            }))
        } else if (id==='all' && sel) {
            setTileData(tileData.map(it=>{
                if (it.data.id==='nothing') return it
                if (it.data.id==='all') return modify(it,false)
                return modify(it,prev.includes(it.data.id))
            }))
        } else if (id==='nothing') {
            setPrevWrap()
            if (anySelected) setTileData(tileData.map(it=>{
                if (it.data.id==='nothing') return it
                return modify(it,false)
            }))
            else setTileData(tileData.map(it=>{
                return modify(it,prev.includes(it.data.id))
            }))
        } else setTileData(tileData.map(it=>{
            if (it.data.id==='nothing') return it
            if (it.data.id==='all') return modify(it,false)
            if (it.data.id===id) return modify(it,!it.state.isSelected)
            return it
        }))
    }

    return <TileSelect
        dataElements={tileData}
        components={(fullData=>fullData.map(it=><Tile
                dataElement={it}
                onSelect={onSelect}
                dataAdapter={dataAdapter}
            />)
        )}
    />
}
export default ProjectsSelect