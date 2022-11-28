import React from "react";
import avaDefault from 'src/resources/images/ava-default.jpg'
import css from './ClientList.module.scss'
import ListItem from "src/components/list-items/PersonListItem/PersonListItem";
import Space from "src/components/Space";
import ButtonGreen3 from "src/components/UI-Styled/Button/ButtonGreen3/ButtonGreen3";



const clients = [
    {
        id: 1,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 2,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 3,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 4,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 5,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
]


const ClientList = () => {

    return <div className={css.page}>

        <Space h={98}/>

        <div className={css.buttonsContainer}>
            <ButtonGreen3>Заинтересованные</ButtonGreen3>
            <ButtonGreen3>Заключившие договор</ButtonGreen3>
            <ButtonGreen3>Заключившие договор</ButtonGreen3>
        </div>

        <Space h={89}/>

        <div className={css.list}>
            { clients.map(it=><ListItem key={it.id} client={it} />) }
        </div>

        <Space h={310}/>

    </div>
}
export default React.memo(ClientList) as unknown as typeof ClientList




