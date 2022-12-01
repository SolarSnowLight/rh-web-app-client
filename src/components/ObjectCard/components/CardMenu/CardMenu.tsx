import React from 'react'
import css from './CardMenu.module.scss'
import {ReactMemoTyped} from "src/utils/utilsReact"
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem"
import {empty} from "src/utils/utils";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';


const cardMenuItems = [
    { id: 'edit', title: 'Изменить' },
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
            <MenuItem key={it.id} onClick={()=>onSelect(it.id)}>
                <ListItemIcon>
                    { it.id==='edit' && <EditIcon fontSize="small" /> }
                    { it.id==='remove' && <ClearIcon fontSize="small" /> }
                </ListItemIcon>
                <Typography variant="inherit">{it.title}</Typography>
            </MenuItem>
        )}
    </Menu>
}

export default ReactMemoTyped(CardMenu)