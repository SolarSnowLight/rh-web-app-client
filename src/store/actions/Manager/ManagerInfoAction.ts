/* Контекст */
import { managerInfoSlice } from "src/store/reducers/Manager/ManagerInfoSlice";
import messageQueueAction from "../MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http.main-server";

/* Константы */
import CompanyApi from "src/constants/addresses/apis/company.api";

/* Модели */
import {
  IManagerCompanyModel,
  IManagerUuidModel,
} from "src/models/Manager/IManagerCompany";

/**
 * Получение списка проектов, за которыми закреплён текущий менеджер
 * @returns {Promise<void>}
 */
const getProjects = (value: IManagerUuidModel) => async (dispatch) => {
  dispatch(managerInfoSlice.actions.loadingStart());

  try {
    const response = await apiMainServer.post<IManagerCompanyModel>(
      CompanyApi.get_manager,
      JSON.stringify({
        ...value,
      })
    );

    if (response.status != 200 && response.status != 201) {
      dispatch(messageQueueAction.addMessage(response.data.message, "error"));
      return;
    }

    if (response.data.projects) {
      dispatch(managerInfoSlice.actions.setProjects(response.data));
    }
  } catch (e) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(managerInfoSlice.actions.loadingEnd());
};

const managerInfoAction = {
  getProjects,
};

export default managerInfoAction;
