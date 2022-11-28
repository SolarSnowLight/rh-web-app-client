import { ReactComponent as SvgComponent } from 'src/resources/images/logo-2.svg'
import React from 'react'


type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
type CustomProps = {
    mainColor?: string|undefined
    size?: number|string|undefined
}


const LogoIc = ({ mainColor = 'black', size, ...props }: CustomProps & SvgProps) => {
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
export default React.memo(LogoIc) as unknown as typeof LogoIc