/**
 * Операция получение по файлу его DataURL
 * @param file Файл для получения DataURL
 * @returns {Promise<string>}
 */
const readAsUrl = async (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => resolve(ev?.target?.result as string);
    reader.onerror = (ev) => reject(ev);

    //reader.readAsArrayBuffer(file)

    reader.readAsDataURL(file);
  });

/**
 * Функция округления
 * @param n Значение
 * @param scale Масштаб
 * @returns 
 */
const round = (n: number, scale: number = 0) => {
  const mult = (n < 0 ? -1 : 1) * 10 ** scale;
  return Math.round(n * mult) / mult;
};

/**
 * Конвертация значения типа number в обычную строку (без сокращений типа 2e+67)
 * @param n Число
 * @returns {string} Число в виде обычной строки
 */
const numberToPlainString = (n: number) => {
  return n.toLocaleString(["fullwide", "en-Us"], {
    useGrouping: false,
    maximumSignificantDigits: 21,
  });
};

/**
 * Получение процента
 * @param value Значение
 * @param total Общее значение
 * @param scale Масштаб
 * @returns {string} 
 */
const getPercent = (value: number, total: number, scale: number = 1) => {
  return utils.numberToPlainString(utils.round((value * 100) / total, scale));
};

/**
 * Деление с остатком
 * @param a Значение a
 * @param b Значение b
 * @returns {number} (a + b) % b
 */
const mod = (a: number, b: number) => (a + b) % b;

/**
 * Функция, подгоняющая текущее значение под диапазон
 * @param min Минимальное значение
 * @param curr Текущее значение
 * @param max Максимальное значение
 * @returns {number} Результирующее значение 
 */
const fitRange = (min: number, curr: number, max: number) =>
  curr < min ? min : curr > max ? max : curr;

/**
 * Определение, находится ли текущее значение между минимальным и максимальным включительно
 * @param min Минимальное значение
 * @param curr Текущее значение
 * @param max Максимальное значение
 * @returns {boolean} Результат сравнения
 */
const inRange = (min: number, curr: number, max: number) =>
  curr >= min && curr <= max;

/**
 * Проверка является ли переданное значение массивом
 * @param obj any
 * @returns {boolean} true если obj является массивом
 */
const isArray = <T, E>(obj: T | E[]): obj is Array<E> => obj instanceof Array;

/**
 * Переключатель элемента в множестве (если он есть - удаляется, иначе - добавляется)
 * @param set Множество
 * @param element Элемент
 * @returns {Set<E>}
 */
const toggleInSet = <E>(set: Set<E>, element: E) => {
  if (set.has(element)) set.delete(element);
  else set.add(element);
  return set;
};


export type empty = null|undefined


export const utils = {
  readAsUrl,
  round,
  numberToPlainString,
  getPercent,
  mod,
  fitRange,
  inRange,
  isArray,
  toggleInSet,
};
