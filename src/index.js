/* Импорт сторонних библиотек */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/* Импорт внутренных элементов (контейнеры, хуки, компоненты, hocs, и т.д.) */
import App from './containers/App';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';

/* Импорт файлов конфигурации */
import storeConfig from "./configs/store.config.json";

/* Импорти стилей */
import './styles/normalize.css';
import './styles/index.css';
import { useAppDispatch } from './hooks/redux.hook';
import { authSlice } from './store/reducers/AuthSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*store.subscribe(() => {
  localStorage[storeConfig["main-store"]] = JSON.stringify(store.getState());
});*/

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);