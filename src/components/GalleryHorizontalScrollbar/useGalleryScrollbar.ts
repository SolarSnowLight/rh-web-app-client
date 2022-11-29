import React, {useCallback, useLayoutEffect, useMemo, useState} from "react";
import {useScrollbar} from "../HorizontalScrollbar/useScrollbar";


export type UseGalleryScrollbarOptions = {

}
export const useGalleryScrollbar = (
    containerRef: React.RefObject<HTMLElement>,
    contentRef: React.RefObject<HTMLElement>,
    elementsCount: number,
    options: UseGalleryScrollbarOptions = { }
) => {

    const { scrollProps, onContainerScroll, setContainerScroll } = useScrollbar(containerRef,contentRef,options)

    const galleryScrollProps = useMemo(()=>{
        const elementW = scrollProps.scrollWidth / elementsCount
        const selectedElementIndex = Math.floor((scrollProps.scrollLeft + elementW/2) / elementW)
        return {
            ...scrollProps,
            elementsCount,
            selectedElementIndex,
        }
    },[scrollProps,elementsCount])


    const [canScroll, setCanScroll] = useState(false)
    useLayoutEffect(()=>{
        setCanScroll(galleryScrollProps.elementsCount>=2)
    },[scrollProps])


    const scrollToElementByIndex = useCallback((i: number) => {
        const elementW = galleryScrollProps.scrollWidth / galleryScrollProps.elementsCount
        setContainerScroll(elementW*i)
    },[galleryScrollProps, setContainerScroll])

    return {
        galleryScrollProps,
        onContainerScroll,
        setContainerScroll,
        scrollToElementByIndex,
        canScroll,
    }
}