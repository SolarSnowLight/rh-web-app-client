import React from 'react'
import css from './ChatPage.module.scss'
import Chat from "./components/Chat";
import {useMedia} from "src/hooks/useMedia";


const ChatPage = () => {

    const mobile = useMedia('(max-width: 900px)')

    return <div className={css.page}>

        { !mobile && <div className={css.titleBox}>
            <div className={css.title}>Чат</div>
        </div> }

        <div className={css.chatFrame}>
            <Chat/>
        </div>

    </div>
}
export default React.memo(ChatPage) as unknown as typeof ChatPage