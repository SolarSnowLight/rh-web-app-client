import React from "react";
import { commonStyled } from "src/styles/commonStyled";
import styled from "styled-components";


export type InfoItemProps = {
    title: string
    items: string[]
}

const InfoItem = React.forwardRef<HTMLDivElement, InfoItemProps & JSX.IntrinsicElements['div']>((
    { title, items, ...props },
    forwardedRef
) => {
    return <Frame ref={forwardedRef as any} {...props}>
        <Title>{title}</Title>
        <ItemsBox>
            { items.map(it=><Item key={it}>{it}</Item>) }
        </ItemsBox>
    </Frame>
})
export default React.memo(InfoItem) as unknown as typeof InfoItem


let Frame = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(300px, 1fr);
  grid-gap: 32px;
  //display: flex;
  //flex-flow: row nowrap;
  //gap: 32px;
  border-bottom: 1px solid #424041;
`
Frame = React.memo(Frame) as unknown as typeof Frame

let Title = styled.div`
  //flex-grow: 1;
  min-width: 200px;
  font: 500 18px var(--font-family-text);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #424041;
  margin-bottom: 8px;
  place-self: end start;
`
Title = React.memo(Title) as unknown as typeof Title

let ItemsBox = styled.div`
  //flex-grow: 1;
  //min-width: 300px;
  ${commonStyled.col};
  gap: 8px;
  margin-bottom: 8px;
  align-items: stretch;
`
ItemsBox = React.memo(ItemsBox) as unknown as typeof ItemsBox

let Item = styled.div`
  font: 500 18px var(--font-family-text);
  letter-spacing: 0.05em;
  color: black;
  display: grid;
  place-items: start;
  &:not(:last-child) {
    border-bottom: 1px solid #8B8B8B;
  }
`
Item = React.memo(Item) as unknown as typeof Item
