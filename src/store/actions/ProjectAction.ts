/* Context */
import { IObjectModel } from "src/models/Object/IObjectModel";
import { projectSlice } from "../reducers/ProjectSlice";
import messageQueueAction from "./MessageQueueAction";

/**
 * Функция обновление поля информации о проекте
 * @param {string} item Ключ поля
 * @param {any} value Значение поля
 * @returns {Promise<any>}
 */
const setItemProjectInfo = (item: string, value) => async (dispatch) => {
  dispatch(projectSlice.actions.loadingStart());

  try {
    dispatch(
      projectSlice.actions.setItemProjectInfo({
        item: item,
        value: value,
      })
    );
  } catch (e) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(projectSlice.actions.loadingEnd());
};

/**
 * Добавление новой информации об объекте для текущего проекта
 * @param {any} object Информация об объекте
 * @returns {Promise<any>}
 */
const addObjectInfo = (object: IObjectModel) => async (dispatch) => {
  dispatch(projectSlice.actions.loadingStart());

  try {
    dispatch(projectSlice.actions.addObjectInfo(object));
  } catch (e) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(projectSlice.actions.loadingEnd());
};

/**
 * Обновление информации об объекте
 * @param {any} object Информация об объекте
 * @returns {Promise<any>}
 */
 const updateObjectInfo = (object: IObjectModel) => async (dispatch) => {
  dispatch(projectSlice.actions.loadingStart());

  try {
    dispatch(projectSlice.actions.updateObjectInfo(object));
  } catch (e) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(projectSlice.actions.loadingEnd());
};

/**
 * Удаление информации об объекте
 * @param {any} object Конкретный объект из списка объектов
 * @returns {Promise<any>}
 */
const deleteObjectInfo = (object: IObjectModel) => async (dispatch) => {
  dispatch(projectSlice.actions.loadingStart());

  try {
    dispatch(projectSlice.actions.deleteObjectInfo(object));
  } catch (e) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(projectSlice.actions.loadingEnd());
};

/**
 * Очистка информации о проекте
 * @returns {Promise<any>}
 */
const clearProjectInfo = () => async (dispatch) => {
  dispatch(projectSlice.actions.clear());
};

/**
 * Удаление всего списка объектов
 * @returns {Promise<any>}
 */
const deleteAllObject = () => async (dispatch) => {
  dispatch(projectSlice.actions.deleteAllObject());
  dispatch(messageQueueAction.addMessage(null, "success", "Объект добавлен"));
};

const projectAction = {
  setItemProjectInfo,
  addObjectInfo,
  updateObjectInfo,
  deleteObjectInfo,
  deleteAllObject,
  clearProjectInfo,
};

export default projectAction;
