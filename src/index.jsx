require("babel-polyfill");

import ReactDOM from "react-dom";
import {getCurrentScrollTop} from "./dom";
import {routes, storeSearch} from "./router";
import archiveSearchClient from "./search-clients/archives-search-client";
import archiverSearchClient from "./search-clients/archivers-search-client";
import legislationSearchClient from "./search-clients/legislations-search-client";
import store from "./store";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(routes, document.getElementById("app"));
  store.subscribe(() => {
    if (location.pathname !== "/legislation/results" &&
      location.pathname !== "/creator/results" &&
      location.pathname !== "/archive/results") {
      return;
    }
    storeSearch();
  });

  // Deserialize stores search state on page load
  if (location.hash.length > 0) {
    try {
      const initialSearchState = JSON.parse(decodeURIComponent(location.hash.replace(/^#q=/, "")));
      archiveSearchClient.setInitialQuery(initialSearchState.archiveSearch || {});
      archiverSearchClient.setInitialQuery(initialSearchState.creatorSearch || {});
      legislationSearchClient.setInitialQuery(initialSearchState.legislationSearch|| {})
    } catch (e) {
      console.log(e);
    }
  }

  archiveSearchClient.initialize();
  archiverSearchClient.initialize();
  legislationSearchClient.initialize();
});

window.addEventListener('scroll', function(e) {
  store.dispatch({type: "SET_SCROLL_TOP", scrollTop: getCurrentScrollTop(), pathname: location.pathname});
});
