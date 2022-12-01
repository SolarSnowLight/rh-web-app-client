import React, { useState, FC } from "react";
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
import { SvgIconTypeMap, SxProps, Theme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { empty } from "src/types/empty";
import styled, { AnyStyledComponent } from "styled-components";

interface IDrawerOptionButtonProps {
    title: string;
    clickHandler: () => void;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
    pl?: number | empty;
}

/**
 * Функциональный компонент кнопки меню навигации
 * @returns {JSX.Element} React-элемент
 */
const DrawerOptionButton: FC<IDrawerOptionButtonProps> = ({title, clickHandler, pl, Icon} : IDrawerOptionButtonProps) => {
    return (
        <ListItemButton
            sx={{
                pl: pl
            }}
            onClick={clickHandler}
        >
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItemButton>
    );
};

export default React.memo(DrawerOptionButton);
