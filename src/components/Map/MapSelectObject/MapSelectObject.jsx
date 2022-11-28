/* Библиотеки */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Source, Layer, FullscreenControl, useControl } from 'react-map-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

/* Контекст */
import { useAppSelector } from '../../../hooks/redux.hook';

/* Компоненты */
import ButtonGreenComponent from '../../UI/Button/ButtonGreenComponent';
import ButtonWhiteComponent from '../../UI/Button/ButtonWhiteComponent';

/* Константы */
import cities from "src/data/russian-cities.json";

/* Изображения */
import update from 'src/resources/images/update.svg';

/* Стили */
import styles from './MapSelectObject.module.scss';

/**
 * Компонент для выбора позиции объекта на карте
 * @param {{city, style, setActive, setLatLng}} param0 - основная информация о текущем городе и координатах объекта
 * @returns { JSX.Element }
 */
const MapSelectObject = ({ city, style, setActive, setLatLng }) => {
    // States
    const [zoom, setZoom] = useState(14);
    const [markerLatLng, setMarkerLatLng] = useState({
        longitude: parseFloat(city.coords.lon),
        latitude: parseFloat(city.coords.lat),
    });
    const [mapLatLng, setMapLatLng] = useState({
        longitude: parseFloat(city.coords.lon),
        latitude: parseFloat(city.coords.lat),
    });
    const [clickMarker, setClickMarker] = useState(false);

    // Updating the coordinates of the marker when it is moved
    useEffect(() => {
        setMarkerLatLng({
            longitude: parseFloat(city.coords.lon),
            latitude: parseFloat(city.coords.lat),
        });

        setMapLatLng({
            longitude: parseFloat(city.coords.lon),
            latitude: parseFloat(city.coords.lat),
        });
    }, [city]);

    return (
        <div className={styles['map-wrapper']}>
            <div className={styles['block-coord']}>
                <span className='span__text__black'>Поставьте точку на карте</span>
                <span className='span__text__black' style={{
                    display: 'grid',
                    justifyContent: 'flex-end'
                }}>Координаты метки: {markerLatLng.latitude.toFixed(4)};{markerLatLng.longitude.toFixed(4)}</span>
            </div>
            <Map
                {...mapLatLng}
                zoom={zoom}
                style={{
                    width: '100%',
                    height: '80%',
                    marginTop: '24px'
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={"pk.eyJ1IjoiZGFuc3ciLCJhIjoiY2wyMGMyZzhuMHV3MDNjbWt5ajRuNHY2cSJ9.VQGluZCuS2Y1RclO0FuRTQ"}

                onZoom={e => {
                    setZoom(e.viewState.zoom);
                }}
                onMove={e => {
                    if (!clickMarker) {
                        setMapLatLng({
                            latitude: e.viewState.latitude,
                            longitude: e.viewState.longitude
                        });
                    }
                }}
                onDblClick={(e) => { }}
                onMouseMove={(e) => {
                    if (clickMarker) {
                        setMarkerLatLng({
                            latitude: e.lngLat.lat,
                            longitude: e.lngLat.lng,
                        })
                    }
                }}
            >
                <div
                    className="mapboxgl-ctrl"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '0.5em',
                        marginRight: '0.5em'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            height: '30px',
                            width: '30px',
                        }}
                    >
                        <img
                            src={update}
                            width="30em"
                            height="30em"
                            onClick={() => {
                                setMapLatLng({
                                    longitude: markerLatLng.longitude,
                                    latitude: markerLatLng.latitude,
                                });
                            }}
                        ></img>
                    </div>
                </div>

                {
                    !clickMarker && <Marker
                        latitude={markerLatLng.latitude}
                        longitude={markerLatLng.longitude}
                        color={"#FF0000"}
                        onClick={(e) => {
                            setClickMarker(!clickMarker);
                        }}
                    />
                }
                {
                    clickMarker && <Marker
                        latitude={markerLatLng.latitude}
                        longitude={markerLatLng.longitude}
                        color={"#0000FF"}
                        onClick={(e) => {
                            setClickMarker(!clickMarker);
                        }}
                    />
                }
            </Map>
            <div className={styles['block-btn']}>
                <ButtonWhiteComponent
                    title={"Отмена"}
                    clickHandler={() => {
                        setActive(false);
                    }}
                />
                <div
                    style={{
                        display: 'grid',
                        justifyContent: 'flex-end'
                    }}
                >
                    <ButtonGreenComponent
                        title={"Добавить координаты"}
                        clickHandler={() => {
                            setLatLng({
                                lat: markerLatLng.latitude,
                                lng: markerLatLng.longitude
                            })
                            setActive(false);
                        }}
                    />
                </div>
            </div>
        </div >
    )
}

export default React.memo(MapSelectObject);