import createBrowserHistory from "history/lib/createBrowserHistory";
import React from "react";

import App from "./components/App";
import ArchiveFiche from "./components/ArchiveFiche";
import CreatorFiche from "./components/CreatorFiche";
import LegislationFiche from "./components/LegislationFiche";
import Search from "./components/Search";
import actions from "./actions";
import { Provider, connect } from "react-redux";
import { Redirect, Router, Route, browserHistory } from "react-router";
import store from "./store";
/*import juriCtor from "juri";
const juri = juriCtor();

let createElement = function(Component, props) {
  var q;
  if (Component === Search && props.location && props.location.query && props.location.query.q) {
    q = juri.decode(props.location.query.q.replace(/ /g, "+"));
  }
  return React.createElement(Component, {
    ...props, ...store.getState(),
    query: q
  });
};*/


const makeContainerComponent = connect((state) => state, (dispatch) => actions(navigateTo, dispatch));

export const routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Redirect from="/" to="/archive/results" />
			<Route path="/" component={makeContainerComponent(makeContainerComponent(App))}>
				<Route path=":searchType/results" component={makeContainerComponent(Search)} />
				<Route path="archive/:id" component={makeContainerComponent(ArchiveFiche)} />
				<Route path="creator/:id" component={makeContainerComponent(CreatorFiche)} />
				<Route path="legislation/:id" component={makeContainerComponent(LegislationFiche)} />
			</Route>
		</Router>
	</Provider>
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

const urls = {

};

export function navigateTo(key, args) {
	browserHistory.push(urls[key].apply(null, args));
}


export function setSearchUrl(searchOptions) {
  console.log("TODO: ", searchOptions);
/*  if (window.location.pathname.substr(-"/results".length) === "/results") {
    history.replaceState({}, "", window.location.pathname + "?q=" + juri.encode(searchOptions));
  } else {
    history.pushState({}, "", window.location.pathname + "?q=" + juri.encode(searchOptions));
  }*/
}
