import React from "react";
import App from "./components/App";
import ArchiveFiche from "./components/ArchiveFiche";
import CreatorFiche from "./components/CreatorFiche";
import LegislationFiche from "./components/LegislationFiche";
import Search from "./components/Search";
import actions from "./actions";
import {Provider, connect} from "react-redux";
import {Redirect, Router, Route, browserHistory} from "react-router";
import store from "./store";
import {getCurrentScrollTop} from "./dom";


const grabQuery = (search) => ({
  searchFields: search.query.searchFields.filter((sf) => sf.value && sf.value.length),
  sortFields: search.query.sortFields.filter((sf) => sf.value && sf.value.length)
});

export function serializeSearch() {
  const { creatorSearch, legislationSearch, archiveSearch } = store.getState();

  return encodeURIComponent(JSON.stringify({
    creatorSearch: grabQuery(creatorSearch),
    legislationSearch: grabQuery(legislationSearch),
    archiveSearch: grabQuery(archiveSearch)
  }));
}

export function storeSearch() {
  const serialized = `${location.pathname}?#q=${serializeSearch()}`;
  if (location.pathname + "#" + location.hash !== serialized) {
    browserHistory.replace(`${location.pathname}#q=${serializeSearch()}`);
  }
}




const connectComponent = connect(
  (state, routed) => {
    const { location: { pathname }, params: { searchType } } = routed;
    const { scrollTop } = state;

    const storedScrollState = scrollTop[pathname] && getCurrentScrollTop() !== scrollTop[pathname] ?
      { storedScrollTop: scrollTop[pathname] } : {};

    if (searchType) {
      return {
        ...storedScrollState,
        [searchType + "Search"]: state[searchType + "Search"]
      };
    } else {
      return {
        ...storedScrollState,
        archive: state.archive
      };
    }
  },
  (dispatch) => actions(dispatch)
);

export const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/archive/results" />
      <Route path="/" component={connectComponent(App)}>
        <Route path=":searchType/results" component={connectComponent(Search)} />
        <Route path="archive/:id" component={connectComponent(ArchiveFiche)} />
        <Route path="creator/:id" component={connectComponent(CreatorFiche)} />
        <Route path="legislation/:id" component={connectComponent(LegislationFiche)} />
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
