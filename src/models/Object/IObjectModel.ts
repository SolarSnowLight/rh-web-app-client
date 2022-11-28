import { IDataURLModel } from "../Image/IImageModel";

/**
 * Интерфейс для описания координат города
 */
export interface ICityCoords {
  lat: string;
  lon: string;
}

/**
 * Интерфейс для описание города, в котором находится объект
 */
export interface ICity {
  coords: ICityCoords;
  district: string;
  name: string;
  population: number;
  subject: string;
}

/**
 * Интерфейс для описание координат объекта
 */
export interface IObjectCoords {
  city: ICity;
  lat: number;
  lng: number;
}

/**
 * Интерфейс для описание токена в шаблоне таблицы
 */
export interface ITokenTableModel {
  value: string;
  type_component: string;
  position: string;
}

/**
 * Интерфейс для описание информации об объекте
 */
export interface IObjectModel {
  uuid: string;                     // Идентификатор объекта
  title: string;                    // Название
  date_delivery: string;            // Дата сдачи
  images: IDataURLModel[];          // Изображения
  characteristics: string[];        // Характеристики
  payment_methods: string[];        // Методы оплаты
  communications: string[];         // Коммуникации
  coords: IObjectCoords;            // Координаты
  tokens: ITokenTableModel[][];     // Токены (для парсинга таблицы по шаблону)
  file: string;                     // Файл таблицы (или ссылка на google docs по определённому паттерну)
  is_link: boolean;                 // Флаг ссылки на удалённый источник для данных о квартире объекта
}
