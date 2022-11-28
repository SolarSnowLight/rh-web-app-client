/* Библиотеки */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Контекст */
import authReducer from "./reducers/AuthSlice";
import configReducer from "./reducers/ConfigSlice";
import adminReducer from "./reducers/AdminSlice";
import userReducer from "./reducers/UserSlice";
import companyReducer from "./reducers/CompanySlice";
import projectReducer from "./reducers/ProjectSlice";
import managerInfoReducer from "./reducers/Manager/ManagerInfoSlice";
import messageQueueReducer from "./reducers/MessageQueueSlice";

/* Константы */
import storageConfig from "../configs/store.config.json";

/* Главный Reducer */
const rootReducer = combineReducers({
  authReducer,
  configReducer,
  adminReducer,
  userReducer,
  companyReducer,
  projectReducer,
  messageQueueReducer,
  managerInfoReducer,
});

// Конфигурация Persist
const persistConfig = {
  key: storageConfig["main-store"],
  storage,
  blacklist: ["managerInfoReducer", "adminReducer", "companyReducer", "messageQueueReducer", "projectReducer"],
};

// Создание Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Конфигурирование общего хранилища
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const setupStore = () => {
  return store;
};

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
