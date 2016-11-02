import React from "react";
import {makeLegislationUrl} from "../router";
import {Link} from "react-router";

export default React.createClass({
  render() {
    let r = this.props.data.data;
    let id = this.props.data.id;
    return (<li id={id} key={id}>
      <Link className="title" to={makeLegislationUrl(id)}>{r.titleEng || "(no title)"}</Link>
      <span className="right">{r.date1}</span>
    </li>);
  }
});
