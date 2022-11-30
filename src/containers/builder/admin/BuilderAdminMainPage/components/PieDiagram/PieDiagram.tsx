
import {ResponsivePie} from "@nivo/pie";
import {animated} from "@react-spring/web";
import React from "react";
import css from './PieDiagram.module.scss'
import {utils} from "src/utils/utils";







export type FullData = {
    totals: Totals
    data: Data[]
}
export type Totals = {
    value: number
}
export type Data = {
    id: string
    label: string
    value: number
    color: string
    arcLabelColor: string
    borderColor: string
}
const MyResponsivePie = ({ fullData }: { fullData: FullData }) => {

    const totals = fullData.totals

    // https://nivo.rocks/pie/
    return <ResponsivePie
        //width={410} height={410}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}

        data={fullData.data}
        //theme={pieTheme}
        startAngle={270}
        endAngle={630}
        innerRadius={0.75}
        padAngle={2}
        activeOuterRadiusOffset={8}
        colors={datum=>datum.data.color}

        borderWidth={1}
        borderColor={datum=>datum.data.borderColor}


        // arcLinkLabels - надписи-выноски - отключены в слоях
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsColor="black"
        // @ts-ignore
        arcLinkLabel={datum=>datum.label}
        /*arcLinkLabelComponent={props=>{
            console.log('props',props)
            console.log('props',props)
            return <animated.g offset={props.style.offset}>
                <text>
                    aaaaaaaaaa
                </text>
            </animated.g>
        }}*/


        // arcLabels - надписи внутри долей диграммы
        arcLabelsSkipAngle={10}
        arcLabelsRadiusOffset={0.5}
        arcLabelsTextColor={datum=>datum.data.arcLabelColor}
        arcLabelsComponent={({ datum, label, style })=>(
            <animated.g
                // @ts-ignore
                //transform={(()=>{console.log('transform',style.transform);return style.transform})()}
                transform={style.transform}
                style={{ pointerEvents: 'none' }}
            >
                <text textAnchor="middle"
                      dominantBaseline="central"
                      fill={style.textColor}
                      className={css.arcLabelText}
                >
                    {label}
                </text>
            </animated.g>
        )}


        // tooltip - надпись при наведении на дольку диаграммы
        tooltip={({ datum: { id, label, value, color } }) => (
            <div className={css.tooltipBox}>
                <div className={css.indicator} style={{ background: color }}/>
                <div className={css.text} style={{ color }}>
                    {utils.getPercent(value, totals.value)}% {label}
                </div>
            </div>
        )}


        layers={['arcs', 'arcLabels', /*'arcLinkLabels',*/ 'legends', props=><CenteredMetric {...props} totals={totals}/>]}
    />
}
export default React.memo(MyResponsivePie)



const CenteredMetric = ({ dataWithArc, centerX, centerY, totals }) => {
    //let total = dataWithArc.reduce((sum,curr)=>sum+curr.value, 0)
    return <foreignObject
        x={centerX}
        y={centerY}
        width={1} // ненулевые размеры необходимы чтобы оно рендерилось
        height={1}
        style={{ overflow: 'visible' }}
    >
        <div className={css.centeredMetricContainer}>
            <div className={css.value}>{totals.value}</div>
            <div className={css.text}>ивентов</div>
        </div>
    </foreignObject>
}