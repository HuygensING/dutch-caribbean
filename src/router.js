import { Redirect, Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from "history/lib/createBrowserHistory";
import React from "react";

import App from "./components/App";
import ArchiveItem from "./components/ArchiveItem";
import CreatorItem from "./components/CreatorItem";
import LegislationItem from "./components/LegislationItem";
import Search from "./components/Search";

import store from "./store";

let createElement = function(Component, props) {
  return React.createElement(Component, {
    ...props, ...store.getState()
  });
};

export let routes = (
	<Router history={createBrowserHistory()} createElement={createElement}>
		<Redirect from="/" to="/archive/results" />
		<Route path="/" component={App}>
			<Route path=":searchType/results" component={Search} />
			<Route path="archive/:id" component={ArchiveItem} />
			<Route path="creator/:id" component={CreatorItem} />
			<Route path="legislation/:id" component={LegislationItem} />
		</Route>
	</Router>
);

export let makeUrl = function (id, params) {
	switch(id) {
		case "ROOT":
			return "/";
		case "ABBREVIATIONS":
			return "http://dutch-caribbean.huygens.knaw.nl/wp-content/uploads/2013/08/Afkortingen-Caribische-Wereld.pdf";
	}
}

//<Route path="creator/:id" component={CreatorItem} />
//<Route path="legislation/:id" component={LegislationItem} />
