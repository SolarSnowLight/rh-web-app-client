import React, {useMemo, useState} from "react";
import {Data, DataElement} from "./TileSelect1";






const select = (data: DataElement, isSelected: boolean) => ({
    ...data, state: { ...data.state, isSelected }
})





export const useTileSelect = (data: DataElement[]) => {

    const [tileData, setTileData] = useState(data)

    const [simpleIdsBackup, setSimpleIdsBackup] = useState(()=>
        data.filter(it=>it.data.id.type==='single' && it.state.isSelected).map(it=>it.data.id.id)
    )

    const onSelect = (d: DataElement) => {
        const { id, type } = d.data.id

        if (type==='special'){
            if (id==='all') {
                // todo
                //  save selected ids (if 'nothing'/'all' weren't selected)
                //  deselect all single ids and 'nothing'/'all'
                //  select 'all'
                const allSelected = d.state.isSelected
                const nothingSelected = tileData.some(it=>
                    it.data.id.type==='special' && ['nothing'].includes(it.data.id.id) && it.state.isSelected
                )
                if (!allSelected){
                    if (!nothingSelected){
                        setSimpleIdsBackup(tileData.filter(it=>it.data.id.type==='single' && it.state.isSelected).map(it=>it.data.id.id))
                    }
                    setTileData(tileData.map(it=>{
                        if (it.data.id.type==='single' && it.state.isSelected)
                            return select(it,false)
                        if (it.data.id.type==='special' && it.data.id.id==='nothing' && it.state.isSelected)
                            return select(it,false)
                        if (it.data.id.type==='special' && it.data.id.id==='all')
                            return select(it,true)
                        return it
                    }))
                } else {
                    setTileData(tileData.map(it=>{
                        if (it.data.id.type==='single' && it.state.isSelected!==simpleIdsBackup.includes(it.data.id.id))
                            return select(it,!it.state.isSelected)
                        if (it.data.id.type==='special' && it.data.id.id==='nothing' && it.state.isSelected)
                            return select(it,false)
                        if (it.data.id.type==='special' && it.data.id.id==='all')
                            return select(it,false)
                        return it
                    }))
                }
            } else if (id==='nothing'){
                // todo
                //  save selected ids (if 'all'/'nothing' weren't selected)
                //  deselect all single ids and 'all'/'nothing'
                //  select 'nothing'
                const allSelected = tileData.some(it=>
                    it.data.id.type==='special' && ['all'].includes(it.data.id.id) && it.state.isSelected
                )
                const nothingSelected = d.state.isSelected
                if (!nothingSelected){
                    if (!allSelected){
                        setSimpleIdsBackup(tileData.filter(it=>it.data.id.type==='single' && it.state.isSelected).map(it=>it.data.id.id))
                    }
                    setTileData(tileData.map(it=>{
                        if (it.data.id.type==='single' && it.state.isSelected)
                            return select(it,false)
                        if (it.data.id.type==='special' && it.data.id.id==='nothing')
                            return select(it,true)
                        if (it.data.id.type==='special' && it.data.id.id==='all' && it.state.isSelected)
                            return select(it,false)
                        return it
                    }))
                } else {
                    setTileData(tileData.map(it=>{
                        if (it.data.id.type==='single' && it.state.isSelected!==simpleIdsBackup.includes(it.data.id.id))
                            return select(it,!it.state.isSelected)
                        if (it.data.id.type==='special' && it.data.id.id==='nothing')
                            return select(it,false)
                        if (it.data.id.type==='special' && it.data.id.id==='all' && it.state.isSelected)
                            return select(it,false)
                        return it
                    }))
                }
            }
        } else if (type==='single'){
            // todo
            //  deselect 'all' and 'nothing'
            //  add/remove selected id to selected ids
            setTileData(tileData.map(it=>{
                if (it.data.id.type==='special' && it.data.id.id==='all' && it.state.isSelected)
                    return select(it,false)
                if (it.data.id.type==='special' && it.data.id.id==='nothing' && it.state.isSelected)
                    return select(it,false)
                if (d.data.id.id===it.data.id.id)
                    return select(it,!it.state.isSelected)
                return it
            }))
        }
    }


    return { tileData, onSelect }
}



/*

    // old data:

    let tileSelectData = Array(10).fill(undefined)
        .map((_,i)=>({ id: `project${i}`, name: `Проект ${i}` }))
    let tileSelectDataFull = tileSelectData.map(data=>({ data, state: { isSelected: false } }))
    tileSelectDataFull = [
        { data: { id: 'all', name: 'Все' }, state: { isSelected: true } },
        { data: { id: 'nothing', name: 'Ничего' }, state: { isSelected: false } },
        ...tileSelectDataFull
    ]

    type Data = typeof tileSelectData[0]

    const key = (d: DataElement) => d.data.id.id+d.data.id.type

    const dataAdapter: DataAdapter<Data> = {
        getKey: data=>data.id,
        getValue: data=>data.name,
    }



    // old onSelect:


    const [prev, _setPrev] = useState(['project1'] as React.Key[]) // previously selected ids
    const setPrev = () => {
        anySelected && _setPrev(tileData.filter(it=>it.state.isSelected).map(it=>key(it.data)))
    }

    const anySelected = useMemo(()=>tileData.some(it=>it.state.isSelected),[tileData])


    const onSelect = (data: DataElement)=>{
        const id = key(data)
        const sel = data.state.isSelected
        if (id==='all' && !sel) {
            setPrev()
            setTileData(tileData.map(it=>{
                if (it.data.id==='nothing') return it
                if (it.data.id==='all') return select(it,true)
                return select(it,false)
            }))
        } else if (id==='all' && sel) {
            setTileData(tileData.map(it=>{
                if (it.data.id==='nothing') return it
                if (it.data.id==='all') return select(it,false)
                return select(it,prev.includes(it.data.id))
            }))
        } else if (id==='nothing') {
            setPrev()
            if (anySelected) setTileData(tileData.map(it=>{
                if (it.data.id==='nothing') return it
                return select(it,false)
            }))
            else setTileData(tileData.map(it=>{
                return select(it,prev.includes(it.data.id))
            }))
        } else setTileData(tileData.map(it=>{
            if (it.data.id==='nothing') return it
            if (it.data.id==='all') return select(it,false)
            if (it.data.id===id) return select(it,!it.state.isSelected)
            return it
        }))
    }


 */

