import styled from "styled-components";
import React from "react";
import {Select} from "@mui/material";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ButtonWhite2 from "src/components/UI-Styled/Button/ButtonWhite2/ButtonWhite2";
import Arrow1DownIc from "src/components/icons/Arrow1DownIc";
import css from './BuilderAdminMainPage.module.scss'
import {ReactMemoTyped} from "../../../../utils/utilsReact";




export let Arrow1DownIc1 = styled(Arrow1DownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 11px;
  &.MuiSelect-icon {
    top: 50%; translate: 0 -50%; // offset from top
    right: 16px; // offset from right
  }
  &.MuiSelect-iconOpen { // icon state when menu is open
    transform: rotate(180deg);
  }
`
Arrow1DownIc1 = ReactMemoTyped(Arrow1DownIc1)

export let Select1 = styled(Select).attrs({
    variant: 'outlined',
    IconComponent: Arrow1DownIc1,
})`
  width: 100%; height: 100%;
  background: #F8F8F8;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiSelect-select {
    padding-left: 16px;
    height: 27px;
    font: 500 18px var(--font-family-text);
    letter-spacing: 0.05em;
    color: black;
    [data-placeholder-text] {
      color: #8B8B8B;
    }
  }
`
Select1 = ReactMemoTyped(Select1)




export let Button1 = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    width: 280px; height: 59px;
  }
`
Button1 = ReactMemoTyped(Button1)

export let Button1White = styled(ButtonWhite2)`
  &.MuiButtonBase-root {
    width: 245px;
  }
`
Button1White = ReactMemoTyped(Button1White)






type ListItem2Props = { name: string, value: string }
export let ListItem2 = ({ name, value }: ListItem2Props)=>{
    return <div className={css.listItemFrame}>
        <div className={css.text}>{name}</div>
        <div className={css.text}>{value}</div>
    </div>
}
ListItem2 = ReactMemoTyped(ListItem2)


type LegendElementProps = { color: string, title: string }
export let LegendElement = ({ color, title }: LegendElementProps)=>{
    return <div className={css.legendElement}>
        <div className={css.indicator} style={{ background: color }}/>
        <div className={css.title}>{title}</div>
    </div>
}
LegendElement = ReactMemoTyped(LegendElement)

