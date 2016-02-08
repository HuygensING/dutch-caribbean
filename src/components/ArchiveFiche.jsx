import React from "react";
import {getEntry} from "../actions/entry";
import {makeArchiveSearchUrl, makeArchiveUrl, makeCreatorUrl} from "../router";
import renderRelation from "./utils/renderRelation";
import config from "../config";

export default React.createClass({
  componentDidMount() {
    getEntry("archive", this.props.params.id);
  },
  render () {
    let data = this.props.archive || {};
    let hasDifferentTitles = String(data.titleNld).toLowerCase() !== String(data.titleEng).toLowerCase();
    //FIXME: zorg dat de back button niet op een lege search uitkomt
    return (<div id="fiche">
      <div className="content">
        <div className="panel-left">
          <a className="back" href="#" onClick={function () { history.go(-1); }}>&lt; Back</a>
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
            { renderRelation(data["@relations"], "has_child_archive", relation => <a href={makeArchiveUrl(relation.id)}>{relation.displayName} (underlying)</a>) }
            { renderRelation(data["@relations"], "has_parent_archive", relation => <a href={makeArchiveUrl(relation.id)}>{relation.displayName} (underlying)</a>) }
          </div>
          <div className="section related-creators">
            <h4>Creators</h4>
            { renderRelation(data["@relations"], "is_created_by", relation => <a href={makeCreatorUrl(relation.id)}>{relation.displayName} (creator)</a>) || "-" }
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
            <p>{data.reference}</p>
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
