import React from "react";
import {makeLegislationUrl} from "../router";

export default React.createClass({
	render() {
    let r = this.props.data.data;
		let id = this.props.data.id;
		return (<li id={id} key={id}>
      <a className="title" href={makeLegislationUrl(id)}>{r.titleEng || "(no title)"}</a>
      <span className="right">{r.date1}</span>
    </li>);
  }
});
