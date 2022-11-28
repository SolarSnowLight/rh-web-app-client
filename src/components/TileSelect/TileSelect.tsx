import css from './TileSelect.module.scss'
import React from "react";


// generic D is your data
export type DataElementState = {
    isSelected: boolean
}
export type DataElement<D> = {
    data: D
    state: DataElementState
}
export type DataAdapter<D> = {
    getKey: (d: D) => React.Key
    getValue: (d: D) => string|number
}
export type DataUpdater<D> = (fullDataElement: DataElement<D>) => void
export type Tiles<D> = (dataElements: DataElement<D>[]) => React.ReactNode



export type TileSelectProps<D> = {
    dataElements: DataElement<D>[]
    components: Tiles<D>
}
export let TileSelect = <D extends any>(props: TileSelectProps<D>) => {
    return <div className={css.mainFrame}>
        { props.components(props.dataElements) }
    </div>
}
TileSelect = React.memo(TileSelect) as typeof TileSelect
export default TileSelect



export type TileProps<D> = {
    dataElement: DataElement<D>
    dataAdapter: DataAdapter<D>
    onSelect: DataUpdater<D>
}
export let Tile = <D extends any>({ dataElement, dataAdapter, onSelect }: TileProps<D>) => {
    const { getKey, getValue } = dataAdapter
    const { data, state: { isSelected } } = dataElement
    return <div className={css.tile}
                key={getKey(data)}
                onClick={()=>onSelect(dataElement)}
                data-highlighted={isSelected}
    >
        {getValue(data)}
    </div>
}
Tile = React.memo(Tile) as typeof Tile
