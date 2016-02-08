import React from "react";
import {getEntry} from "../actions/entry";
import config from "../config";
import renderRelation from "./utils/renderRelation";
import {makeCreatorSearchUrl, makeArchiveUrl, makeCreatorUrl} from "../router";

export default React.createClass({
  componentDidMount() {
    getEntry("creator", this.props.params.id);
  },
  render () {
    let data = this.props.archive || {};
    let hasDifferentTitles = String(data.nameNld).toLowerCase() !== String(data.nameEng).toLowerCase();
    return (<div id="fiche">
    {/*<div className="breadcrumbs">
      <div className="line"></div>
      <ul>
        <li><a href={makeCreatorSearchUrl()}>Search results</a></li>
        {data.nameEng ? <li className="active" style={{maxWidth: "500px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{data.nameEng}</li> : null}
      </ul>
    </div>*/}
    <div className="content">
      <div className="panel-left">
        <h3 className="type">Creator</h3>
        <h2 className="title">{data.nameEng}</h2>
        {hasDifferentTitles
          ? ( <div className="section dutch-name">
                <h4>Dutch name</h4>
                <p>{data.nameNld}</p>
              </div>)
          : null}
        <div className="section history">
          <h4>History</h4>
          <div style={{whiteSpace: "pre-line"}} dangerouslySetInnerHTML={{__html: data.history}} />
        </div>
        <div className="section remarks">
          <h4>Remarks</h4>
          <p>{data.notes || "-"}</p>
        </div>
        <div className="section related-archives">
          <h4>Related archives</h4>
          { renderRelation(data["@relations"], "is_creator_of", relation => <a href={makeArchiveUrl(relation.id)}>{relation.displayName} (underlying)</a>) }
        </div>
        <div className="section related-creators">
          <h4>Related creators</h4>
          { renderRelation(data["@relations"], "has_sibling_archiver", relation => <a href={makeCreatorUrl(relation.id)}>{relation.displayName} (underlying)</a>) }
        </div>
      </div>
      <div className="panel-right">
        <div className="section abbreviations"><a href={config.abbreviationsURL} target="_new">Explain abbreviations</a></div>
        <div className="section date">
          <h4>Date</h4>
          <p><span className="lbl">Begin date</span><span>{data.beginDate}</span></p>
          <p><span className="lbl">End date</span><span>{data.endDate}</span></p>
        </div>
        <div className="section geography">
          <h4>Geography</h4>
          { renderRelation(data["@relations"], "has_archiver_place", relation => <p>{relation.displayName}</p>) }
        </div>
        <div className="section subject">
          <h4>Subject</h4>
          { renderRelation(data["@relations"], "has_archiver_keyword", relation => <p>{relation.displayName}</p>) }
        </div>
        <div className="section person">
          <h4>Person</h4>
          { renderRelation(data["@relations"], "has_archiver_person", relation => <p>{relation.displayName}</p>) }
        </div>
        <div className="section type">
          <h4>Type</h4>
          {(data.types || []).join(', ')}
        </div>
      </div>
    </div>
  </div>
);
  }
});
