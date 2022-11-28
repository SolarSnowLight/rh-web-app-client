import React from 'react'
import css from './RowSelect.module.scss'
import classNames from "classnames";

type Item = string|number|boolean|null|undefined

type RowSelectProps<T extends Item> = {
    items?: T[]
    selected?: T[]
    onSelect?: (item: T, isSelected: boolean, index: number) => void
}

const RowSelect = <T extends Item>({
    items = [], selected = [], onSelect = () => {}
}: RowSelectProps<T>) => {
    return <div className={css.frame}>
        {items.map((it, i)=>{
            const strValue = JSON.stringify(it)
            const value = it
            const isSelected = selected.includes(it)
            return <div key={strValue} onClick={()=>onSelect(it,isSelected,i)}
                        className={classNames(css.item, { [css.selected]: isSelected })}>
                <div className={css.text}>{value}</div>
            </div>
        })}
    </div>
}

export default React.memo(RowSelect);