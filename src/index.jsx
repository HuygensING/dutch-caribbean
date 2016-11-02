require("babel-polyfill");

import ReactDOM from "react-dom";

import store from "./store";
import {routes} from "./router";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(routes, document.getElementById("app"));
});
