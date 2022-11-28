import {useState} from "react";


export const useSet = <E>(set: Set<E>) => {
    const [setWrapper, setSetWrapper] = useState({ set })
    const updateState = ()=>setSetWrapper(it=>({...it}))
    return [setWrapper.set, updateState] as const
}