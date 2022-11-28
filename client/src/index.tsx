import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "reset-css";
import "./index.css";
import App from "./App";
import axios from "axios";
import * as serviceWorker from "./serviceWorker";

axios.defaults.headers = {'Access-Control-Allow-Origin': '*'};
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
