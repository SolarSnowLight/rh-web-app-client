import {utils} from "src/utils/utils";
import {useLayoutEffect, useState} from "react";


/*type PageItems = {
    firstIdx: number,
    lastIdx: number,
    size: number,
    maxSize: number,
}
type Page = {
    prev: Page,
    next: Page,
    number: number,
    numberEnd: number,
    items: PageItems,
    show: ()=>void,
    showMore: (pages?: number)=>void,
}
type Pages = {
    current: Page,
    first: Page,
    last: Page,
    to: (pageNumber: number)=>void,
    items: {
        defaultMaxSize: number,
    }
}
type Items = {
    showMore: (items?: number)=>void
    to: (itemIdx: number)=>void
    firstIdx: number,
    lastIdx: number,
    size: number,
}*/



export type InitialPageProps = {
    maxPageSize?: number | undefined
    itemsSize: number
    initialPage?: undefined | {
        number?: number | undefined
        numberEnd?: number | undefined
        //firstItemIdx?: number | undefined
        //lastItemIdx?: number | undefined
    }
}
export type PagesProps = {
    maxPageSize: number
    itemsSize: number
    maxPageNumber: number
    current: {
        number: number
        numberEnd: number
        firstItemIdx: number
        // if itemsSize = 0 then lastItemIdx = -1
        lastItemIdx: number
        size: number
    }
}
export type PagesActions = {
    prev: ()=>void // jump to previous page
    next: ()=>void // jump to next page
    first: ()=>void // jump to first page
    last: ()=>void // jump to last page
    to: (pageNumber: number)=>void // jump to certain page by page number
    showMore: (pages?: number)=>void // on this page show content of this page + next pages
    //showMoreItems: (items?: number)=>void
}


const getMaxPageSize = (maxPageSize?: number | undefined) =>
    utils.fitRange(1, maxPageSize ?? 10, Number.MAX_SAFE_INTEGER)

const getItemsSize = (itemsSize: number) =>
    utils.fitRange(0, itemsSize, Number.MAX_SAFE_INTEGER)

const computePageProps = (initialPageProps: InitialPageProps): PagesProps => {
    let maxPageSize = utils.fitRange(1, initialPageProps.maxPageSize ?? 10, Number.MAX_SAFE_INTEGER)
    let itemsSize = getItemsSize(initialPageProps.itemsSize)
    let maxPageNumber = Math.ceil(itemsSize/maxPageSize)
    if (maxPageNumber===0) maxPageNumber = 1
    let number = utils.fitRange(1, initialPageProps.initialPage?.number ?? 1, maxPageNumber)
    let numberEnd = utils.fitRange(1, initialPageProps.initialPage?.numberEnd ?? number, maxPageNumber)
    if (numberEnd<number) numberEnd = number
    let firstItemIdx = (number-1)*maxPageSize
    let lastItemIdx = utils.fitRange(-1,(numberEnd-1)*(maxPageSize)+maxPageSize-1,itemsSize-1)
    let size = lastItemIdx - firstItemIdx + 1
    return {
        maxPageSize,
        itemsSize,
        maxPageNumber,
        current: {
            number,
            numberEnd,
            firstItemIdx,
            lastItemIdx,
            size,
        }
    }
}


export const usePages = (initialPageProps: InitialPageProps): readonly [PagesProps, PagesActions] => {

    const [pageProps, setPageProps] = useState(()=>computePageProps(initialPageProps))
    useLayoutEffect(()=>{
        setPageProps({
            ...pageProps,
            maxPageSize: getMaxPageSize(initialPageProps.maxPageSize),
            itemsSize: getItemsSize(initialPageProps.itemsSize),
        })
    },[initialPageProps.maxPageSize, initialPageProps.itemsSize])



    const prev = () => {
        to(utils.prevLooped(1, pageProps.current.number, pageProps.maxPageSize))
    }
    const next = () => {
        to(utils.nextLooped(1, pageProps.current.numberEnd, pageProps.maxPageSize))
    }
    const first = () => {
        to(1)
    }
    const last = () => {
        to(pageProps.maxPageNumber)
    }
    const to = (pageNumber: number|undefined = undefined, pageNumberEnd: number|undefined = undefined) => {
        setPageProps(computePageProps({
            ...pageProps,
            initialPage: {
                number: pageNumber,
                numberEnd: pageNumberEnd,
            }
        }))
    }
    const showMore = (pages: number = 1) => {
        to(pageProps.current.number, pageProps.current.numberEnd+pages)
    }


    return [
        pageProps,
        { prev, next, first, last, to, showMore }
    ] as const
}