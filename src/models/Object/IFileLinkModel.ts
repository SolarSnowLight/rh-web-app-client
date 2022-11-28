/**
 * Модель для парсинга файловой строки
 */
export interface IFileLinkModel {
    link: string;                                                 // Ссылка на файл (google docs)
    time_value: number;                                           // Количество времени
    time_key: string;                                             // Временной интервал 
}

/**
 * Класс, имплементирующий интерфейс для модели файловой строки
 */
export class FileLinkModel implements IFileLinkModel {
    link: string;
    time_value: number;
    time_key: string;

    /**
     * Конструктор с параметрами
     * @param {string} link Ссылка на файл
     * @param {number} time_value Значение времени
     * @param {string} time_key Временной интервал
     */
    constructor(link: string, time_value: number, time_key: string){
        this.link = link;
        this.time_value = time_value;
        this.time_key = time_key;
    }

    /**
     * Метод, преобразующий текущий объект модели в строку
     * @param {string} separator Сепаратор
     * @returns {string} Результат преобразования (строка состоящая из трёх элементов: ссылка, количество времени, интервал времени)
     */
    toString(separator: string = ';'): string {
        return `${this.link}${separator}${this.time_value}${separator}${this.time_key}`;
    }

    /**
     * Статический метод, преобразующий объект модели в строку
     * @param {string} separator Сепаратор
     * @returns {string} Результат преобразования (строка состоящая из трёх элементов: ссылка, количество времени, интервал времени)
     */
    static toString(model: IFileLinkModel, separator: string = ';'): string {
        return `${model.link}${separator}${model.time_value}${separator}${model.time_key}`;
    }

    /**
     * Метод, преобразующий строку в объект модели
     * @param {string} value Строка для преобразования
     * @param {string} separator Сепаратор
     * @returns {IFileLinkModel} Результирующая модель
     */
    fromString(value: string, separator: string = ';'): IFileLinkModel {
        const strings = value.split(separator);
        if(strings.length != 3) {
            throw new Error("The split string must consist of three elements");
        }

        this.link = strings[0];
        this.time_value = Number(strings[1]);
        this.time_key = strings[2];

        return this;
    }

    /**
     * Статический метод, преобразующий строку в объект модели
     * @param {string} value Строка для преобразования
     * @param {string} separator Сепаратор
     * @returns {IFileLinkModel} Результирующая модель
     */
    static fromString(value: string, separator: string = ';'): IFileLinkModel {
        const strings = value.split(separator);
        if(strings.length != 3) {
            throw new Error("The split string must consist of three elements");
        }

        return new FileLinkModel(strings[0], Number(strings[1]), strings[3]);
    }
}