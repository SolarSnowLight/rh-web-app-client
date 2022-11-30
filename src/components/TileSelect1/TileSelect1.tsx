import css from './TileSelect1.module.scss'
import React from "react"



export type DataId = {
    id: string
    type: 'single'|'special'
}
export type Data = {
    id: DataId
    value: string
}
export type DataElementState = {
    isSelected: boolean
}
export type DataUpdater = (DataElement: DataElement) => void
export type DataElement = {
    data: Data
    state: DataElementState
}



export type TileSelect1Props = {
    dataElements: DataElement[]
    onSelect: DataUpdater
}
export let TileSelect1 = <D extends any>(props: TileSelect1Props) => {
    return <div className={css.mainFrame}>
        { props.dataElements.map(it=><Tile1
            key={it.data.id.id+it.data.id.type}
            dataElement={it}
            onSelect={props.onSelect}
        />) }
    </div>
}
TileSelect1 = React.memo(TileSelect1) as unknown as typeof TileSelect1
export default TileSelect1



export type Tile1Props = {
    dataElement: DataElement
    onSelect: DataUpdater
}
export let Tile1 = <D extends any>({ dataElement, onSelect }: Tile1Props) => {
    const { data, state } = dataElement
    return <div className={css.tile}
                onClick={()=>onSelect(dataElement)}
                data-highlighted={state.isSelected}
    >
        {data.value}
    </div>
}
Tile1 = React.memo(Tile1) as unknown as typeof Tile1



