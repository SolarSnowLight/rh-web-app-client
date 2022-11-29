import {InitialPageProps, usePages} from "./usePages"
import {act, renderHook} from "@testing-library/react"


describe('usePages',()=>{

    test('itemsSize: 56', ()=>{
        let initialPageProps: InitialPageProps = {
            //maxPageSize: 20,
            itemsSize: 56,
            //initialPage: {
            //    number: 2,
            //    numberEnd: 2,
            //}
        }
        const view = renderHook(()=>usePages(initialPageProps))
        let [page,actions] = view.result.current
        //console.log(JSON.stringify(pages, null, '    '))
        expect(page).toStrictEqual({
            maxPageSize: 10,
            itemsSize: 56,
            maxPageNumber: 6,
            current: {
                number: 1,
                numberEnd: 1,
                firstItemIdx: 0,
                lastItemIdx: 9,
                size: 10,
            }
        })
    })

    test('itemsSize: 7', ()=>{
        let initialPageProps: InitialPageProps = {
            //maxPageSize: 20,
            itemsSize: 7,
            //initialPage: {
                //number: 2,
                //numberEnd: 2,
            //}
        }
        const view = renderHook(()=>usePages(initialPageProps))
        let [page,actions] = view.result.current
        //console.log(JSON.stringify(pages, null, '    '))
        expect(page).toStrictEqual({
            maxPageSize: 10,
            itemsSize: 7,
            maxPageNumber: 1,
            current: {
                number: 1,
                numberEnd: 1,
                firstItemIdx: 0,
                lastItemIdx: 6,
                size: 7,
            }
        })
    })

    test('itemsSize: 0', ()=>{
        let initialPageProps: InitialPageProps = {
            //maxPageSize: 20,
            itemsSize: 0,
            //initialPage: {
            //number: 2,
            //numberEnd: 2,
            //}
        }
        const view = renderHook(()=>usePages(initialPageProps))
        let [page,actions] = view.result.current
        //console.log(JSON.stringify(pages, null, '    '))
        expect(page).toStrictEqual({
            maxPageSize: 10,
            itemsSize: 0,
            maxPageNumber: 1,
            current: {
                number: 1,
                numberEnd: 1,
                firstItemIdx: 0,
                lastItemIdx: -1,
                size: 0,
            }
        })
    })

    test('maxPageSize: 13, itemsSize: 67, initialPage: { number: 2, numberEnd: 5 }', ()=>{
        let initialPageProps: InitialPageProps = {
            maxPageSize: 13,
            itemsSize: 67,
            initialPage: {
                number: 2,
                numberEnd: 5,
            }
        }
        const view = renderHook(()=>usePages(initialPageProps))
        let [page,actions] = view.result.current
        //console.log(JSON.stringify(pages, null, '    '))
        expect(page).toStrictEqual({
            maxPageSize: 13,
            itemsSize: 67,
            maxPageNumber: 6,
            current: {
                number: 2,
                numberEnd: 5,
                firstItemIdx: 13,
                lastItemIdx: 64,
                size: 52,
            }
        })
    })

    /*describe('maxPageSize: 13, itemsSize: 67, initialPage: { number: 2, numberEnd: 5 }',()=>{
        let initialPageProps: InitialPageProps = {
            maxPageSize: 13,
            itemsSize: 67,
            initialPage: {
                number: 2,
                numberEnd: 5,
            }
        }
        const view = renderHook(()=>usePages(initialPageProps))
        const result = view.result

        test('check initial',()=>{
            let [page,actions] = result.current
            expect(page).toStrictEqual({
                maxPageSize: 13,
                itemsSize: 67,
                maxPageNumber: 6,
                current: {
                    number: 2,
                    numberEnd: 5,
                    firstItemIdx: 13,
                    lastItemIdx: 64,
                    size: 52,
                }
            })
        })

        test('next()',()=>{
            {
                let [page,actions] = result.current
                // todo act doesn't work
                act(()=>actions.next())
            }
            let [page,actions] = result.current
            expect(page).toStrictEqual({
                maxPageSize: 13,
                itemsSize: 67,
                maxPageNumber: 6,
                current: {
                    number: 6,
                    numberEnd: 6,
                    firstItemIdx: 65,
                    lastItemIdx: 67,
                    size: 3,
                }
            })
        })
    })*/

})

