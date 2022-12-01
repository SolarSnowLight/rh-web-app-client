import React, {useRef, useState} from 'react'
import css from './ObjectCard.module.scss'
import buildingDefault from 'src/resources/images/building-default.png'
import {wordUtils} from "src/utils/wordUtils";
import {useGalleryScrollbar} from "src/components/GalleryHorizontalScrollbar/useGalleryScrollbar";
import GalleryHorizontalScrollbar from "src/components/GalleryHorizontalScrollbar/GalleryHorizontalScrollbar";
import styled from "styled-components";
import Arrow1DownIc from "src/components/icons/Arrow1DownIc";
import {commonStyled} from "src/styles/commonStyled";
import CardMenu, {CardMenuItemIds} from "./components/CardMenu/CardMenu";
import {toast} from "react-toastify";

type empty = null|undefined

export type ObjectInCard = {
    logo?: string|empty // ссылка на лого застройщика
    images?: string[] | empty // массив ссылок на изображения
    name: string
    year?: string|number
    objectsCnt?: number
}
export type ObjectCardProps = {
    object: ObjectInCard
}
const ObjectCard = (props: ObjectCardProps) => {
    const o = { ...props.object }
    o.images ??= [buildingDefault]

    const elementsCnt = o.images.length
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const {
        galleryScrollProps: scrollProps,
        onContainerScroll,
        setContainerScroll,
        scrollToElementByIndex,
        canScroll
    } = useGalleryScrollbar(containerRef, contentRef, elementsCnt)

    const [muiMenuAnchor, setMuiMenuAnchor] = useState(null as HTMLElement | null)
    const showMenu = !!muiMenuAnchor
    const onMenuShow = (ev: React.MouseEvent<HTMLElement>) => {
        setMuiMenuAnchor(ev.currentTarget)
    }
    const onMenuClose = ()=>{
        setMuiMenuAnchor(null)
    }
    const onMenuItemSelect = (id: CardMenuItemIds)=>{
        onMenuClose()
        switch (id){
            case "change":
                toast.info('Изменить')
                break
            case "remove":
                toast.info('Удалить')
                break
        }
    }


    return <div className={css.frame}>

        <div className={css.imagesFrame} ref={containerRef} onScroll={onContainerScroll}>
            <div className={css.contentContainer} ref={contentRef}>
                { o.images.map(it=><div key={it} className={css.imageContainer}>
                    <img className={css.imageBgc} src={it} alt={'Building'}/>
                    <div className={css.blur}/>
                    <img className={css.image} src={it} alt={'Building'}/>
                </div>) }
            </div>
        </div>

        <div className={css.controlElementsContainer}>
            { canScroll && <GalleryHorizontalScrollbar className={css.scroll}
                                        scrollProps={scrollProps}
                                        setContainerScroll={setContainerScroll}
                                        scrollToElementByIndex={scrollToElementByIndex}/> }

            <div className={css.menuBtn} onClick={onMenuShow}
                aria-controls={showMenu ? 'object-card-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={showMenu ? 'true' : undefined}
            >
                <Arrow1DownIc className={css.menuBtnIcon} mainColor='black' />
            </div>
            <CardMenu menuAnchorEl={muiMenuAnchor} onClose={onMenuClose} onSelect={onMenuItemSelect}/>

            {/*<HoverDetectorLeft />
            <ArrowBoxLeft
            //className={css.arrowLeftBox}
            >
                <Arrow1LeftIc1 />
            </ArrowBoxLeft>

            <HoverDetectorRight />
            <ArrowBoxRight className={css.arrowBoxRight}>
                <Arrow1RightIc1 />
            </ArrowBoxRight>*/}
        </div>

        { o.logo && <img className={css.logo} src={o.logo} alt='Builder Logo'/> }

        <div className={css.name}>{o.name}</div>
        { o.year && <div className={css.year}>Сдача {o.year}</div> }
        { o.objectsCnt && <div className={css.count}>{o.objectsCnt} {wordUtils.objectsPlural(o.objectsCnt)}</div> }
    </div>
}
export default React.memo(ObjectCard) as unknown as typeof ObjectCard



/*

let HoverDetectorLeft = styled.div`
  grid-area: left;
  place-self: stretch;
  z-index: 1;
  cursor: pointer;
`
let ArrowBoxLeft = styled.div`
  grid-area: left / left / scroll / left;
  place-self: stretch;
  background: #DEDEDE77;
  z-index: 1;
  ${commonStyled.center};
  pointer-events: none;
  visibility: hidden;
  div:hover + & {
    visibility: visible;
  }
`

let HoverDetectorRight = styled.div`
  grid-area: right;
  place-self: stretch;
  z-index: 1;
  cursor: pointer;
`
let ArrowBoxRight = styled.div`
  visibility: hidden;
  ${HoverDetectorRight}:hover + & {
    visibility: visible;
  }
`


let Arrow1LeftIc1 = styled(Arrow1DownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 16px;
  transform: rotate(90deg);
`
//Arrow1LeftIc1 = React.memo(Arrow1LeftIc1) as unknown as typeof Arrow1LeftIc1


let Arrow1RightIc1 = styled(Arrow1DownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 16px;
  transform: rotate(-90deg);
`
//Arrow1RightIc1 = React.memo(Arrow1RightIc1) as unknown as typeof Arrow1RightIc1

*/
