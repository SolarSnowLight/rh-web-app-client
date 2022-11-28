import { ReactComponent as SvgComponent } from 'src/resources/images/arrow-1-down.svg'
import React from 'react'



type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
type CustomProps = {
    mainColor?: string|undefined
    size?: number|string|undefined
}



const Arrow1DownIc = ({ mainColor = 'black', size = undefined, ...props }: CustomProps & SvgProps) => {
    const { style, ...restProps } = props
    return <SvgComponent
        style={{
            width: size, height: size,
            maxWidth: '100%', maxHeight: '100%',
            fill: mainColor, stroke: mainColor,
            ...style
        }}
        {...restProps}
    />
}
export default React.memo(Arrow1DownIc) as unknown as typeof Arrow1DownIc