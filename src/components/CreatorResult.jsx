import React from "react";
import {makeCreatorUrl} from "../router";

export default React.createClass({
	render() {
    let r = this.props.data.data;
		let id = this.props.data.id;
		let displayName = this.props.data.displayName;
		return (<li id={id} key={id}>
      <a className="title" href={makeCreatorUrl(id)}>{r.nameEng || "(no title)"} <span className="type">({(r.types || "").split(";").join(', ')})</span></a>
  		<span className="right">{r.beginDate} - {r.endDate}</span>
    </li>);
  }
});
