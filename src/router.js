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


// Filters out all search fields and sort fields with values
const grabQuery = (search) => ({
  searchFields: search.query.searchFields.filter((sf) => sf.value && sf.value.length),
  sortFields: search.query.sortFields.filter((sf) => sf.value && sf.value.length)
});

// Serialize search states as json + URI
export function serializeSearch() {
  const { creatorSearch, legislationSearch, archiveSearch } = store.getState();

  return encodeURIComponent(JSON.stringify({
    creatorSearch: grabQuery(creatorSearch),
    legislationSearch: grabQuery(legislationSearch),
    archiveSearch: grabQuery(archiveSearch)
  }));
}

// Store search state in url
export function storeSearch() {
  const serialized = `${location.pathname}?#q=${serializeSearch()}`;
  if (location.pathname + "#" + location.hash !== serialized) {
    browserHistory.replace(`${location.pathname}#q=${serializeSearch()}`);
  }
}


// Connector functions

// Gets the stored scroll position for the current route
const getStoredScrollState = (pathname, scrollTop) =>
  scrollTop[pathname] && getCurrentScrollTop() !== scrollTop[pathname]
    ? { storedScrollTop: scrollTop[pathname] }
    : {};

// Passes along the current fiche state and the stored scroll position
const connectFicheComponent = connect(
  (state, routed) => ({
    ...getStoredScrollState(routed.location.pathname, state.scrollTop),
    fiche: state.fiche
  }),
  (dispatch) => actions(dispatch)
);

// Only pases along the search state of the currently active search
const connectSearchComponent = connect(
  (state, routed) => ({
    [routed.params.searchType + "Search"]: state[routed.params.searchType + "Search"]
  }),
  (dispatch) => actions(dispatch)
);

// Just passes along the stored scroll position for this route
const connectAppComponent = connect(
  (state, routed) => getStoredScrollState(routed.location.pathname, state.scrollTop),
  (dispatch) => actions(dispatch)
);

// Actual routes
export const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/archive/results" />
      <Route path="/" component={connectAppComponent(App)}>
        <Route path=":searchType/results" component={connectSearchComponent(Search)} />
        <Route path="archive/:id" component={connectFicheComponent(ArchiveFiche)} />
        <Route path="creator/:id" component={connectFicheComponent(CreatorFiche)} />
        <Route path="legislation/:id" component={connectFicheComponent(LegislationFiche)} />
      </Route>
    </Router>
  </Provider>
);

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
