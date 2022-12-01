import React from "react"



export const ReactMemoTyped = <C>(Component: C): C => {
    // @ts-ignore
    return React.memo(Component)
}
