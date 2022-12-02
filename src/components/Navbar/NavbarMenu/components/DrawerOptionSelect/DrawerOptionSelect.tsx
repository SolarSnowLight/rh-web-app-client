import { useState, FC } from "react";
import styles from "./DrawerOption.module.scss";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { empty } from "src/types/empty";
import styled, { AnyStyledComponent } from "styled-components";
import React from "react";

interface IDrawerOptionSelectProps {
    title: string;
    clickHandler: () => void;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
    items: Array<JSX.Element> | empty;
    pl?: number | empty;
}

/**
 * Элемент меню навигации (Drawer'а), представляющий собой либо список, либо отдельную кнопку
 * @returns 
 */
const DrawerOptionSelect: FC<IDrawerOptionSelectProps> = ({title, clickHandler, items, pl, Icon} : IDrawerOptionSelectProps) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton 
                sx={{
                    pl: pl
                }}
                onClick={handleClick}
            >
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={title} />
                {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            items && items.map((Data) => {
                                return Data;
                            })
                        }
                    </List>
                </Collapse>
        </>
    );
};

export default React.memo(DrawerOptionSelect);
