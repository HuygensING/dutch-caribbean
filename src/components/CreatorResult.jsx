import React from "react";
import {makeCreatorUrl, storeSearch } from "../router";
import {Link} from "react-router";

export default React.createClass({
  render() {
    let r = this.props.doc;
    let id = this.props.doc.id;

    return (<li id={id} key={id}>
      <Link className="title" onClick={() => storeSearch()} to={makeCreatorUrl(id)}>{(r.nameEng_t || ["(no title)"]).join(" ")} <span className="type">({(r.archiverTypes_ss || [""]).join(', ')})</span></Link>
      <span className="right">{r.beginDate_i} - {r.endDate_i}</span>
    </li>);
  }
});
