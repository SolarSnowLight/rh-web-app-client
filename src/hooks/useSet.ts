import {useState} from "react";


export const useSet = <E>(set: Set<E> | (()=>Set<E>)) => {
    const [setWrapper, setSetWrapper] = useState(()=>({
        set: typeof set==='function' ? set() : set
    }))
    const updateState = ()=>setSetWrapper(it=>({...it}))
    return [setWrapper.set, updateState] as const
}


