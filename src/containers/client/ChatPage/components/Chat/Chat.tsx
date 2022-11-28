import React, {useState, useMemo} from "react"
import css from './Chat.module.scss'
import {Autocomplete} from "@mui/material";
import SearchInput1 from "./components/SearchInput1/SearchInput1";
import avaDefault from 'src/resources/images/ava-default.jpg'
import ChatListItem from "./components/ChatListItem/ChatListItem";
import styled from "styled-components";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import {toast} from "react-toastify";
import ClipIc from "src/components/icons/ClipIc";
import Plane1Ic from "src/components/icons/Plane1Ic";
import {commonStyled} from "src/styles/commonStyled";
import Arrow2ForwardIc from "src/components/icons/Arrow2ForwardIc";
import Space from "src/components/Space";
import {useMedia} from "src/hooks/useMedia";



const searchVariants = [{value: 'Nick1'}, {value: 'Nick2'}]
const chatListItems = [...Array(6).keys()].map(i=>({
    id: i+'',
    ava: avaDefault, // image url
    nick: 'Никнейм'+(i+1),
    lastMsg: 'Последнее сообщение...',
    time: '04:19', // todo date-time type
    lastMsgStatus: (['pending','sent','read'] as const)[i%3],
}))
const hasMessages = false


const Chat = () => {

    const mobile = useMedia('(max-width: 900px)')

    // selected chat
    const [selectedId, setSelectedId] = useState(undefined as string|undefined)
    const selected = useMemo(
        ()=>chatListItems.find(it=>it.id===selectedId),[selectedId,chatListItems]
    )

    const onCheckTheStatusOfConstruction = () => {
        toast.info('Узнать состояние строительства')
    }
    const onCheckTheAvailabilityOfApartments = () => {
        toast.info('Узнать наличие квартир')
    }
    const onFindOutAboutProfitableOffersOnTheProject = () => {
        toast.info('Узнать о выгодных предложениях на проекте')
    }

    const onAttachSomething = () => {
        toast.info('Прикрепить что-нибудь')
    }
    const onSend = () => {
        toast.info('Отправить')
    }

    return <div className={css.chat}>

        { !(mobile && selectedId) && <div className={css.dialogsFrame}>

            { mobile && <div className={css.titleBox}>
                <div>Чаты</div>
            </div>}

            <div className={css.searchBox}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={searchVariants.map(it=>it.value)}
                    // @ts-ignore
                    renderInput={(params)=><SearchInput1
                        // @ts-ignore
                        {...params}
                        // @ts-ignore
                        InputProps={{
                            // @ts-ignore
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />}
                />
            </div>

            <div className={css.chatList}>
                { chatListItems.map(it=><ChatListItem
                    key={it.id}
                    info={it}
                    onClick={()=>setSelectedId(it.id)}
                />) }
            </div>

        </div> }

        { !(mobile && !selectedId) && <div className={css.messagesFrame}>

            { !selected && <div className={css.selectAChatBox}>
                <div>Выберите чат ...</div>
            </div> }

            { selected && <>

                { mobile && <div className={css.topBar}>
                    <div className={css.arrowBox} onClick={()=>setSelectedId(undefined)}>
                        <ArrowBack/>
                    </div>
                    <div className={css.nickBox}>
                        <div>{selected.nick}</div>
                    </div>
                    <Space w={40}/>
                </div> }
                { !mobile && <div className={css.nickBox}>
                    <div>{selected.nick}</div>
                </div> }

                { !hasMessages && <div className={css.actionButtons}>
                    <Btn onClick={onCheckTheStatusOfConstruction}>
                        Узнать состояние строительства
                    </Btn>
                    <Btn onClick={onCheckTheAvailabilityOfApartments}>
                        Узнать наличие квартир
                    </Btn>
                    <Btn onClick={onFindOutAboutProfitableOffersOnTheProject}>
                        Узнать о выгодных предложениях на проекте
                    </Btn>
                </div> }

                <div className={css.msgInputFrame}>

                    <div className={css.clipBox} onClick={onAttachSomething}>
                        <Clip/>
                    </div>

                    <input className={css.input} placeholder='Написать сообщение ...'/>

                    <div className={css.sendBox} onClick={onSend}>
                        <Plane/>
                    </div>

                </div>

            </> }

        </div> }

    </div>
}
export default React.memo(Chat) as unknown as typeof Chat




let Btn = styled(ButtonGreen2)`
  &.MuiButtonBase-root {
    width: 431px;
    ${commonStyled.mobileFullWidth};
    background-color: transparent;
    border: 1px solid #8B8B8B;
    color: #8B8B8B;
    :hover {
      background-color: transparent;
    }
  }
`
Btn = React.memo(Btn) as unknown as typeof Btn


let Clip = styled(ClipIc).attrs({
    mainColor: '#8B8B8B'
})`
  height: 23px;
`
Clip = React.memo(Clip) as unknown as typeof Clip


let Plane = styled(Plane1Ic).attrs({
    mainColor: '#8B8B8B'
})`
  height: 23px;
`
Plane = React.memo(Plane) as unknown as typeof Plane


let ArrowBack = styled(Arrow2ForwardIc).attrs({
    mainColor: 'black', size: 20
})`
  transform: rotate(180deg);
`
ArrowBack = React.memo(ArrowBack) as unknown as typeof ArrowBack








