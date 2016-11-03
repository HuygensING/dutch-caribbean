import { SolrClient } from "solr-faceted-search-react";

import store from "../store";

const archiverFields = [
  { label: "English name", field: "nameEng_t", type: "text" },
  { label: "Dutch name", field: "nameNld_t", type: "text"},
  { label: "Remarks", field: "notes_t", type: "text"},
  { label: "History", field: "history_t", type: "text"},
  { label: "Period start", field: "beginDate_i", type: "range-facet"},
  { label: "Period end", field: "endDate_i", type: "range-facet"},
  { label: "Geography", field: "place_ss", type: "list-facet"},
  { label: "Subject", field: "subject_ss", type: "list-facet"},
  { label: "Person", field: "person_ss", type: "list-facet"},
  { label: "Identity type", field: "archiverTypes_ss", type: "list-facet"},
];

const archiverSortFields = [
  { label: "Title", field: "nameEng_s", value: "asc" },
  { label: "Period", field: "beginDate_i" }
];

const archiverSearchClient = new SolrClient({
  url: "/repositorysolr/dcararchivers",
  idField: "id",
  searchFields: archiverFields,
  sortFields: archiverSortFields,
  rows: 50,
  pageStrategy: "cursor",
  facetSort: "count",
  onChange: (state) => {
    store.dispatch({type: "SET_ARCHIVER_SEARCH_STATE", state: state});
  }
});

export default archiverSearchClient;