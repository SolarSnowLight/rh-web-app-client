

/*
    viewport(V)

    top(t) left(l) bottom(b) right(r)
    margin(M) border(B) useScrollbar(S) padding(P) content-box(C)
        (where content-box(C) is frame for part of margin(M) border(B) useScrollbar(S) padding(P) content-box(C) of scrollable child)
        (note: paddings are positioned 'under' content, so you can see content when it is scrolled above paddings)
        (note: distances are gotten from outer boundaries of smth (e.g. border))

    When scroll is enabled:
    ● Scrollbars are placed between border and padding
    ● Paddings become scrollable with content
    ● In Firefox right padding is omitted

    Useful:
    ● element.getBoundingClientRect()
    ● window.getComputedStyle(element)
    ● ширина вертикального скроллбара: let scrollWidth = div.offsetWidth - div.clientWidth;
*/



//export const GetDimensions = (domElement: HTMLElement) => new GetDimensions(domElement)
export class GetDimensions {
    constructor(public domElement: HTMLElement) { }

    private _rect: DOMRect|undefined
    get rect(){ return this._rect ??= this.domElement.getBoundingClientRect() }





    // float distance from viewport to element border (outer boundary of border)

    // viewport top to element top (V->B)
    // clientY
    get top(){ return this.rect.top }
    get viewportTopToBorderTop(){ return this.top }

    // viewport left to element left (V->B)
    // clientX
    get left(){ return this.rect.left }
    get viewportLeftToBorderLeft(){ return this.left }

    // viewport top to element bottom (V->BSPCPSB)
    get bottom(){ return this.rect.bottom }
    get viewportTopToBorderBottom(){ return this.bottom }

    // viewport left to element right (V->BSPCPSB)
    get right(){ return this.rect.right }
    get viewportLeftToBorderRight(){ return this.right }





    // width / height includes border (BSPCPSB)
    get offsetWidth(){ return this.domElement.offsetWidth }
    get offsetHeight(){ return this.domElement.offsetHeight }



    // width / height of content
    // !!! for <img> works as offset width / height
    get clientWidth(){ return this.domElement.clientWidth }
    get clientHeight(){ return this.domElement.clientHeight }


    // Ширина / высота левой / верхней прокрученной части контента
    // width of horizontal-paddings + part of full content located behind the border-left inner boundary
    get scrollLeft(){ return this.domElement.scrollLeft }
    // height of vertical-paddings + part of full content located behind the border-top inner boundary
    get scrollTop(){ return this.domElement.scrollTop }
    // Установка значения scrollTop на 0 или Infinity прокрутит элемент в самый верх/низ соответственно.


    // max width of horizontal-paddings + content located behind the border-left inner boundary
    // !!! non-standard
    get scrollLeftMax(){
        // @ts-ignore
        return this.domElement.scrollLeftMax as number
    }
    // max height of vertical-paddings + content located behind the border-top inner boundary
    // !!! non-standard
    get scrollTopMax(){
        // @ts-ignore
        return this.domElement.scrollTopMax as number
    }

    // width / height includes paddings + full content (not only visible part)
    get scrollWidth(){ return this.domElement.scrollWidth }
    get scrollHeight(){ return this.domElement.scrollHeight }
}