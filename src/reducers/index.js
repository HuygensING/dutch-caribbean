import {combineReducers} from "redux";
import fiche from "./fiche"
import creatorSearch from "./creator-search";
import legislationSearch from "./legislation-search";
import archiveSearch from "./archive-search";
import scrollTop from "./scroll-top";

export default combineReducers({
  fiche: fiche,
  creatorSearch: creatorSearch,
  legislationSearch: legislationSearch,
  archiveSearch: archiveSearch,
  scrollTop: scrollTop
});
