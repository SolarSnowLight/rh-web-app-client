import React from "react";
import styled from "styled-components";
import {commonStyled} from "src/styles/commonStyled";


export type ListItemProps = JSX.IntrinsicElements['div'] & {
    item: {
        image?: string|undefined // image url / data-url
        title: string
        info: number|string
    }
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>((
    { item, ...props  },
    forwardedRef
) => {
    return <Container ref={forwardedRef as any} {...props}>
        <Image src={item.image}/>
        <Title>{item.title}</Title>
        <Info>{item.info}</Info>
    </Container>
})
export default React.memo(ListItem) as unknown as typeof ListItem


let Container = styled.div`
  width: 100%; height: 91px;
  ${commonStyled.row};
  column-gap: 16px;
  border-bottom: 1px solid #424041;
`
Container = React.memo(Container) as unknown as typeof Container

let Image = styled.img`
  height: 100%; aspect-ratio: 1;
  object-position: center;
  object-fit: cover;
`
Image = React.memo(Image) as unknown as typeof Image

let Title = styled.div`
  ${commonStyled.centerStart};
  flex-grow: 1;
  font: 500 24px var(--font-family-text);
  color: black;
  letter-spacing: 0.05em;
`
Title = React.memo(Title) as unknown as typeof Title

let Info = styled.div`
  ${commonStyled.centerStart};
  justify-content: end;
  font: 500 18px var(--font-family-text);
  color: #424041;
  letter-spacing: 0.05em;
`
Info = React.memo(Info) as unknown as typeof Info