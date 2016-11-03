import React from "react";
import {makeArchiveUrl} from "../router";
import { Link } from "react-router";

export default React.createClass({
  render() {
    let r = this.props.doc || {};
    let id = this.props.doc.id;

    return (<li id={id} key={id}>
      <Link className="title" to={makeArchiveUrl(id)}>{(r.titleEng_t || ["(no title)"]).join(" ")}</Link>
      <span className="right">{r.beginDate_i} - {r.endDate_i}</span>
      <span className="ref">{ (r.countries_ss || [""])[0] } {r.refCodeArchive_s} {r.refCode_s} {r.subCode_s} {r.itemNo_s || r.series_s}</span>
    </li>);
  }
});
