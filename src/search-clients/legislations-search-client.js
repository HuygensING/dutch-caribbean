import { SolrClient } from "solr-faceted-search-react";

import store from "../store";

const legislationFields = [
  { label: "English title", field: "titleEng_t", type: "text" },
  { label: "Dutch title", field: "titleNld_t", type: "text"},
  { label: "Contents", field: "contents_t", type: "text"},
  { label: "Period start", field: "beginDate_i", type: "range-facet"},
  { label: "Period end", field: "endDate_i", type: "range-facet"},
  { label: "Geography", field: "place_ss", type: "list-facet"},
  { label: "Subject", field: "subject_ss", type: "list-facet"},
  { label: "Person", field: "person_ss", type: "list-facet"},
];

const legislationSortFields = [
  { label: "Title", field: "titleEng_s", value: "asc" },
  { label: "Date", field: "beginDate_s" },
];

const legislationSearchClient = new SolrClient({
  url: "/repositorysolr/dcarlegislations",
  idField: "id",
  searchFields: legislationFields,
  sortFields: legislationSortFields,
  rows: 50,
  pageStrategy: "cursor",
  facetSort: "count",
  onChange: (state) => {
    store.dispatch({type: "SET_LEGISLATION_SEARCH_STATE", state: state});
  }
});

export default legislationSearchClient;