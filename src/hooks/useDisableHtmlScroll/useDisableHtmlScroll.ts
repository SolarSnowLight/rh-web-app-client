import css from './useDisableHtmlScroll.module.scss'
import {useLayoutEffect} from "react";

export const useDisableHtmlScroll = () => {
    useLayoutEffect(()=>{
        document.querySelector('html')!.classList.add(css.noScroll)
        return ()=>document.querySelector('html')!.classList.remove(css.noScroll)
    },[])
}