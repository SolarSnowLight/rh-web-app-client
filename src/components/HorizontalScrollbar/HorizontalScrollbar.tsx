import React, {
    useCallback,
    useId,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import css from './HorizontalScrollbar.module.scss'
import classNames from "classnames";
import {GetDimensions} from "src/utils/GetDimensions";
import {utils} from "src/utils/utils";



// todo min scrollbar width

export type HorizontalScrollbarProps = JSX.IntrinsicElements['div'] & {
    scrollProps: {
        clientWidth: number // container width
        scrollLeft: number // ширина проскроленного контента, который слева за границей контейнера
        scrollLeftMax: number // максимальная ширина проскроленного контента, который слева за границей контейнера
        scrollWidth: number // content width
    }
    setContainerScroll: (scrollLeft: number)=>void
}
export type HorizontalScrollbarRef = HTMLDivElement

const HorizontalScrollbar = React.forwardRef<HorizontalScrollbarRef, HorizontalScrollbarProps>((
    { scrollProps, setContainerScroll, ...props },
    forawardedRef,
) => {
    const id = useId()

    const trackRef = useRef<HorizontalScrollbarRef>(null)
    useImperativeHandle(forawardedRef, ()=>trackRef.current!)
    const thumbBoxRef = useRef<HTMLDivElement>(null)


    const [trackProps, _setTrackProps] = useState({ width: 0, clientX: 0, clientY: 0 })
    const setTrackProps = useCallback(() => {
        const track = trackRef.current!
        const d = new GetDimensions(track)
        _setTrackProps({
            width: d.clientWidth,
            clientX: d.left,
            clientY: d.top,
        })
    },[])

    const toTrackScale = useCallback((v: number) => {
        if (scrollProps.scrollWidth===0) return 0
        else return v/scrollProps.scrollWidth*trackProps.width
    },[scrollProps, trackProps])
    const toScrollScale = useCallback((v: number) => {
        if (trackProps.width===0) return 0
        else return v/trackProps.width*scrollProps.scrollWidth
    },[scrollProps, trackProps])

    const thumbBoxProps = useMemo(()=>({
        left: toTrackScale(scrollProps.scrollLeft),
        width: toTrackScale(scrollProps.clientWidth),
    }),[scrollProps,toTrackScale])


    useLayoutEffect(()=>{
        const track = trackRef.current!
        const trackResizeObserver = new ResizeObserver((entries)=>{
            setTrackProps()
        })
        setTrackProps()
        trackResizeObserver.observe(track)
        return ()=>{
            trackResizeObserver.disconnect()
        }
    },[trackRef.current])


    const [dragStart, setDragStart] = useState(undefined as undefined|{ x: number, y: number, scrollLeft: number })
    const onPointerDown = (ev: React.PointerEvent) => {
        //console.log('onPointerDown',ev)
        //if (ev.pointerType==='mouse' && ev.buttons===1)
        if (ev.buttons===1){
            const drag = { x: ev.clientX, y: ev.clientY, scrollLeft: scrollProps.scrollLeft }
            const thumbD = new GetDimensions(thumbBoxRef.current!)
            if (utils.inRange(thumbD.left, drag.x, thumbD.right)) setDragStart(drag)
        }
    }
    useLayoutEffect(()=>{
        if (dragStart){
            // Using css touch-action: none; to prevent browser gesture handling on mobile devices
            const onPointerMove = (ev: PointerEvent)=>{
                if (dragStart && ev.buttons===1){
                    const addScrollLeft = ev.clientX-dragStart.x
                    //console.log('onPointerMove', ev)
                    //console.log('x add', addScrollLeft)
                    const newScrollLeft = dragStart.scrollLeft + addScrollLeft/trackProps.width*scrollProps.scrollWidth
                    setContainerScroll(newScrollLeft)
                }
            }
            const onPointerUpOrCancel = (ev: PointerEvent)=>{
                //console.log('onPointerUpOrCancel', ev)
                setDragStart(undefined)
            }
            document.querySelector('*')!.classList.add(css.noSelect)
            window.addEventListener('pointermove', onPointerMove)
            window.addEventListener('pointerup', onPointerUpOrCancel)
            window.addEventListener('pointercancel', onPointerUpOrCancel)
            return ()=>{
                document.querySelector('*')!.classList.remove(css.noSelect)
                window.removeEventListener('pointermove', onPointerMove)
                window.removeEventListener('pointerup', onPointerUpOrCancel)
                window.removeEventListener('pointercancel', onPointerUpOrCancel)
            }
        } else {
            document.querySelector('*')!.classList.remove(css.noSelect)
        }
    },[dragStart,scrollProps,trackProps])

    const onTrackClick = (ev: React.MouseEvent<HTMLDivElement>) => {
        const evX = ev.clientX
        const thumbD = new GetDimensions(thumbBoxRef.current!)
        if (!utils.inRange(thumbD.left, evX, thumbD.right)){
            const trackD = new GetDimensions(trackRef.current!)
            const newScrollLeft = utils.fitRange(
                0,
                toScrollScale(evX - thumbBoxProps.width/2 - trackD.left),
                scrollProps.scrollLeftMax
            )
            setContainerScroll(newScrollLeft)
        }
    }


    return <div
        id={`${id}-track`}
        ref={trackRef}
        {...props}
        className={classNames(css.track, props.className)}
        onPointerDown={ev=>{onPointerDown(ev); if(props.onPointerDown) props.onPointerDown(ev)}}
        onClick={ev=>{onTrackClick(ev); if(props.onClick) props.onClick(ev)}}
    >
        <div id={`${id}-thumb-box`} ref={thumbBoxRef} className={css.thumbBox} style={{...thumbBoxProps}}>
            <div id={`${id}-thumb`} className={css.thumb}/>
        </div>
    </div>
})
export default React.memo(HorizontalScrollbar)