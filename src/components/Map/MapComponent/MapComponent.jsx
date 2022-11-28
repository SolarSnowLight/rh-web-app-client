import React from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { useAppSelector } from 'src/hooks/redux.hook';

import styles from './MapComponent.module.css';

const MapComponent = (props) => {
    return (
        <Map
            initialViewState={{
                longitude: 104.298234,
                latitude: 52.262757,
                zoom: 14
            }}
            zoom={14}
            scrollZoom={false}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={"pk.eyJ1IjoiZGFuc3ciLCJhIjoiY2wyMGMyZzhuMHV3MDNjbWt5ajRuNHY2cSJ9.VQGluZCuS2Y1RclO0FuRTQ"}
            {...props}
        ></Map>
    )
}

export default React.memo(MapComponent);