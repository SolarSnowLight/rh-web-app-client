import {useMemo, useState, useLayoutEffect} from "react";


export const useMedia = (media: string) => {

    const mediaQuery = useMemo(()=>{
        const mq = window.matchMedia(media)
        mq.onchange = ()=>setMatches(mq.matches)
        return mq
    }, [media])

    useLayoutEffect(()=>{
        mediaQuery.onchange = ()=>setMatches(mediaQuery.matches)
        return ()=>{ mediaQuery.onchange = null }
    },[mediaQuery])

    const [matches, setMatches] = useState(mediaQuery.matches)

    return matches
}