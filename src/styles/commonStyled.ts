import {css} from "styled-components";


const abs = css`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

const absoluteOff = (offset?: string) => css`
  position: absolute;
  ${offsetToPosition(offset)}
`

const allDefault = css`
  all: unset;
  box-sizing: border-box;
  margin: 0;
  background: none;
`

const row = css`
  display: flex;
  flex-flow: row nowrap;
`

const col = css`
  display: flex;
  flex-flow: column nowrap;
`

const center = css`
  display: grid;
  place-items: center;
`
const centerV = css`
  display: grid;
  place-items: center start;
`
const centerStart = centerV



const mobileFullWidth = css`
  @media (max-width: 550px) {
    width: 100%;
  }
`


function offsetToPosition(offset?: string){
    if (offset){
        const parts = offset.trim().split(/\s+/)
        if (parts.length===2)
            return `top: ${parts[0]}; right: ${parts[1]}; bottom: ${parts[0]}; left: ${parts[1]};`
        if (parts.length===4)
            return `top: ${parts[0]}; right: ${parts[1]}; bottom: ${parts[2]}; left: ${parts[3]};`
    }
    return `top: 0; right: 0; bottom: 0; left: 0;`
}


export const commonStyled = {
    abs,
    allDefault,
    row,
    col,
    center,
    centerV,
    centerStart,
    mobileFullWidth,
}