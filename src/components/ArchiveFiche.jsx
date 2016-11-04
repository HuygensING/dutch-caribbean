import React from "react";
import {makeArchiveUrl, makeCreatorUrl} from "../router";
import renderRelation from "./utils/renderRelation";
import config from "../config";
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
    this.props.onFetchEntry("archive", this.props.params.id);
  },

  componentDidUpdate() {
    const { storedScrollTop } = this.props;
    if (typeof storedScrollTop !== "undefined") {
      window.scrollTo(0, storedScrollTop);
    }
  },

  render () {
    let data = this.props.archive || {};
    let hasDifferentTitles = String(data.titleNld).toLowerCase() !== String(data.titleEng).toLowerCase();
    //FIXME: zorg dat de back button niet op een lege search uitkomt
    return (<div id="fiche">
      <div className="content">
        <div className="panel-left">
          <a className="back" onClick={function () { history.go(-1); }}>&lt; Back</a>
          <h3 className="type">Archive</h3>
          <h2 className="title">{data.titleEng}</h2>
          {hasDifferentTitles
            ? ( <div className="section dutch-title">
                  <h4>Dutch title</h4>
                  <p>{data.titleNld}</p>
                </div>)
            : null}
          <div className="section remarks">
            <h4>Remarks</h4>
            <p style={{whiteSpace: "pre-line"}}>{data.notes || "-"}</p>
          </div>
          <div className="section related-archives">
            <h4>Related archives</h4>
            { renderRelation(data["@relations"], "has_child_archive", relation => <Link to={makeArchiveUrl(relation.id)}>{relation.displayName} (underlying)</Link>) }
            { renderRelation(data["@relations"], "has_parent_archive", relation => <Link to={makeArchiveUrl(relation.id)}>{relation.displayName} (parent)</Link>) }
          </div>
          <div className="section related-creators">
            <h4>Creators</h4>
            { renderRelation(data["@relations"], "is_created_by", relation => <Link to={makeCreatorUrl(relation.id)}>{relation.displayName} (creator)</Link>) || "-" }
          </div>
        </div>
        <div className="panel-right">
          <div className="section abbreviations"><a href={config.abbreviationsURL} target="_new">Explain abbreviations</a></div>
          <div className="section date">
            <h4>Date</h4>
            <p><span className="lbl">Begin date</span><span>{data.beginDate}</span></p>
            <p><span className="lbl">End date</span><span>{data.endDate}</span></p>
          </div>
          <div className="section reference">
            <h4>Reference</h4>
            <p>{ (data.countries || [""])[0] } {data.refCodeArchive} {data.refCode} {data.subCode} {data.itemNo || data.series}</p>
          </div>
          <div className="section geography">
            <h4>Geography</h4>
            { renderRelation(data["@relations"], "has_archive_place", relation => <span>{relation.displayName}</span>) }
          </div>
          <div className="section subject">
            <h4>Subject</h4>
            { renderRelation(data["@relations"], "has_archive_keyword", relation => <span>{relation.displayName}</span>) }
          </div>
          <div className="section person">
            <h4>Person</h4>
            { renderRelation(data["@relations"], "has_archive_person", relation => <span>{relation.displayName}</span>) }
          </div>
          <div className="section extent">
            <h4>Extent</h4>
            <p>{data.extent || '-'}</p>
          </div>
        </div>
      </div>
    </div>);
  }
});
