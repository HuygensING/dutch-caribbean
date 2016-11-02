import React from "react";
import {makeArchiveSearchUrl, makeCreatorSearchUrl, makeLegislationSearchUrl} from "../router";
import FacetedSearch from "hire-faceted-search";
import config from "../config";
import ArchiveResult from "../components/ArchiveResult";
import CreatorResult from "../components/CreatorResult";
import LegislationResult from "../components/LegislationResult";
import {setSearchUrl} from "../router";
import {Link} from "react-router";

const labels = {
  facetTitles: {
    "dynamic_i_period": "Period",
    "dynamic_s_place": "Geography",
    "dynamic_s_subject": "Subject",
    "dynamic_s_person": "Person",
    "dynamic_s_refcode": "Repository Code",
    "dynamic_i_date": "Period",
    "dynamic_s_type": "Identity type",
    "dynamic_t_notes": "Remarks",
    "dynamic_t_titleNld": "Dutch title",
    "dynamic_t_titleEng": "English title",
    "dynamic_t_nameNld": "Dutch name",
    "dynamic_t_nameEng": "English name",
    "dynamic_t_history": "History",
    "dynamic_t_contents": "Contents",
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
  "archive": ["dynamic_i_period", "dynamic_s_place", "dynamic_s_subject", "dynamic_s_person", "dynamic_s_refcode"],
  "creator": ["dynamic_i_period", "dynamic_s_place", "dynamic_s_subject", "dynamic_s_person", "dynamic_s_type"],
  "legislation": ["dynamic_i_date", "dynamic_s_place", "dynamic_s_subject", "dynamic_s_person"]
};

const resultComponents = {
  "archive": ArchiveResult,
  "creator": CreatorResult,
  "legislation": LegislationResult,
};

const fullTextSearchFields = {
  "archive": [
    {name: "dynamic_t_titleEng"},
    {name: "dynamic_t_titleNld"},
    {name: "dynamic_t_notes"}
  ],
  "creator": [
    {name: "dynamic_t_nameEng"},
    {name: "dynamic_t_nameNld"},
    {name: "dynamic_t_notes"},
    {name: "dynamic_t_history"}
  ],
  "legislation": [
    {name: "dynamic_t_titleEng"},
    {name: "dynamic_t_titleNld"},
    {name: "dynamic_t_contents"}
  ]
};

export default React.createClass({
  render () {
    const searchType = this.props.params.searchType;
    return (
      <div>
        <button className="clearSearch" onClick={function () { window.location.search=""; }}>New search</button>
        <div className="tabs">
          <ul>
            <li className={"archives" + (searchType==="archive" ? " active" : "")}><Link to={makeArchiveSearchUrl()}>Archives</Link></li>
            <li className={"creators" + (searchType==="creator" ? " active" : "")}><Link to={makeCreatorSearchUrl()}>Creators</Link></li>
            <li className={"legislations" + (searchType==="legislation" ? " active" : "")}><Link to={makeLegislationSearchUrl()}>Legislation</Link></li>
          </ul>
        </div>

        <FacetedSearch
          config={{
            baseURL: config.timbuctooUrl,
            searchPath: `/search/${config.collections[searchType]}`,
            headers: {VRE_ID: config.vreId, Accept: "application/json"},
            hideFreeTextSearch: true,
            fullTextSearchFields: fullTextSearchFields[searchType]
          }}
          key={searchType}
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
