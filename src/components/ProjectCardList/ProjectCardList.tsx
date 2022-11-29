import React, {useRef} from 'react'
import css from './ProjectCardList.module.scss'
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar";
import {useScrollbar} from "../HorizontalScrollbar/useScrollbar";
import Space from '../Space';
import ProjectCard, { ProjectInCard } from "../ProjectCard/ProjectCard";


export type ProjectCardListProps = {
    projects: (ProjectInCard & { id: string })[]
}


const ProjectCardList = ({ projects }: ProjectCardListProps) => {

    const objectsContainerRef = useRef<HTMLDivElement>(null)
    const objectsContentRef = useRef<HTMLDivElement>(null)
    const { scrollProps, onContainerScroll, setContainerScroll, canScroll } = useScrollbar(objectsContainerRef, objectsContentRef)


    return <>

        <div ref={objectsContainerRef} className={css.objectsListSlide} onScroll={onContainerScroll}>
            <div ref={objectsContentRef} className={css.contentContainer}>
                { projects.map(it=><ProjectCard key={it.id} project={it}/>) }
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
export default React.memo(ProjectCardList) as unknown as typeof ProjectCardList

