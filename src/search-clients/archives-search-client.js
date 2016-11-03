import { SolrClient } from "solr-faceted-search-react";

import store from "../store";

const archiveFields = [
  { label: "English title", field: "titleEng_t", type: "text" },
  { label: "Dutch title", field: "titleNld_t", type: "text"},
  { label: "Remarks", field: "notes_t", type: "text"},
  { label: "Period start", field: "beginDate_i", type: "range-facet"},
  { label: "Period end", field: "endDate_i", type: "range-facet"},
  { label: "Geography", field: "place_ss", type: "list-facet"},
  { label: "Subject", field: "subject_ss", type: "list-facet"},
  { label: "Person", field: "person_ss", type: "list-facet"},
  { label: "Repository Code", field: "refCodeArchive_s", type: "list-facet"},
];

const archiveSortFields = [
  { label: "Title", field: "titleEng_s", value: "asc"},
  { label: "Period", field: "beginDate_i" }
];

const archiveSearchClient = new SolrClient({
  url: "/repositorysolr/dcararchives",
  idField: "id",
  searchFields: archiveFields,
  sortFields: archiveSortFields,
  rows: 50,
  pageStrategy: "cursor",
  facetSort: "count",
  onChange: (state) => {
    store.dispatch({type: "SET_ARCHIVE_SEARCH_STATE", state: state});
  }
});

export default archiveSearchClient;