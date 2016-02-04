require("babel-polyfill");

import React from "react";

import store from "./store";
import {routes} from "./router";

document.addEventListener("DOMContentLoaded", () => {
	store.subscribe(() =>
		React.render(routes, document.body)
	);
	React.render(routes, document.body);
});
