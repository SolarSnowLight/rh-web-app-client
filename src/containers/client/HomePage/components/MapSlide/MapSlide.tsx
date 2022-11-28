import React from "react";
import css from './MapSlide.module.scss'
import Space from "src/components/Space";
import MapComponent from "src/components/Map/MapComponent";
import Filter from "src/components/Filter/Filter";




const MapSlide = () => {


    return <div className={css.mapSlide}>

        <div className={css.title}>На карте</div>

        <Space h={59}/>

        <Filter />

        <Space h={24}/>

        <div className={css.mapBox}>
            <MapComponent style={{ width: '100%', height: '100%' }}/>
        </div>

    </div>
}
export default React.memo(MapSlide) as unknown as typeof MapSlide


