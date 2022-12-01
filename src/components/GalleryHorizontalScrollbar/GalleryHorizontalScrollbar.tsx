import React, {
    useId,
    useImperativeHandle,
    useRef,
} from 'react'
import css from './GalleryHorizontalScrollbar.module.scss'
import classNames from "classnames";
import { ReactMemoTyped } from 'src/utils/utilsReact';



// todo min scrollbar width

// elements in scroll content must be same width and without margins / content-container gaps / paddings

export type GalleryHorizontalScrollbarProps = JSX.IntrinsicElements['div'] & {
    scrollProps: {
        clientWidth: number // container width
        scrollLeft: number // ширина проскроленного контента, который слева за границей контейнера
        scrollLeftMax: number // максимальная ширина проскроленного контента, который слева за границей контейнера
        scrollWidth: number // content width
        elementsCount: number // elements count
        selectedElementIndex: number // index of selected element
    }
    setContainerScroll: (scrollLeft: number)=>void
    scrollToElementByIndex: (i: number)=>void
}
export type GalleryHorizontalScrollbarRef = HTMLDivElement

const GalleryHorizontalScrollbar = React.forwardRef<GalleryHorizontalScrollbarRef, GalleryHorizontalScrollbarProps>((
    { scrollProps, setContainerScroll, scrollToElementByIndex, ...props },
    forawardedRef,
) => {
    const id = useId()

    const trackRef = useRef<GalleryHorizontalScrollbarRef>(null)
    useImperativeHandle(forawardedRef, ()=>trackRef.current!)

    const lenWithGaps = scrollProps.elementsCount*2 - 1

    return <div
        id={`${id}-track`}
        ref={trackRef}
        {...props}
        className={classNames(css.track, props.className)}
    >
        { [...Array(lenWithGaps).keys()].map(i=>{
            if (i%2===0){
                const index = i/2
                return <div
                    key={i}
                    id={`${id}-track-segment`}
                    className={css.trackSegment}
                    onClick={()=>scrollToElementByIndex(index)}
                >
                    <div id={`${id}-thumb-box`} /*ref={thumbBoxRef}*/ className={css.thumbBox}>
                        <div id={`${id}-thumb`}
                             className={css.thumb}
                             data-selected={index===scrollProps.selectedElementIndex}
                        />
                    </div>
                </div>
            } else {
                return <div key={i} id={`${id}-gap`} className={css.gap}/>
            }
        })}
    </div>
})
export default ReactMemoTyped(GalleryHorizontalScrollbar)