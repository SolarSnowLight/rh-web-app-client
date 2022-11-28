import React from 'react'


const Space = (
    {w,h,flexGrow}: { w?: number|string|undefined, h?: number|string|undefined, flexGrow?: number|undefined }
) => <div style={{ width: w, height: h, flexGrow: flexGrow }}/>

export default React.memo(Space)