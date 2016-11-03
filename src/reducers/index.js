import {combineReducers} from "redux";
import archive from "./archive"
import creatorSearch from "./creator-search";
import legislationSearch from "./legislation-search";
import archiveSearch from "./archive-search";

export default combineReducers({
  archive: archive,
  creatorSearch: creatorSearch,
  legislationSearch: legislationSearch,
  archiveSearch: archiveSearch
});
