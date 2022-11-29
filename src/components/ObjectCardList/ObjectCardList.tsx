import React, {useRef} from 'react'
import css from './ObjectCardList.module.scss'
import ObjectCard2, {ObjectInCard} from "../ObjectCard/ObjectCard";
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar";
import {useScrollbar} from "../HorizontalScrollbar/useScrollbar";
import Space from '../Space';


export type ObjectCardListProps = {
    objects: (ObjectInCard & { id: string })[]
}


const ObjectCardList = ({ objects }: ObjectCardListProps) => {

    const objectsContainerRef = useRef<HTMLDivElement>(null)
    const objectsContentRef = useRef<HTMLDivElement>(null)
    const { scrollProps, onContainerScroll, setContainerScroll, canScroll } = useScrollbar(objectsContainerRef, objectsContentRef)


    return <>

        <div ref={objectsContainerRef} className={css.objectsListSlide} onScroll={onContainerScroll}>
            <div ref={objectsContentRef} className={css.contentContainer}>
                { objects.map(it=><ObjectCard2 key={it.id} object={it}/>) }
            </div>
        </div>


        { canScroll && <>
            <Space h={8}/>
            <div className={css.scrollbarContainer}>
                <HorizontalScrollbar
                    className={css.scroll} scrollProps={scrollProps} setContainerScroll={setContainerScroll}
                />
            </div>
        </> }

    </>
}
export default React.memo(ObjectCardList) as unknown as typeof ObjectCardList

