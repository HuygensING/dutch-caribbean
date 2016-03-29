import React from "react";
import {makeArchiveSearchUrl, makeCreatorSearchUrl, makeLegislationSearchUrl} from "../router";
import FacetedSearch from "hire-faceted-search";
import config from "../config";
import ArchiveResult from "../components/ArchiveResult";
import CreatorResult from "../components/CreatorResult";
import LegislationResult from "../components/LegislationResult";
import {setSearchUrl} from "../router";

const labels = {
	facetTitles: {
		"dynamic_s_period": "Period",
		"dynamic_s_place": "Geography",
		"dynamic_s_subject": "Subject",
		"dynamic_s_person": "Person",
		"dynamic_s_refcode": "Repository Code",
    "dynamic_s_date": "Date",
    "dynamic_s_type": "Identity type",

    "term": "Text Search",
	},
  "dynamic_sort_title": "Title",
  "dynamic_k_period": "Period",
	"dynamic_k_date": "Date",
	"dynamic_sort_name": "Name",
	"resultsFound": "Results",
	"sortBy": "Sort by",
	"showAll": "Show All",
	"newSearch": "New Search"
};
const facetLists = {
  "archive": ["dynamic_s_period", "dynamic_s_place", "dynamic_s_subject", "dynamic_s_person", "dynamic_s_refcode"],
  "creator": ["dynamic_s_period", "dynamic_s_place", "dynamic_s_subject", "dynamic_s_person", "dynamic_s_type"],
  "legislation": ["dynamic_s_date", "dynamic_s_place", "dynamic_s_subject", "dynamic_s_person"]
}
const resultComponents = {
  "archive": ArchiveResult,
  "creator": CreatorResult,
  "legislation": LegislationResult,
}

export default React.createClass({
  render () {
    let searchType = this.props.params.searchType;
    return (
      <div>
        <button className="clearSearch" onClick={function () { window.location.search=""; }}>New search</button>
        <div className="tabs">
          <ul>
	          <li className={"archives" + (searchType==="archive" ? " active" : "")}><a href={makeArchiveSearchUrl()}>Archives</a></li>
	          <li className={"creators" + (searchType==="creator" ? " active" : "")}><a href={makeCreatorSearchUrl()}>Creators</a></li>
	          <li className={"legislations" + (searchType==="legislation" ? " active" : "")}><a href={makeLegislationSearchUrl()}>Legislation</a></li>
					</ul>
        </div>

        <FacetedSearch
          config={{
            baseURL: config.timbuctooUrl,
            searchPath: `/search/${config.collections[searchType]}`,
            headers: {VRE_ID: config.vreId, Accept: "application/json"},
            hideFreeTextSearch: false
          }}
          facetList={facetLists[searchType]}
          labels={labels}
          onChange={(res, params) => setSearchUrl(params)}
          onSelect={() => undefined}
          customComponents={{result: resultComponents[searchType]}}
					query={this.props.query}
          />
      </div>
    );
  }
});
