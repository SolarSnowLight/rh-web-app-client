import React, {forwardRef, useEffect, useState} from "react";
import styled from "styled-components";
import {commonStyled} from "src/styles/commonStyled";



export type Floor = {
    number: number
    firstFlatNumber: number
    lastFlatNumber: number
}
export type Flat = {
    number: number
    floor: number
    state: 'free'|'promotions'|'reserve'|'sold'|'na'
}



type FlatsTableProps = {
    floors: Floor[]
    flats: Flat[]
}

const FlatsTable = React.forwardRef<HTMLDivElement, FlatsTableProps & JSX.IntrinsicElements['div']>((
    { floors, flats, ...props },
    forwardedRef
) => {
    return <Floors ref={forwardedRef as any} {...props}>
        { floors.map(f=>
            <FloorContainer key={f.number}>
                <FloorLabel><big>{f.number}</big>этаж</FloorLabel>
                <FloorFlats floor={f} flats={flats}/>
            </FloorContainer>
        ) }
    </Floors>
})
export default React.memo(FlatsTable) as unknown as typeof FlatsTable



type FloorsProps = {
    floor: Floor
    flats: Flat[]
}
const FloorFlats = React.memo(({ floor, flats }: FloorsProps) => {

    const [flats2, setFlats2] = useState(undefined as Flat[] | undefined)
    useEffect(()=>{
        const floorFlats = flats.filter(it=>it.floor===floor.number)
        const flats2 = [] as Flat[]
        for (let i = floor.firstFlatNumber; i <= floor.lastFlatNumber; i++) {
            let flat = floorFlats.find(it=>it.number===i)
            flat ??= { number: i, floor: floor.number, state: 'na' }
            flats2.push(flat)
            setFlats2(flats2)
        }
    },[floor,flats])

    return <Flats>
        { flats2?.map(it=><FlatElem key={it.number} data-state={it.state}>{it.number}</FlatElem>) }
    </Flats>
})




let Floors = styled.div`
  ${commonStyled.col};

  position: relative;
  &::before{
    content:'';
    ${commonStyled.abs};
    pointer-events: none;
    border: 1px solid #424041;
  }
  padding: 1px 0 0 1px;
`
Floors = React.memo(Floors) as unknown as typeof Floors

let FloorContainer = styled.div`
  ${commonStyled.row};

  position: relative;
  &::before{
    content:'';
    ${commonStyled.abs};
    pointer-events: none;
    border: 1px solid #424041;
  }
  margin: -1px 0 0 -1px;
  padding: 1px 0 0 1px;
`
FloorContainer = React.memo(FloorContainer) as unknown as typeof FloorContainer


let FloorLabel = styled.div`
  display: grid;
  place-content: center;
  align-items: center;
  grid-auto-flow: column;
  background: #F8F8F8;
  box-sizing: content-box;
  min-height: 48px;
  width: 95px;
  font: 400 16px var(--font-family-text);
  letter-spacing: 0.055em;
  color: #DCDCDC;
  big {
    line-height: 48px;
    font-weight: 900;
    font-size: 48px;
  }

  position: relative;
  &::before{
    content:'';
    ${commonStyled.abs};
    pointer-events: none;
    border: 1px solid #424041;
  }
  margin: -1px 0 0 -1px;
`
FloorLabel = React.memo(FloorLabel) as unknown as typeof FloorLabel


let Flats = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-auto-rows: auto;
  place-items: stretch;
  
  position: relative;
  &::before{
    content:'';
    ${commonStyled.abs};
    pointer-events: none;
    border: 1px solid #424041;
  }
  padding: 1px 0 0 1px;
  margin: -1px 0 0 -1px;
`
Flats = React.memo(Flats) as unknown as typeof Flats

let FlatElem = styled.div`
  width: 48px;
  height: 50px;
  ${commonStyled.center};
  background: #f8f8f8;
  font: 500 18px var(--font-family-text);
  letter-spacing: 0.05em;
  color: black;


  position: relative;
  &::before{
    content:'';
    ${commonStyled.abs};
    pointer-events: none;
    border: 1px solid #424041;
  }
  margin: -1px 0 0 -1px;
  
  &[data-state=free]{
    background: #B4EFA6;
  }
  &[data-state=promotions]{
    background: #EFA6A6;
  }
  &[data-state=reserve]{
    background: #A6E2EF;
  }
  &[data-state=sold]{
    
  }
  &[data-state=na]{
    background: #e9e9e9;
    color: #999999;
  }
`
FlatElem = React.memo(FlatElem) as unknown as typeof FlatElem