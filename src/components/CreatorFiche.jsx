import React from "react";
import config from "../config";
import renderRelation from "./utils/renderRelation";
import {makeArchiveUrl, makeCreatorUrl} from "../router";
import { Link } from "react-router";

export default React.createClass({
  componentWillReceiveProps(nextProps) {
    const { onFetchEntry } = this.props;

    // Triggers fetch data from server based on id from route.
    if (this.props.params.id !== nextProps.params.id) {
      onFetchEntry("archive", nextProps.params.id);
    }
  },

  componentDidMount() {
    this.props.onFetchEntry("creator", this.props.params.id);
  },

  render () {
    let data = this.props.archive || {};
    let hasDifferentTitles = String(data.nameNld).toLowerCase() !== String(data.nameEng).toLowerCase();
    return (<div id="fiche">
    <div className="content">
      <div className="panel-left">
      <a className="back" href="#" onClick={function () { history.go(-1); }}>&lt; Back</a>
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
          { renderRelation(data["@relations"], "is_creator_of", relation => <Link to={makeArchiveUrl(relation.id)}>{relation.displayName} (underlying)</Link>) }
        </div>
        <div className="section related-creators">
          <h4>Related creators</h4>
          { renderRelation(data["@relations"], "has_sibling_archiver", relation => <Link to={makeCreatorUrl(relation.id)}>{relation.displayName} (sibling)</Link>) }
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
