import React from "react";
import {makeArchiveSearchUrl, makeCreatorSearchUrl, makeLegislationSearchUrl} from "../router";
import {SolrFacetedSearch, defaultComponentPack} from "solr-faceted-search-react";
import ArchiveResult from "../components/ArchiveResult";
import CreatorResult from "../components/CreatorResult";
import LegislationResult from "../components/LegislationResult";
import {Link} from "react-router";

import archiveSearchClient from "../search-clients/archives-search-client";
import archiverSearchClient from "../search-clients/archivers-search-client";
import legislationSearchClient from "../search-clients/legislations-search-client";

const searchClients = {
  "archive": archiveSearchClient,
  "creator": archiverSearchClient,
  "legislation": legislationSearchClient
};

const customComponents = {
  "archive": {
    ...defaultComponentPack,
    results: {
      ...defaultComponentPack.results,
      result: ArchiveResult
    }
  },
  "creator": {
    ...defaultComponentPack,
    results: {
      ...defaultComponentPack.results,
      result: CreatorResult
    }
  },
  "legislation": {
    ...defaultComponentPack,
    results: {
      ...defaultComponentPack.results,
      result: LegislationResult
    }
  },
};

export default React.createClass({
  render () {
    const searchType = this.props.params.searchType;
    const searchState = this.props[`${searchType}Search`];
    const searchClient = searchClients[searchType];

    console.log(searchType);
    console.log(customComponents[searchType]);
    return (
      <div>
        <button className="clearSearch" onClick={function () { searchClient.resetSearchFields() }}>New search</button>
        <div className="tabs">
          <ul>
            <li className={"archives" + (searchType==="archive" ? " active" : "")}><Link to={makeArchiveSearchUrl()}>Archives</Link></li>
            <li className={"creators" + (searchType==="creator" ? " active" : "")}><Link to={makeCreatorSearchUrl()}>Creators</Link></li>
            <li className={"legislations" + (searchType==="legislation" ? " active" : "")}><Link to={makeLegislationSearchUrl()}>Legislation</Link></li>
          </ul>
        </div>

        <SolrFacetedSearch
          {...searchState}
          {...searchClient.getHandlers()}
          key={searchType}
          bootstrapCss={true}
          customComponents={customComponents[searchType]}
          truncateFacetListsAt={11}
        />
      </div>
    );
  }
});
