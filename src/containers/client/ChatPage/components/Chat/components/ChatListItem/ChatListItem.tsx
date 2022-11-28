import React, {MouseEventHandler} from "react";
import css from './ChatListItem.module.scss'
import styled from "styled-components";
import CheckmarkIc from "src/components/icons/CheckmarkIc";
import DoubleCheckmarkIc from "src/components/icons/DoubleCheckmarkIc";


type ChatListItemProps = {
    info: {
        ava: string // image url
        nick: string
        lastMsg: string
        time: string // todo date-time type
        lastMsgStatus: 'pending'|'sent'|'read'
    }
    onClick?: MouseEventHandler<HTMLDivElement>
}
let ChatListItem = ({ info, onClick=()=>{} }: ChatListItemProps) => {

    return <div className={css.chatListItem} onClick={onClick}>
        <img className={css.ava} src={info.ava} alt='user avatar' />
        <div className={css.nick}>{info.nick}</div>
        <div className={css.msg}>{info.lastMsg}</div>
        <div className={css.checkmarkBox}>
            { info.lastMsgStatus==='sent' && <Checkmark1/> }
            { info.lastMsgStatus==='read' && <DoubleCheckmark1/> }
        </div>
        <div className={css.time}>{info.time}</div>
    </div>
}
ChatListItem = React.memo(ChatListItem) as unknown as typeof ChatListItem
export default ChatListItem


let Checkmark1 = styled(CheckmarkIc).attrs({
    mainColor: 'black', height: 14
})``
Checkmark1 = React.memo(Checkmark1) as unknown as typeof Checkmark1


let DoubleCheckmark1 = styled(DoubleCheckmarkIc).attrs({
    mainColor: 'black', height: 14
})``
DoubleCheckmark1 = React.memo(DoubleCheckmark1) as unknown as typeof DoubleCheckmark1