/* Libraries */
import React, { useEffect, useState } from "react";
import useRoutes from '../../routes/routes';
import { BrowserRouter } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import { ToastContainer } from "react-toastify";
import ru from "date-fns/locale/ru";

/* Context */
import { authUpdate } from "../../store/actions/AuthAction";
import userAction from "src/store/actions/UserAction";

/* Components */
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* HOC */
import WithToastify from "src/hoc-helpers/WithToastify";

/* Hooks */
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { useMessageToastify } from "src/hooks/message.toastify.hook";

/* Styles */
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './App.module.css';

registerLocale("ru", ru);

const App = () => {
  const authSelector = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authUpdate());
  }, []);

  useEffect(() => {
    if (authSelector.access_token) {
      dispatch(userAction.getUserCompany(authSelector.access_token));
    }
  }, [authSelector.access_token]);

  const routes = useRoutes(authSelector.isAuthenticated);

  return (
    <BrowserRouter>
      <Navbar />
      {routes}
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  )
}

export default App;