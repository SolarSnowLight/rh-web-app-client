/* Константы */
import { MainServerURL } from "src/constants/addresses/apis/main.api";
import { IFileLinkModel } from "src/models/Object/IFileLinkModel";

/**
 * Функция конвертации URI в Blob объект
 * @param {string} dataURI URI
 * @returns {Blob} Blob
 */
export const dataURLToBlob = (dataURL: string) => {
    // Конвертация base64 в необработанные бинарные данные, хранящиеся в строке
    var byteString = atob(dataURL.split(',')[1]);

    // Выделение компонента MIME
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    // Запись байтов строки в буфер массива
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}

/**
 * Функция для проверки ссылки в качестве URL-адреса на ресурс
 * @param {string} dataURI URL для проверки
 * @returns {boolean} Результат проверки (true - корректная ссылка, false - некорректная ссылка)
 */
export const isDataURL = (dataURI, address = MainServerURL) => {
    return dataURI.includes(address);
}

/**
 * Функция получения абсолютного пути к файлу на сервере
 * @param {string} address Относительный адрес файла
 * @param {*} server Адрес сервера, где расположены статические файлы (публичные файлы)
 * @returns {string} Абсолютный путь к файлу на сервере
 */
export const getPublicAddress = (address: string, server = MainServerURL) => {
    return `${server}/${address}`;
}
