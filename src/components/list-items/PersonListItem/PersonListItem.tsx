import React from "react";
import styled from "styled-components";
import {commonStyled} from "src/styles/commonStyled";


export type PersonListItemProps = JSX.IntrinsicElements['div'] & {
    client: {
        ava?: string|undefined
        fio: string
        projectsCnt: number|string
        objectCnt: number|string
    }
}

const PersonListItem = React.forwardRef<HTMLDivElement, PersonListItemProps>((
    { client, ...props  },
    forwardedRef
) => {
    return <Container ref={forwardedRef as any} {...props}>
        <Image src={client.ava}/>
        <TextDataWrapper>
            <Fio>{client.fio}</Fio>
            <Info>{client.projectsCnt} проекта, {client.objectCnt} объектов</Info>
        </TextDataWrapper>
    </Container>
})
export default React.memo(PersonListItem) as unknown as typeof PersonListItem


let Container = styled.div`
  width: 100%; height: 105px;
  ${commonStyled.row};
  align-items: center;
  padding-left: 8px;
  gap: 16px;
  border-bottom: 1px solid #424041;
`
Container = React.memo(Container) as unknown as typeof Container

let Image = styled.img`
  width: 80px; height: 80px;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
`
Image = React.memo(Image) as unknown as typeof Image

let TextDataWrapper = styled.div`
  display: contents;
  @media (max-width: 550px) {
    ${commonStyled.col};
    gap: 8px;
  } 
`

let Fio = styled.div`
  flex-grow: 1;
  font: 500 24px var(--font-family-text);
  color: black;
  letter-spacing: 0.05em;
`
Fio = React.memo(Fio) as unknown as typeof Fio

let Info = styled.div`
  justify-content: end;
  font: 500 18px var(--font-family-text);
  color: #424041;
  letter-spacing: 0.05em;
`
Info = React.memo(Info) as unknown as typeof Info