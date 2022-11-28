import React, {useCallback, useLayoutEffect, useState} from "react";
import {GetDimensions} from "src/utils/GetDimensions";


export type UseScrollbarOptions = {

}
export const useScrollbar = (
    containerRef: React.RefObject<HTMLElement>,
    contentRef: React.RefObject<HTMLElement>,
    options: UseScrollbarOptions = { }
) => {


    const [scrollProps, _setScrollProps] = useState({
        clientWidth: 0,
        scrollLeft: 0,
        scrollLeftMax: 0,
        scrollWidth: 0
    })
    const setScrollProps = useCallback((container: HTMLElement) => {
        const dimens = new GetDimensions(container)
        //console.log('container.scrollWidth',container.scrollWidth)
        _setScrollProps({
            clientWidth: dimens.clientWidth,
            scrollLeft: dimens.scrollLeft,
            scrollLeftMax: dimens.scrollLeftMax,
            scrollWidth: dimens.scrollWidth,
        })
    },[])


    useLayoutEffect(()=>{
        const container = containerRef.current!
        const content = contentRef.current!
        const containerResizeObserver = new ResizeObserver((entries)=>{
            //const e = entries[0]
            setScrollProps(container)
            //console.log('containerResize',e)
            //console.log('onresize container.scrollWidth',e.target.scrollWidth)
        })
        containerResizeObserver.observe(container)
        const contentResizeObserver = new ResizeObserver((entries)=>{
            //const e = entries[0]
            setScrollProps(container)
        })
        contentResizeObserver.observe(content)
        setScrollProps(container)
        //console.log('1container',containerRef.current!)
        //console.log('1content',contentRef.current!)
        return ()=>{
            containerResizeObserver.disconnect()
            contentResizeObserver.disconnect()
        }
    },[contentRef.current, contentRef.current, setScrollProps])


    const setContainerScroll = useCallback((scrollLeft: number) => {
        //console.log('scrollLeft', scrollLeft)
        containerRef.current!.scrollTo({ left: scrollLeft })
    },[containerRef.current])

    const onContainerScroll = (ev: React.UIEvent<HTMLElement>) => {
        const container = ev.target as HTMLElement
        setScrollProps(container)
    }

    return [scrollProps, onContainerScroll, setContainerScroll] as const
}