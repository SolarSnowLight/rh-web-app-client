import { ReactComponent as SvgComponent } from 'src/resources/images/cross-2.svg'
import React from 'react'


type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
type CustomProps = {
    mainColor?: string|undefined
    size?: number|string|undefined
}

const Cross2Ic = ({ mainColor = 'black', size, ...props }: CustomProps & SvgProps) => {
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
export default React.memo(Cross2Ic) as unknown as typeof Cross2Ic