import { ReactComponent as SvgComponent } from 'src/resources/images/arrow-2-forward.svg'
import React from 'react'



type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
type CustomProps = {
    mainColor?: string|undefined
    size?: number|string|undefined
}



const Arrow2ForwardIc = ({ mainColor = 'black', size = undefined, ...props }: CustomProps & SvgProps) => {
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
export default React.memo(Arrow2ForwardIc) as unknown as typeof Arrow2ForwardIc