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
        <Fio>{client.fio}</Fio>
        <Info>{client.projectsCnt} проекта, {client.objectCnt} объектов</Info>
    </Container>
})
export default React.memo(PersonListItem) as unknown as typeof PersonListItem


let Container = styled.div`
  width: 100%; height: 91px;
  ${commonStyled.row};
  column-gap: 16px;
  border-bottom: 1px solid #424041;
`
Container = React.memo(Container) as unknown as typeof Container

let Image = styled.div<{ src?: string|undefined }>`
  height: 100%; aspect-ratio: 1;
  background-image: url(${p=>p.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
Image = React.memo(Image) as unknown as typeof Image

let Fio = styled.div`
  ${commonStyled.centerV};
  flex-grow: 1;
  font: 500 24px var(--font-family-text);
  color: black;
  letter-spacing: 0.05em;
`
Fio = React.memo(Fio) as unknown as typeof Fio

let Info = styled.div`
  ${commonStyled.centerV};
  justify-content: end;
  font: 500 18px var(--font-family-text);
  color: #424041;
  letter-spacing: 0.05em;
`
Info = React.memo(Info) as unknown as typeof Info