require("babel-polyfill");

import ReactDOM from "react-dom";
import {routes} from "./router";
import archiveSearchClient from "./search-clients/archives-search-client";
import archiverSearchClient from "./search-clients/archivers-search-client";
import legislationSearchClient from "./search-clients/legislations-search-client";

document.addEventListener("DOMContentLoaded", () => {
  archiveSearchClient.initialize();
  archiverSearchClient.initialize();
  legislationSearchClient.initialize();
  ReactDOM.render(routes, document.getElementById("app"));
});
