import React from "react";
import {makeCreatorUrl} from "../router";
import {Link} from "react-router";

export default React.createClass({
  render() {
    let r = this.props.data.data;
    let id = this.props.data.id;
    let displayName = this.props.data.displayName;
    return (<li id={id} key={id}>
      <Link className="title" to={makeCreatorUrl(id)}>{r.nameEng || "(no title)"} <span className="type">({(r.types || "").split(";").join(', ')})</span></Link>
      <span className="right">{r.beginDate} - {r.endDate}</span>
    </li>);
  }
});
