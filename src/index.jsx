require("babel-polyfill");

import ReactDOM from "react-dom";

import store from "./store";
import {routes} from "./router";

document.addEventListener("DOMContentLoaded", () => {
	store.subscribe(() => {
		ReactDOM.render(routes, document.getElementById("app"))
	});
	ReactDOM.render(routes, document.getElementById("app"));
});
