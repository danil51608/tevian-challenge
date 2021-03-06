import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import {GlobalStyle} from "./components/StyledComponents"

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
