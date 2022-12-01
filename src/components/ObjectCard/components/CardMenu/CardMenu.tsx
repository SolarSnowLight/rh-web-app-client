import React from 'react'
import css from './CardMenu.module.scss'
import {ReactMemoTyped} from "src/utils/utilsReact"
import Menu from '@mui/material/Menu'
import MenuItem from "@mui/material/MenuItem"
import {empty} from "src/utils/utils";


const cardMenuItems = [
    { id: 'change', title: 'Изменить' },
    { id: 'remove', title: 'Удалить' },
] as const
export type CardMenuItemIds = typeof cardMenuItems[number]['id']

export type CardMenuProps = {
    menuAnchorEl?: HTMLElement | empty
    onClose?: ()=>void | empty
    onSelect?: (id: CardMenuItemIds)=>void | empty
}

const CardMenu = (props: CardMenuProps) => {

    const isOpen = !!props.menuAnchorEl
    const anchor = props.menuAnchorEl ?? null
    const onClose = props.onClose ?? (()=>{})
    const onSelect = props.onSelect ?? (()=>{})


    return <Menu
        id="object-card-menu"
        aria-labelledby="object-card-menu-button"
        anchorEl={anchor}
        open={isOpen}
        onClose={onClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        { cardMenuItems.map(it=>
            <MenuItem key={it.id} onClick={()=>onSelect(it.id)}>{it.title}</MenuItem>)
        }
    </Menu>
}

export default ReactMemoTyped(CardMenu)