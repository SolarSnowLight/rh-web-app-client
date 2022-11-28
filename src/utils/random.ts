/**
 * Генерация рандомного значения из определённого диапазона
 * @param min Минимальное значение диапазона
 * @param max Максимальное значение диапазона
 * @returns { number } Результат генерации
 */
export const randomIntFromRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
