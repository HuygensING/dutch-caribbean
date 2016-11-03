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
/*
 <span className="ref">{ (r.countries_ss || [""])[0] } {r.refCodeArchive_s} {r.refCode} {r.subCode} {r.itemNo || r.series}</span>

 "beginDate": "1816",
 "refCodeArchive": "HaNA",
 "endDate": "1849",
 "subCode": null,
 "series": "3610-3737",
 "_id": "016f16ff-2c80-4cb6-be62-50116577ace3",
 "countries": "NL",
 "itemNo": null,
 "refCode": "2.10.01",
 "titleEng": "\"Government journal of Curaçao\", register of proceedings, decisions, deeds, and letters of the Governor of Curaçao and its dependencies"
 */