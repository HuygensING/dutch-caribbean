require("babel-polyfill");

import React from "react";

import store from "./store";
import {routes} from "./router";

console.log("Check CI deployment");
document.addEventListener("DOMContentLoaded", () => {
	store.subscribe(() =>
		React.render(routes, document.body)
	);
	React.render(routes, document.body);
});
