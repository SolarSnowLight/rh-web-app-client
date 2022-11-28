export interface IDateOptions {
    year: string;
    month: string;
    day: string;
}

/**
 * Функция конвертирующая строку, характеризующую дату в общее представление даты в текущем приложении (формат)
 * @param date Строка, характеризующая дату для конвертации в локализованную дату
 * @param locale Локализация
 * @param options Параметры преобразования
 * @returns {string} Локализованная строка даты
 */
export const getDateLocale = (
    date: string,
    locale: string = "ru",
    options: IDateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    }
): string => {
    return new Date(date).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
};
