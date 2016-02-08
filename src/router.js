import { Redirect, Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from "history/lib/createBrowserHistory";
import React from "react";

import App from "./components/App";
import ArchiveFiche from "./components/ArchiveFiche";
import CreatorFiche from "./components/CreatorFiche";
import LegislationFiche from "./components/LegislationFiche";
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
			<Route path="archive/:id" component={ArchiveFiche} />
			<Route path="creator/:id" component={CreatorFiche} />
			<Route path="legislation/:id" component={LegislationFiche} />
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

export function makeArchiveSearchUrl() {
  return `/archive/results`
}
export function makeCreatorSearchUrl() {
  return `/creator/results`
}
export function makeLegislationSearchUrl() {
  return `/legislation/results`
}

export function makeArchiveUrl(id) {
  return `/archive/${id}`
}
export function makeCreatorUrl(id) {
  return `/creator/${id}`
}
export function makeLegislationUrl(id) {
  return `/legislation/${id}`
}

//<Route path="creator/:id" component={CreatorItem} />
//<Route path="legislation/:id" component={LegislationItem} />
