import React from "react";
import {makeLegislationUrl} from "../router";
import {Link} from "react-router";

export default React.createClass({
  render() {
    let r = this.props.doc;
    let id = this.props.doc.id;

    return (<li id={id} key={id}>
      <Link className="title" to={makeLegislationUrl(id)}>{(r.titleEng_t || ["(no title)"]).join(" ")}</Link>
      <span className="right">{r.beginDate_s}</span>
    </li>);
  }
});
