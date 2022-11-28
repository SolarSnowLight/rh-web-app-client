/* Библиотеки */
import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  FullscreenControl,
  useControl,
} from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

/* Контекст */
import { useAppSelector } from "../../../hooks/redux.hook";

/* Компоненты */
import ButtonGreenComponent from "../../UI/Button/ButtonGreenComponent";
import ButtonWhiteComponent from "../../UI/Button/ButtonWhiteComponent";

/* Модели */
import { IObjectModel } from "src/models/Object/IObjectModel";
import { ICoordModel } from "src/models/Coord/ICoordModel";

/* Утилиты */
import { randomIntFromRange } from "src/utils/random";

/* Типы */
import { empty } from "src/types/empty";

/* Изображения */
import update from "src/resources/images/update.svg";

/* Константы */
import cities from "src/data/russian-cities.json";

/* Стили */
import styles from "./MapObject.module.scss";

/* Локальные интерфейсы */
interface IMapObjectProps {
  objects: IObjectModel[] | empty;
  defaultLatLng: ICoordModel | empty;
  selectObject: number | empty;
  setIndex: (number) => {};
}

interface IMapObject {
  objects: IObjectModel[] | empty;
  defaultLatLng: ICoordModel | empty;
}

/**
 * Компонент для просмотра объектов на карте
 * @param {{ objects }} param0 Объекты для размещения на карте
 * @returns { JSX.Element }
 */
const MapObject: FC<IMapObjectProps> = ({
  objects,
  defaultLatLng,
  selectObject,
  setIndex: setSelectIndex
}) => {
  const [zoom, setZoom] = useState(14);
  const [mapLatLng, setMapLatLng] = useState<ICoordModel>(
    getDefaultLatLng({ objects, defaultLatLng })
  );

  const [indexObject, setIndexObject] = useState<number>(-1);
  const [clickMarker, setClickMarker] = useState<boolean>(false);

  useEffect(() => {
    setIndexObject(selectObject as number);

    if (objects && selectObject && selectObject >= 0) {
      setMapLatLng({
        latitude: objects[selectObject as number].coords.lat,
        longitude: objects[selectObject as number].coords.lng,
      });
    }
  }, [selectObject]);

  return (
    <Map
      {...mapLatLng}
      zoom={zoom}
      style={{
        width: "100%",
        height: "100%",
        marginTop: "24px",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={
        "pk.eyJ1IjoiZGFuc3ciLCJhIjoiY2wyMGMyZzhuMHV3MDNjbWt5ajRuNHY2cSJ9.VQGluZCuS2Y1RclO0FuRTQ"
      }
      onZoom={(e) => {
        setZoom(e.viewState.zoom);
      }}
      onMove={(e) => {
        if (!clickMarker) {
          setMapLatLng({
            latitude: e.viewState.latitude,
            longitude: e.viewState.longitude,
          });
        }
      }}
      onDblClick={(e) => {}}
    >
      {objects &&
        objects.map((item, index) => {
          return (
            <>
              {indexObject !== index && (
                <Marker
                  latitude={item.coords.lat}
                  longitude={item.coords.lng}
                  color={"#FF0000"}
                  onClick={() => {
                    setSelectIndex(index);
                  }}
                />
              )}
              {indexObject === index && (
                <Marker
                  latitude={item.coords.lat}
                  longitude={item.coords.lng}
                  color={"#0000FF"}
                  onClick={() => {
                    setSelectIndex(index);
                  }}
                />
              )}
            </>
          );
        })}
    </Map>
  );
};

/**
 * Функция для получения начальных координат
 * @param props Параметр с информацией об объекте и координатах "по-умолчанию"
 * @returns { ICoordModel } Координаты
 */
export const getDefaultLatLng = (props: IMapObject): ICoordModel => {
  if (!props.objects || props.objects.length <= 0) {
    if (props.defaultLatLng) {
      return {
        longitude: props.defaultLatLng?.longitude,
        latitude: props.defaultLatLng?.latitude,
      };
    }

    const randomCity = cities[randomIntFromRange(0, cities.length)];
    return {
      longitude: parseFloat(randomCity.coords.lon),
      latitude: parseFloat(randomCity.coords.lat),
    };
  }

  return {
    longitude: props.objects[0].coords.lng,
    latitude: props.objects[0].coords.lat,
  };
};

export default React.memo(MapObject);
