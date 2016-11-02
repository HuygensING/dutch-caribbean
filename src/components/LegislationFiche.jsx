import React from "react";
import config from "../config";
import renderRelation from "./utils/renderRelation";

export default React.createClass({
  componentDidMount() {
    this.props.onFetchEntry("legislation", this.props.params.id);
  },
  render () {
    let data = this.props.archive || {};
    let hasDifferentTitles = String(data.titleNld).toLowerCase() !== String(data.titleEng).toLowerCase();

    return (<div id="fiche">
    <div className="content">
      <div className="panel-left">
      <a className="back" href="#" onClick={function () { history.go(-1); }}>&lt; Back</a>
      <h3 className="type">Legislation</h3>
        <h2 className="title">{data.titleEng}<i className="reference">{data.reference} {data.pages}</i></h2>
        {hasDifferentTitles
          ? ( <div className="section dutch-title">
                <h4>Dutch title</h4>
                <p>{data.titleNld}</p>
              </div>)
          : null}
        <div className="section contents">
          <h4>Summary of contents</h4>
          <p dangerouslySetInnerHTML={{__html: data.contents}} />
        </div>
        <div className="section archival-source">
          <h4>Original archival source</h4>
          <p dangerouslySetInnerHTML={{__html: data.originalArchivalSource}} />
        </div>
        <div className="section earlier-later-publications">
          <h4>Earlier and later publications</h4>
          <div dangerouslySetInnerHTML={{__html: data.otherPublications && data.otherPublications.length ? data.otherPublications.join('') : "-"}} />
        </div>
      </div>
      <div className="panel-right">
        <div className="section abbreviations"><a href={config.abbreviationsURL} target="_new">Explain abbreviations</a></div>
        <div className="section relevant-dates">
          <h4>Relevant dates</h4>
          <p>{data.date1}</p>
        </div>
        <div className="section geography">
          <h4>Geography</h4>
          { renderRelation(data["@relations"], "has_legislation_place", relation => <span>{relation.displayName}</span>) }
        </div>
        <div className="section subject">
          <h4>Subject</h4>
          { renderRelation(data["@relations"], "has_legislation_keyword", relation => <span>{relation.displayName}</span>) }
        </div>
        <div className="section person">
          <h4>Person</h4>
          { renderRelation(data["@relations"], "has_legislation_person", relation => <span>{relation.displayName}</span>) }
        </div>
      </div>
    </div>
  </div>);
  }
});
