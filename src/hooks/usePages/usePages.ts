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
        numberEnd?: number | undefined // todo allow use numberEnd or maxItemSize
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
    prev: ()=>void
    next: ()=>void
    to: (pageNumber: number)=>void
    showMore: (pages?: number)=>void
    showMoreItems: (items?: number)=>void
}


const getMaxPageSize = (maxPageSize?: number | undefined) =>
    utils.fitRange(1, maxPageSize ?? 10, Number.MAX_SAFE_INTEGER)

const getItemsSize = (itemsSize: number) =>
    utils.fitRange(0, itemsSize, Number.MAX_SAFE_INTEGER)

const getPageProps = (initialPageProps: InitialPageProps): PagesProps => {
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


export const usePages = (initialPageProps: InitialPageProps) => {

    const [pageProps, setPageProps] = useState(()=>getPageProps(initialPageProps))
    useLayoutEffect(()=>{
        setPageProps({
            ...pageProps,
            maxPageSize: getMaxPageSize(initialPageProps.maxPageSize),
            itemsSize: getItemsSize(initialPageProps.itemsSize),
        })
    },[initialPageProps.maxPageSize, initialPageProps.itemsSize])



    const prev = () => {/*todo*/} // jump to previous page
    const next = () => {/*todo*/} // jump to next page
    const to = (pageNumber: number) => {/*todo*/} // jump to certain page by page number
    const showMore = () => {/*todo*/} // on this page show content of this page + next pages
    const totalItems = 0 /*todo*/ // total items
    const total = 0 /*todo*/ // total pages
    const current = 0 /*todo*/ // current page number
    const currentEnd = 0 /*todo*/ // current page end number inclusive if several pages display in one piece
    const maxSize = 0 /*todo*/ // one page max items count
    const defaultMaxSize = 0 /*todo*/ // default one page max items size
    const size = 0 /*todo*/ // current page items count
    const firstIdx = 0 /*todo*/ // current page first item index
    const lastIdx = 0 /*todo*/ // current page last item index

    return {
        props: pageProps,
        actions: {

        }
    }
}